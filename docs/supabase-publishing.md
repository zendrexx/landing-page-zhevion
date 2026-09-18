# Supabase publishing setup

The publishing dashboard at `/dashboard` uses Supabase Auth and Postgres. The
site may still be deployed as a Cloudflare Worker; Cloudflare Access and D1 are
not used by the publishing system.

## 1. Create and configure Supabase

1. Create a Supabase project.
2. Run `supabase/migrations/20260918000000_publishing.sql` in the SQL editor, or
   link the repository with the Supabase CLI and run `supabase db push`.
3. In **Authentication → Providers → Email**, enable email/password auth.
4. Disable public user sign-ups. The database also creates every new profile as
   inactive, so an accidentally enabled sign-up still cannot access content.
5. Add the project values to local and deployment environments:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   ```

The publishable key is designed for client/public use and is constrained by
RLS. Do not add a secret key, legacy `service_role` key, database password, or
JWT signing secret to any `NEXT_PUBLIC_` variable. This application does not
need a service-role key.

## 2. Create the three individual accounts

Create each team member in **Authentication → Users → Add user** with their own
email and password. Then activate the generated profiles and assign one role to
each account in the SQL editor:

```sql
update public.profiles p
set display_name = 'Owner name', role = 'owner', is_active = true
from auth.users u
where p.id = u.id and u.email = 'owner@example.com';

update public.profiles p
set display_name = 'Editor name', role = 'editor', is_active = true
from auth.users u
where p.id = u.id and u.email = 'editor@example.com';

update public.profiles p
set display_name = 'Author name', role = 'author', is_active = true
from auth.users u
where p.id = u.id and u.email = 'author@example.com';
```

The migration seeds the `zhevion` site. Owners can access every site. Give an
editor or author access to specific sites with:

```sql
insert into public.site_members (site_id, user_id)
select s.id, u.id
from public.sites s
cross join auth.users u
where s.slug = 'zhevion' and u.email = 'editor@example.com'
on conflict do nothing;
```

Repeat for each permitted user/site pair. To add a personal site:

```sql
insert into public.sites (name, slug, hostname)
values ('Personal site', 'personal-site', 'example.com');
```

## 3. Role behavior

| Role | Content permissions |
|---|---|
| `owner` | Manage all posts, sites, memberships, and publication states. |
| `editor` | Edit and publish posts whose destinations are all permitted to the editor. |
| `author` | Create and edit personal, unpublished drafts and assign permitted destinations; cannot publish. |

RLS and grants enforce these rules for every API request. Dashboard controls are
only a convenience and are not the security boundary.

## 4. Frontend query contract

Each independently designed frontend queries the `published_posts` view with
its own site slug and the Supabase publishable key:

```ts
const { data, error } = await supabase
  .from("published_posts")
  .select("slug, title, description, body, author_name, published_at")
  .eq("site_slug", "zhevion")
  .order("published_at", { ascending: false });
```

Always include the `site_slug` filter. The view returns only active sites and
publication times that have arrived. RLS on the underlying tables remains in
effect because the view uses `security_invoker`.

## 5. Deployment checks

- Add the two public Supabase variables to the Cloudflare Worker environment.
- Never add a service-role key to frontend code or the Worker unless a future
  server-only administrative job explicitly requires it.
- Visit `/dashboard`, sign in as each account, and verify role/site boundaries.
- Publish a test post only to `zhevion`; confirm it appears at `/blog` and that a
  query for another site slug does not return it.
