# Publishing a blog post

1. Sign in at `https://zhevion.com/dashboard` with your individual team account.
2. Select **New post**, then add the title, URL slug, summary, and article body.
3. Choose one or more destinations available to your account. Authors can
   prepare destination-specific drafts; editors and owners can also mark each
   destination as published.
4. Save the post. Publication is independent per site, so one post may be live
   on Zhevion and remain a draft on a personal site.

The article body uses a small portable format: blank lines separate paragraphs,
`##` starts a section heading, and consecutive `-` lines create a bullet list.
Each site's frontend owns its rendering and visual design.

Public sites read `published_posts` with their own site slug. Rows that are
unpublished, scheduled for the future, assigned to another site, or attached to
an inactive site are not returned.

See `docs/supabase-publishing.md` for setup, account provisioning, permissions,
and the frontend query contract.
