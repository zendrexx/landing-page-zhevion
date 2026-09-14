export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  published: boolean;
  sections: BlogSection[];
};

/**
 * The site's editorial source. To publish, copy the starter entry, give it a
 * unique slug, write the article, and change `published` to true.
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "your-first-post",
    title: "Your post title goes here",
    description: "A one- or two-sentence summary displayed on the journal page and in search results.",
    date: "2026-09-14",
    author: "Zhevion",
    published: false,
    sections: [
      {
        paragraphs: [
          "Start with a concise opening that explains the problem, observation, or idea behind this note.",
          "Keep paragraphs as separate strings. Add as many sections as the article needs.",
        ],
      },
      {
        heading: "A useful section heading",
        paragraphs: ["Use sections to give longer posts a clear, readable structure."],
        bullets: ["Optional supporting point", "Another useful takeaway"],
      },
    ],
  },
];

export function getPublishedPosts() {
  return BLOG_POSTS.filter((post) => post.published).sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );
}

export function getPublishedPost(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
