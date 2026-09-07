import { Reveal } from "@/components/ui/Reveal";
import { STUDIO_HOME, STUDIO_SERVICES } from "@/lib/content";

type Service = (typeof STUDIO_SERVICES)[number];

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-ink/10 bg-paper-deep py-[clamp(84px,12vw,150px)]"
      aria-labelledby="services-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-ink-faint">{STUDIO_HOME.services.eyebrow}</p>
            <h2
              id="services-heading"
              className="mt-4 max-w-[14ch] text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[1] tracking-[-0.055em]"
            >
              {STUDIO_HOME.services.heading}
            </h2>
          </div>
          <p className="max-w-lg text-base font-medium leading-[1.75] text-ink-soft sm:text-lg lg:justify-self-end">
            {STUDIO_HOME.services.body}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {STUDIO_SERVICES.map((service, index) => (
            <Reveal key={service.number} delay={index * 70}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full min-h-[430px] flex-col rounded-[24px] border border-ink/10 bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-ink/25 sm:p-8">
      <div className="flex items-center justify-between border-b border-ink/10 pb-5">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
          Service
        </span>
        <span className="text-sm font-extrabold text-forest-500">{service.number}</span>
      </div>

      <h3 className="mt-8 text-2xl font-extrabold tracking-[-0.035em] sm:text-[1.75rem]">
        {service.title}
      </h3>
      <p className="mt-4 text-base leading-[1.7] text-ink-soft">{service.body}</p>

      <ul className="mt-8 space-y-3">
        {service.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm font-semibold text-ink-soft">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-auto border-t border-ink/10 pt-6 text-sm font-bold leading-relaxed text-ink">
        {service.outcome}
      </p>
    </article>
  );
}
