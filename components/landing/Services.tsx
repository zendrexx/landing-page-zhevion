const services = [["Business Systems", "Inventory · CRM · Internal tools · Dashboards"], ["Digital Products", "Mobile apps · SaaS · Customer portals"], ["Web & Automation", "Websites · Integrations · AI workflows"]] as const;

export function Services() {
  return <section id="services" className="scroll-mt-24 border-y border-ink/10 bg-paper-deep py-[clamp(56px,7vw,88px)]" aria-labelledby="services-heading"><div className="shell"><p className="text-sm font-semibold text-ink-soft">Services</p><h2 id="services-heading" className="mt-3 text-[clamp(2.25rem,4.5vw,4rem)] font-extrabold tracking-[-.055em]">What we build.</h2><ul className="mt-9 grid gap-px border border-ink/15 bg-ink/15 md:grid-cols-3">{services.map(([title, items]) => <li key={title} className="bg-paper-deep p-6 sm:p-8"><h3 className="text-xl font-extrabold tracking-[-.035em]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{items}</p></li>)}</ul></div></section>;
}
