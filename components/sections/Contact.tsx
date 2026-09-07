"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT, PROJECT_NEEDS, STUDIO_HOME } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

// Process detail lives only in the post-submit success state, not on the
// initial screen — the brief is "start a conversation," not "here is our
// entire process," so this is deliberately three short single-line steps.
const SUCCESS_STEPS = [
  { number: "01", title: "Review" },
  { number: "02", title: "Discovery conversation" },
  { number: "03", title: "Scope, timeline & proposal" },
] as const;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState("");
  const successRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    trackCTA("project-inquiry-submit");

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const body = new FormData(form);
      body.append("access_key", WEB3FORMS_KEY);
      body.append("subject", "New project inquiry from Zhevion.com");
      body.append("from_name", "Zhevion project inquiry");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await response.json();

      if (data.success) {
        setSubmittedName(String(body.get("name") ?? "").trim());
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // Today's inline success message was never focused — this is what a screen
  // reader / keyboard user actually lands on now that submitting swaps the
  // card's content instead of just appending a line below it.
  useEffect(() => {
    if (status === "sent") successRef.current?.focus({ preventScroll: true });
  }, [status]);

  const field =
    "mt-2 w-full rounded-[14px] border border-ink/12 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-faint transition focus:border-forest-500 focus:outline-none";

  const swap = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    exit: reduce ? { opacity: 1 } : { opacity: 0, y: -8 },
    transition: reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section
      id="contact"
      // No scroll-mt here (unlike other sections): the content below is
      // vertically centered inside a full-viewport-height section, so
      // landing the section's own top edge flush with the viewport top is
      // what puts the centered content in the actual center of the screen.
      // Reserving nav clearance here (like scroll-mt-24 elsewhere) would
      // push the already-centered content ~96px below true center instead.
      className="flex min-h-[100dvh] items-center border-t border-ink/10 bg-paper-deep py-[clamp(64px,9vw,120px)]"
      aria-labelledby="contact-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-forest-500">{STUDIO_HOME.contact.eyebrow}</p>
            <h2
              id="contact-heading"
              className="mt-5 max-w-[15ch] text-[clamp(2.5rem,4.8vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.055em]"
            >
              {STUDIO_HOME.contact.heading}
            </h2>
            <p className="mt-6 max-w-lg text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
              {STUDIO_HOME.contact.body}
            </p>

            <div className="mt-8 border-t border-ink/12 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">Prefer email?</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-2 inline-block text-base font-bold text-ink underline decoration-ink/25 underline-offset-4 transition hover:decoration-ink"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-[26px] border border-ink/10 bg-paper p-5 shadow-[0_24px_80px_-60px_rgba(13,46,33,0.5)] sm:p-7 lg:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div key="sent" ref={successRef} role="status" tabIndex={-1} className="outline-none" {...swap}>
                  <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-ink sm:text-[1.75rem]">
                    Inquiry received
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    Thanks, {submittedName || "there"}. We&apos;ll review what you sent and get back to you about the
                    next step.
                  </p>
                  <div className="mt-7 border-t border-ink/12 pt-6">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">What happens next</p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {SUCCESS_STEPS.map((step) => (
                        <li key={step.number} className="text-sm">
                          <span className="font-extrabold tabular-nums text-forest-500">{step.number} —</span>{" "}
                          <span className="font-semibold text-ink">{step.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-6 text-xs text-ink-faint">No technical brief needed yet.</p>
                </motion.div>
              ) : (
                <motion.div key="form" {...swap}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-bold text-ink">
                      Name
                      <input
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        placeholder="Your name"
                        className={field}
                      />
                    </label>
                    <label className="text-sm font-bold text-ink">
                      Company
                      <input
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Company or organization"
                        className={field}
                      />
                    </label>
                  </div>

                  <label className="mt-4 block text-sm font-bold text-ink">
                    Email / contact information
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={field}
                    />
                  </label>

                  <fieldset className="mt-5">
                    <legend className="text-sm font-bold text-ink">What are you thinking about?</legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {PROJECT_NEEDS.map((need, index) => {
                        const id = `project-need-${index}`;
                        return (
                          <label key={need} htmlFor={id} className="cursor-pointer">
                            <input
                              id={id}
                              name="project_type"
                              type="radio"
                              value={need}
                              required
                              className="peer sr-only"
                            />
                            <span className="inline-flex min-h-11 items-center rounded-pill border border-ink/12 px-4 text-sm font-semibold text-ink-soft transition hover:border-ink/30 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                              {need}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <label className="mt-5 block text-sm font-bold text-ink">
                    Tell us about the project or problem
                    <textarea
                      name="message"
                      required
                      minLength={20}
                      rows={5}
                      placeholder="What's happening today, what would you like to improve, and who would use it? You don't need to have the solution figured out."
                      className={`${field} resize-y`}
                    />
                  </label>

                  <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />

                  <div className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex min-h-12 items-center justify-center rounded-pill bg-ink px-7 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500 disabled:translate-y-0 disabled:opacity-55"
                    >
                      {status === "sending" ? "Sending…" : "Start a conversation"}
                      {status !== "sending" ? <span className="ml-2" aria-hidden>↗</span> : null}
                    </button>
                    <p className="max-w-[20rem] text-xs leading-relaxed text-ink-faint">
                      We&apos;ll review your inquiry and get back to you personally.
                    </p>
                  </div>

                  {status === "error" ? (
                    <p role="alert" className="mt-5 rounded-xl border border-red-700/20 bg-red-700/5 p-4 text-sm text-red-800">
                      We couldn&apos;t send that message. Email{" "}
                      <a className="font-bold underline" href={`mailto:${CONTACT.email}`}>
                        {CONTACT.email}
                      </a>{" "}
                      instead.
                    </p>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
