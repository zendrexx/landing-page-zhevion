import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY } from "@/lib/content";
import type { HomeProject } from "@/lib/home-projects";

export function HomeProjectVisual({
  project,
  priority = false,
  useHeroMedia = false,
  heroMediaOrientation = "responsive",
}: {
  project: HomeProject;
  priority?: boolean;
  useHeroMedia?: boolean;
  heroMediaOrientation?: "responsive" | "landscape";
}) {
  if (project.visual.kind === "image") {
    const visual = project.visual;

    return (
      <div className={`zv-project-visual zv-project-visual--${project.key}`}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={visual.fit === "cover" ? "object-cover" : "object-contain"}
        />
      </div>
    );
  }

  if (useHeroMedia && project.heroMedia) {
    if (heroMediaOrientation === "landscape") {
      return (
        <div className={`zv-project-visual zv-project-visual--${project.key} zv-project-visual--hero-media`}>
          <Image
            src={project.heroMedia.landscape}
            alt={project.heroMedia.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className={`zv-project-visual zv-project-visual--${project.key} zv-project-visual--hero-media`}>
        <Image
          src={project.heroMedia.portrait}
          alt={project.heroMedia.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="zv-project-hero-image zv-project-hero-image--portrait object-cover object-top"
        />
        <Image
          src={project.heroMedia.landscape}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="zv-project-hero-image zv-project-hero-image--landscape object-cover"
        />
      </div>
    );
  }

  const product = project.visual.product === "zebite" ? GROCERY : FORGE;
  const [firstIndex, secondIndex] = project.visual.screenIndexes;
  const first = product.screens[firstIndex]!;
  const second = product.screens[secondIndex]!;

  return (
    <div className={`zv-project-visual zv-project-visual--${project.key}`}>
      <div className="zv-project-art zv-project-art-a" aria-hidden />
      <div className="zv-project-art zv-project-art-b" aria-hidden />
      <p className="zv-project-art-copy" aria-hidden>
        {project.key === "zebite" ? "Plan with what you have." : "Log it. Lift it. Level up."}
      </p>
      <DeviceFrame
        src={first.src}
        alt={first.alt}
        imgWidth={product.screenSize.w}
        imgHeight={product.screenSize.h}
        width={236}
        chrome={product.screenChrome}
        bandIncluded={product.screenBandIncluded}
        priority={priority}
        sizes="(min-width: 1024px) 236px, 180px"
        className="zv-project-device zv-project-device-a"
      />
      <DeviceFrame
        src={second.src}
        alt={second.alt}
        imgWidth={product.screenSize.w}
        imgHeight={product.screenSize.h}
        width={236}
        chrome={product.screenChrome}
        bandIncluded={product.screenBandIncluded}
        sizes="(min-width: 1024px) 236px, 180px"
        className="zv-project-device zv-project-device-b"
      />
    </div>
  );
}
