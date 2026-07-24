"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactGlyph } from "@/components/ui/ContactIcons";
import { CONTACT } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

/**
 * Message form — same wiring as the portfolio's contact section: a client-side
 * POST to Web3Forms, no backend of our own. Web3Forms only accepts browser
 * requests on the free plan, so this must stay a client component.
 *
 * The access key is public by design (it only authorises submissions to the
 * inbox it's registered to) but still comes from NEXT_PUBLIC_WEB3FORMS_KEY so
 * it isn't hardcoded per-site. Missing key → the form says so and points at the
 * email address instead of pretending the message went through.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    trackCTA("contact-message-submit");

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const body = new FormData(form);
      body.append("access_key", WEB3FORMS_KEY);
      body.append("subject", "New message from the Zhevion site");
      body.append("from_name", "Zhevion landing page");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();
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
    "w-full rounded-2xl border border-white/12 bg-graphite-900 px-4 py-3.5 text-sm text-cream placeholder:text-muted/70 transition focus:border-lime/45 focus:outline-none";

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-graphite-800 py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(520px 320px at 12% 0%, rgba(27,92,65,0.35), transparent 65%), radial-gradient(520px 320px at 92% 100%, rgba(124,92,255,0.3), transparent 65%)",
        }}
      />

      <div className="shell relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-muted">Contact</p>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl font-extrabold tracking-tightest sm:text-4xl"
          >
            Say hello.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Feedback, bug reports, or just want early access? Send a message and
            it lands straight in my inbox.
          </p>
        </Reveal>

        {/* Direct links */}
        <Reveal delay={80} className="mx-auto mt-10 max-w-3xl">
          <ul className="grid gap-3 sm:grid-cols-3">
            {CONTACT.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={() => trackCTA(`contact-${l.label.toLowerCase()}`)}
                  className="group flex h-full items-center gap-3 rounded-card border border-white/10 bg-graphite-900/70 p-4 transition hover:-translate-y-0.5 hover:border-lime/40 hover:bg-graphite-900"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted transition group-hover:border-lime/30 group-hover:text-lime">
                    <ContactGlyph name={l.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-cream">{l.label}</span>
                    <span className="block truncate text-xs text-muted">{l.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Message form */}
        <Reveal
          delay={140}
          className="mx-auto mt-6 max-w-3xl rounded-card border border-white/10 bg-graphite-900/70 p-6 backdrop-blur-sm sm:p-8"
        >
          <h3 className="text-lg font-bold text-cream">Send a message</h3>

          <form onSubmit={onSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@email.com"
                  className={field}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                rows={5}
                placeholder="What's on your mind?"
                className={`${field} resize-y`}
              />
            </div>

            {/* Honeypot — bots fill it, people never see it */}
            <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-pill bg-cream px-7 py-3 text-sm font-bold text-graphite-900 transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && (
                <p role="status" className="text-sm font-semibold text-lime">
                  Message sent. I&apos;ll get back to you. ✓
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-red-400">
                  Couldn&apos;t send that. Email{" "}
                  <a className="underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>{" "}
                  directly instead.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
