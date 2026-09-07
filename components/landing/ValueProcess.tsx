import { Reveal } from "@/components/ui/Reveal";
import { STUDIO_HOME, STUDIO_PROCESS, WORKFLOW_PROBLEMS } from "@/lib/content";

export function ValueSection() {
  return (
    <section className="dark-panel relative overflow-hidden py-[clamp(84px,12vw,160px)]" aria-labelledby="value-heading">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="value-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="shell relative">
        <Reveal className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <p className="eyebrow text-lime">{STUDIO_HOME.value.eyebrow}</p>
            <h2
              id="value-heading"
              className="mt-5 max-w-[12ch] text-[clamp(2.45rem,5.2vw,5.1rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
            >
              {STUDIO_HOME.value.heading}
            </h2>
            <p className="mt-7 max-w-lg text-base font-medium leading-[1.75] text-cream/60 sm:text-lg">
              {STUDIO_HOME.value.body}
            </p>
          </div>

          <div className="grid content-start gap-3 sm:grid-cols-2">
            {WORKFLOW_PROBLEMS.map((problem, index) => (
              <div
                key={problem}
                className="rounded-[18px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm"
              >
                <span className="text-xs font-bold tabular-nums text-lime/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 max-w-[22ch] text-base font-bold leading-snug text-cream/85">
                  {problem}
                </p>
              </div>
            ))}

            <div className="rounded-[18px] border border-lime/25 bg-lime p-5 text-lime-ink sm:col-span-2 sm:p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-lime-ink/55">The shift</p>
                  <p className="mt-3 max-w-xl text-xl font-extrabold leading-snug tracking-[-0.025em] sm:text-2xl">
                    One useful digital system, shaped around the work—not around a software checklist.
                  </p>
                </div>
                <span className="text-3xl" aria-hidden>↘</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 py-[clamp(84px,12vw,160px)]"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-6 border-t border-ink/12 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-ink-faint">{STUDIO_HOME.process.eyebrow}</p>
            <h2
              id="process-heading"
              className="mt-4 max-w-[14ch] text-[clamp(2.4rem,5vw,4.8rem)] font-extrabold leading-none tracking-[-0.055em]"
            >
              {STUDIO_HOME.process.heading}
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">
            Six focused stages, with enough structure to keep momentum and enough room to make the right product decisions.
          </p>
        </Reveal>

        <ol className="mt-14 grid border-l border-t border-ink/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {STUDIO_PROCESS.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}

type ProcessStepType = (typeof STUDIO_PROCESS)[number];

export function ProcessStep({ step, index }: { step: ProcessStepType; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 50} className="border-b border-r border-ink/12 p-6 sm:min-h-[260px] sm:p-8">
      <div className="flex h-full flex-col">
        <span className="text-sm font-extrabold tabular-nums text-forest-500">{step.number}</span>
        <h3 className="mt-10 text-2xl font-extrabold tracking-[-0.035em] sm:mt-auto sm:text-[1.75rem]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-[1.7] text-ink-soft">{step.body}</p>
      </div>
    </Reveal>
  );
}
