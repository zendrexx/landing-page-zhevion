import Image from "next/image";
import { HeroProjectReveal } from "@/components/landing/HeroProjectReveal";
import { TeamSection } from "@/components/landing/TeamAbout";
import { FORGE, GROCERY, GUANZON_PROJECT, STUDIO_HOME } from "@/lib/content";

const PROJECTS = [
  { number: "01", name: "Guanzon GCAS", type: "Business system", description: "One structured transaction workflow across six business divisions.", href: "/work/guanzon", image: GUANZON_PROJECT.image, alt: GUANZON_PROJECT.alt },
  { number: "02", name: "Zebite", type: "Mobile product", description: "A pantry-first grocery planner for better meals, budgets, and less waste.", href: "/work/zebite", image: GROCERY.screens[0].src, alt: GROCERY.screens[0].alt },
  { number: "03", name: "RepForge", type: "Mobile product", description: "A focused training companion for following programs and tracking progress.", href: "/work/repforge", image: FORGE.screens[0].src, alt: FORGE.screens[0].alt },
] as const;

const SERVICES = ["Product strategy", "Digital product design", "Web & mobile development", "Business systems", "Websites & automation"];

export function SignificaHome() {
  return <main id="main" className="significa-home on-dark">
    <section className="sf-hero shell" aria-labelledby="sf-hero-heading">
      <div className="sf-hero-copy"><p>Zhevion / Digital product studio</p><h1 id="sf-hero-heading">Plan.<br />Build.<br /><em>Put to work.</em></h1><HeroProjectReveal /></div>
    </section>
    <section id="work" className="sf-work" aria-labelledby="sf-work-heading"><div className="shell"><header><p>Selected work</p><h2 id="sf-work-heading">Digital products built around real work.</h2></header></div><div className="sf-projects">{PROJECTS.map((project) => <a key={project.name} href={project.href} className="sf-project"><div className="sf-project-image"><Image src={project.image} alt={project.alt} fill sizes="100vw" className={project.number === "01" ? "object-cover" : "object-contain"} /></div><div className="shell sf-project-caption"><p>{project.number} / {project.type}</p><h3>{project.name}</h3><p>{project.description}</p><span>View project ↗</span></div></a>)}</div></section>
    <section id="services" className="sf-services" aria-labelledby="sf-services-heading"><div className="shell"><p>Our services</p><div><h2 id="sf-services-heading">From the first useful idea to software people rely on.</h2><p>{STUDIO_HOME.hero.body}</p></div><ol>{SERVICES.map((service, index) => <li key={service}><span>{String(index + 1).padStart(2, "0")}</span>{service}<b aria-hidden>↗</b></li>)}</ol></div></section>
    <section id="about" className="sf-about" aria-labelledby="sf-about-heading"><div className="shell"><p>About Zhevion</p><h2 id="sf-about-heading">A small team for meaningful digital work.</h2><p>We work closely with organisations and founders to turn unclear processes into useful tools, products, and experiences.</p><a href="#contact">How we work ↗</a></div></section>
    <TeamSection />
    <section className="sf-journal" aria-labelledby="sf-journal-heading"><div className="shell"><header><p>Journal</p><h2 id="sf-journal-heading">Notes from the work.</h2><a href="/blog">Visit the journal ↗</a></header><div className="sf-journal-empty"><span>Thinking</span><p>Product decisions, systems, design, and practical lessons from building software.</p></div></div></section>
    <section id="contact" className="sf-contact" aria-labelledby="sf-contact-heading"><div className="shell"><p>Start a project</p><h2 id="sf-contact-heading">Have something that needs to work better?</h2><a href="mailto:hello@zhevion.com">hello@zhevion.com <span aria-hidden>↗</span></a></div></section>
  </main>;
}
