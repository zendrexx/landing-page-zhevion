import { STACK } from "@/lib/content";

const TRACK = [...STACK.items, ...STACK.items, ...STACK.items];

/**
 * Endless-scrolling tech-stack strip, embedded in the dark passage between
 * Hero and Statement. Pure CSS (`animate-marquee`) — no scroll-linking, no
 * reduced-motion hook needed, since the sitewide `prefers-reduced-motion`
 * rule in globals.css already collapses CSS animation durations.
 */
export function Stack() {
  return (
    <section className="dark-panel relative overflow-hidden py-[clamp(56px,10vh,120px)]">
      <div className="shell">
        <p className="eyebrow text-volt-soft">{STACK.eyebrow}</p>
      </div>

      <div className="stack-fade relative mt-10 overflow-hidden">
        <div aria-hidden className="flex w-max items-center gap-x-10 animate-marquee">
          {TRACK.map((name, i) => (
            <span key={i} className="flex shrink-0 items-center gap-x-10">
              <span className="whitespace-nowrap text-[clamp(1.5rem,3.2vw,2.75rem)] font-extrabold tracking-tightest text-cream">
                {name}
              </span>
              <span aria-hidden className="text-lime/60">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">Our stack: {STACK.items.join(", ")}.</p>
    </section>
  );
}
