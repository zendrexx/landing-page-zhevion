import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { GroceryMark, ForgeMark } from "@/components/brand/AppLockups";
import { STUDIO, GROCERY, FORGE } from "@/lib/content";

/**
 * "What is Zhevion" — a bento grid rather than a wall of text.
 *
 * Cards carry the studio's ethos and its three principles (from STUDIO in
 * lib/content.ts — no copy is invented here), each paired with a Zeb pose, plus
 * a real screen from each app. Spans vary on desktop and collapse to a single
 * column on mobile, hero card first.
 *
 * The mascot art is decorative — every card already states its point in text —
 * so it is marked aria-hidden with an empty alt.
 */

/** Shared card chrome so hover/motion stays identical across the grid. */
const CARD =
  "group relative overflow-hidden rounded-card border border-white/10 bg-graphite-900 " +
  "transition duration-200 hover:border-white/25 motion-safe:hover:scale-[1.02]";

/**
 * Thumbnails, not the main event — the full-size galleries live in the showcase
 * sections. They stay whole (never cropped) and small enough that the two rows
 * they occupy don't stretch the "Meet Zeb" card beside them into empty space.
 */
const SCREEN_WELL = "relative mx-auto mt-4";
const SCREEN_W = 124;

function Mascot({
  src,
  className,
  width,
  height,
}: {
  src: string;
  className: string;
  width: number;
  height: number;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      className={`pointer-events-none absolute select-none ${className}`}
    />
  );
}

