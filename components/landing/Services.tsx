import { STUDIO_HOME, STUDIO_SERVICES } from "@/lib/content";

type Service = (typeof STUDIO_SERVICES)[number];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-ink/10 bg-paper-deep py-[clamp(72px,9vw,120px)]"
      aria-labelledby="services-heading"
    >
      <div className="shell">
        <header className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <p className="text-sm font-semibold text-ink-soft">{STUDIO_HOME.services.eyebrow}</p>
          <div>
            <h2
              id="services-heading"
              className="max-w-[17ch] text-[clamp(2.35rem,4.7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em]"
            >
              {STUDIO_HOME.services.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              {STUDIO_HOME.services.body}
            </p>
          </div>
        </header>

        <ol className="mt-[clamp(48px,7vw,80px)] border-t border-ink/20">
          {STUDIO_SERVICES.map((service) => (
            <ServiceRow key={service.number} service={service} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="grid gap-5 border-b border-ink/15 py-7 sm:py-9 lg:grid-cols-[5rem_0.85fr_1.15fr] lg:gap-8 lg:py-11">
      <span className="text-sm font-bold tabular-nums text-forest-500">{service.number}</span>
      <div>
        <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.035em] sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-lg text-base leading-[1.7] text-ink-soft">{service.body}</p>
      </div>
      <ul className="grid content-start gap-x-8 gap-y-3 sm:grid-cols-2 lg:pt-1">
        {service.items.map((item) => (
          <li key={item} className="border-t border-ink/12 pt-3 text-sm font-semibold leading-snug text-ink">
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}
