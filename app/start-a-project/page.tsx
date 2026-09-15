import type { Metadata } from "next";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { ProjectInquiry } from "@/components/landing/ProjectInquiry";

export const metadata: Metadata = {
  title: "Start a project | Zhevion",
  description: "Tell Zhevion what you want to build or improve, and what is already in place.",
  alternates: { canonical: "/start-a-project" },
};

const startingDetails = [
  "The result you want to achieve",
  "Who will use it and how work happens today",
  "Anything you already have: a workflow, link, design, or brief",
  "Any timing or constraints worth planning around",
] as const;

export default function StartAProjectPage() {
  return (
    <div className="zv-home min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--zv-border)] bg-[var(--zv-theme-nav)] text-[var(--zv-fg)] backdrop-blur-xl">
        <div className="zv-container flex h-[76px] items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-[-0.035em]" aria-label="Zhevion home">
            <ZhevionMark size={28} />
            <span>Zhevion</span>
          </a>
          <a
            href="/"
            className="inline-flex min-h-10 items-center rounded-[12px] border border-[var(--zv-border)] px-4 text-sm font-medium transition hover:bg-[var(--zv-offset)]"
          >
            <span aria-hidden className="mr-2">←</span> Back to home
          </a>
        </div>
      </header>

      <main id="main" className="zv-container grid gap-12 pb-16 pt-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(32rem,1.2fr)] lg:gap-20 lg:pb-24 lg:pt-44">
        <section className="lg:sticky lg:top-32 lg:self-start" aria-labelledby="start-project-heading">
          <p className="text-sm font-medium text-[var(--zv-secondary)]">Start a project</p>
          <h1 id="start-project-heading" className="mt-5 max-w-[11ch] text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[var(--zv-fg)]">
            Let&apos;s make the next useful thing.
          </h1>
          <p className="mt-7 max-w-[32rem] text-lg leading-relaxed text-[var(--zv-secondary)]">
            You do not need a technical brief or a polished plan. A few practical details give us enough to understand the opportunity and prepare for a worthwhile first conversation.
          </p>

          <div className="mt-10 border-t border-[var(--zv-border)] pt-5">
            <h2 className="text-sm font-medium text-[var(--zv-fg)]">To get started, it helps to know</h2>
            <ul className="mt-4 space-y-3">
              {startingDetails.map((detail, index) => (
                <li key={detail} className="flex gap-3 text-sm leading-relaxed text-[var(--zv-secondary)]">
                  <span className="font-medium tabular-nums text-[var(--zv-fg)]">0{index + 1}</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-label="Project inquiry form">
          <ProjectInquiry />
        </section>
      </main>
    </div>
  );
}
