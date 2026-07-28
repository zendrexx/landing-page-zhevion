# Zhevion — studio landing page

The marketing site for **Zhevion**, a small studio that ships two focused,
AI-powered apps: **Zebite** (grocery, green world) and **RepForge** (lifting,
violet world). One studio, one mission: *eat smarter, train stronger.*

The studio and both apps share a mascot, **Zeb** (a zebra). Zeb art is cut from
the contact sheets in `public/mascot/{zebite,repforge}/` into individual
transparent poses under `public/mascot/zeb/`, and drives the favicon, nav mark,
OG image, and the "What is Zhevion" bento grid.

## Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS** — chosen over static
  HTML for componentized sections and typed content.
- No backend. Pre-launch: store badges are placeholders and the primary
  conversion is an email waitlist.
- Fully static output — no edge/serverless functions required to host it.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Design system

Tokens live in two mirrored places: `tailwind.config.ts` (utilities) and
`app/globals.css` (CSS variables). Studio base is neutral graphite; each app
section shifts to its own accent "world":

| World   | Accent | Where |
|---------|--------|-------|
| Studio  | graphite `#0E0F10`, cream `#F5F5F3` | chrome, nav, hero |
| Grocery | forest `#0D2E21→#1B5C41` + lime `#B5E34D` | `ShowcaseGrocery` |
| Forge   | electric violet `#7C5CFF` / `#5B34E0` | `ShowcaseForge` |

Type: **Plus Jakarta Sans** via `next/font`. Motion: `<Reveal>` scroll reveals
(IntersectionObserver, gated on `html.js` so no-JS users still see everything)
and gentle hero float — all disabled under `prefers-reduced-motion`.

## Content & honesty

All copy and features live in **`lib/content.ts`** (single source of truth).
Every feature listed there is a real, shipping capability of the named app —
no invented features, metrics, ratings, downloads, or named testimonials. Both
app galleries are real captures, and the `Us` section uses a real photo.

## Assets

Both galleries are real device captures; there are no placeholder screens.

- **Zebite** — `public/screens/grocery/{light,dark}/` at 840×1801 WebP, built by
  `python scripts/export-screens.py` from the 2580×5592 masters in
  `assets/screens/grocery-v4/`. The masters are Android captures, so the export
  crops their status bar and gesture bar off (the frame draws iPhone chrome
  instead) and extends the first/last remaining row into a band for the island
  and home indicator to sit over. Only the WebP ships — the 44 MB of masters
  stays out of `public/`. Add a screen to `SCREENS` in the script and re-run.
  (Paths keep the internal `grocery` key.)
- **RepForge** — `public/screens/forge/` at 720×1560, downscaled from the workout
  app's `client/marketing/screenshots/` (1440×3120). No band baked in.
- **`DeviceFrame`** takes each capture's intrinsic `imgWidth`/`imgHeight` and
  derives the frame height from them, so the two aspect ratios both fit without
  cropping, and draws the Dynamic Island and home indicator itself at a fixed
  fraction of the frame width. `bandIncluded` says whether the capture brought
  its own band (Zebite) or the frame must reserve a status strip above it
  (RepForge); `chrome` fills that strip and the screen behind the image with the
  capture's top-edge colour — update it if a capture's header colour changes.
- **Us photos** — one square portrait per person, listed in `US.people`
  (`lib/content.ts`). `public/us/zen.jpg` is real; `public/us/partner.jpg` is a
  neutral stand-in and renders a visible "Photo coming" chip. Drop in the real
  photo, then flip that entry's `placeholder` to `false` to hide the chip.
- **OG / favicon** — `public/og.png` (1200×630) and `app/icon.png` are static
  images. Regenerate with headless Chrome from the templates in this repo's
  history if the brand changes.

## Contact & forms

Both forms POST to **Web3Forms** — the same service and inbox the portfolio
uses, so there's no backend to run. Copy `.env.example` to `.env.local` and set
`NEXT_PUBLIC_WEB3FORMS_KEY`; without it the forms show an error pointing people
at the email address instead of silently failing.

- `components/sections/Contact.tsx` — name / email / message, honeypot included.
- `components/sections/ClosingCTA.tsx` — launch-notify email signup.

Real contact details live in `CONTACT` in `lib/content.ts` (email, LinkedIn,
GitHub) and are rendered in both the contact section and the footer. The key is
a `NEXT_PUBLIC_` value, so it ships in the client bundle — that's how Web3Forms
is designed to work (it only authorises submissions to its registered inbox),
but note it is not a secret once deployed.

**Verify the form yourself before launch.** Web3Forms rejects requests it judges
to be server-side with a 403 that carries no CORS header, which surfaces in the
browser as a bare `TypeError: Failed to fetch`. Submitting once from your own
browser is the only reliable check; if it fails there too, confirm the key is
active in the Web3Forms dashboard.

## Going live (post-launch checklist)

- **Store links** — in `components/ui/StoreBadges.tsx`, replace `href="#"` with
  the real App Store / Google Play URLs (per app).
- **Legal** — done, and linked from the footer. Copy lives in **`lib/legal.ts`**
  (same honesty rule as `content.ts`: every claim was checked against the app
  repos, so update the docs in the same commit as any behaviour change).

  | Route | Use |
  |---|---|
  | `/legal` | hub |
  | `/legal/zebite/privacy` | Zebite store listing + Google/Facebook OAuth consent |
  | `/legal/zebite/terms` | Zebite store listing |
  | `/legal/repforge/privacy` | RepForge store listing |
  | `/legal/repforge/terms` | RepForge store listing |
  | `/legal/website` | this site (contact form + waitlist) |

  Still outstanding on the app side: neither app links to these yet (no
  `url_launcher`), and Zebite has no in-app account deletion — the policy
  documents the email route until it ships, but Apple requires the in-app one.
- **Analytics** — drop your snippet where marked in `app/layout.tsx` and assign
  `window.zhevionAnalytics`; CTA clicks already call `trackCTA()`
  (`lib/analytics.ts`). No key is committed.
- **Domain** — update `SITE_URL` in `app/layout.tsx`.
- **Learn more** — point `GROCERY.learnMoreHref` / `FORGE.learnMoreHref` at each
  app's dedicated landing page when published. `aigroceryplanner.app` is set as
  the canonical URL on the grocery landing page but does not resolve yet.
