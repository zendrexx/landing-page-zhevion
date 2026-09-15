import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY } from "@/lib/content";
import type { HomeProject } from "@/lib/home-projects";

export function HomeProjectVisual({
  project,
  priority = false,
}: {
  project: HomeProject;
  priority?: boolean;
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
