import Image from "next/image";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { FORGE, GROCERY, GUANZON_PROJECT, PROJECTS } from "@/lib/content";

const moreWork = PROJECTS.filter(
  (project): project is Extract<(typeof PROJECTS)[number], { image: string }> =>
    "image" in project && project.key !== "guanzon",
);

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24" aria-labelledby="work-heading">
      <div className="shell pt-[clamp(72px,10vw,128px)]">
        <header className="border-t border-ink/15 pt-6">
          <p className="text-sm font-semibold text-ink-soft">Selected work</p>
          <h2 id="work-heading" className="mt-4 max-w-[13ch] text-[clamp(2.7rem,6vw,5.5rem)] font-extrabold leading-[.94] tracking-[-.06em]">Built for real work.</h2>
        </header>

        <div className="mt-[clamp(52px,8vw,100px)] space-y-[clamp(88px,12vw,160px)]">
          <GuanzonProject />
          <ZebiteProject />
          <RepForgeProject />
        </div>
        <MoreWork />
      </div>
    </section>
  );
}

function ProjectCopy({ number, name, category, description, facts, href }: { number: string; name: string; category: string; description: string; facts: string[]; href: string }) {
  return <header className="grid gap-5 border-t border-ink/20 pt-5 lg:grid-cols-[.7fr_1.3fr] lg:gap-12"><div><p className="text-sm font-semibold text-ink-faint">{number} / {category}</p><h3 className="mt-4 text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold leading-[.92] tracking-[-.06em]">{name}</h3></div><div className="lg:pt-2"><p className="max-w-2xl text-lg font-medium leading-[1.6] text-ink sm:text-xl">{description}</p><p className="mt-4 text-sm font-bold leading-relaxed text-ink-soft">{facts.join(" · ")}</p><a className="text-link mt-6 inline-block text-sm font-bold" href={href}>View project →</a></div></header>;
}

function GuanzonProject() {
  return <article id="guanzon" className="scroll-mt-24"><ProjectCopy number="01" name="Guanzon GCAS" category="Business system" description="Internal inventory request system built around real approval and stock workflows." facts={["6 business divisions", "Request approvals", "Stock tracking"]} href={GUANZON_PROJECT.image} /><figure className="work-plate mt-9 sm:mt-12"><Image src={GUANZON_PROJECT.image} alt={GUANZON_PROJECT.alt} width={1630} height={965} quality={92} sizes="(min-width: 1280px) 1104px, 92vw" className="block h-auto w-full" /><figcaption className="border-t border-ink/10 px-4 py-3 text-sm text-ink-soft">Inventory Stock Request System · record data blurred for privacy</figcaption></figure></article>;
}

function ZebiteProject() {
  const screens = [GROCERY.screens[0], GROCERY.screens[3], GROCERY.screens[4]];
  return <article id="zebite" className="scroll-mt-24"><ProjectCopy number="02" name="Zebite" category="Digital product · Mobile app" description="A pantry-first grocery planner that helps people plan meals, shop within budget, and waste less." facts={["Production Android application", "AI meal planning", "Pantry and budget tracking"]} href={GROCERY.learnMoreHref} /><div className="film-rail mt-9 flex gap-5 pb-3 sm:mt-12 sm:gap-8">{screens.map((screen) => <DeviceFrame key={screen.src} src={screen.src} alt={screen.alt} imgWidth={GROCERY.screenSize.w} imgHeight={GROCERY.screenSize.h} width={300} chrome={GROCERY.screenChrome} bandIncluded={GROCERY.screenBandIncluded} sizes="(min-width: 768px) 300px, 74vw" className="shrink-0" />)}</div></article>;
}

