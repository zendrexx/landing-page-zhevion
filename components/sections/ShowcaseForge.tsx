import { Reveal } from "@/components/ui/Reveal";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { ForgeMark } from "@/components/brand/AppLockups";
import { FORGE } from "@/lib/content";

export function ShowcaseForge() {
  return (
    <section
      className="world-forge grain relative overflow-hidden py-20 md:py-28"
      aria-labelledby="forge-heading"
      style={{
        background:
          "linear-gradient(200deg, #14122b 0%, #1a1636 45%, #0E0F10 100%)",
      }}
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <ForgeMark size={44} />
            <div>
              <p className="text-sm font-semibold text-volt-soft">App 02</p>
              <h2 id="forge-heading" className="text-2xl font-extrabold tracking-tight text-cream">
                {FORGE.name}
              </h2>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-volt-soft/70">
                {FORGE.wordmark}
              </p>
            </div>
          </div>

          <p className="mt-6 text-2xl font-bold leading-snug tracking-tight text-cream sm:text-3xl">
            {FORGE.pitch}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/70">
            {FORGE.blurb}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Who it's for">
            {["Squat", "Bench", "Deadlift", "+ accessories"].map((t) => (
              <li
                key={t}
                className="rounded-pill border border-volt/45 bg-volt/12 px-4 py-1.5 text-sm font-bold text-volt-soft"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* features */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {FORGE.features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className="rounded-card border border-white/10 bg-black/25 p-6 backdrop-blur-sm"
            >
              <h3 className="text-base font-bold text-cream">
                <span className="mr-2 text-volt-soft">◆</span>
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{f.body}</p>
            </Reveal>
          ))}
        </div>

        {/* real screenshot gallery — scrolls in its own container */}
        <div className="mt-14">
          <h3 className="sr-only">{FORGE.name} screenshots</h3>
          <ul
            className="-mx-[var(--page-x)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--page-x)] pb-5 [scrollbar-width:thin]"
            aria-label={`${FORGE.name} screenshots`}
          >
            {FORGE.screens.map((s) => (
              <li key={s.src} className="snap-center">
                <figure className="flex flex-col items-center gap-3">
                  <DeviceFrame
                    src={s.src}
                    alt={s.alt}
                    imgWidth={FORGE.screenSize.w}
                    imgHeight={FORGE.screenSize.h}
                    chrome={FORGE.screenChrome}
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
            app="forge"
            label={FORGE.name}
            googlePlay={FORGE.store.googlePlay}
            appStore={FORGE.store.appStore}
            next={FORGE.store.next}
          />
          <a
            href={FORGE.learnMoreHref}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-volt-soft hover:underline"
          >
            Learn more
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
