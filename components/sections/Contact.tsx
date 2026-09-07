"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { CONTACT, PROJECT_NEEDS, STUDIO_HOME } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-2 w-full rounded-[14px] border border-ink/12 bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-faint transition focus:border-forest-500 focus:outline-none";

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-ink/10 bg-paper-deep py-[clamp(84px,12vw,160px)]"
      aria-labelledby="contact-heading"
    >
      <div className="shell">
        <Reveal className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow text-forest-500">{STUDIO_HOME.contact.eyebrow}</p>
            <h2
              id="contact-heading"
              className="mt-5 max-w-[11ch] text-[clamp(2.55rem,5.6vw,5.6rem)] font-extrabold leading-[0.96] tracking-[-0.06em]"
            >
              {STUDIO_HOME.contact.heading}
            </h2>
            <p className="mt-7 max-w-lg text-base font-medium leading-[1.75] text-ink-soft sm:text-lg">
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
            className="rounded-[26px] border border-ink/10 bg-paper p-5 shadow-[0_24px_80px_-60px_rgba(13,46,33,0.5)] sm:p-8 lg:p-10"
          >
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

            <label className="mt-5 block text-sm font-bold text-ink">
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

            <fieldset className="mt-7">
              <legend className="text-sm font-bold text-ink">What do you need?</legend>
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

            <label className="mt-7 block text-sm font-bold text-ink">
              Problem / project description
              <textarea
                name="message"
                required
                minLength={20}
                rows={7}
                placeholder="What is happening now, what should work better, and who needs to use it?"
                className={`${field} resize-y`}
              />
            </label>

            <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />

            <div className="mt-7 flex flex-col gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-12 items-center justify-center rounded-pill bg-ink px-7 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500 disabled:translate-y-0 disabled:opacity-55"
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
                {status !== "sending" ? <span className="ml-2" aria-hidden>↗</span> : null}
              </button>
              <p className="max-w-[20rem] text-xs leading-relaxed text-ink-faint">
                Your message goes to the Zhevion studio inbox through our existing contact provider.
              </p>
            </div>

            {status === "sent" ? (
              <p role="status" className="mt-5 rounded-xl border border-forest-500/20 bg-forest-500/5 p-4 text-sm font-bold text-forest-500">
                Inquiry sent. We&apos;ll get back to you.
              </p>
            ) : null}
            {status === "error" ? (
              <p role="alert" className="mt-5 rounded-xl border border-red-700/20 bg-red-700/5 p-4 text-sm text-red-800">
                We couldn&apos;t send that message. Email{" "}
                <a className="font-bold underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>{" "}
                instead.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
