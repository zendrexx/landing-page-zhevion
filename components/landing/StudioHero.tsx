import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { HeroWordCycle } from "@/components/landing/HeroWordCycle";
import { GROCERY, FORGE, STUDIO_HOME } from "@/lib/content";

export function StudioHero() {
  const groceryScreen = GROCERY.screens[3];
  const forgeScreen = FORGE.screens[3];

  return (
    <section className="paper-grain relative overflow-hidden pb-10 pt-32 sm:pt-36 lg:pb-16 lg:pt-44">
      <div className="studio-grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div className="shell relative z-10">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.65fr)] lg:gap-12">
          <div>
            <p className="eyebrow animate-reveal-up text-ink-faint">
              {STUDIO_HOME.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[11.5ch] animate-reveal-up text-[clamp(3rem,8.3vw,7.5rem)] font-extrabold leading-[0.94] tracking-[-0.06em] [animation-delay:80ms]">
              <span className="sr-only">{STUDIO_HOME.hero.heading}</span>
              <span aria-hidden>
                We build software that moves businesses{" "}
                <HeroWordCycle words={STUDIO_HOME.hero.words} className="text-forest-500" />
              </span>
            </h1>
          </div>

          <div className="animate-reveal-up pb-1 [animation-delay:160ms]">
            <p className="max-w-md text-base font-medium leading-[1.7] text-ink-soft sm:text-lg">
              {STUDIO_HOME.hero.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-pill bg-ink px-6 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500"
              >
                Start a project
                <span className="ml-2" aria-hidden>↘</span>
              </a>
              <a
                href="#work"
                className="inline-flex min-h-12 items-center justify-center rounded-pill border border-ink/15 px-6 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-paper-deep"
              >
                View our work
              </a>
            </div>
          </div>
        </div>

        <div className="hero-product-stage mt-12 animate-reveal-up overflow-hidden rounded-[30px] border border-white/10 bg-graphite-900 [animation-delay:240ms] sm:mt-16 sm:rounded-[38px]">
          <div className="grid-texture absolute inset-0 opacity-40" aria-hidden />
          <div className="hero-stage-light absolute inset-0" aria-hidden />

          <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-8">
            <p className="eyebrow text-cream/45">Product proof</p>
            <p className="mt-2 max-w-[17rem] text-sm font-medium leading-relaxed text-cream/70">
              Real screens from products designed and built inside Zhevion.
            </p>
          </div>

          <div className="hero-phone hero-phone-grocery">
            <DeviceFrame
              src={groceryScreen.src}
              alt={groceryScreen.alt}
              imgWidth={GROCERY.screenSize.w}
              imgHeight={GROCERY.screenSize.h}
              chrome={GROCERY.screenChrome}
              bandIncluded={GROCERY.screenBandIncluded}
              width={252}
              sizes="(min-width: 1024px) 300px, 220px"
              priority
            />
          </div>

          <div className="hero-phone hero-phone-forge">
            <DeviceFrame
              src={forgeScreen.src}
              alt={forgeScreen.alt}
              imgWidth={FORGE.screenSize.w}
              imgHeight={FORGE.screenSize.h}
              chrome={FORGE.screenChrome}
              bandIncluded={FORGE.screenBandIncluded}
              width={232}
              sizes="(min-width: 1024px) 275px, 205px"
              priority
            />
          </div>

          <ul className="absolute bottom-5 left-5 z-20 flex flex-wrap gap-2 sm:bottom-8 sm:left-8">
            <li className="rounded-pill border border-lime/30 bg-lime/10 px-3 py-1.5 text-xs font-bold text-lime">
              Zebite · grocery planning
            </li>
            <li className="rounded-pill border border-volt/30 bg-volt/10 px-3 py-1.5 text-xs font-bold text-volt-soft">
              RepForge · strength training
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
