import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { HeroWordCycle } from "@/components/landing/HeroWordCycle";
import { GROCERY, FORGE, STUDIO_HOME } from "@/lib/content";

export function StudioHero() {
  const groceryScreen = GROCERY.screens[3];
  const forgeScreen = FORGE.screens[3];

  return (
    <section className="studio-hero relative overflow-hidden pb-10 lg:pb-16" aria-labelledby="studio-hero-heading">
      <div className="shell relative z-10">
        <div className="studio-hero-intro">
          <div>
            <p className="studio-hero-eyebrow">
              {STUDIO_HOME.hero.eyebrow}
            </p>
            <h1 id="studio-hero-heading" className="studio-hero-heading">
              <span className="sr-only">{STUDIO_HOME.hero.heading}</span>
              <span aria-hidden>
                <span className="studio-hero-line">We build software</span>{" "}
                <span className="studio-hero-line">that moves</span>{" "}
                <span className="studio-hero-line">
                  businesses{" "}
                  <HeroWordCycle words={STUDIO_HOME.hero.words} className="text-forest-500" />
                </span>
              </span>
            </h1>
          </div>

          <div className="studio-hero-copy">
            <p className="studio-hero-description">
              {STUDIO_HOME.hero.body}
            </p>
            <div className="studio-hero-actions">
              <a
                href="#contact"
                className="studio-hero-primary"
              >
                Start a project
                <span aria-hidden>↘</span>
              </a>
              <a
                href="#work"
                className="studio-hero-secondary"
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
