# Dashboard access setup

The dashboard at `/dashboard/*` is protected by Cloudflare Access. The app
cryptographically validates the `Cf-Access-Jwt-Assertion` token, so merely
forging a request header cannot grant access.

## Cloudflare Zero Trust configuration

1. Add **Google** as an identity provider in Zero Trust.
2. Create a self-hosted Access application for `https://zhevion.com/dashboard/*`.
3. Create an **Allow** policy containing only the three team-member email
   addresses. Do not use an "Everyone" or unrestricted login-method rule.
4. Copy the Access application's Audience (AUD) tag and your Zero Trust team
   domain (the subdomain before `.cloudflareaccess.com`).
5. Add those values as Worker secrets on the Zhevion deployment:

   ```bash
   npx wrangler secret put CF_ACCESS_TEAM_DOMAIN
   npx wrangler secret put CF_ACCESS_DASHBOARD_AUD
   ```

The Access application is the first enforcement layer. The server-side JWT
check is a second layer, validating signature, issuer, audience, and expiry.
