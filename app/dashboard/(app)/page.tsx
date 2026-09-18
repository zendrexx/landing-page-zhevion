import Link from "next/link";
import { getDashboardUser } from "@/lib/dashboard-auth";
import { createClient } from "@/lib/supabase/server";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  updated_at: string;
  profiles: { display_name: string } | { display_name: string }[] | null;
  post_sites: {
    published_at: string | null;
    sites: { name: string; slug: string } | { name: string; slug: string }[] | null;
  }[];
};

function relatedOne<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await getDashboardUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, slug, updated_at, profiles!posts_author_id_fkey(display_name), post_sites(published_at, sites(name, slug))",
    )
    .order("updated_at", { ascending: false });
  const rows = (data ?? []) as unknown as PostRow[];
  const queryError = (await searchParams).error;

  return (
    <main id="main" className="dashboard-main">
      <div className="dashboard-title-row">
        <div>
          <p className="eyebrow">Shared workspace</p>
          <h1>Posts</h1>
          <p>Create once, then publish to any permitted site.</p>
        </div>
        <Link href="/dashboard/posts/new" className="dashboard-primary-button">
          New post
        </Link>
      </div>

      {queryError ? (
        <p className="dashboard-alert error">The requested post could not be opened.</p>
      ) : null}
      {error ? (
        <p className="dashboard-alert error">
          Posts could not be loaded. Confirm that the Supabase migration has been applied.
        </p>
      ) : null}

      {!error && rows.length ? (
        <div className="dashboard-post-list">
          {rows.map((post) => {
            const published = post.post_sites.filter((site) => site.published_at);
            const drafts = post.post_sites.filter((site) => !site.published_at);
            const author = relatedOne(post.profiles)?.display_name ?? "Unknown author";
            return (
              <Link href={`/dashboard/posts/${post.id}`} className="dashboard-post-row" key={post.id}>
                <div>
                  <strong>{post.title}</strong>
                  <span>/blog/{post.slug}</span>
                </div>
                <div className="dashboard-post-sites">
                  {published.map((assignment) => {
                    const site = relatedOne(assignment.sites);
                    return site ? <span className="is-live" key={`live-${site.slug}`}>{site.name}: live</span> : null;
                  })}
                  {drafts.map((assignment) => {
                    const site = relatedOne(assignment.sites);
                    return site ? <span key={`draft-${site.slug}`}>{site.name}: draft</span> : null;
                  })}
                  {!post.post_sites.length ? <span>Unassigned draft</span> : null}
                </div>
                <small>
                  {author} · Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(post.updated_at))}
                </small>
                <b aria-hidden>→</b>
              </Link>
            );
          })}
        </div>
      ) : !error ? (
        <div className="dashboard-empty">
          <h2>No posts yet.</h2>
          <p>Create the first draft for Zhevion or another permitted site.</p>
        </div>
      ) : null}
    </main>
  );
}
