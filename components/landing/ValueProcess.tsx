import { STUDIO_HOME, STUDIO_PROCESS, WORKFLOW_PROBLEMS } from "@/lib/content";

const CLEAR_WORKFLOW = [
  "Capture information once",
  "Keep one shared record",
  "Make status and ownership visible",
  "Keep the next action clear",
] as const;

export function ValueSection() {
  return (
    <section
      id="approach"
      className="dark-panel scroll-mt-24 py-[clamp(76px,10vw,136px)]"
      aria-labelledby="value-heading"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <header>
            <p className="text-sm font-semibold text-lime">{STUDIO_HOME.value.eyebrow}</p>
            <h2
              id="value-heading"
              className="mt-5 max-w-[13ch] text-[clamp(2.5rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
            >
              {STUDIO_HOME.value.heading}
            </h2>
            <p className="mt-7 max-w-lg text-base font-medium leading-[1.75] text-cream/70 sm:text-lg">
              {STUDIO_HOME.value.body}
            </p>
          </header>

          <div>
            <p className="border-t border-white/20 pt-4 text-sm font-bold text-cream">
              What the work often looks like today
            </p>
            <ul className="mt-3 divide-y divide-white/15 border-b border-white/15">
              {WORKFLOW_PROBLEMS.map((problem, index) => (
                <li key={problem} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3.5 text-base leading-snug text-cream/72">
                  <span className="text-xs font-bold tabular-nums text-lime/80">{String(index + 1).padStart(2, "0")}</span>
                  {problem}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-lime/55 pt-5">
              <p className="text-sm font-bold text-lime">A purpose-built system can</p>
              <ol className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {CLEAR_WORKFLOW.map((step, index) => (
                  <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 text-base font-semibold leading-snug text-cream">
                    <span className="text-sm tabular-nums text-cream/45">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 py-[clamp(72px,9vw,124px)]"
      aria-labelledby="process-heading"
    >
      <div className="shell">
        <header className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <p className="text-sm font-semibold text-ink-soft">{STUDIO_HOME.process.eyebrow}</p>
          <div>
            <h2
              id="process-heading"
              className="max-w-[17ch] text-[clamp(2.35rem,4.7vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.05em]"
            >
              {STUDIO_HOME.process.heading}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-[1.75] text-ink-soft sm:text-lg">
              Each stage resolves a practical question and leaves the project with something concrete to review.
            </p>
          </div>
        </header>

        <ol className="mt-[clamp(48px,7vw,80px)] border-t border-ink/20">
          {STUDIO_PROCESS.map((step) => (
            <li
              key={step.number}
              className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-[3.5rem_0.65fr_1.35fr] sm:gap-6 sm:py-8 lg:grid-cols-[5rem_0.7fr_1.3fr_0.85fr] lg:items-start lg:gap-8"
            >
              <span className="text-sm font-bold tabular-nums text-forest-500">{step.number}</span>
              <h3 className="text-xl font-extrabold tracking-[-0.03em] text-ink sm:text-2xl">{step.title}</h3>
              <p className="text-base leading-[1.7] text-ink-soft sm:col-start-3">{step.body}</p>
              <p className="text-sm font-semibold leading-relaxed text-ink sm:col-start-3 lg:col-start-4">
                {step.output}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
