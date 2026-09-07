import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Reveal } from "@/components/ui/Reveal";
import { FORGE, GROCERY, PROJECTS, STUDIO_HOME } from "@/lib/content";

type StudioProduct = typeof GROCERY | typeof FORGE;

export function SelectedWork() {
  const portfolio = PROJECTS.find((project) => project.key === "guanzon");

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

          {portfolio?.href ? (
            <Reveal>
              <a
                href={portfolio.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-7 rounded-[26px] border border-ink/12 bg-paper-deep p-6 transition hover:-translate-y-1 hover:border-ink/25 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end"
              >
                <div>
                  <p className="eyebrow text-ink-faint">More studio work</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tightest sm:text-3xl">
                    Additional web and product work
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                    Explore Zendrex&apos;s portfolio for more of the work connected to the studio.
                  </p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-xl transition group-hover:bg-ink group-hover:text-paper" aria-hidden>
                  ↗
                </span>
              </a>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
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