export function StudioIntro() {
  const [focused, ai, design] = STUDIO.principles;

  return (
    <section id="about" className="border-y border-white/10 bg-graphite-800 py-20 md:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-muted">What is Zhevion</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tightest sm:text-4xl">
            One studio, focused on your health and performance.
          </h2>
        </Reveal>

        {/* auto rows use minmax so a card can grow past the base height rather
            than clipping its copy at narrow widths */}
        <div className="mt-12 grid auto-rows-[minmax(186px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Hero: Zeb + the studio ethos */}
          <Reveal className="sm:col-span-2 sm:row-span-2">
            <article className={`${CARD} flex h-full flex-col justify-center gap-6 p-6 sm:p-7`}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(420px 240px at 88% 92%, rgba(181,227,77,0.16), transparent 70%), radial-gradient(360px 220px at 8% 8%, rgba(124,92,255,0.14), transparent 70%)",
                }}
              />
              {/* keep copy clear of the mascot's column */}
              <div className="relative max-w-[62%] sm:max-w-[68%]">
                <p className="eyebrow text-lime">Meet Zeb</p>
                <p className="mt-3 text-lg font-bold leading-snug text-cream sm:text-xl">
                  Two apps, one mission: take better care of your body.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{STUDIO.ethos}</p>
              </div>
              {/* both app marks, sitting just under the copy opposite Zeb */}
              <ul className="relative flex flex-wrap items-center gap-2">
                {[
                  { mark: <GroceryMark size={26} />, name: GROCERY.name },
                  { mark: <ForgeMark size={26} />, name: FORGE.name },
                ].map((a) => (
                  <li
                    key={a.name}
                    className="inline-flex items-center gap-2 rounded-pill border border-white/12 bg-white/5 py-1 pl-1 pr-3.5"
                  >
                    {a.mark}
                    <span className="text-xs font-bold text-cream">{a.name}</span>
                  </li>
                ))}
              </ul>
              {/* On mobile (single column) Zeb sits centred on the right rather
                  than jammed in the corner next to the app pills; from sm up the
                  card gains its second column and he drops back to the corner. */}
              <Mascot
                src="/mascot/zeb/zeb-wave.png"
                width={1024}
                height={1024}
                className="right-2 top-1/2 h-auto w-[36%] max-w-[190px] -translate-y-1/2 drop-shadow-[0_16px_26px_rgba(0,0,0,0.5)] sm:bottom-3 sm:right-3 sm:top-auto sm:w-[32%] sm:translate-y-0"
              />
            </article>
          </Reveal>

          {/* Zebite */}
          <Reveal delay={70} className="row-span-2">
            <article className={`${CARD} flex h-full flex-col p-6`}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(320px 260px at 50% 110%, rgba(27,92,65,0.55), transparent 72%)",
                }}
              />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wider text-lime">App 01</p>
                <h3 className="mt-1 text-lg font-bold text-cream">{GROCERY.name}</h3>
                <p className="mt-1.5 text-sm leading-snug text-muted">Eat smarter.</p>
              </div>
              <div className={SCREEN_WELL}>
                <DeviceFrame
                  src={GROCERY.screens[0].src}
                  alt={GROCERY.screens[0].alt}
                  imgWidth={GROCERY.screenSize.w}
                  imgHeight={GROCERY.screenSize.h}
                  chrome={GROCERY.screenChrome}
                  bandIncluded={GROCERY.screenBandIncluded}
                  width={SCREEN_W}
                />
              </div>
            </article>
          </Reveal>

          {/* RepForge */}
          <Reveal delay={140} className="row-span-2">
            <article className={`${CARD} flex h-full flex-col p-6`}>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(320px 260px at 50% 110%, rgba(124,92,255,0.42), transparent 72%)",
                }}
              />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wider text-volt-soft">App 02</p>
                <h3 className="mt-1 text-lg font-bold text-cream">{FORGE.name}</h3>
                <p className="mt-1.5 text-sm leading-snug text-muted">Train stronger.</p>
              </div>
              <div className={SCREEN_WELL}>
                <DeviceFrame
                  src={FORGE.screens[0].src}
                  alt={FORGE.screens[0].alt}
                  imgWidth={FORGE.screenSize.w}
                  imgHeight={FORGE.screenSize.h}
                  chrome={FORGE.screenChrome}
                  bandIncluded={FORGE.screenBandIncluded}
                  width={SCREEN_W}
                />
              </div>
            </article>
          </Reveal>

          {/* Principles */}
          <Reveal delay={210}>
            <Principle
              title={ai.title}
              body={ai.body}
              src="/mascot/zeb/zeb-ai.png"
              width={1008}
              height={1008}
            />
          </Reveal>

          <Reveal delay={280}>
            <Principle
              title={focused.title}
              body={focused.body}
              src="/mascot/zeb/zeb-budget.png"
              width={1024}
              height={1024}
            />
          </Reveal>

          <Reveal delay={350} className="sm:col-span-2">
            <Principle
              title={design.title}
              body={design.body}
              src="/mascot/zeb/zeb-pr.png"
              width={1024}
              height={1024}
              wide
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Principle({
  title,
  body,
  src,
  width,
  height,
  wide = false,
}: {
  title: string;
  body: string;
  src: string;
  width: number;
  height: number;
  wide?: boolean;
}) {
  // The wide card is twice as long as its copy needs, so instead of pinning the
  // mascot to the far corner (which left a canyon of empty card between them),
  // the two sit side by side and the pair stays packed to the left.
  if (wide) {
    return (
      <article className={`${CARD} flex h-full items-center gap-5 p-6`}>
        <div className="relative max-w-sm">
          <h3 className="text-base font-bold text-cream">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        </div>
        <Image
          src={src}
          alt=""
          aria-hidden
          width={width}
          height={height}
          className="pointer-events-none relative h-auto w-[100px] shrink-0 select-none opacity-95 drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] sm:w-[120px]"
        />
      </article>
    );
  }

  // At lg these cards are only a quarter of the grid (~264px), so a percentage
  // tuned for the wider 2-column breakpoint renders Zeb postage-stamp sized.
  // He gets a bigger share there, and the copy column narrows to stay clear.
  return (
    <article className={`${CARD} h-full p-6`}>
      <div className="relative max-w-[62%] lg:max-w-[54%]">
        <h3 className="text-base font-bold text-cream">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
      <Mascot
        src={src}
        width={width}
        height={height}
        className="bottom-3 right-3 h-auto w-[26%] max-w-[130px] opacity-95 drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] lg:-right-1 lg:bottom-1 lg:w-[42%] lg:max-w-[160px]"
      />
    </article>
  );
}
