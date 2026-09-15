# Zhevion content service

The shared publishing service for Zhevion and the three connected member sites.
It owns post metadata, destinations, and revisions; each Next.js site owns its
own presentation layer. The first release uses cover-image URLs, so no object
storage or media-upload service is required.

## Provisioning

Create the D1 database in the shared Cloudflare account, then replace
`REPLACE_WITH_D1_DATABASE_ID` in `wrangler.jsonc` with the generated D1
database ID. Do not deploy this Worker publicly: `workers_dev` is disabled
because site applications should call it through Cloudflare service bindings.

Apply the schema after provisioning:

```bash
npm run db:migrate
```

## Read contract

Connected sites use a service binding to request published content only:

```text
GET /v1/sites/:siteSlug/posts
GET /v1/sites/:siteSlug/posts/:slug
```

All mutation endpoints intentionally return `405` for now. They are added only
alongside Cloudflare Access-protected dashboard authentication, role checks,
audit logging, and CSRF protection.
