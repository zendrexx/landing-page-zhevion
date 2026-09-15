"use client";

import { useState, type FormEvent } from "react";
import { PROJECT_NEEDS } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type SubmissionStatus = "idle" | "sending" | "sent" | "error";

const fieldClassName =
  "mt-2 w-full rounded-[12px] border border-black/10 bg-white px-4 py-3 text-base text-[#171717] outline-none transition placeholder:text-[#8d8d91] focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/15";

/**
 * The homepage needs a real brief, not a mailto link. This stays local to the
 * new landing page so its layout and behaviour do not affect the other site
 * surfaces.
 */
export function ProjectInquiry() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [name, setName] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    trackCTA("project-inquiry-submit");

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", "New project inquiry from Zhevion.com");
      formData.append("from_name", "Zhevion project inquiry");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!result.success) {
        setStatus("error");
        return;
      }

      setName(String(formData.get("name") ?? "").trim());
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        tabIndex={-1}
        className="rounded-[20px] border border-black/10 bg-white p-6 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.45)] sm:p-8"
      >
        <p className="text-sm font-medium text-[#707074]">Inquiry received</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#171717]">
          Thanks{name ? `, ${name}` : ""}.
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#57575b]">
          We&apos;ll review the details and get in touch about the clearest next step.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitInquiry}
      aria-busy={status === "sending"}
      className="rounded-[20px] border border-black/10 bg-white p-5 shadow-[0_18px_45px_-35px_rgba(0,0,0,0.45)] sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[#171717]">
          Your name
          <input
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your name"
            className={fieldClassName}
          />
        </label>

        <label className="text-sm font-medium text-[#171717]">
          Work email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#171717]">
        Company or organisation <span className="text-[#707074]">(optional)</span>
        <input
          name="company"
          type="text"
          autoComplete="organization"
          placeholder="Company or organisation"
          className={fieldClassName}
        />
      </label>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium text-[#171717]">What would you like to start?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROJECT_NEEDS.map((need, index) => {
            const id = `home-project-need-${index}`;
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
                <span className="inline-flex min-h-10 items-center rounded-full border border-black/10 px-3.5 text-sm font-medium text-[#57575b] transition hover:border-black/30 peer-checked:border-[#171717] peer-checked:bg-[#171717] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#171717]/25">
                  {need}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-6 block text-sm font-medium text-[#171717]">
        What should this project make better?
        <textarea
          name="message"
          required
          minLength={20}
          rows={4}
          placeholder="Describe the goal, what happens today, and who the project is for. A rough idea is enough."
          className={`${fieldClassName} resize-y`}
        />
      </label>

      <div className="mt-6 border-t border-black/10 pt-5">
        <p className="text-sm font-medium text-[#171717]">What can you share to help us get started?</p>
        <p className="mt-1 text-sm leading-relaxed text-[#707074]">
          Select anything you already have. None is completely fine.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            "An existing website, product, or workflow",
            "Brand assets or designs",
            "Requirements, notes, or a brief",
            "A deadline or launch window",
          ].map((item) => (
            <label key={item} className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-black/10 px-3 py-3 text-sm leading-snug text-[#57575b] transition hover:border-black/25">
              <input name="available_materials" type="checkbox" value={item} className="mt-0.5 size-4 accent-[#171717]" />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <label className="mt-5 block text-sm font-medium text-[#171717]">
        Anything else we should know? <span className="text-[#707074]">(optional)</span>
        <textarea
          name="project_context"
          rows={3}
          placeholder="Links, timing, stakeholders, budget range, or anything that will help us prepare."
          className={`${fieldClassName} resize-y`}
        />
      </label>

      <input type="checkbox" name="botcheck" tabIndex={-1} className="sr-only" aria-hidden />

      <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-[12px] bg-[#171717] px-5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending inquiry…" : "Start the conversation"}
          <span className="ml-2" aria-hidden>→</span>
        </button>
        <p className="max-w-56 text-sm leading-relaxed text-[#707074]">
          We&apos;ll use this to prepare for a useful first conversation.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your inquiry." : ""}
      </p>

      {status === "error" ? (
        <p role="alert" className="mt-5 rounded-[12px] border border-red-800/15 bg-red-800/5 px-4 py-3 text-sm leading-relaxed text-red-900">
          We couldn&apos;t send your inquiry just now. Please try again in a moment.
        </p>
      ) : null}
    </form>
  );
}
