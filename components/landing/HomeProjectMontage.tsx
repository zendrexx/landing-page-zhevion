import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY } from "@/lib/content";
import { HOME_PROJECTS } from "@/lib/home-projects";

export function HomeProjectMontage() {
  return (
    <div className="zv-hero-montage" role="group" aria-label="Four selected Zhevion projects">
      {HOME_PROJECTS.map((project, index) => (
        <div className={`zv-montage-panel zv-montage-panel--${project.key}`} key={project.key}>
          <div className="zv-montage-label">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.name}</strong>
          </div>

          {project.visual.kind === "product" ? (
            <MontagePhone project={project} priority={index === 0} />
          ) : (
            <div className="zv-montage-image">
              <Image
                src={project.visual.src}
                alt=""
                fill
                priority={index === 2}
                sizes="(min-width: 1280px) 25vw, 50vw"
                className={project.visual.fit === "contain" ? "object-contain" : "object-cover"}
              />
            </div>
          )}
        </div>
      ))}

      <a href="#work" className="zv-montage-cta">
        View selected work <span aria-hidden>↓</span>
      </a>
    </div>
  );
}

function MontagePhone({
  project,
  priority,
}: {
  project: (typeof HOME_PROJECTS)[number];
  priority: boolean;
}) {
  if (project.visual.kind !== "product") return null;

  const product = project.visual.product === "zebite" ? GROCERY : FORGE;
  const screen = product.screens[project.visual.screenIndexes[0]]!;

  return (
    <DeviceFrame
      src={screen.src}
      alt=""
      imgWidth={product.screenSize.w}
      imgHeight={product.screenSize.h}
      width={236}
      chrome={product.screenChrome}
      bandIncluded={product.screenBandIncluded}
      priority={priority}
      sizes="236px"
      className="zv-montage-phone"
    />
  );
}
