type PublishedPostRow = {
  slug: string;
  title: string;
  description: string;
  bodyMarkdown: string;
  publishedAt: string;
  canonicalDomain: string;
  canonicalSlug: string;
  authorName: string;
};

const json = (value: unknown, init: ResponseInit = {}) =>
  Response.json(value, {
    ...init,
    headers: { "cache-control": "no-store", ...init.headers },
  });

function notFound() {
  return json({ error: "Not found" }, { status: 404 });
}

function methodNotAllowed() {
  return json({ error: "This endpoint is read-only until dashboard authentication is configured." }, { status: 405 });
}

async function listPublishedPosts(env: ContentEnv, siteSlug: string) {
  return env.DB.prepare(
    `SELECT
       p.slug,
       p.title,
       p.description,
       p.body_markdown AS bodyMarkdown,
       d.published_at AS publishedAt,
       canonical_site.domain AS canonicalDomain,
       p.slug AS canonicalSlug,
       GROUP_CONCAT(author.display_name, ', ') AS authorName
     FROM post_destinations d
     JOIN sites destination_site ON destination_site.id = d.site_id
     JOIN posts p ON p.id = d.post_id
     LEFT JOIN sites canonical_site ON canonical_site.id = p.canonical_site_id
     JOIN post_authors pa ON pa.post_id = p.id
     JOIN users author ON author.id = pa.user_id
     WHERE destination_site.slug = ?
       AND destination_site.is_active = 1
       AND d.status = 'published'
       AND d.published_at <= CURRENT_TIMESTAMP
     GROUP BY p.id, d.site_id
     ORDER BY d.published_at DESC`,
  )
    .bind(siteSlug)
    .all<PublishedPostRow>();
}

async function getPublishedPost(env: ContentEnv, siteSlug: string, slug: string) {
  const result = await env.DB.prepare(
    `SELECT
       p.slug,
       p.title,
       p.description,
       p.body_markdown AS bodyMarkdown,
       d.published_at AS publishedAt,
       canonical_site.domain AS canonicalDomain,
       p.slug AS canonicalSlug,
       GROUP_CONCAT(author.display_name, ', ') AS authorName
     FROM post_destinations d
     JOIN sites destination_site ON destination_site.id = d.site_id
     JOIN posts p ON p.id = d.post_id
     LEFT JOIN sites canonical_site ON canonical_site.id = p.canonical_site_id
     JOIN post_authors pa ON pa.post_id = p.id
     JOIN users author ON author.id = pa.user_id
     WHERE destination_site.slug = ?
       AND destination_site.is_active = 1
       AND p.slug = ?
       AND d.status = 'published'
       AND d.published_at <= CURRENT_TIMESTAMP
     GROUP BY p.id, d.site_id`,
  )
    .bind(siteSlug, slug)
    .first<PublishedPostRow>();

  return result;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);

    if (request.method !== "GET") return methodNotAllowed();
    if (segments.length === 1 && segments[0] === "health") {
      return json({ ok: true, service: "zhevion-content" });
    }

    if (segments[0] !== "v1" || segments[1] !== "sites" || !segments[2] || segments[3] !== "posts") {
      return notFound();
    }

    const siteSlug = segments[2];
    if (segments.length === 4) {
      const posts = await listPublishedPosts(env, siteSlug);
      return json({ posts: posts.results });
    }

    if (segments.length === 5) {
      const post = await getPublishedPost(env, siteSlug, segments[4]);
      return post ? json({ post }) : notFound();
    }

    return notFound();
  },
} satisfies ExportedHandler<ContentEnv>;
