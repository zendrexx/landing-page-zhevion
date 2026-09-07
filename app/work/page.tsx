import type { Metadata } from "next";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ProductProjectCard, PortfolioBigCard, type PortfolioProject } from "@/components/landing/SelectedWork";
import { FORGE, GROCERY, PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work | Zhevion",
  description:
    "Everything Zhevion has built — our own products, Zebite and RepForge, plus freelance and portfolio work from the people behind the studio.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const portfolioProjects = PROJECTS.filter(
    (project): project is PortfolioProject => project.kind === "Portfolio",
  );

  return (
    <>
      <SiteNav base="/" />
      <main id="main" className="pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="shell">
          <Reveal className="border-t border-ink/12 pt-6">
            <p className="eyebrow text-ink-faint">Selected work</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
              Everything we&apos;ve built.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              Our own products, and the freelance and portfolio work of the people who build them. No case studies
              padded out with borrowed screenshots — every piece here is real, shipped work.
            </p>
          </Reveal>

          <div className="mt-14 space-y-6 sm:mt-20 sm:space-y-8">
            <ProductProjectCard
              product={GROCERY}
              number="01"
              category="Mobile app · Internal product"
              screenIndexes={[0, 3]}
              tone="grocery"
            />
            <ProductProjectCard
              product={FORGE}
              number="02"
              category="Mobile app · Internal product"
              screenIndexes={[0, 4]}
              tone="forge"
              reverse
            />
            {portfolioProjects.map((project, index) => (
              <PortfolioBigCard
                key={project.key}
                project={project}
                number={String(index + 3).padStart(2, "0")}
                // Continues the same right/left alternation as 01 (image
                // right) → 02 (image left) above, not a fresh pattern that
                // resets and collides with card 02's side.
                reverse={index % 2 === 1}
              />
            ))}
          </div>

          <Reveal className="mt-20 flex flex-col items-start gap-5 border-t border-ink/12 pt-10 sm:mt-28 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base font-medium leading-relaxed text-ink-soft">
              Have something your business should be doing better?
            </p>
            <a
              href="/#contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-pill bg-ink px-6 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500"
            >
              Start a project
              <span className="ml-2" aria-hidden>↗</span>
            </a>
          </Reveal>
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}
