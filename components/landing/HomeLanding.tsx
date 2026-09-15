import { HomeHero } from "@/components/landing/HomeHero";
import { HomeSelectedWork } from "@/components/landing/HomeSelectedWork";
import { TeamSection } from "@/components/landing/TeamAbout";
import { STUDIO_HOME, STUDIO_SERVICES } from "@/lib/content";

export function HomeLanding() {
  return (
    <main id="main" className="zv-home">
      <HomeHero />
      <HomeSelectedWork />

      <section id="services" className="zv-services" aria-labelledby="zv-services-heading">
        <div className="zv-container">
          <header className="zv-services-intro">
            <h2 id="zv-services-heading">
              <span>Our services.</span>
              <br />
              {STUDIO_HOME.services.heading}
            </h2>
            <p>{STUDIO_HOME.services.body}</p>
          </header>

          <ol className="zv-service-grid">
            {STUDIO_SERVICES.map((service) => (
              <li key={service.number}>
                <span>{service.number}</span>
                <h3>{service.title}.</h3>
                <p>{service.body}</p>
                <strong>{service.outcome}</strong>
              </li>
            ))}
          </ol>

          <p className="zv-studio-statement">{STUDIO_HOME.hero.body}</p>
        </div>
      </section>

      <div className="zv-team-wrap">
        <TeamSection />
      </div>

      <section id="contact" className="zv-contact" aria-labelledby="zv-contact-heading">
        <div className="zv-container zv-contact-grid">
          <p>{STUDIO_HOME.contact.eyebrow}</p>
          <div>
            <h2 id="zv-contact-heading">{STUDIO_HOME.contact.heading}</h2>
            <p>{STUDIO_HOME.contact.body}</p>
            <a href="/start-a-project">Start a project <span aria-hidden>→</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
