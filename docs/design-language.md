# Zhevion Design System — Visual Language Bible

Reverse-engineered from the live Zhevion site (`app/`, `components/`, `tailwind.config.ts`, `globals.css`). This is the studio's reusable design DNA — extract the *feel*, not the layout, when applying it to a new site.

---

## 1. Design Style

**Nearest named styles:** Swiss/International Typographic editorial design, crossed with contemporary "product-studio" web craft (the Linear / Vercel / Stripe school) and a hand-drawn wobble borrowed from indie-studio branding. Think *editorial minimalism with a pulse* — a design magazine's grid discipline, not a SaaS template.

- **Overall aesthetic:** Warm, paper-toned editorial canvas punctuated by short, deliberate dark "passages." Big confident type, generous negative space, almost no color — until one saturated accent shows up and it means something.
- **Personality:** Quiet confidence. It never shouts (no gradients, no glow, no stock-photo hero) but it moves with obvious craft — every transition is tuned, every measurement is derived, not guessed.
- **Visual mood:** A well-lit design studio — paper, ink, one green pencil mark. Calm, tactile, slightly analog despite being built entirely in code.
- **Design philosophy:** Content and typography *are* the design. Decoration is structural (rules, grids, hairlines) rather than atmospheric (blurred blobs, glassy gradients). Motion is choreography, not decoration — it always has a reason (reveals meaning, tracks scroll, confirms state).
- **What makes it recognizable:**
  - A warm off-white paper ground (`#F2F1EC`) instead of pure white or the generic "dark SaaS" black.
  - Deep forest-green ink (`#0D2E21`) as the primary text/brand color instead of black.
  - Exactly one saturated accent per "world" (lime `#B5E34D` for the flagship), used as a spark, never as a fill.
  - Short **dark graphite interludes** embedded inside an otherwise light page — the page breathes light → dark → light like sections of a printed piece.
  - Extra-bold, extremely tight-tracked display type (`tracking: -0.055em`) sized by *measuring the font's own advance width*, not by eyeballing a clamp.
  - A custom cursor that behaves like a slightly imperfect hand-drawn blob, not a laser-precise dot.
