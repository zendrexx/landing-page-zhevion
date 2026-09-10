import type { Metadata } from "next";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ProductProjectCard, PortfolioBigCard, type PortfolioProject } from "@/components/landing/SelectedWork";
import { FORGE, GROCERY, PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work | Zhevion",
  description:
    "Products designed and built at Zhevion — Zebite and RepForge — alongside the professional and freelance work of the people behind the studio.",
  alternates: { canonical: "/work" },
};

/**
 * The full work index.
 *
 * Split into two named groups on purpose. Zebite and RepForge are Zhevion's own
 * products; everything else was built by individual people here, either inside
 * an employer's software (Guanzon) or as freelance work (Aldrin's three). Those
 * are different kinds of evidence and the page must not blur them into one
 * undifferentiated "clients" wall — nothing on this page was a Zhevion client
 * engagement, and the headings are what keep that honest.
 */
export default function WorkPage() {
  const portfolioProjects = PROJECTS.filter(
    (project): project is PortfolioProject => project.kind === "Portfolio",
  );

  return (
    <>
      <SiteNav base="/" />
      <main id="main" className="pb-24 pt-32 sm:pb-32 sm:pt-40">
        <div className="shell">
          <Reveal className="border-t border-ink/15 pt-6">
            <p className="text-sm font-semibold text-ink-soft">Selected work</p>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(2.6rem,6vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
              Everything we&apos;ve built.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              Products designed and built at Zhevion, and the professional and freelance work of the people who
              build them.
            </p>
          </Reveal>

          <section className="mt-[clamp(56px,8vw,96px)]" aria-labelledby="products-heading">
            <div className="grid gap-5 border-t border-ink/20 pt-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <p className="text-sm font-semibold text-ink-soft">01</p>
              <div>
                <h2
                  id="products-heading"
                  className="max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em]"
                >
                  Products designed and built at Zhevion.
                </h2>
              </div>
            </div>

            <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
              <ProductProjectCard
                product={GROCERY}
                number="01"
                category="Mobile app · Zhevion product"
                screenIndexes={[0, 3]}
                tone="grocery"
              />
              <ProductProjectCard
                product={FORGE}
                number="02"
                category="Mobile app · Zhevion product"
                screenIndexes={[0, 4]}
                tone="forge"
                reverse
              />
            </div>
          </section>

          <section className="mt-[clamp(72px,10vw,128px)]" aria-labelledby="people-heading">
            <div className="grid gap-5 border-t border-ink/20 pt-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <p className="text-sm font-semibold text-ink-soft">02</p>
              <div>
                <h2
                  id="people-heading"
                  className="max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em]"
                >
                  Work by the people behind Zhevion.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-[1.75] text-ink-soft">
                  Business systems, freelance projects, and research work built individually, before or alongside
                  the studio.
                </p>
              </div>
            </div>

            <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8">
              {portfolioProjects.map((project, index) => (
                <PortfolioBigCard
                  key={project.key}
                  project={project}
                  number={String(index + 1).padStart(2, "0")}
                  // Alternates image side down the list so two adjacent cards
                  // never put their screenshot on the same edge.
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </section>

          <Reveal className="mt-[clamp(72px,10vw,128px)] flex flex-col items-start gap-5 border-t border-ink/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base font-medium leading-relaxed text-ink-soft">
              Have something your business should be doing better?
            </p>
            <a
              href="/#contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-control bg-ink px-6 text-sm font-bold text-paper transition hover:bg-forest-500"
            >
              Start a project
            </a>
          </Reveal>
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}