function RepForgeProject() {
  const screens = [FORGE.screens[0], FORGE.screens[3], FORGE.screens[5]];
  return <article id="repforge" className="scroll-mt-24"><ProjectCopy number="03" name="RepForge" category="Digital product · Mobile app" description="A strength-training companion for following programs, logging sessions, and tracking progress." facts={["Designed + developed in-house", "Offline workout logging", "Programs and progress tracking"]} href="/work#repforge" /><div className="dark-panel mt-9 overflow-hidden rounded-card p-6 sm:mt-12 sm:p-10"><div className="film-rail flex gap-5 pb-3 sm:justify-center sm:gap-8">{screens.map((screen) => <DeviceFrame key={screen.src} src={screen.src} alt={screen.alt} imgWidth={FORGE.screenSize.w} imgHeight={FORGE.screenSize.h} width={270} chrome={FORGE.screenChrome} bandIncluded={FORGE.screenBandIncluded} sizes="270px" className="shrink-0" />)}</div></div></article>;
}

function MoreWork() {
  return <section className="mt-[clamp(88px,12vw,160px)] border-t border-ink/20 pb-[35px] pt-6" aria-labelledby="more-work-heading"><h2 id="more-work-heading" className="text-[clamp(2.3rem,4.5vw,4.25rem)] font-extrabold tracking-[-.055em]">More work</h2><div className="mt-8 grid gap-5 sm:grid-cols-3">{moreWork.map((project) => <a key={project.key} href={project.href} target="_blank" rel="noreferrer" className="group block"><div className="relative aspect-[4/3] overflow-hidden rounded-card border border-ink/10 bg-paper-deep"><Image src={project.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /></div><p className="mt-3 text-base font-extrabold tracking-[-.025em]">{project.name}</p></a>)}</div></section>;
}

type StudioProduct = typeof GROCERY | typeof FORGE;
export type PortfolioProject = Extract<(typeof PROJECTS)[number], { kind: "Portfolio" }>;

// Shared by /work. The homepage uses its more editorial project compositions
// above; these keep the complete work index independently useful.
export function ProductProjectCard({ product, number, category, screenIndexes, tone, reverse = false }: { product: StudioProduct; number: string; category: string; screenIndexes: [number, number]; tone: "grocery" | "forge"; reverse?: boolean }) {
  const screens = screenIndexes.map((index) => product.screens[index]!);
  return <article className={`grid gap-6 border-t border-[var(--zv-theme-border)] pt-6 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}><div><p className="text-sm font-semibold text-[var(--zv-theme-tertiary)]">{number} / {category}</p><h3 className="mt-4 text-4xl font-extrabold tracking-[-.055em]">{product.name}</h3><p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--zv-theme-secondary)]">{product.pitch}</p>{product.learnMoreHref ? <a href={product.learnMoreHref} className="mt-5 inline-block text-sm font-bold text-[var(--zv-theme-fg)] underline decoration-current/30 underline-offset-4">View project →</a> : null}</div><div className={`dark-panel flex gap-4 overflow-hidden rounded-card p-5 ${tone === "grocery" ? "bg-forest-500" : ""}`}>{screens.map((screen) => <DeviceFrame key={screen.src} src={screen.src} alt={screen.alt} imgWidth={product.screenSize.w} imgHeight={product.screenSize.h} width={210} chrome={product.screenChrome} bandIncluded={product.screenBandIncluded} sizes="210px" className="min-w-0" />)}</div></article>;
}

export function PortfolioBigCard({ project, number, reverse = false }: { project: PortfolioProject; number: string; reverse?: boolean }) {
  return <article className={`grid gap-6 border-t border-[var(--zv-theme-border)] pt-6 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}><div><p className="text-sm font-semibold text-[var(--zv-theme-tertiary)]">{number} / Portfolio work</p><h3 className="mt-4 text-3xl font-extrabold tracking-[-.05em]">{project.name}</h3><p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--zv-theme-secondary)]">{project.summary}</p><p className="mt-4 text-sm font-semibold text-[var(--zv-theme-secondary)]">{project.tags.join(" · ")}</p><a href={project.href} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-bold text-[var(--zv-theme-fg)] underline decoration-current/30 underline-offset-4">View project →</a></div><div className="relative aspect-[16/10] overflow-hidden rounded-card border border-[var(--zv-theme-border)] bg-[var(--zv-theme-offset)]"><Image src={project.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /></div></article>;
}
