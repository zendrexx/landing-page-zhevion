import { Reveal } from "@/components/ui/Reveal";
import { STUDIO } from "@/lib/content";

const POINTS = [
  {
    title: "Simple & reliable",
    body: "Offline-first, fast, and dependable. The app works the moment you open it.",
  },
  {
    title: "Privacy-respecting",
    body: "Your data is yours. We don't sell it, and we don't build ad profiles from it.",
  },
  {
    title: "AI that reasons",
    body: "AI works over real models and your real data to reason, never to fabricate numbers.",
  },
];

export function Philosophy() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="philosophy-heading">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-muted">Why Zhevion</p>
          <h2 id="philosophy-heading" className="mt-4 text-3xl font-extrabold tracking-tightest sm:text-4xl">
            Built the way good tools should be.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="rounded-card border border-white/10 bg-graphite-800 p-6"
            >
              <h3 className="text-base font-bold text-cream">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>

        {/* honest "what we don't do" */}
        <Reveal className="mt-6 rounded-card border border-white/10 bg-graphite-800 p-6">
          <p className="text-sm font-semibold text-cream">What we don't do</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {STUDIO.antiPatterns.map((a) => (
              <li
                key={a}
                className="rounded-pill border border-white/12 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-muted"
              >
                <span aria-hidden className="mr-1.5 text-cream/50">✕</span>
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
