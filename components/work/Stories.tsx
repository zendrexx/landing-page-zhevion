import { WORK, PROJECTS } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";

/**
 * Dark panel embedded in an otherwise-light page — `.dark-panel` mirrors
 * `.on-dark` (ground + re-pointed focus ring) without its route-level
 * `min-height: 100dvh`, which would be wrong for a section instead of a page.
 */
export function Stories() {
  return (
    <div className="dark-panel relative overflow-hidden py-[clamp(72px,14vh,160px)]">
      <div className="shell relative">
        <p className="eyebrow text-volt-soft">{WORK.storiesEyebrow}</p>
        <h2 className="mt-4 max-w-[18ch] text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold leading-[1.15] tracking-tightest text-cream">
          {WORK.storiesHeading}
        </h2>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.key} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
