import { Fragment } from "react";
import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Reveal } from "@/components/ui/Reveal";
import { FORGE, GROCERY, GUANZON_PROJECT, PROJECTS, STUDIO_HOME } from "@/lib/content";

type StudioProduct = typeof GROCERY | typeof FORGE;
export type PortfolioProject = Extract<(typeof PROJECTS)[number], { kind: "Portfolio" }>;

/**
 * Selected work — the page's main proof that these people build real software.
 *
 * The three entries deliberately do NOT share a component. Running them all
 * through one card template is what makes a portfolio read as a CMS dump, so
 * each gets its own archetype and they are tied together by type, grid, and
 * rule weight instead:
 *
 *   01 Guanzon  — plate:     one landscape desktop capture, annotated.
 *   02 Zebite   — filmstrip: three upright phones in product order.
 *   03 RepForge — spread:    one phone on a full-bleed dark ground.
 *
 * That also gives the section a light -> light -> dark rhythm, which is the
 * sectional beat the design language treats as identity-critical.
 *
 * `.shell` lives on each block rather than wrapping the whole section, because
 * RepForge needs to bleed its dark ground to the viewport edges and cannot do
 * that from inside a max-width container.
 */
export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24" aria-labelledby="work-heading">
      <div className="shell pt-[clamp(72px,10vw,128px)]">
        <header className="grid gap-5 border-t border-ink/15 pt-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <p className="text-sm font-semibold text-ink-soft">{STUDIO_HOME.work.eyebrow}</p>
          <div>
            <h2
              id="work-heading"
              className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.75rem)] font-extrabold leading-[1.01] tracking-[-0.05em]"
            >
              {STUDIO_HOME.work.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              {STUDIO_HOME.work.body}
            </p>
          </div>
        </header>
      </div>

      <div className="shell mt-[clamp(56px,8vw,96px)]">
        <GuanzonCaseStudy />
      </div>

      <div className="shell mt-[clamp(72px,10vw,128px)] pb-[clamp(72px,10vw,128px)]">
        <ZebiteCaseStudy />
      </div>

      {/* Owns its own section, ground, and vertical rhythm so it can go
          full-bleed dark. A <section> inside a <section> is valid, and each
          keeps its own accessible name. */}
      <RepForgeCaseStudy />

      <div className="shell py-[clamp(64px,9vw,112px)]">
        <div className="flex flex-col gap-5 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-ink-soft">
            Web, mobile, and experimental work by the people behind Zhevion is collected on the full work page.
          </p>
          <a href="/work" className="text-link shrink-0 font-bold">Browse all work</a>
        </div>
      </div>
    </section>
  );
}

/**
 * 01 — Guanzon. A mini case study, not an interface tour.
 *
 * The job of this block is to make a business owner think "they understand a
 * process that moves between people and approval stages." Everything is shaped
 * around that: one workflow paragraph, three annotations on the capture, the
 * four stages a request passes through, and a compact scope/tech/context
 * footer. No invented metrics — the transparency about context is the point.
 *
 * The numbered markers are also what make the capture work on a phone. The UI
 * underneath is far too small to read at 375px, but a 20px ink-on-paper pin
 * keyed to a list below stays legible. The reader cannot read the screen; they
 * can read the figure.
 *
 * No accent colour in here. The capture brings its own saturated orange, so
 * forest green would put two competing hues in one composition — and the
 * absence of accent quietly marks this as professional work, not a product.
 */
