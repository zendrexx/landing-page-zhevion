"use client";

import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { ZebMascot } from "@/components/brand/ZebMascot";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { GROCERY, FORGE } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

/**
 * Hero — a centred editorial poster, not a two-column SaaS split.
 *
 * The composition reads top to bottom as one idea: studio mark → the tagline at
 * poster scale → what we make → the two apps as physical objects on a lit
 * stage, with Zeb introducing them. Everything is on the page's centre line, so
 * the only thing carrying the eye down is type size.
 *
 * Deliberate choices worth keeping:
 *  - No blurred colour blobs. The backdrop is *structure* (column rules aligned
 *    to the .shell grid) plus a single motivated light source under the phones;
 *    a pair of green/violet radial glows is the stock "AI landing page" look.
 *  - The phones are planted, not floating. They bleed off the bottom of the
 *    section behind a fade, which crops the captures' busy lower half and lets
 *    them be rendered large enough to actually read.
 *  - Zebite's light capture next to RepForge's dark one does the contrast work
 *    that the glows used to fake, and reflects the two apps' real UIs.
 *  - The motion budget goes to the product, not to decoration: the copy lands in
 *    reading order, then each device flips through its own real captures. No
 *    parallax, no sweeping "glass" sheen, no pulsing accents.
 */
export function Hero() {
  return (
    <section className="grain relative overflow-hidden" aria-labelledby="hero-heading">
      <Backdrop />

      <div className="shell relative z-10 flex flex-col items-center pt-9 text-center sm:pt-12">
        {/* Who's talking, before the claim. */}
        <p
          className="inline-flex animate-reveal-up items-center gap-2.5 rounded-pill border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-4 backdrop-blur-sm"
          style={{ animationDelay: "40ms" }}
        >
          <ZhevionMark size={24} />
          <span className="eyebrow text-cream/65">Two apps · Two of us</span>
        </p>

        {/* Left flat in cream on purpose. The accents belong to the apps, and
            two-tone/gradient headlines are the thing that made this read as
            stock. (Jakarta's full stop is a square, so a coloured one reads as
            a stray box rather than a flourish.)
            The two lines are separate blocks so they arrive one after the other
            — the claim assembles itself the way you'd read it aloud. */}
        <h1
          id="hero-heading"
          className="mt-6 text-balance font-extrabold leading-[0.92] tracking-tightest text-cream"
          style={{ fontSize: "clamp(2.6rem, 8.4vw, 6.25rem)" }}
        >
          <span className="block animate-reveal-up" style={{ animationDelay: "120ms" }}>
            Eat smarter.
          </span>
          <span className="block animate-reveal-up" style={{ animationDelay: "220ms" }}>
            Train stronger.
          </span>
        </h1>

        <p
          className="mt-5 max-w-[33rem] animate-reveal-up text-pretty text-base leading-relaxed text-cream/60 sm:text-lg"
          style={{ animationDelay: "320ms" }}
        >
          A two-person studio building two focused apps — one for what you eat, one
          for how you train.
        </p>

        <div
          className="mt-7 flex animate-reveal-up flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "390ms" }}
        >
          <a
            href="#apps"
            onClick={() => trackCTA("hero-see-apps")}
            className="rounded-pill bg-cream px-6 py-3.5 text-sm font-bold text-graphite-900 transition hover:opacity-90 sm:px-7"
          >
            See the apps
          </a>
          <a
            href="#get"
            onClick={() => trackCTA("hero-get-apps")}
            className="rounded-pill border border-white/18 px-6 py-3.5 text-sm font-bold text-cream transition hover:border-white/35 hover:bg-white/5 sm:px-7"
          >
            Get early access
          </a>
        </div>

        {/* Legend for the two devices below. Plain text, no accent dot: a small
            coloured circle next to a product name is the stock chrome this page
            is trying not to look like, and the devices themselves already carry
            each app's colour. */}
        <ul
          className="mt-8 flex animate-reveal-up flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-semibold sm:gap-x-5"
          style={{ animationDelay: "450ms" }}
        >
          <AppTag name={GROCERY.name} what="Groceries & meals" />
          <li aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
          <AppTag name={FORGE.name} what="Training & PRs" />
        </ul>
      </div>

      <Stage />
    </section>
  );
}

function AppTag({ name, what }: { name: string; what: string }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
      <span className="text-cream">{name}</span>
      <span className="text-cream/45">{what}</span>
    </li>
  );
}

/**
 * Which captures each device flips through, in the order they play.
 *
 * Picked by their labels in lib/content (the single source of truth for screens)
 * and chosen to be legible at ~240px and clearly different from one another —
 * two list screens in a row just look like a flicker. A label that no longer
 * exists is skipped, and if none match the device falls back to a single static
 * screen rather than an empty frame.
 */
function pickScreens<T extends { label: string }>(all: T[], labels: string[]) {
  const picked = labels
    .map((label) => all.find((s) => s.label === label))
    .filter((s): s is T => Boolean(s));
  return picked.length > 1 ? picked : all.slice(0, 1);
}

const HERO_SCREENS = {
  grocery: pickScreens(GROCERY.screens, [
    "Today's plan",
    "Meal plan",
    "Within budget",
    "Pantry",
  ]),
  forge: pickScreens(FORGE.screens, [
    "Today",
    "Log a set",
    "History",
    "Strength level",
  ]),
};

