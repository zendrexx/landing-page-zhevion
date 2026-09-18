import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

const SITE_URL = "https://zhevion.com";

/**
 * Every public route. The legal documents are listed because app stores and
 * privacy reviewers link straight to them, so they need to be discoverable
 * rather than reachable only through the footer.
 */
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.8 },
  { path: "/work/guanzon", priority: 0.7 },
  { path: "/work/zebite", priority: 0.7 },
  { path: "/work/repforge", priority: 0.7 },
  { path: "/legal", priority: 0.3 },
  { path: "/legal/website", priority: 0.3 },
  { path: "/legal/website/terms", priority: 0.3 },
  { path: "/legal/zebite/privacy", priority: 0.3 },
  { path: "/legal/zebite/terms", priority: 0.3 },
  { path: "/legal/zebite/delete-data", priority: 0.3 },
  { path: "/legal/repforge/privacy", priority: 0.3 },
  { path: "/legal/repforge/terms", priority: 0.3 },
] as const;

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
  const posts = await getPublishedPosts();
  return [
    ...staticRoutes,
    { url: `${SITE_URL}/blog`, lastModified, priority: 0.6 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      priority: 0.5,
    })),
  ];
}
