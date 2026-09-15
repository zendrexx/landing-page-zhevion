import { HomeProjectVisual } from "@/components/landing/HomeProjectVisual";
import { HOME_PROJECTS } from "@/lib/home-projects";

export function HomeSelectedWork() {
  return (
    <section id="work" className="zv-selected-work" aria-labelledby="zv-work-heading">
      <div className="zv-container">
        <h2 id="zv-work-heading" className="zv-section-title">
          Selected work.
        </h2>
      </div>

      <div className="zv-work-list">
        {HOME_PROJECTS.map((project) => (
          <article className="zv-work-item" key={project.key}>
            <a
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className="zv-work-card-link"
              aria-label={`View ${project.name} project${project.external ? ", opens in a new tab" : ""}`}
            >
              <div className="zv-container zv-work-item-grid">
                <div className="zv-work-copy">
                  <div>
                    <div className="zv-work-heading">
                      <h3>{project.name}.</h3>
                      <p>{project.headline}</p>
                    </div>

                    <dl className="zv-work-facts">
                      {project.facts.map((fact, index) => (
                        <div key={`${project.key}-${fact.label}-${fact.value}`}>
                          <span className={`zv-fact-mark zv-fact-mark-${index + 1}`} aria-hidden>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <span className="zv-outline-button" aria-hidden>
                    View project <span>→</span>
                  </span>
                </div>

                <div className="zv-work-visual">
                  <HomeProjectVisual project={project} />
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
