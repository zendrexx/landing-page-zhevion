const services = [["01", "Business systems", "Inventory · CRM · Internal tools · Dashboards"], ["02", "Digital products", "Mobile apps · Web applications · Customer portals"], ["03", "Websites & automation", "Websites · Integrations · AI-assisted workflows"]] as const;

export function Services() {
  return <section id="services" className="capabilities scroll-mt-24" aria-labelledby="services-heading"><div className="shell"><div className="capabilities-intro"><p>Capabilities</p><h2 id="services-heading">Useful from the first version.</h2><span>From a business bottleneck to a product people can actually use.</span></div><ul>{services.map(([number, title, items]) => <li key={title}><span>{number}</span><h3>{title}</h3><p>{items}</p><i aria-hidden>↗</i></li>)}</ul></div></section>;
}