function GuanzonCaseStudy() {
  const G = GUANZON_PROJECT;

  return (
    <article id="guanzon" className="scroll-mt-28" aria-labelledby="guanzon-heading">
      <header className="grid gap-8 border-t border-ink/20 pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-ink-faint">01 / {G.category}</p>
          <h3
            id="guanzon-heading"
            className="mt-5 text-[clamp(2.75rem,6vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.06em]"
          >
            {G.name}
          </h3>
          <p className="mt-4 text-xl font-bold tracking-[-0.025em] text-ink-soft sm:text-2xl">
            {G.system}
          </p>
        </div>

        <div className="lg:pt-8">
          <p className="text-sm font-bold text-ink">The workflow</p>
          <p className="mt-3 max-w-2xl text-lg font-medium leading-[1.65] text-ink sm:text-xl">
            {G.summary}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-[1.7] text-ink-soft">{G.divisions}</p>
        </div>
      </header>

      {/* A <figure>: an image plus a caption naming what is in it. Full-bleed
          below sm so it reads as a deliberate plate rather than a lost
          thumbnail. No aspect-ratio box and no object-fit — the intrinsic
          width/height let the browser derive the frame from the file. quality
          92 because the default 75 smears the 1px rules this UI is drawn with. */}
      <figure className="mt-10 sm:mt-14">
        <div className="work-plate mx-[calc(-1*var(--page-x))] sm:mx-0">
          <Image
            src={G.image}
            alt={G.alt}
            width={G.imageSize.w}
            height={G.imageSize.h}
            quality={92}
            sizes="(min-width: 1280px) 1104px, (min-width: 640px) 92vw, 100vw"
            className="block h-auto w-full"
          />

          {/* aria-hidden: the key below is the accessible copy, so a screen
              reader hears each region once rather than twice. */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {G.regions.map((region) => (
              <span
                key={region.n}
                className="absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-control bg-ink text-[10px] font-bold tabular-nums text-paper sm:h-[22px] sm:w-[22px] sm:text-[11px]"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
              >
                {region.n}
              </span>
            ))}
          </div>
        </div>

        <figcaption className="mt-3 flex flex-col gap-1 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="font-semibold text-ink">{G.screenName}</span>
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-ink-faint">
            <span>{G.privacyNote}</span>
            {/* Hands zoom to the OS image viewer, which has the best pinch-zoom
                on the device and costs one anchor to use. */}
            <a href={G.image} target="_blank" rel="noreferrer" className="text-link shrink-0 font-semibold">
              View full size
            </a>
          </span>
        </figcaption>
      </figure>

      <CaseRow label="On screen">
        <ol className="grid gap-x-8 sm:grid-cols-3">
          {G.regions.map((region) => (
            <li key={region.n} className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-t border-ink/12 py-3">
              <span className="pt-px text-xs font-bold tabular-nums text-ink-faint">{region.n}</span>
              <span>
                <span className="block text-sm font-bold text-ink">{region.title}</span>
                <span className="mt-1 block text-sm leading-[1.6] text-ink-soft">{region.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </CaseRow>

      <CaseRow label="What was built" note={G.requestTypes}>
        <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {G.operations.map((op) => (
            <li key={op.n} className="border-t border-ink/25 py-3.5">
              <span className="text-xs font-bold tabular-nums text-ink-faint">{op.n}</span>
              <span className="mt-1.5 block text-lg font-extrabold tracking-[-0.025em] text-ink">
                {op.title}
              </span>
              <span className="mt-1 block text-sm leading-[1.6] text-ink-soft">{op.body}</span>
            </li>
          ))}
        </ol>
      </CaseRow>

      <dl className="mt-9 grid border-t border-ink/20 sm:grid-cols-[12rem_1fr]">
        {[
          ["Scope", G.scope],
          ["Technology", G.technology],
          ["Context", G.role],
        ].map(([term, description]) => (
          <Fragment key={term}>
            <dt className="pt-4 text-sm font-bold text-ink sm:py-4">{term}</dt>
            <dd className="border-b border-ink/12 py-3 text-sm leading-[1.7] text-ink-soft sm:py-4">
              {description}
            </dd>
          </Fragment>
        ))}
      </dl>
    </article>
  );
}

/**
 * The label-then-content row the rest of the page is built from — the same
 * grid Services and ProcessSection use. Reusing it here is what stops the case
 * study reading as something bolted onto an editorial site.
 */
function CaseRow({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-9 grid gap-x-8 gap-y-6 border-t border-ink/20 pt-6 lg:grid-cols-[12rem_1fr]">
      <div>
        <p className="text-sm font-bold text-ink">{label}</p>
        {note ? <p className="mt-2 text-sm leading-[1.6] text-ink-soft">{note}</p> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

/**
 * 02 — Zebite. A filmstrip.
 *
 * Three real screens in the order the product is actually used, flat on the
 * paper ground: no stage, no panel, no rotation, no gradient. Below lg it is a
 * native snap-scroll rail — a partly-visible next frame is what tells a thumb
 * to swipe — and above lg the same markup is a static row. No JS either way.
 */
function ZebiteCaseStudy() {
  // Plan the week -> shop within budget -> stock the pantry. Their own labels
  // come from the content model, so this stays honest if the screens change.
  const strip = [GROCERY.screens[0], GROCERY.screens[3], GROCERY.screens[4]];

  return (
    <article id="zebite" className="scroll-mt-28" aria-labelledby="zebite-heading">
      <header className="grid gap-8 border-t border-ink/20 pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-ink-faint">02 / Zhevion product · Mobile app</p>
          <h3
            id="zebite-heading"
            className="mt-5 text-[clamp(2.75rem,6vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.06em]"
          >
            {GROCERY.name}
          </h3>
          <p className="mt-4 max-w-md text-xl font-bold tracking-[-0.025em] text-ink-soft sm:text-2xl">
            {GROCERY.pitch}
          </p>
        </div>
        <p className="max-w-2xl text-lg font-medium leading-[1.65] text-ink sm:text-xl lg:pt-8">
          {GROCERY.blurb}
        </p>
      </header>

      {/* tabIndex + role + label are not optional: WCAG 2.1.1 requires a
          scrollable region to be operable from the keyboard, and this is the
          part of a snap rail that usually gets skipped. */}
      <div
        className="film-rail mt-12 border-t border-ink/15 pt-10 sm:mt-16"
        role="group"
        aria-label={`${GROCERY.name} screens`}
        tabIndex={0}
      >
        <ul className="flex gap-6 sm:gap-10">
          {strip.map((screen, index) => (
            <li key={screen.src} className="shrink-0 snap-start">
              <DeviceFrame
                src={screen.src}
                alt={screen.alt}
                imgWidth={GROCERY.screenSize.w}
                imgHeight={GROCERY.screenSize.h}
                chrome={GROCERY.screenChrome}
                bandIncluded={GROCERY.screenBandIncluded}
                width={218}
                sizes="(min-width: 1024px) 250px, 218px"
              />
              <p className="mt-4 flex items-baseline gap-3">
                <span className="text-xs font-bold tabular-nums text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold text-ink">{screen.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-6 border-t border-ink/20 pt-6 lg:grid-cols-[12rem_1fr]">
        <p className="text-sm font-bold text-ink">What it does</p>
        <div>
          <ProductFeatureList features={GROCERY.features.slice(0, 3)} tone="light" />
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a className="case-primary-light" href={GROCERY.learnMoreHref} target="_blank" rel="noreferrer">
              View Zebite
            </a>
            <span className="text-sm font-semibold text-ink-faint">{GROCERY.platforms}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * 03 — RepForge. A spread.
 *
 * One phone, upright and unrotated, directly on the graphite ground: the
 * section is the panel, so there is no inner stage, no radial gradient, and no
 * texture layer. Going dark here is also what breaks up a long light stretch
 * in the page's sectional rhythm.
 *
 * RepForge has no live link yet (FORGE.learnMoreHref is null), and a quiet dark
 * spread carries that far better than a bright card with a dead button on it.
 */
function RepForgeCaseStudy() {
  // The strength-level profile: RepForge's argument is a state, not a flow, so
  // it needs one screen rather than a sequence. Deliberately not screens[3],
  // which the hero already shows.
  const screen = FORGE.screens[5];

  return (
    <section
      id="repforge"
      className="dark-panel scroll-mt-0 py-[clamp(84px,11vw,140px)]"
      aria-labelledby="repforge-heading"
    >
      <div className="shell">
        <article className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-cream/45">03 / Zhevion product · Mobile app</p>
            <h3
              id="repforge-heading"
              className="mt-5 text-[clamp(3rem,6.5vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.06em] text-cream"
            >
              {FORGE.name}
            </h3>
            <p className="mt-6 max-w-md text-2xl font-bold leading-[1.15] tracking-[-0.03em] text-cream sm:text-3xl">
              {FORGE.pitch}
            </p>
            <p className="mt-6 max-w-lg text-base leading-[1.75] text-cream/70 sm:text-lg">
              {FORGE.blurb}
            </p>

            <div className="mt-10">
              <ProductFeatureList features={FORGE.features.slice(0, 3)} tone="dark" />
              <p className="mt-8 text-sm font-semibold text-cream/45">{FORGE.platforms}</p>
            </div>
          </div>

          <figure className="lg:justify-self-end">
            <DeviceFrame
              src={screen.src}
              alt={screen.alt}
              imgWidth={FORGE.screenSize.w}
              imgHeight={FORGE.screenSize.h}
              chrome={FORGE.screenChrome}
              bandIncluded={FORGE.screenBandIncluded}
              width={272}
              sizes="(min-width: 1024px) 300px, 272px"
            />
            <figcaption className="mt-5 flex items-baseline gap-3">
              <span className="text-xs font-bold tabular-nums text-cream/40">01</span>
              <span className="text-sm font-bold text-cream">{screen.label}</span>
            </figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}

function ProductFeatureList({
  features,
  tone,
}: {
  features: readonly { title: string; body: string }[];
  tone: "light" | "dark";
}) {
  return (
    <ul className={tone === "dark" ? "border-t border-white/15" : "border-t border-ink/15"}>
      {features.map((feature) => (
        <li
          key={feature.title}
          className={`grid gap-1 border-b py-3.5 sm:grid-cols-[0.7fr_1.3fr] sm:gap-5 ${
            tone === "dark" ? "border-white/15" : "border-ink/15"
          }`}
        >
          <span className={`text-sm font-bold ${tone === "dark" ? "text-cream" : "text-ink"}`}>{feature.title}</span>
          <span className={`text-sm leading-relaxed ${tone === "dark" ? "text-cream/60" : "text-ink-soft"}`}>{feature.body}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProductProjectCard({
  product,
  number,
  category,
  screenIndexes,
  tone,
  reverse = false,
}: {
  product: StudioProduct;
  number: string;
  category: string;
  screenIndexes: readonly [number, number];
  tone: "grocery" | "forge";
  reverse?: boolean;
}) {
  const screens = screenIndexes.map((index) => product.screens[index]);
  const background = tone === "grocery" ? "bg-forest-900" : "bg-graphite-900";
  const accent = tone === "grocery" ? "text-lime" : "text-volt-soft";
  const stage = tone === "grocery" ? "project-stage-grocery" : "project-stage-forge";

  return (
    <Reveal>
      <article className={`overflow-hidden rounded-stage border border-white/10 ${background} text-cream`}>
        <div className="grid lg:min-h-[620px] lg:grid-cols-2">
          <div className={`flex flex-col justify-between p-7 sm:p-10 lg:p-12 ${reverse ? "lg:order-2" : ""}`}>
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className={`text-sm font-semibold ${accent}`}>{category}</p>
                <span className="text-sm font-bold tabular-nums text-cream/35">{number}</span>
              </div>
              <h3 className="mt-8 text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold leading-none tracking-[-0.06em]">
                {product.name}
              </h3>
              <p className="mt-5 max-w-lg text-xl font-semibold leading-snug text-cream sm:text-2xl">
                {product.pitch}
              </p>
              <p className="mt-5 max-w-lg text-base leading-[1.75] text-cream/65">
                {product.blurb}
              </p>
            </div>

            <div className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {product.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature.title}
                    className="rounded-pill border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-cream/70"
                  >
                    {feature.title}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {product.learnMoreHref ? (
                  <a
                    href={product.learnMoreHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center rounded-control bg-cream px-6 text-sm font-bold text-graphite-900 transition hover:bg-paper-deep"
                  >
                    View product
                    <span className="ml-2" aria-hidden>↗</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-12 items-center rounded-control border border-white/15 px-5 text-sm font-semibold text-cream/50">
                    Case study coming
                  </span>
                )}
                <span className="text-sm font-semibold text-cream/45">
                  {product.platforms}
                </span>
              </div>
            </div>
          </div>

          <div className={`project-stage ${stage} relative min-h-[470px] overflow-hidden lg:min-h-full ${reverse ? "lg:order-1" : ""}`}>
            <div className="project-phone project-phone-primary">
              <DeviceFrame
                src={screens[0].src}
                alt={screens[0].alt}
                imgWidth={product.screenSize.w}
                imgHeight={product.screenSize.h}
                chrome={product.screenChrome}
                bandIncluded={product.screenBandIncluded}
                width={216}
                sizes="(min-width: 1024px) 240px, 190px"
              />
            </div>
            <div className="project-phone project-phone-secondary">
              <DeviceFrame
                src={screens[1].src}
                alt={screens[1].alt}
                imgWidth={product.screenSize.w}
                imgHeight={product.screenSize.h}
                chrome={product.screenChrome}
                bandIncluded={product.screenBandIncluded}
                width={188}
                sizes="(min-width: 1024px) 210px, 170px"
              />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * A freelance/portfolio project rendered at the same size and structure as
 * `ProductProjectCard` (same min-height, type scale, and button treatment),
 * for the /work page where every project — studio product or personal work
 * — reads as equally weighted. One real screenshot fills the image half
 * instead of a device-frame mockup, since these aren't phone apps.
 */
export function PortfolioBigCard({
  project,
  number,
  reverse = false,
}: {
  project: PortfolioProject;
  number: string;
  reverse?: boolean;
}) {
  return (
    <Reveal>
      <article className="overflow-hidden rounded-stage border border-white/10 bg-graphite-900 text-cream">
        <div className="grid lg:min-h-[620px] lg:grid-cols-2">
          <div className={`flex flex-col justify-between p-7 sm:p-10 lg:p-12 ${reverse ? "lg:order-2" : ""}`}>
            <div>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-cream/50 underline decoration-white/20 underline-offset-4 transition hover:text-cream/80 hover:decoration-white/50"
                >
                  By {project.people.join(" & ")}
                </a>
                <span className="text-sm font-bold tabular-nums text-cream/35">{number}</span>
              </div>
              <h3 className="mt-8 text-[clamp(2.5rem,5vw,5.5rem)] font-extrabold leading-none tracking-[-0.06em]">
                {project.name}
              </h3>
              <p className="mt-5 max-w-lg text-xl font-semibold leading-snug text-cream sm:text-2xl">
                {project.summary}
              </p>
            </div>

            <div className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-pill border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-cream/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`project-stage project-stage-portfolio relative min-h-[470px] overflow-hidden lg:min-h-full ${reverse ? "lg:order-1" : ""}`}
          >
            <div className="absolute inset-6 sm:inset-10 lg:inset-12">
              <Image
                src={project.image}
                alt={`${project.name} project interface`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
