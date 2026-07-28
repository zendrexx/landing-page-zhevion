import { Reveal } from "@/components/ui/Reveal";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { GroceryMark } from "@/components/brand/AppLockups";
import { GROCERY } from "@/lib/content";

export function ShowcaseGrocery() {
  return (
    <section
      className="world-grocery grain relative overflow-hidden py-20 md:py-28"
      aria-labelledby="grocery-heading"
      style={{
        background:
          "linear-gradient(160deg, #0D2E21 0%, #123B2A 55%, #0E0F10 100%)",
      }}
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <GroceryMark size={44} />
            <div>
              <p className="text-sm font-semibold text-lime">App 01</p>
              <h2 id="grocery-heading" className="text-2xl font-extrabold tracking-tight text-cream">
                {GROCERY.name}
              </h2>
            </div>
          </div>

          <p className="mt-6 text-2xl font-bold leading-snug tracking-tight text-cream sm:text-3xl">
            {GROCERY.pitch}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70">
            {GROCERY.blurb}
          </p>

          {/* have / want / budget triad */}
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="How it plans">
            {GROCERY.triad.map((t) => (
              <li
                key={t}
                className="rounded-pill border border-lime/40 bg-lime/10 px-4 py-1.5 text-sm font-bold text-lime"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* features */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {GROCERY.features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className="rounded-card border border-white/10 bg-black/25 p-6 backdrop-blur-sm"
            >
              <h3 className="text-base font-bold text-cream">
                <span className="mr-2 text-lime">◆</span>
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{f.body}</p>
            </Reveal>
          ))}
        </div>

        {/* real screenshot gallery — scrolls in its own container */}
        <div className="mt-14">
          <h3 className="sr-only">{GROCERY.name} screenshots</h3>
          <ul
            className="-mx-[var(--page-x)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--page-x)] pb-5 [scrollbar-width:thin]"
            aria-label={`${GROCERY.name} screenshots`}
          >
            {GROCERY.screens.map((s) => (
              <li key={s.src} className="snap-center">
                <figure className="flex flex-col items-center gap-3">
                  <DeviceFrame
                    src={s.src}
                    alt={s.alt}
                    imgWidth={GROCERY.screenSize.w}
                    imgHeight={GROCERY.screenSize.h}
                    chrome={GROCERY.screenChrome}
                    bandIncluded={GROCERY.screenBandIncluded}
                    width={232}
                  />
                  <figcaption className="text-xs font-semibold text-cream/60">
                    {s.label}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <StoreBadges
            app="grocery"
            label={GROCERY.name}
            googlePlay={GROCERY.store.googlePlay}
            appStore={GROCERY.store.appStore}
            next={GROCERY.store.next}
          />
          <a
            href={GROCERY.learnMoreHref}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:underline"
          >
            Learn more
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
