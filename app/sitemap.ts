import type { MetadataRoute } from "next";

const SITE_URL = "https://zhevion.com";

/**
 * Every public route. The legal documents are listed because app stores and
 * privacy reviewers link straight to them, so they need to be discoverable
 * rather than reachable only through the footer.
 */
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/work", priority: 0.8 },
  { path: "/legal", priority: 0.3 },
  { path: "/legal/website", priority: 0.3 },
  { path: "/legal/zebite/privacy", priority: 0.3 },
  { path: "/legal/zebite/terms", priority: 0.3 },
  { path: "/legal/zebite/delete-data", priority: 0.3 },
  { path: "/legal/repforge/privacy", priority: 0.3 },
  { path: "/legal/repforge/terms", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
}