/**
 * The lit stage the two devices stand on.
 *
 * Fixed heights with `overflow-hidden` crop the tall captures at a consistent
 * point across breakpoints; the fade at the bottom turns that crop into a
 * dissolve. The pair is laid out at fixed px and then scaled with a transform
 * (from `origin-top`, so the crop point doesn't drift) — a transform keeps the
 * screenshots sharp and can't stretch the section the way a re-layout would.
 *
 * The heights are also the hero's budget: they're set so that Zeb, who stands
 * at the bottom of the stage, still lands inside a 900px-tall laptop viewport.
 * Grow them and the mascot drops below the fold.
 */
function Stage() {
  return (
    <div className="relative z-10 mt-8 h-[280px] sm:mt-9 sm:h-[300px] lg:h-[296px]">
      {/* Each device is three nested layers, one transform channel each, because
          a single element can only hold one transform: the entrance (rise +
          fade), then a slow float, then the fixed tilt. Collapse them and the
          animation overwrites the rotation and the phone snaps upright. */}
      <div className="absolute inset-x-0 top-0 flex origin-top scale-[0.76] items-start justify-center sm:scale-90 md:scale-100 lg:scale-[1.14]">
        {/* Zebite — light UI, tilted away from centre */}
        <div className="animate-reveal-up" style={{ animationDelay: "540ms" }}>
          {/* Negative delays start the float mid-cycle. Zeb also floats on this
              7s period, so all three carry their own phase and nothing in the
              composition bobs in unison. */}
          <div className="animate-float-soft" style={{ animationDelay: "-1.6s" }}>
            <div className="translate-y-5 rotate-[-6deg]">
              <DeviceFrame
                src={HERO_SCREENS.grocery[0].src}
                alt={HERO_SCREENS.grocery[0].alt}
                cycle={HERO_SCREENS.grocery}
                imgWidth={GROCERY.screenSize.w}
                imgHeight={GROCERY.screenSize.h}
                chrome={GROCERY.screenChrome}
                bandIncluded={GROCERY.screenBandIncluded}
                width={244}
                sizes="(min-width: 1024px) 280px, 220px"
                priority
              />
            </div>
          </div>
        </div>
        {/* RepForge — dark UI, overlapping in front. Its screens flip on the same
            cadence but half an interval behind Zebite's, so the two devices
            never change at once. */}
        <div className="-ml-12 animate-reveal-up" style={{ animationDelay: "640ms" }}>
          <div className="animate-float-soft" style={{ animationDelay: "-3.5s" }}>
            <div className="rotate-[6deg]">
              <DeviceFrame
                src={HERO_SCREENS.forge[0].src}
                alt={HERO_SCREENS.forge[0].alt}
                cycle={HERO_SCREENS.forge}
                cycleOffset={1900}
                imgWidth={FORGE.screenSize.w}
                imgHeight={FORGE.screenSize.h}
                chrome={FORGE.screenChrome}
                bandIncluded={FORGE.screenBandIncluded}
                width={222}
                sizes="(min-width: 1024px) 256px, 200px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dissolve the crop into the page instead of hard-cutting it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-graphite-900 via-graphite-900/85 to-transparent"
      />

      {/* Zeb steps out in front of the fade to present them.
          The offsets straddle the left device's edge rather than centring on
          it — he's the host, so he can overlap the frame, but he must not sit
          on top of the screen the device is there to show. Each one is the
          half-width of the (scaled) pair plus half of Zeb, so they have to be
          re-derived if the device widths or the scale steps change. */}
      <div className="absolute bottom-2 left-1/2 z-20 -translate-x-[160px] sm:bottom-3 sm:-translate-x-[208px] md:-translate-x-[250px] lg:-translate-x-[300px]">
        {/* Entrance lives on this inner layer, not the wrapper above: the wrapper
            is positioned with a translate, and an animation on the same element
            would overwrite it and drop Zeb back to the centre line. He arrives
            last, once there's something for him to present. */}
        <div className="relative animate-reveal-up" style={{ animationDelay: "780ms" }}>
          <span
            aria-hidden
            className="absolute inset-x-[-50%] bottom-[4%] h-1/3 rounded-[50%] blur-2xl"
            style={{ background: "radial-gradient(closest-side, rgba(245,245,243,0.16), transparent)" }}
          />
          <ZebMascot
            pose="wave"
            alt="Zeb, the Zhevion mascot, waving hello."
            priority
            sizes="(min-width: 1024px) 320px, 240px"
            className="relative w-[96px] animate-float-soft sm:w-[112px] md:w-[124px] lg:w-[140px]"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Backdrop: column rules + one light source.
 *
 * The rules are drawn on a `max-w-content` box so they land on the same grid as
 * the `.shell` copy above them, which is what makes the hero feel set rather
 * than assembled. The light reads as coming off the phone screens: a broad
 * cream pool with the two app accents bouncing faintly to either side of it.
 */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="hero-rules absolute inset-y-0 left-1/2 w-full max-w-content -translate-x-1/2" />

      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "radial-gradient(52% 74% at 50% 100%, rgba(245,245,243,0.10) 0%, transparent 72%)",
        }}
      />
      {/* Accent bounce, sat directly under each device so it reads as light
          coming off that screen. Kept small and dim — pushed out to the corners
          and turned up, this is exactly the blurred-blob look being replaced. */}
      <div
        className="absolute bottom-0 left-1/2 h-[30%] w-[420px] -translate-x-[380px] opacity-45"
        style={{ background: "radial-gradient(closest-side, #1B5C41 0%, transparent 78%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[30%] w-[420px] -translate-x-[40px] opacity-40"
        style={{ background: "radial-gradient(closest-side, #5B34E0 0%, transparent 78%)" }}
      />
    </div>
  );
}
