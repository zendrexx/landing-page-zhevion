import { FORGE, GROCERY, GUANZON_PROJECT, PROJECTS } from "@/lib/content";

export type HomeProjectFact = {
  label: string;
  value: string;
};

export type HomeProject = {
  key: "zebite" | "repforge" | "guanzon" | "safetycrib";
  name: string;
  category: string;
  headline: string;
  teaser: string;
  href: string;
  external?: boolean;
  thumbnail: string;
  thumbnailAlt: string;
  /**
   * Marketing artwork used only on the homepage hero. Keep both crops so the
   * compact project tile and the wide project preview can each use the image
   * designed for their shape. Add the next app's files here when ready.
   */
  heroMedia?: {
    portrait: string;
    portraitAspectRatio: string;
    landscape: string;
    landscapeAspectRatio: string;
    alt: string;
  };
  facts: readonly HomeProjectFact[];
  visual:
    | {
        kind: "product";
        product: "zebite" | "repforge";
        screenIndexes: readonly [number, number];
      }
    | {
        kind: "image";
        src: string;
        alt: string;
        width: number;
        height: number;
        fit: "cover" | "contain";
      };
};

const safetyCrib = PROJECTS.find((project) => project.key === "safetycrib");

if (!safetyCrib || !("image" in safetyCrib)) {
  throw new Error("SafetyCrib project content is missing.");
}

/**
 * The homepage uses four pieces of real work. Copy and images continue to come
 * from the central content model; this file only shapes them into the compact
 * cards and 50/50 case-study rows used by the new homepage.
 */
export const HOME_PROJECTS = [
  {
    key: "zebite",
    name: GROCERY.name,
    category: "Zhevion product · Mobile app",
    headline: GROCERY.pitch,
    teaser: "Smarter groceries, planned around you.",
    href: "/work/zebite",
    external: false,
    // The four clickable cards below the hero copy are landscape thumbnails.
    // The portrait crop is used separately by HomeProjectMontage below them.
    thumbnail: "/hero/zebite_landscape.png",
    thumbnailAlt: "Zebite grocery-planning app shown across three phone screens.",
    // Homepage hero artwork. When RepForge (or another project) has matching
    // art, add the same `heroMedia` block to that project entry.
    heroMedia: {
      portrait: "/hero/zebite_portrait.png",
      portraitAspectRatio: "941 / 1672",
      landscape: "/hero/zebite_landscape.png",
      landscapeAspectRatio: "1448 / 1086",
      alt: "Zebite grocery-planning app shown across phone screens.",
    },
    facts: [
      { label: "Platform", value: "iOS + Android" },
      { label: "Focus", value: GROCERY.features[0].title },
      { label: "Built around", value: GROCERY.features[1].title },
    ],
    visual: {
      kind: "product",
      product: "zebite",
      screenIndexes: [0, 3],
    },
  },
  {
    key: "safetycrib",
    name: safetyCrib.name,
    category: "Portfolio work · Computer vision",
    headline: "A computer-vision infant safety system paired with a React Native mobile application.",
    teaser: "Computer vision for infant safety.",
    href: safetyCrib.href,
    external: true,
    thumbnail: safetyCrib.image,
    thumbnailAlt: "SafetyCrib mobile and desktop product screens.",
    facts: safetyCrib.tags.map((tag, index) => ({
      label: index === 0 ? "Focus" : index === 1 ? "Model" : "Platform",
      value: tag,
    })),
    visual: {
      kind: "image",
      src: safetyCrib.image,
      alt: "SafetyCrib mobile and desktop product screens.",
      width: 1536,
      height: 1024,
      fit: "cover",
    },
  },
  {
    key: "guanzon",
    name: "Guanzon GCAS",
    category: GUANZON_PROJECT.category,
    headline: GUANZON_PROJECT.divisions,
    teaser: "Inventory requests and approvals.",
    href: "/work/guanzon",
    external: false,
    thumbnail: GUANZON_PROJECT.image,
    thumbnailAlt: GUANZON_PROJECT.alt,
    facts: [
      { label: "Scale", value: "Six business divisions" },
      { label: "Workflow", value: "Entry + confirmation" },
      { label: "Technology", value: "Java + MySQL" },
    ],
    visual: {
      kind: "image",
      src: GUANZON_PROJECT.image,
      alt: GUANZON_PROJECT.alt,
      width: GUANZON_PROJECT.imageSize.w,
      height: GUANZON_PROJECT.imageSize.h,
      fit: "contain",
    },
  },
  {
    key: "repforge",
    name: FORGE.name,
    category: "Zhevion product · Mobile app",
    headline: `${FORGE.pitch} ${FORGE.features[0].title}, ${FORGE.features[1].title.toLowerCase()}, and progress tracking.`,
    teaser: FORGE.pitch,
    href: "/work/repforge",
    external: false,
    thumbnail: "/hero/repforge_landscape.png",
    thumbnailAlt: "RepForge strength-training app shown across phone screens.",
    heroMedia: {
      portrait: "/hero/repforge_portrait.png",
      portraitAspectRatio: "941 / 1672",
      landscape: "/hero/repforge_landscape.png",
      landscapeAspectRatio: "1672 / 941",
      alt: "RepForge strength-training app shown across phone screens.",
    },
    facts: [
      { label: "Platform", value: "iOS + Android" },
      { label: "Focus", value: FORGE.features[0].title },
      { label: "Built around", value: FORGE.features[1].title },
    ],
    visual: {
      kind: "product",
      product: "repforge",
      screenIndexes: [0, 3],
    },
  },
] as const satisfies readonly HomeProject[];

export function getHomeProduct(project: HomeProject) {
  if (project.visual.kind !== "product") return null;
  return project.visual.product === "zebite" ? GROCERY : FORGE;
}
