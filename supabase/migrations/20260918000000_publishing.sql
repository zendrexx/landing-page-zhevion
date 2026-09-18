-- Zhevion shared publishing database.
-- Apply with `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists pgcrypto;
create schema if not exists private;

create table public.roles (
  id text primary key,
  label text not null,
  description text not null,
  constraint valid_role check (id in ('owner', 'editor', 'author'))
);

insert into public.roles (id, label, description) values
  ('owner', 'Owner', 'Full access to team, sites, posts, and publishing.'),
  ('editor', 'Editor', 'Can edit and publish content to permitted sites.'),
  ('author', 'Author', 'Can create and edit personal drafts for permitted sites.')
on conflict (id) do update
set label = excluded.label, description = excluded.description;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 100),
  role text not null default 'author' references public.roles (id),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  hostname text not null unique,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_members (
  site_id uuid not null references public.sites (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (site_id, user_id)
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 160),
  description text not null check (char_length(description) between 1 and 320),
  body text not null check (char_length(body) > 0),
  author_id uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_sites (
  post_id uuid not null references public.posts (id) on delete cascade,
  site_id uuid not null references public.sites (id) on delete cascade,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (post_id, site_id)
);

create index post_sites_site_publication_idx
  on public.post_sites (site_id, published_at desc)
  where published_at is not null;
create index posts_author_idx on public.posts (author_id);
create index site_members_user_idx on public.site_members (user_id);

insert into public.sites (name, slug, hostname)
values ('Zhevion', 'zhevion', 'zhevion.com')
on conflict (slug) do update
set name = excluded.name, hostname = excluded.hostname;

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
before update on public.profiles
for each row execute function private.touch_updated_at();
create trigger sites_touch_updated_at
before update on public.sites
for each row execute function private.touch_updated_at();
create trigger posts_touch_updated_at
before update on public.posts
for each row execute function private.touch_updated_at();
create trigger post_sites_touch_updated_at
before update on public.post_sites
for each row execute function private.touch_updated_at();

-- Every Auth account receives a locked profile. A project owner must explicitly
-- activate it and assign its role, so public sign-up can never grant access.
create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Team member'
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.current_user_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select p.role
  from public.profiles p
  where p.id = (select auth.uid()) and p.is_active;
$$;

create or replace function private.is_active_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.is_active
  );
$$;

create or replace function private.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select private.current_user_role()) = 'owner', false);
$$;

create or replace function private.can_access_site(target_site_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select private.current_user_role()) = 'owner'
    or exists (
      select 1
      from public.site_members sm
      join public.profiles p on p.id = sm.user_id
      where sm.site_id = target_site_id
        and sm.user_id = (select auth.uid())
        and p.is_active
    ),
    false
  );
$$;

create or replace function private.is_post_published(target_post_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.post_sites ps
    join public.sites s on s.id = ps.site_id
    where ps.post_id = target_post_id
      and ps.published_at is not null
      and ps.published_at <= now()
      and s.active
  );
$$;

create or replace function private.is_published_author(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.posts p
    join public.post_sites ps on ps.post_id = p.id
    join public.sites s on s.id = ps.site_id
    where p.author_id = target_user_id
      and ps.published_at is not null
      and ps.published_at <= now()
      and s.active
  );
$$;

create or replace function private.can_edit_post(
  target_post_id uuid,
  target_author_id uuid
)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  member_role text := (select private.current_user_role());
begin
  if member_role = 'owner' then
    return true;
  end if;

  if member_role = 'author' then
    return target_author_id = (select auth.uid())
      and not (select private.is_post_published(target_post_id));
  end if;

  if member_role = 'editor' then
    return not exists (
      select 1 from public.post_sites ps
      where ps.post_id = target_post_id
        and not (select private.can_access_site(ps.site_id))
    );
  end if;

  return false;
end;
$$;

create or replace function private.can_manage_post_site(
  target_post_id uuid,
  target_site_id uuid,
  target_published_at timestamptz
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select private.can_access_site(target_site_id))
    and exists (
      select 1 from public.posts p
      where p.id = target_post_id
        and (select private.can_edit_post(p.id, p.author_id))
    )
    and (
      target_published_at is null
      or (select private.current_user_role()) in ('owner', 'editor')
    ),
    false
  );
$$;

revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
revoke all on function private.touch_updated_at() from public;
revoke all on function private.handle_new_user() from public;
revoke all on function private.current_user_role() from public;
revoke all on function private.is_active_member() from public;
revoke all on function private.is_owner() from public;
revoke all on function private.can_access_site(uuid) from public;
revoke all on function private.is_post_published(uuid) from public;
revoke all on function private.is_published_author(uuid) from public;
revoke all on function private.can_edit_post(uuid, uuid) from public;
revoke all on function private.can_manage_post_site(uuid, uuid, timestamptz) from public;
grant execute on function private.is_post_published(uuid) to anon, authenticated;
grant execute on function private.is_published_author(uuid) to anon, authenticated;
grant execute on function private.current_user_role() to authenticated;
grant execute on function private.is_active_member() to authenticated;
grant execute on function private.is_owner() to authenticated;
grant execute on function private.can_access_site(uuid) to authenticated;
grant execute on function private.can_edit_post(uuid, uuid) to authenticated;
grant execute on function private.can_manage_post_site(uuid, uuid, timestamptz) to authenticated;

alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.sites enable row level security;
alter table public.site_members enable row level security;
alter table public.posts enable row level security;
alter table public.post_sites enable row level security;

revoke all on public.roles, public.profiles, public.sites,
  public.site_members, public.posts, public.post_sites from anon, authenticated;

grant select on public.profiles, public.sites, public.posts, public.post_sites to anon;
grant select on public.roles, public.profiles, public.sites,
  public.site_members, public.posts, public.post_sites to authenticated;
grant insert, update, delete on public.profiles, public.sites,
  public.site_members, public.posts, public.post_sites to authenticated;

create policy roles_read_team
on public.roles for select to authenticated
using ((select private.is_active_member()));

create policy profiles_read_published_authors
on public.profiles for select to anon
using ((select private.is_published_author(id)));

create policy profiles_read_team
on public.profiles for select to authenticated
using ((select private.is_active_member()) and is_active);

create policy profiles_update_owner
on public.profiles for update to authenticated
using ((select private.is_owner()))
with check ((select private.is_owner()));

create policy sites_read_public
on public.sites for select to anon
using (active);

create policy sites_read_permitted
on public.sites for select to authenticated
using ((select private.can_access_site(id)));

create policy sites_insert_owner
on public.sites for insert to authenticated
with check ((select private.is_owner()));
create policy sites_update_owner
on public.sites for update to authenticated
using ((select private.is_owner()))
with check ((select private.is_owner()));
create policy sites_delete_owner
on public.sites for delete to authenticated
using ((select private.is_owner()));

create policy site_members_read_self_or_owner
on public.site_members for select to authenticated
using (
  (select private.is_owner())
  or (user_id = (select auth.uid()) and (select private.is_active_member()))
);
create policy site_members_insert_owner
on public.site_members for insert to authenticated
with check ((select private.is_owner()));
create policy site_members_update_owner
on public.site_members for update to authenticated
using ((select private.is_owner()))
with check ((select private.is_owner()));
create policy site_members_delete_owner
on public.site_members for delete to authenticated
using ((select private.is_owner()));

create policy posts_read_public
on public.posts for select to anon
using ((select private.is_post_published(id)));

create policy posts_read_team
on public.posts for select to authenticated
using ((select private.is_active_member()));

create policy posts_insert_team
on public.posts for insert to authenticated
with check (
  (select private.is_active_member())
  and author_id = (select auth.uid())
);

create policy posts_update_authorized
on public.posts for update to authenticated
using ((select private.can_edit_post(id, author_id)))
with check ((select private.can_edit_post(id, author_id)));

create policy posts_delete_authorized
on public.posts for delete to authenticated
using ((select private.can_edit_post(id, author_id)));

create policy post_sites_read_public
on public.post_sites for select to anon
using (published_at is not null and published_at <= now());

create policy post_sites_read_team
on public.post_sites for select to authenticated
using (
  (select private.is_active_member())
  and (
    (select private.can_access_site(site_id))
    or exists (
      select 1 from public.posts p
      where p.id = post_id and p.author_id = (select auth.uid())
    )
  )
);

create policy post_sites_insert_authorized
on public.post_sites for insert to authenticated
with check ((select private.can_manage_post_site(post_id, site_id, published_at)));

create policy post_sites_update_authorized
on public.post_sites for update to authenticated
using ((select private.can_manage_post_site(post_id, site_id, published_at)))
with check ((select private.can_manage_post_site(post_id, site_id, published_at)));

create policy post_sites_delete_authorized
on public.post_sites for delete to authenticated
using ((select private.can_manage_post_site(post_id, site_id, published_at)));

-- Atomic dashboard save. SECURITY INVOKER is intentional: all statements run
-- as the signed-in user and are still constrained by the policies above.
create or replace function public.save_post(
  p_post_id uuid,
  p_title text,
  p_slug text,
  p_description text,
  p_body text,
  p_site_ids uuid[],
  p_published_site_ids uuid[]
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  saved_post_id uuid;
begin
  if not coalesce(p_published_site_ids, '{}'::uuid[]) <@ coalesce(p_site_ids, '{}'::uuid[]) then
    raise exception 'Published destinations must also be assigned destinations';
  end if;

  if p_post_id is null then
    insert into public.posts (title, slug, description, body, author_id)
    values (p_title, p_slug, p_description, p_body, (select auth.uid()))
    returning id into saved_post_id;
  else
    update public.posts
    set title = p_title,
        slug = p_slug,
        description = p_description,
        body = p_body
    where id = p_post_id
    returning id into saved_post_id;

    if saved_post_id is null then
      raise exception 'Post not found or update not permitted';
    end if;
  end if;

  delete from public.post_sites ps
  where ps.post_id = saved_post_id
    and not (ps.site_id = any(coalesce(p_site_ids, '{}'::uuid[])));

  insert into public.post_sites as ps (post_id, site_id, published_at)
  select
    saved_post_id,
    selected.site_id,
    case
      when selected.site_id = any(coalesce(p_published_site_ids, '{}'::uuid[])) then now()
      else null
    end
  from unnest(coalesce(p_site_ids, '{}'::uuid[])) as selected(site_id)
  on conflict (post_id, site_id) do update
  set published_at = case
    when excluded.published_at is null then null
    else coalesce(ps.published_at, excluded.published_at)
  end;

  return saved_post_id;
end;
$$;

revoke all on function public.save_post(uuid, text, text, text, text, uuid[], uuid[]) from public;
grant execute on function public.save_post(uuid, text, text, text, text, uuid[], uuid[]) to authenticated;

-- Every frontend reads this same site-scoped contract and remains free to
-- render it however it wants. security_invoker makes the underlying RLS apply.
create or replace view public.published_posts
with (security_invoker = true)
as
select
  p.id,
  p.slug,
  p.title,
  p.description,
  p.body,
  p.author_id,
  author.display_name as author_name,
  ps.published_at,
  s.id as site_id,
  s.slug as site_slug,
  s.hostname as site_hostname
from public.posts p
join public.profiles author on author.id = p.author_id
join public.post_sites ps on ps.post_id = p.id
join public.sites s on s.id = ps.site_id
where s.active
  and ps.published_at is not null
  and ps.published_at <= now();

revoke all on public.published_posts from public;
grant select on public.published_posts to anon, authenticated;
