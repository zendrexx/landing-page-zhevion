import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  body: string;
  sections: BlogSection[];
};

type PublishedPostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  author_name: string;
  published_at: string;
};

export const ZHEVION_SITE_SLUG = "zhevion";

/**
 * Lightweight authoring syntax: blank lines separate blocks, `##` starts a
 * section, and consecutive `-` lines form a list. Content stays portable so
 * every site can render the same post with its own components and CSS.
 */
export function parsePostBody(body: string): BlogSection[] {
  const sections: BlogSection[] = [];
  let current: BlogSection = { paragraphs: [] };

  const pushCurrent = () => {
    if (current.heading || current.paragraphs.length || current.bullets?.length) {
      sections.push(current);
    }
    current = { paragraphs: [] };
  };

  for (const block of body.trim().split(/\n\s*\n/)) {
    const value = block.trim();
    if (!value) continue;

    if (value.startsWith("## ")) {
      pushCurrent();
      current.heading = value.slice(3).trim();
      continue;
    }

    const lines = value.split("\n").map((line) => line.trim());
    if (lines.every((line) => line.startsWith("- "))) {
      current.bullets = [
        ...(current.bullets ?? []),
        ...lines.map((line) => line.slice(2).trim()).filter(Boolean),
      ];
      continue;
    }

    current.paragraphs.push(lines.join(" "));
  }

  pushCurrent();
  return sections;
}

function toBlogPost(row: PublishedPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    body: row.body,
    author: row.author_name,
    date: row.published_at,
    sections: parsePostBody(row.body),
  };
}

export async function getPublishedPosts(siteSlug = ZHEVION_SITE_SLUG) {
  if (!isSupabaseConfigured()) return [];

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("published_posts")
    .select("id, slug, title, description, body, author_name, published_at")
    .eq("site_slug", siteSlug)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Unable to load published posts", error.code);
    return [];
  }

  return (data as PublishedPostRow[]).map(toBlogPost);
}

export async function getPublishedPost(
  slug: string,
  siteSlug = ZHEVION_SITE_SLUG,
) {
  if (!isSupabaseConfigured()) return undefined;

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("published_posts")
    .select("id, slug, title, description, body, author_name, published_at")
    .eq("site_slug", siteSlug)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error("Unable to load published post", error.code);
    return undefined;
  }

  return toBlogPost(data as PublishedPostRow);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
