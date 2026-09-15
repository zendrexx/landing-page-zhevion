import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY } from "@/lib/content";
import { HOME_PROJECTS } from "@/lib/home-projects";

export function HomeProjectMontage() {
  return (
    <div className="zv-hero-montage" role="group" aria-label="Four selected Zhevion projects">
      {HOME_PROJECTS.map((project, index) => (
        <div className={`zv-montage-panel zv-montage-panel--${project.key}`} key={project.key}>
          {"heroMedia" in project && project.heroMedia ? (
            <div className="zv-montage-hero-image">
              <Image
                src={project.heroMedia.square}
                alt={project.heroMedia.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 767px) 50vw, 25vw"
                className="zv-montage-hero-image--square object-cover"
              />
              <Image
                src={project.heroMedia.portrait}
                alt={project.heroMedia.alt}
                fill
                sizes="25vw"
                className="zv-montage-hero-image--portrait object-cover object-top"
              />
            </div>
          ) : project.visual.kind === "product" ? (
            <MontagePhone project={project} priority={index === 0} />
          ) : "montageImage" in project && project.montageImage ? (
            <div className="zv-montage-image">
              <Image
                src={project.montageImage.mobile}
                alt={project.montageImage.alt}
                fill
                priority={index === 2}
                sizes="(max-width: 767px) 50vw, 0px"
                className="zv-montage-image--mobile object-cover"
              />
              <Image
                src={project.montageImage.desktop}
                alt=""
                fill
                priority={index === 2}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 25vw, 0px"
                className="zv-montage-image--desktop object-cover"
              />
            </div>
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