- **What makes it feel premium:** Restraint + precision. Nothing is loud; everything is exact. Micro-details (a hairline that fades top/bottom, a rule that springs to a word's measured width, a card tilt that alternates by index) are the kind of detail only a careful hand adds, and their absence is what makes template sites feel cheap.
- **What must NEVER change (identity-critical):**
  1. Warm paper ground + forest-ink text as the light-mode base (never pure white/black).
  2. Exactly one saturated accent color per section/world — never a rainbow palette.
  3. Extra-bold display type with tight/negative tracking for headlines.
  4. Motion that is scroll-driven and physically eased (spring/cubic-bezier), never linear or bouncy-cartoonish.
  5. The light↔dark sectional rhythm — dark isn't the "footer," it's a recurring beat.
  6. Generous whitespace — the design must always feel like it has room to breathe, never packed.
  7. Full `prefers-reduced-motion` and no-JS graceful degradation on every animated pattern.

---

## 2. Visual DNA

- **Color philosophy:** Near-monochrome with a single accent held in reserve. Color is *signal*, not *decoration* — it marks the one interactive/alive element (a progress rule, a link, a highlight), never a whole surface. Dark and light are both "neutral" grounds; the accent is the only saturated note in the entire system.
- **Contrast:** High but never harsh. Ink-on-paper contrast is strong for legibility, but secondary text steps down through named opacity tiers (`ink-soft`, `ink-faint`) rather than jumping straight to gray — contrast is a gradient, not a binary.
- **Whitespace:** Treated as a structural material, not leftover space. Sections use `clamp()`-based vertical rhythm (e.g. `py-[clamp(72px,14vh,160px)]`) so spacing scales fluidly with viewport instead of snapping between fixed breakpoints. Whitespace is what makes single-accent color read as intentional instead of unfinished.
- **Typography character:** One typeface family (Plus Jakarta Sans, variable weight) doing everything — display, body, UI. Hierarchy comes from weight + size + tracking, not from mixing fonts. Display sizes are extra-bold and tight; body copy is medium-weight and comfortably loose.
- **Shapes / Geometry:** Rectilinear grid with two rounded exceptions: fully-pilled controls (`999px` radius — nav, buttons, tags) and softly-rounded cards (`20px` — the `rounded-card` token). No arbitrary radii in between; a shape is either sharp, a pill, or a card.
- **Borders:** Hairline only (`1px`, low-opacity ink or white). Borders separate, they never decorate — no thick strokes, no colored borders except the one accent underline.
- **Radius:** Two tokens only — `pill` (999px, for anything you'd tap or scan quickly: nav, buttons, badges) and `card` (20px, for content containers). Consistency here is what makes disparate components feel like one family.
- **Shadows / Depth:** Shadows are soft, diffuse, and rare — a nav pill gets a barely-there dual shadow (`0_1px_2px` + a big soft `-16px` spread) for float, not a hard drop shadow. Depth is mostly implied by z-layering and the dark/light contrast between panels, not by box-shadow stacking.
- **Texture:** A near-invisible grain/noise overlay (`.paper-grain`, `.grain`) on hero/dark surfaces — SVG turbulence at very low opacity, blended with `multiply`/`overlay`. It's felt more than seen; it's what keeps flat color from looking like a vector file.
- **Grid:** A single centered content column (`max-width: 1200px`, fluid inline padding via `clamp(20px, 5vw, 48px)`) — the `.shell` pattern. Everything aligns to this one column; there is no separate 12-column CSS grid system running underneath.
- **Composition:** Asymmetric but anchored. Elements are pinned to the shared column's edges (`justify-between` letters, edge-flush wordmark) rather than centered-and-floating — the composition reads as *drafted*, like a layout grid you can see the bones of.
- **Visual hierarchy:** Established almost entirely through scale + weight + an "eyebrow" label pattern (tiny, uppercase, wide-tracked, low-opacity) that precedes every heading. The eyebrow is the system's signature hierarchy device — it appears before every section title, at 12px, 700 weight, 0.18em tracking, uppercase.

---

## 3. Color System

### Tokens (light / studio canvas — the primary surface)

| Token | Hex / Value | Role |
|---|---|---|
| `paper` | `#F2F1EC` | Primary background (warm off-white, never pure white) |
| `paper-deep` | `#E8E7E0` | Secondary surface / card fill on light ground |
| `ink` | `#0D2E21` | Primary text + brand ink (deep forest green, reads as "black") |
| `ink-soft` | `#4A554E` | Secondary text |
| `ink-faint` | `rgba(13,46,33,0.42)` | Tertiary text, eyebrows, meta labels |
| `rule` / `ink/10–12%` | `rgba(13,46,33,0.12)` | Hairline borders on light surfaces |

### Tokens (dark — the graphite interludes)

| Token | Hex / Value | Role |
|---|---|---|
| `graphite-900` | `#0E0F10` | Darkest ground (dark panels, legal pages) |
| `graphite-800` | `#16181A` | Elevated surface on dark (cards) |
| `graphite-700` | `#1E2124` | Further-elevated dark surface (device frames) |
| `cream` | `#F5F5F3` | Primary text on dark |
| `muted` | `#9A9A97` | Secondary text on dark |
| `hairline` | `rgba(245,245,243,0.10)` | Border on dark surfaces |

### Accent "worlds" — one saturated accent per product/section, swapped via a scope class

| World | Accent | Ink-on-accent | Tint (7–9%) | Line (32–36%) |
|---|---|---|---|---|
| Flagship / grocery | `lime` `#B5E34D` | `lime-ink` `#16290B` | `rgba(181,227,77,0.07)` | `rgba(181,227,77,0.32)` |
| Secondary product | `volt` `#7C5CFF` (deep `#5B34E0`, soft `#A88BFF`) | `#FFFFFF` | `rgba(124,92,255,0.09)` | `rgba(124,92,255,0.36)` |
| Studio-neutral | `cream` | `graphite-900` | `rgba(245,245,243,0.05)` | `rgba(245,245,243,0.22)` |

### How to use color (the actual rule, not just the palette)

1. **Base is never colorful.** 95%+ of every screen is paper/ink or graphite/cream. Color enters through exactly one accent per page or per product world — pick it once, don't mix accents on one screen.
2. **The accent is a spark, not a fill.** Use it for: a progress rule, an underline, a small dot/bullet, a label color, a button's *border or ghost fill* — almost never a large solid background. If you must fill with it, keep opacity ≤10% (the pre-mixed "tint" tokens exist for exactly this).
3. **Text opacity is a 3-step ladder**, not arbitrary grays: full ink (primary), ~65–72% (soft/secondary), ~40–45% (faint/eyebrow/meta). Reuse these three steps everywhere instead of inventing new grays.
4. **Dark and light are both "home."** Don't treat dark as an inverted/error state — it's a deliberate compositional beat. When a section goes dark, swap the *entire* token set (ink↔cream, paper↔graphite) rather than just inverting one color.
5. **New product = new accent, same structure.** To add a third "world," pick one saturated hue, derive a `-tint` (7–9% alpha) and `-line` (32–36% alpha) from it, and never touch the paper/ink/graphite/cream base tokens.
6. **`::selection`** is always the accent color on ink text — a small, deliberate branding touch most sites skip.

---

## 4. Typography System

- **Font:** A single variable sans-serif (Plus Jakarta Sans in the source; any humanist geometric sans with a true variable axis and a genuine 800 weight works as a substitute — e.g. Inter, General Sans, Aeonik). Load as a *variable* font, not fixed static cuts — the system relies on precise weight availability (400/600/800), and synthesized bold is visually wrong.
- **Heading hierarchy:** Two tiers in practice, not five:
  - **Display / H1:** `font-extrabold` (800), tight leading (`0.84–1.15`), tracking `-0.045em` to `-0.055em`, fluid `clamp()` sizing derived from the *measured* advance width of the longest string at that weight (see "Layout System" below) so it never overflows or under-fills its column.
  - **Section H2/H3:** `font-extrabold` or `font-bold`, leading `1.15–1.3`, tracking `-0.02em` to `-0.045em`, sizes in the `1.125rem–3rem` clamp range.
- **Body text:** `font-medium` (500), comfortable leading (`1.6–1.75`), no tight tracking — body text is the one place the aesthetic relaxes. Sized `0.875rem–1.375rem` depending on role.
- **Labels ("eyebrows"):** `0.75rem`, `font-bold` (700), `letter-spacing: 0.18em`, `uppercase`. This is the system's single most reused typographic pattern — every section is preceded by one.
- **Navigation:** `text-sm`, `font-semibold` (600), no tracking change, set inside pill-shaped hit targets.
- **Buttons/CTAs:** `font-semibold`, often paired with an underline (`underline-offset-4`) instead of a filled background for secondary CTAs — links read as confident, not shy.
- **Display typography (wordmark/hero):** Sized with real math, not intuition — measure the typeface's advance width for the exact string at the target weight, divide the available column width by that, and encode the result as a `vw` coefficient inside `clamp()`. This is why the hero letters land flush to the content edges at every viewport instead of drifting.
- **Font weights used:** 400 (rare), 500 (body), 600 (semibold — UI/nav/links), 700 (labels/eyebrows), 800 (display/headings). Nothing lighter than 400, nothing between — five weights, each with one job.
- **Letter spacing:** Positive tracking *only* on uppercase micro-labels (`+0.08em to +0.18em`). Negative tracking on everything large and bold (`-0.02em` to `-0.055em`, scaling more negative as size increases). Body copy: default (0).
- **Line height:** Tight (`0.84–1.3`) for display/headings, generous (`1.6–1.75`) for body and long-form prose. The gap between the two is deliberate — it's what makes headlines feel like typography and paragraphs feel like reading.
- **Text width (measure):** Long-form prose capped at `68ch`. Headline blocks capped by `ch`-based or fraction-of-column max-widths (`max-w-[18ch]`, `max-w-[38rem]`) so display type never runs the full viewport width.
- **Capitalization:** Sentence case everywhere except eyebrows/labels/table headers, which are always uppercase. Never title-case buttons or nav.
- **Relationship to aesthetic:** Typography *is* the primary visual event — there is no illustration or photography carrying the brand. The extreme weight/tracking contrast between whisper-quiet eyebrows and huge tight-tracked headlines is the main source of "premium editorial" feeling; get that contrast right and the rest of the system falls into place.

---

## 5. Layout System

- **Max content width:** `1200px` (`max-w-content` / `.shell`), centered, with fluid inline padding `clamp(20px, 5vw, 48px)` (`--page-x`). This single container is reused for every section — no per-section custom widths.
- **Grid structure:** No visible 12-column grid. Structure comes from the shared `.shell` column plus flex/CSS grid per-component (e.g., `sm:grid-cols-2 lg:grid-cols-3` for card rows). Alignment discipline, not a grid system, is what makes it look gridded.
- **Margins/Padding:** Section vertical padding is always a `clamp()` tied to viewport height (`clamp(56px,10vh,120px)` for compact sections, up to `clamp(72px,14vh,160px)` for major ones) — never a flat pixel value. Horizontal padding is always the shared `--page-x` token.
- **Spacing scale:** Fluid, not a fixed 4/8pt grid alone — most gaps are expressed as `clamp()` so rhythm scales with viewport instead of snapping at breakpoints. Where fixed, spacing sticks to a roughly 4/6/8-based scale (gap-1, gap-6, gap-8, gap-10, gap-16...).
- **Section spacing:** Sections touch directly (no visible margin between them); the *background color change* (paper → dark-panel → paper) is what separates sections visually, not whitespace gaps.
- **Alignment:** Left-aligned content blocks anchored to the shared column edge; hero elements use `justify-between` to pin first/last glyphs to the exact column edges rather than centering.
- **Column behavior:** Content columns are capped by fraction-of-container (`md:max-w-[62%]`) or `ch`-based caps, not fixed pixel widths — they stay proportional across the fluid range instead of just wrapping.
- **Card layouts:** Fixed-height or fixed-width cards inside flex/grid rows (`h-[240px] w-[340px]`), consistent `rounded-card` (20px) radius, hairline border + surface-appropriate fill (`paper-deep` on light, `graphite-800` on dark). An `eyebrow`-style index/label always sits at the top of the card.
- **Full-width vs contained:** Backgrounds (color panels, marquees) go full-bleed; content always sits inside `.shell`. A horizontally-scrolling element (marquee, deliverables strip) is the one exception allowed to bleed past the shell, and it's always edge-masked/faded rather than hard-clipped.
- **Mobile behavior:** Scroll-jacked/pinned desktop patterns (horizontal card strips, word-by-word reveals) degrade to *plain native scroll* on mobile and under reduced motion — never a crippled or janky version of the desktop effect. Detect via `matchMedia("(min-width: 768px)")`, not just CSS breakpoints, since the JS-driven pin needs a hard on/off switch.

---

## 6. Component Language

- **Navigation:** A single floating pill (not a full-width bar), centered, `backdrop-blur` + translucent paper fill, soft dual shadow. Shrinks slightly on scroll (spring-based scale, not a hard height snap). Active/hover link state is a single shared "puck" element that *slides* between items (`layoutId` shared-layout animation) rather than each link animating independently.
- **Buttons:** Two forms only — pill-shaped filled (ink background, paper text, for primary actions) and text-plus-underline (for secondary/inline CTAs, often with a trailing `→`). No ghost-bordered button as a third style; keep the vocabulary small.
- **Links:** Underlined with offset (`underline-offset-4`), or color-shift on hover — never both at once. Arrow glyphs (`→`) mark outbound/external links.
- **Cards:** `rounded-card` (20px), hairline border, flat surface fill matched to their panel (paper-deep on light, graphite-800 on dark), generous internal padding (24–28px). Content order inside a card is always: small label/index → title → supporting copy → optional CTA, top to bottom.
- **Sections:** Each is a full-bleed color panel (paper or dark-panel) with content constrained to `.shell`. A section is identified by its eyebrow label, not a visible divider line.
- **Inputs:** Not present in the current build, but should inherit the hairline-border, `rounded-card`/pill radius, ink-on-paper (or cream-on-graphite) language, with the same 2px offset focus ring used everywhere else.
- **Tags/Badges:** Small pill shapes, low-opacity accent-tint fill, accent-colored text, uppercase micro-label sizing.
- **Images:** Always presented inside a purpose-built frame (the iPhone `DeviceFrame`), never bare/floating screenshots — dimensions are derived from the source image's real aspect ratio so nothing crops or letterboxes. Product shots get a soft, large-radius drop shadow (`0_30px_70px_-30px`) to imply physical weight.
- **Icons:** Minimal, single-color line icons (stroke, not fill), used sparingly (menu toggle, arrows). No icon set carries brand personality — the mascot mark does that instead.
- **Menus:** Mobile nav is a small dropdown card (not a full-screen takeover), same pill/card radius language, spring-scaled open/close from its anchor point.
- **CTAs:** Understated by default (text + underline + arrow); a filled pill button is reserved for the one primary action per page. Never more than one filled/high-emphasis CTA visible at a time.
- **Footers:** (Legacy dark pattern, still valid) — dense but organized, dark ground, cream text, same hairline-rule + eyebrow-label conventions as the rest of the system; no separate visual language for the footer.

**What makes them belong to one family:** the same two radii (pill/card), the same hairline-border weight, the same eyebrow-before-heading pattern, the same three-step text-opacity ladder, and the same "color only for the one accented detail" rule — applied without exception across every component.

---

## 7. Interaction & Hover Language

- **Cursor behavior:** A custom cursor replaces the system pointer *only* on fine-pointer, non-reduced-motion devices (never on touch, never overriding OS accessibility settings). It's a single morphing shape with an intentionally "hand-drawn" wobble (irregular border-radius, slow rotate/scale jitter) — imprecise and organic, not a laser-precision dot. It has exactly three states: default (small dot), hovering an interactive element (larger soft ring), hovering a "visual" element like an image (large accent-tinted circle, optionally with a text label). It re-colors automatically when crossing from a light to a dark surface.
- **Hover behavior (general):** Subtle and physical — color/opacity shifts, a shared "puck" that slides rather than pops, small `y`/scale springs. Nothing snaps instantly except color-swap transitions (~200ms).
- **Click / active feedback:** Minimal explicit "pressed" styling; feedback is mostly carried by the cursor state change and the target's own hover motion. Keep it understated — no bounce-on-click.
- **Link interactions:** Underline offset, color shift, or the nav "puck" slide — pick one per component, don't stack multiple hover effects on the same element.
- **Image interactions:** Product shots have no hover zoom/tilt by default; interaction lives in the cursor (switches to the large "visual" state) rather than the image itself moving.
- **Navigation interactions:** Compacts (spring scale-down) once the page scrolls past a small threshold; the active-link puck is shared-layout-animated between items.
- **Scroll interactions:** This is the system's signature move. Multiple sections *pin* (become `sticky` inside a taller reserved-height wrapper) and use scroll progress to drive: opacity/blur reveals word-by-word, horizontal translation of a card row, or a settle-and-round-corners transform on the hero as it "shrinks" into the section below. Scrolling itself is inertial (Lenis smooth-scroll), not native.
- **Focus states:** A visible 2px outline, offset 3px, color-matched to the current surface (`--focus` swaps between ink and a light accent depending on light/dark context) — never suppressed, always present for keyboard users regardless of the custom cursor.
- **Active states:** Not heavily differentiated from hover — the system favors continuous, springy state over discrete on/off states.
- **How it should feel overall:** Physical but restrained — like objects with slight mass (springs, not linear tweens) being nudged, not like a game UI with snappy/bouncy feedback. Every interactive layer must degrade cleanly: touch devices get the native pointer, `prefers-reduced-motion` gets instant states, no-JS gets fully visible content.

---

## 8. Motion & Animation Language

- **Philosophy:** Motion narrates scroll and hierarchy — it never plays just to look alive. Every animated pattern maps to a real signal: reveal-on-arrival, progress-through-content, or state-change feedback. If an animation doesn't communicate something, it doesn't belong.
- **Duration ranges:** Micro (hover/state changes): 150–300ms. Entrance/reveal: 400–900ms. Ambient/idle loops (float, marquee): 6–32s, always slow and barely perceptible.
- **Easing:** A consistent custom cubic-bezier for entrances/exits, roughly `[0.16, 1, 0.3, 1]` or `[0.22, 1, 0.36, 1]` — fast start, long soft settle ("ease-out-expo" family). Never use default `ease`/`linear` for anything meaningful. Lenis scroll uses its own exponential ease-out (`1 - 2^(-10t)`) tuned to feel weighty, not springy.
- **Spring behavior:** Framer/Motion springs for anything state-driven (nav scale, cursor size/position, puck slide, underline-width match): `stiffness ~260–420`, `damping ~30–38`, occasionally a `mass ~0.6–0.9` for extra heft. Cursor position itself uses a slightly under-damped spring so it trails with perceptible (not sloppy) lag.
- **Entrance animations:** Content rises up (`y: 18–40px → 0`) and fades in (`opacity: 0 → 1`), staggered by ~40–120ms per sibling (letters, words, cards). Text can also mask-reveal from below (`translateY(110%) → 0%` inside an `overflow:hidden` box) for the wordmark-letter effect.
- **Exit animations:** Rare and quick (~250–300ms) — mainly the word-cycle's upward exit and menu close. Exits use a faster/sharper ease than entrances (asymmetric in/out timing is intentional).
- **Hover animations:** Color/opacity crossfade (~200ms), shared-layout puck slide (spring), scale nudges — always short.
- **Scroll animations:** Pin-and-progress is the core pattern: reserve extra scroll height on an outer wrapper, `sticky` an inner viewport-sized panel, and drive opacity/blur/x/scale/border-radius off `scrollYProgress`. Reserve the *last ~15–20%* of a pin's scroll range as a "hold" (values stop changing) so the moment reads as deliberate, not just passively scrubbed.
- **Page transitions:** None currently (single-page sections) — if added, they should follow the same ease-out-expo, ~700–900ms fade/rise, never a hard cut.
- **Staggering:** Index-based delay (`delay: index * 0.04–0.12s`) for any repeated sibling group — letters, words, cards. Keep the per-item delta small; the goal is a ripple, not a slow roll-call.
- **Parallax:** Used sparingly and only where physically motivated (the hero hand tracks pointer position; ambient float animations on mascot/hand). Never generic background-layer parallax for decoration's sake.
- **Micro-interactions:** The cursor's constant idle jitter (slow rotate/scale wobble on its outer ring) is the system's one "always-on" ambient animation — everything else is triggered by scroll or interaction, not looping for its own sake.
- **Universal rule:** Every animated component ships a `prefers-reduced-motion` branch that swaps springs/pins for instant or simple-fade states, and every scroll-driven or pinned pattern has a plain, non-pinned fallback path for mobile/no-JS.

---

## 9. Responsive Design Philosophy

- **Not "shrink the desktop layout."** Whole interaction patterns swap wholesale at the breakpoint: a scroll-jacked horizontal pin becomes a native `overflow-x` snap-scroll row; a scroll-pinned word reveal becomes the full sentence rendered immediately, no pin. The desktop version is a *progressive enhancement* over a fully-usable simpler mobile version, not the other way around.
- **Fluid-first sizing.** Nearly every size (type, spacing, radii proportions on the device frame) is a `clamp(min, vw-based-preferred, max)` rather than a fixed value per breakpoint. This means the design has no "snap points" — it genuinely flows between mobile and desktop instead of jumping.
- **Desktop:** Full choreography — pins, parallax hand, marquees, custom cursor, multi-column card grids.
- **Tablet:** Same component set as desktop where it still makes sense (pins can survive down to `md`), single accent behavior unchanged; columns reduce (3→2) before they reduce to 1.
- **Mobile:** Motion complexity drops (no pins, no custom cursor — touch has none), layout drops to single column, and content that can't fit a shared row (e.g., hero meta label beside the hand) is simply omitted rather than squeezed. Typography stays large and confident even on mobile — this is not a design that gets timid at small sizes.
- **Detection strategy:** Use both CSS breakpoints *and* `matchMedia` JS checks together for anything that toggles a fundamentally different interaction (pin vs. plain scroll) — pure CSS can hide/show elements but can't cheaply disable a scroll-jacking JS effect.

---

## 10. Image & Graphic Direction

- **Image treatment:** Product screenshots only — no stock photography, no generic illustration, no abstract 3D renders. Every image is a real artifact of the product (an app screen, a mascot render).
- **Presentation:** Screenshots always live inside a purpose-built device frame sized from the image's *real* pixel aspect ratio — never stretched, cropped, or letterboxed. The frame's chrome color is sampled from the screenshot's own top edge so frame and content read as one continuous surface.
- **Aspect ratios / cropping:** Derived, not fixed — the frame computes its own height from `imgWidth/imgHeight` so different apps' differently-shaped captures all still look correct.
- **Illustration style:** None as a primary device — the one recurring illustrated element is the studio mascot (a simple, friendly character head), used as a small brand mark, not as page-filling art.
- **Icon style:** Minimal stroke icons, used only for pure UI function (menu toggle, arrows) — icons never carry brand personality.
- **Graphic/decorative elements:** Structural only — hairline rules, a very faint grain/noise texture, a dotted micro-grid on dark bands, an edge-fade mask on marquees. No gradients-as-decoration, no glassmorphism, no glowing orbs, no abstract blob backgrounds.
- **Negative space:** The primary "graphic element." Large passages of flat paper or graphite with nothing on them are load-bearing — they're what makes the one accent detail or the one product shot feel considered rather than sparse.
- **What would feel inconsistent:** stock photography of people, gradient mesh backgrounds, glassmorphic cards, neon glows, filled/duotone icon sets, drop-shadowed emoji, generic 3D-rendered hero objects, more than one accent hue on screen at once, or any illustration style more decorative than the mascot's simple flat mark.

---

## 11. Brand Personality

- **Editorial, not corporate** — reads like a design annual, not a sales deck.
- **Precise, not decorative** — every measurement is derived (font advance widths, real image aspect ratios); nothing is a stock template value.
- **Warm, not clinical** — paper and forest-ink instead of black/white/blue-500; grain texture instead of flat vector perfection.
- **Confident and quiet** — one accent color, restrained CTAs, no urgency-driven UI patterns (no countdown timers, no "Get started free!!" energy).
- **Playful in motion, serious in structure** — the cursor wobbles and the mascot floats, but the grid and type hierarchy never wobble.
- **Technical craft worn lightly** — scroll-jacking, shared-layout animation, and measured typography are all technically ambitious, but none of it announces itself; it just feels smooth.

---

## 12. Do / Don't Rules

**DO**
- Use a warm off-white/paper ground and a deep colored "ink" (not pure black) as the light-mode base.
- Reserve exactly one saturated accent color per site/section ("world"), used only as a small detail — never a large fill.
- Set an "eyebrow" label (tiny, bold, uppercase, wide-tracked, low-opacity) before every section heading.
- Size display type with real measured math (`clamp()` derived from actual font metrics), not an eyeballed guess.
- Use only two border-radius values sitewide: full-pill and one soft card radius (~20px).
- Keep borders to 1px hairlines at low opacity — never bold or colored borders.
- Drive entrances and scroll effects with eased springs / ease-out-expo curves, staggered by index.
- Alternate light "paper" passages with short dark "graphite" passages as a compositional rhythm.
- Build every animated/pinned pattern with a `prefers-reduced-motion` fallback and a non-JS-visible base state.
- Frame every product screenshot in a purpose-built device mockup sized from its real aspect ratio.
- Keep the whole system to one typeface family, differentiated by weight/size/tracking only.

**DON'T**
- Don't use pure white/black, blue-500-style default palettes, or more than one saturated accent on screen at once.
- Don't fill large surfaces with the accent color — it's a spark, not a background.
- Don't use soft-UI/glassmorphism, neon glow, gradient-mesh blobs, or generic 3D hero renders.
- Don't use stock photography or generic icon-pack illustration as brand imagery.
- Don't mix multiple border-radius values or multiple border weights across components.
- Don't animate with linear/default easing, or add motion that doesn't track scroll, state, or arrival.
- Don't let a scroll-jacked/pinned effect run on mobile or under reduced motion — always provide the plain fallback.
- Don't title-case or bold-everything navigation and buttons — sentence case, one weight tier per role.
- Don't add more than one high-emphasis (filled) CTA to a single view.
- Don't let the custom cursor override touch devices, reduced-motion users, or text-input fields.
- Don't crop or stretch product screenshots to fit a fixed frame — derive the frame from the image.

---

## 13. Reusable Design Tokens

```
/* ---- Color: light (studio/primary) ---- */
--paper:        #F2F1EC
--paper-deep:   #E8E7E0
--ink:          #0D2E21
--ink-soft:     #4A554E              /* ~65-72% ink */
--ink-faint:    rgba(13,46,33,0.42)  /* ~40-45% ink */
--rule:         rgba(13,46,33,0.12)  /* hairline border, light */

/* ---- Color: dark (graphite interludes) ---- */
--graphite-900: #0E0F10
--graphite-800: #16181A
--graphite-700: #1E2124
--cream:        #F5F5F3
--muted:        #9A9A97
--hairline:     rgba(245,245,243,0.10)

/* ---- Color: accent world (swap per product, keep the pattern) ---- */
--accent:       #B5E34D              /* one saturated hue */
--accent-ink:   #16290B              /* dark text-on-accent */
--accent-tint:  rgba(181,227,77,0.07)  /* 7-9% — surface wash */
--accent-line:  rgba(181,227,77,0.32)  /* 32-36% — border/rule */

/* ---- Typography ---- */
font-family: "<Variable Humanist Sans>", system-ui, sans-serif
weights:     500 (body) / 600 (ui/links) / 700 (labels) / 800 (display)
tracking:    eyebrow +0.18em uppercase | display -0.045em to -0.055em | body 0
leading:     display 0.84-1.15 | heading 1.15-1.3 | body 1.6-1.75
measure:     68ch max for long-form prose

/* ---- Spacing / layout ---- */
--page-x:       clamp(20px, 5vw, 48px)   /* container inline padding */
container-max:  1200px
section-pad-y:  clamp(56px, 10vh, 160px)  /* scale by section importance */

/* ---- Radius ---- */
--radius-pill:  999px   /* nav, buttons, badges, tags */
--radius-card:  20px    /* cards, panels, image containers */

/* ---- Borders ---- */
width: 1px always
color: ink/10-12% (light) or white/10% (dark) — never higher contrast, never colored except accent-line

/* ---- Shadows ---- */
float:   0 1px 2px rgba(ink,0.04), 0 10px 30px -16px rgba(ink,0.25)
product: 0 30px 70px -30px rgba(0,0,0,0.85)

/* ---- Motion ---- */
ease-entrance:   cubic-bezier(0.16, 1, 0.3, 1)   /* or (0.22,1,0.36,1) */
duration-micro:  150-300ms
duration-enter:  400-900ms
spring-ui:       stiffness 260-420, damping 30-38, mass 0.6-0.9
stagger:         40-120ms per sibling index
scroll-hold:     reserve final 15-20% of a pin's range as unchanging "hold"

/* ---- Breakpoints (Tailwind default scale) ---- */
sm: 640px | md: 768px | lg: 1024px | xl: 1280px

/* ---- Component conventions ---- */
nav:      single centered floating pill, blur+translucent fill, shared sliding "puck" active state
button:   filled pill (primary) OR text+underline+arrow (secondary) — no third style
card:     radius-card, 1px hairline border, flat surface fill, eyebrow-label → title → body → CTA order
image:    always framed (device mockup or equivalent), sized from real source aspect ratio
cursor:   3-state morphing shape, fine-pointer + no-reduced-motion only, re-colors on dark/light crossing
```

---

## 14. AI Implementation Prompt

> Paste this whenever briefing an AI (or designer) to build a new Zhevion site. Swap in the new site's content/purpose — never its visual system.

```
Use the Zhevion design language for this build. This is a warm, editorial,
studio-grade visual identity — not a generic SaaS template — and it must be
followed exactly even though the content, page structure, and purpose of this
site are completely different from any previous Zhevion site.

CORE IDENTITY
- Base surface is warm paper (#F2F1EC), never pure white. Primary text/ink is
  deep forest green (#0D2E21), never pure black.
- Exactly ONE saturated accent color for this site (pick one hue; derive a
  7-9%-alpha "tint" and a 32-36%-alpha "line" variant from it). Use it only as
  a small detail — underline, progress rule, tag, tiny fill — never as a large
  background.
- Alternate light "paper" sections with short, deliberate dark "graphite"
  (#0E0F10 ground, #F5F5F3 text) passages as a compositional rhythm, not just
  as a footer.
- One typeface family only, variable weight, doing display + body + UI (a
  humanist/geometric sans with a genuine 800 weight — e.g. Plus Jakarta Sans,
  Inter, General Sans). Display type is extra-bold with tight/negative
  tracking (-0.045em to -0.055em); body text is medium-weight with relaxed
  leading (1.6-1.75).
- Precede every section heading with a small "eyebrow" label: uppercase,
  700 weight, 0.18em letter-spacing, ~12px, low-opacity ink/cream.
- Two border-radius values only: a full pill (999px) for nav/buttons/tags,
  and a ~20px "card" radius for containers. Borders are always 1px hairlines
  at low opacity, never bold or colored (except the one accent-line token).
- All content sits inside one shared centered container (~1200px max-width,
  fluid clamp()-based inline padding) — no separate grid system.
- Motion is scroll-driven and physically eased (springs / ease-out-expo
  cubic-bezier ~[0.16,1,0.3,1]), staggered by index for repeated elements,
  never linear or bouncy. Big moments (hero, key statements) may use a
  scroll-pin pattern (sticky panel + progress-driven reveal), but it MUST
  degrade to a plain, non-pinned layout on mobile and under
  prefers-reduced-motion — never a broken or janky version of the effect.
- Product/content imagery is always presented inside a purpose-built frame
  sized from the real image aspect ratio (never stretched/cropped). No stock
  photography, no gradient-mesh or glassmorphic decoration, no glowing/neon
  elements, no generic 3D hero renders.
- A custom cursor (3-state morphing shape, slightly organic/imprecise, not
  a laser dot) is optional polish — only on fine-pointer, non-reduced-motion
  devices, never overriding touch or text inputs.

WHAT MUST STAY CONSTANT ACROSS EVERY ZHEVION SITE
Paper+ink base palette, single-accent color discipline, eyebrow-label
pattern, two-radius system, hairline borders, ease-out-expo/spring motion,
one-typeface hierarchy-by-weight, light/dark sectional rhythm, and framed
(never bare) imagery.

WHAT SHOULD CHANGE FREELY PER SITE
The accent hue itself, page structure and section order, copy and tone,
imagery/screenshots, and which components appear — this is a visual system
to inhabit, not a layout to clone.

Full token reference and rationale: see Section 13 ("Reusable Design
Tokens") of the Zhevion Design Language guide.
```
