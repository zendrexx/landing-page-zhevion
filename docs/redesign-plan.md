# Zhevion main site redesign plan

## Source audit

- Keep the existing Next.js 15 App Router, TypeScript, Tailwind, Motion, Lenis, routing, legal pages, analytics hooks, and Web3Forms contact flow.
- Preserve the established brand system: warm paper (`#F2F1EC`), forest ink (`#0D2E21`), graphite interludes, lime and violet product accents, Plus Jakarta Sans, pill controls, 20px cards, hairline borders, and restrained texture.
- Reuse the Zhevion mark, real Zebite and RepForge captures, device-frame components, reveal motion, and the real portraits in `public/us`.
- Treat repository content as proof: Zebite, RepForge, Zendrex's portfolio, and the existing contact/social links. Do not add unverified results, testimonials, clients, awards, or metrics.

## Reference patterns to reuse

- Responsive 12/8/4-column thinking with one shared content edge and 16–24px gutters.
- Large Swiss/editorial headlines paired with concise body copy and small uppercase labels.
- Product UI presented at generous scale inside rounded, quiet image wells; asymmetric multi-device arrangements on wide screens and deliberate single-column crops on mobile.
- Bento groupings for related information, with sparse accent color and substantial whitespace between narrative beats.
- Minimal surface effects: soft glass only for navigation/overlays, low-contrast borders, and short fade/slide reveals rather than continuous motion.

## Implementation direction

1. Restore the full homepage with a sticky studio navigation and a product-led hero using real app screens.
2. Build reusable project, service, process, team, and CTA/form components while retaining the current shared primitives.
3. Structure the page as: Hero → Selected Work → Services → Workflow Problems/Value → Process → Team → About → Project Inquiry → Footer.
4. Expand the existing contact form to collect company, project type, and problem description while keeping the real Web3Forms submission and email fallback.
5. Show Zendrex and Jheanlyn with the existing real portraits. Show Aldrin with an explicit typographic fallback because no photo or exact role exists in the repository; use the conservative role label “Studio team.”
6. Tune mobile layouts independently: compact navigation, single-focus hero screen, stacked project narratives, horizontally readable process steps, three team cards, and full-width form controls.
7. Validate production build, keyboard/focus behavior, reduced-motion behavior, image sizing, overflow, and desktop/tablet/mobile renders before delivery.
