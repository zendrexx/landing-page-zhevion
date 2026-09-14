# Publishing a blog post

The journal is file-based. Its only source is `lib/blog.ts`, so there is no
CMS login or separate publishing tool.

1. Open `lib/blog.ts`.
2. Copy the `your-first-post` object in `BLOG_POSTS` and paste it directly
   below the original, separated by a comma.
3. Give it a short, unique, lowercase `slug` such as
   `how-we-scope-product-work`. The published URL will be
   `https://zhevion.com/blog/how-we-scope-product-work`.
4. Write the title, summary, date (`YYYY-MM-DD`), author, and sections.
   Each paragraph is one quoted string. Sections can optionally have a
   `heading` and a `bullets` list.
5. Change `published: false` to `published: true`.
6. Run `npm run build`, commit the change, and deploy as usual.

Posts marked `published: false` are invisible to visitors, search engines,
the sitemap, and their direct URL. This makes them safe drafts.
