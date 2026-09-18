import Link from "next/link";
import type { TeamRole } from "@/lib/dashboard-auth";
import { savePost } from "@/app/dashboard/actions";

export type DashboardSite = {
  id: string;
  name: string;
  slug: string;
  hostname: string;
};

export type EditablePost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  author_id: string;
  post_sites: { site_id: string; published_at: string | null }[];
};

const ERROR_MESSAGES: Record<string, string> = {
  "invalid-title": "Add a title no longer than 160 characters.",
  "invalid-slug": "Use a lowercase URL slug with letters, numbers, and hyphens only.",
  "invalid-description": "Add a summary no longer than 320 characters.",
  "empty-body": "The article body cannot be empty.",
  "invalid-sites": "One or more selected destinations are invalid.",
  "publish-not-permitted": "Authors can prepare drafts, but an editor or owner must publish them.",
  "save-failed": "The post could not be saved. Check the slug and your site permissions.",
};

export function PostForm({
  post,
  sites,
  role,
  currentUserId,
  error,
  saved,
}: {
  post?: EditablePost;
  sites: DashboardSite[];
  role: TeamRole;
  currentUserId: string;
  error?: string;
  saved?: boolean;
}) {
  const assignments = new Map(
    (post?.post_sites ?? []).map((item) => [item.site_id, item.published_at]),
  );
  const hasPublishedAssignment = [...assignments.values()].some(Boolean);
  const canPublish = role === "owner" || role === "editor";
  const canEdit =
    !post || role !== "author" || (post.author_id === currentUserId && !hasPublishedAssignment);

  return (
    <main id="main" className="dashboard-main dashboard-editor">
      <div className="dashboard-title-row">
        <div>
          <Link href="/dashboard" className="dashboard-back">
            ← All posts
          </Link>
          <h1>{post ? "Edit post" : "New post"}</h1>
        </div>
        <span className="dashboard-role-chip">{role}</span>
      </div>

      {saved ? <p className="dashboard-alert success">Changes saved.</p> : null}
      {error ? (
        <p className="dashboard-alert error">
          {ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."}
        </p>
      ) : null}
      {!canEdit ? (
        <p className="dashboard-alert error">
          Published posts can only be changed by an editor or owner.
        </p>
      ) : null}

      <form action={savePost} className="dashboard-form">
        <input type="hidden" name="post_id" value={post?.id ?? ""} />
        <fieldset disabled={!canEdit}>
          <div className="dashboard-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              required
              maxLength={160}
              defaultValue={post?.title}
              placeholder="A clear, useful title"
            />
          </div>
          <div className="dashboard-field">
            <label htmlFor="slug">URL slug</label>
            <div className="dashboard-slug-field">
              <span>/blog/</span>
              <input
                id="slug"
                name="slug"
                required
                maxLength={120}
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                defaultValue={post?.slug}
                placeholder="how-we-build-products"
              />
            </div>
          </div>
          <div className="dashboard-field">
            <label htmlFor="description">Summary</label>
            <textarea
              id="description"
              name="description"
              required
              maxLength={320}
              rows={3}
              defaultValue={post?.description}
              placeholder="A short description for article lists and search results."
            />
          </div>
          <div className="dashboard-field">
            <label htmlFor="body">Article body</label>
            <textarea
              id="body"
              name="body"
              required
              rows={18}
              defaultValue={post?.body}
              placeholder={"Opening paragraph.\n\n## Section heading\n\nAnother paragraph.\n\n- Supporting point\n- Another point"}
            />
            <small>
              Separate paragraphs with blank lines. Use <code>##</code> for headings and <code>-</code> for bullet lists.
            </small>
          </div>

          <section className="dashboard-destinations" aria-labelledby="destinations-heading">
            <div>
              <h2 id="destinations-heading">Destinations</h2>
              <p>Select every site that may receive this post.</p>
            </div>
            {sites.length ? (
              <div className="dashboard-site-list">
                {sites.map((site) => {
                  const assigned = assignments.has(site.id);
                  const publishedAt = assignments.get(site.id);
                  return (
                    <div className="dashboard-site-row" key={site.id}>
                      <label>
                        <input
                          type="checkbox"
                          name="site_id"
                          value={site.id}
                          defaultChecked={assigned}
                        />
                        <span>
                          <strong>{site.name}</strong>
                          <small>{site.hostname}</small>
                        </span>
                      </label>
                      <label className={!canPublish ? "is-disabled" : ""}>
                        <input
                          type="checkbox"
                          name="published_site_id"
                          value={site.id}
                          defaultChecked={Boolean(publishedAt)}
                          disabled={!canPublish}
                        />
                        <span>{publishedAt ? "Published" : "Publish"}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="dashboard-empty-inline">No sites have been assigned to this account.</p>
            )}
            {!canPublish ? (
              <p className="dashboard-permission-note">
                Authors can choose permitted destinations; an editor or owner publishes the post.
              </p>
            ) : null}
          </section>

          <div className="dashboard-form-actions">
            <button type="submit" className="dashboard-primary-button">
              Save changes
            </button>
            <Link href="/dashboard" className="dashboard-secondary-button">
              Cancel
            </Link>
          </div>
        </fieldset>
      </form>

    </main>
  );
}
