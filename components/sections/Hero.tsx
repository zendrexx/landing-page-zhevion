"use client";

import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { GROCERY, FORGE } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden" aria-labelledby="hero-heading">
      {/* accent glows: green (grocery) left, violet (forge) right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #1B5C41 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7C5CFF 0%, transparent 70%)" }}
      />

      {/* On a desktop viewport the hero fills the screen below the 4rem sticky
          nav, so the next section starts off-screen instead of peeking in. */}
      <div className="shell relative z-10 grid grid-cols-1 items-center gap-14 py-16 md:py-24 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.05fr_1fr]">
        <div>
          <h1
            id="hero-heading"
            className="text-balance text-[2.6rem] font-extrabold leading-[1.02] tracking-tightest sm:text-6xl xl:text-7xl"
          >
            Eat smarter.
            <br />
            <span className="text-lime">Train</span>{" "}
            <span className="text-volt-soft">stronger.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted xl:text-xl">
            Building technology that makes everyday life healthier, simpler, and more efficient.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apps"
              onClick={() => trackCTA("hero-see-apps")}
              className="rounded-pill bg-cream px-6 py-3 text-sm font-bold text-graphite-900 transition hover:opacity-90"
            >
              See the apps
            </a>
            <a
              href="#get"
              onClick={() => trackCTA("hero-get-apps")}
              className="rounded-pill border border-white/18 px-6 py-3 text-sm font-bold text-cream transition hover:bg-white/5"
            >
              Get early access
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted">
            <span>Built with Flutter</span>
            <span aria-hidden className="text-white/20">·</span>
            <span>AI-powered</span>
            <span aria-hidden className="text-white/20">·</span>
            <span>iOS &amp; Android</span>
          </div>
        </div>

        {/* Paired devices: a real screen from each app.
            The frames are fixed-px (~380px combined) so they can't shrink to a
            narrow phone. A transform scales the whole pair to fit — down on
            small screens so nothing is clipped, up on desktop so it stays sharp
            (a transform, not a re-layout, so the grid column is never stretched).

            On mobile the pair is wider than the column, so it must fill the
            column (w-full + min-w-0) and let justify-center balance the overflow
            evenly — otherwise mx-auto shrink-wraps it to content width and it
            drifts to the right. From sm up the column is roomy again, so it
            reverts to shrink-to-fit centering (w-auto + mx-auto). */}
        <div className="relative mx-auto flex w-full min-w-0 items-end justify-center gap-0 scale-[0.8] sm:w-auto sm:scale-90 md:scale-100 md:justify-end lg:scale-110 xl:scale-125">
          <div className="animate-float-slow">
            <DeviceFrame
              src={GROCERY.screens[0].src}
              alt={GROCERY.screens[0].alt}
              imgWidth={GROCERY.screenSize.w}
              imgHeight={GROCERY.screenSize.h}
              chrome={GROCERY.screenChrome}
              width={220}
              priority
              className="rotate-[-5deg]"
            />
          </div>
          <div className="-ml-10 mb-8 animate-float-slow [animation-delay:1.5s]">
            <DeviceFrame
              src={FORGE.screens[0].src}
              alt={FORGE.screens[0].alt}
              imgWidth={FORGE.screenSize.w}
              imgHeight={FORGE.screenSize.h}
              chrome={FORGE.screenChrome}
              width={200}
              priority
              className="rotate-[6deg]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
