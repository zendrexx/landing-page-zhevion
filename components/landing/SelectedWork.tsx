import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Reveal } from "@/components/ui/Reveal";
import { FORGE, GROCERY, PROJECTS, STUDIO_HOME } from "@/lib/content";

type StudioProduct = typeof GROCERY | typeof FORGE;
export type PortfolioProject = Extract<(typeof PROJECTS)[number], { kind: "Portfolio" }>;

// Keep the real work visible on the homepage: Zendrex's inventory system and
// every supplied Aldrin project image. The full-size versions also live on
// the dedicated /work page.
const HOME_PORTFOLIO_KEYS = ["guanzon", "safetycrib", "rgm", "beru"] as const;

export function SelectedWork() {
  const portfolioPicks = HOME_PORTFOLIO_KEYS.map((key) =>
    PROJECTS.find((project) => project.key === key),
  ).filter((project): project is PortfolioProject => project?.kind === "Portfolio");

  return (
    <section id="work" className="scroll-mt-24 py-[clamp(84px,12vw,160px)]" aria-labelledby="work-heading">
      <div className="shell">
        <Reveal className="grid gap-6 border-t border-ink/12 pt-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-ink-faint">{STUDIO_HOME.work.eyebrow}</p>
            <h2
              id="work-heading"
              className="mt-4 max-w-[13ch] text-[clamp(2.4rem,5.4vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
            >
              {STUDIO_HOME.work.heading}
            </h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg lg:justify-self-end">
            {STUDIO_HOME.work.body}
          </p>
        </Reveal>

        <div className="mt-14 space-y-6 sm:mt-20 sm:space-y-8">
          <ProductProjectCard
            product={GROCERY}
            number="01"
            category="Mobile app · Internal product"
            screenIndexes={[0, 3]}
            tone="grocery"
          />
          <ProductProjectCard
            product={FORGE}
            number="02"
            category="Mobile app · Internal product"
            screenIndexes={[0, 4]}
            tone="forge"
            reverse
          />

          <Reveal>
            <div className="rounded-[26px] border border-ink/12 bg-paper-deep p-6 sm:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-ink-faint">More studio work</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tightest sm:text-3xl">
                    Freelance and portfolio work from the people behind Zhevion.
                  </h3>
                </div>
                <a
                  href="/work"
                  className="group inline-flex items-center gap-2 text-sm font-bold text-ink"
                >
                  View all our work
                  <span aria-hidden className="transition group-hover:translate-x-0.5">↗</span>
                </a>
              </div>

              {portfolioPicks.length ? (
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {portfolioPicks.map((project) => (
                    <PortfolioProjectCard key={project.key} project={project} />
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A single freelance/personal project — the real screenshot and who built
 * it. Shared between the homepage's "more studio work" band and the full
 * /work page so the two never drift into two card styles.
 *
 * No dedicated case study exists yet for any of these, so the card itself
 * isn't a link — only the "By {person}" credit is, out to that person's own
 * site. The rest is a plain "Case study coming" indicator, the same pattern
 * ProductProjectCard already uses for RepForge.
 */
export function PortfolioProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-ink/12 bg-paper">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
        <div className="absolute inset-4">
          <Image
            src={project.image}
            alt={`${project.name} project interface`}
            fill
            unoptimized
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="eyebrow inline-block w-fit text-ink-faint underline decoration-ink/20 underline-offset-4 transition hover:text-ink hover:decoration-ink"
        >
          By {project.person}
        </a>
        <h4 className="mt-2 text-lg font-extrabold tracking-[-0.03em] text-ink">{project.name}</h4>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="rounded-pill border border-ink/12 bg-paper-deep px-2.5 py-1 text-xs font-semibold text-ink-soft"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-4 text-sm font-semibold text-ink-faint">Case study coming</span>
      </div>
    </div>
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
      <article className={`overflow-hidden rounded-[30px] border border-white/10 ${background} text-cream sm:rounded-[38px]`}>
        <div className="grid lg:min-h-[620px] lg:grid-cols-2">
          <div className={`flex flex-col justify-between p-7 sm:p-10 lg:p-12 ${reverse ? "lg:order-2" : ""}`}>
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className={`eyebrow ${accent}`}>{category}</p>
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
                    className="inline-flex min-h-12 items-center rounded-pill bg-cream px-6 text-sm font-bold text-graphite-900 transition hover:-translate-y-0.5"
                  >
                    View product
                    <span className="ml-2" aria-hidden>↗</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-12 items-center rounded-pill border border-white/15 px-5 text-sm font-semibold text-cream/50">
                    Case study coming
                  </span>
                )}
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/35">
                  {product.platforms}
                </span>
              </div>
            </div>
          </div>

          <div className={`project-stage ${stage} relative min-h-[470px] overflow-hidden lg:min-h-full ${reverse ? "lg:order-1" : ""}`}>
            <div className="grid-texture absolute inset-0 opacity-35" aria-hidden />
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
      <article className="overflow-hidden rounded-[30px] border border-white/10 bg-graphite-900 text-cream sm:rounded-[38px]">
        <div className="grid lg:min-h-[620px] lg:grid-cols-2">
          <div className={`flex flex-col justify-between p-7 sm:p-10 lg:p-12 ${reverse ? "lg:order-2" : ""}`}>
            <div>
              <div className="flex items-center justify-between gap-4">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow text-cream/50 underline decoration-white/20 underline-offset-4 transition hover:text-cream/80 hover:decoration-white/50"
                >
                  By {project.person}
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
              <div className="mt-8">
                <span className="inline-flex min-h-12 items-center rounded-pill border border-white/15 px-5 text-sm font-semibold text-cream/50">
                  Case study coming
                </span>
              </div>
            </div>
          </div>

          <div
            className={`project-stage project-stage-portfolio relative min-h-[470px] overflow-hidden lg:min-h-full ${reverse ? "lg:order-1" : ""}`}
          >
            <div className="grid-texture absolute inset-0 opacity-35" aria-hidden />
            {/* Load the supplied screenshots directly from /public/work so
                production does not depend on image optimization or runtime
                filesystem checks. */}
            <div className="absolute inset-6 sm:inset-10 lg:inset-12">
              <Image
                src={project.image}
                alt={`${project.name} project interface`}
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
