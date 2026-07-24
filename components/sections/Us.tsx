import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { US } from "@/lib/content";

/**
 * "Us" — the two people behind the studio, one portrait each. Entries marked
 * `placeholder` render a visible "Photo coming" chip rather than passing a
 * stand-in off as a real picture, and an entry with an `href` gets a portfolio
 * link under its role.
 */
export function Us() {
  return (
    <section
      id="us"
      className="border-y border-white/10 bg-graphite-800 py-20 md:py-28"
      aria-labelledby="us-heading"
    >
      <div className="shell">
        <Reveal className="grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-14">
          {/* Two portraits */}
          <ul className="mx-auto grid w-full max-w-[420px] grid-cols-2 gap-4">
            {US.people.map((p) => (
              <li key={p.name}>
                <figure>
                  <div className="relative">
                    <div
                      aria-hidden
                      className="absolute -inset-2 rounded-[22px] bg-gradient-to-br from-lime/20 to-volt/20 blur-lg"
                    />
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={900}
                      height={900}
                      sizes="(min-width: 768px) 200px, 45vw"
                      className="relative aspect-square w-full rounded-[18px] object-cover ring-1 ring-white/12"
                    />
                    {p.placeholder && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill border border-white/15 bg-graphite-900/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur-sm">
                        Photo coming
                      </span>
                    )}
                  </div>
                  <figcaption className="mt-3">
                    <p className="text-sm font-bold text-cream">{p.name}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">{p.role}</p>
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${p.name}'s portfolio (opens in a new tab)`}
                        className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-lime transition hover:text-cream"
                      >
                        Portfolio
                        <span aria-hidden>↗</span>
                      </a>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {/* Words */}
          <div>
            <p className="eyebrow text-muted">{US.eyebrow}</p>
            <h2
              id="us-heading"
              className="mt-4 text-3xl font-extrabold tracking-tightest sm:text-4xl"
            >
              {US.heading}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {US.body.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
