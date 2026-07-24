"use client";

import { useState } from "react";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { CONTACT, GROCERY, FORGE } from "@/lib/content";
import { trackCTA } from "@/lib/analytics";

/**
 * Launch-notify signups go to the same Web3Forms inbox as the contact form —
 * see components/sections/Contact.tsx for the rationale on the public key.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ClosingCTA() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    trackCTA("waitlist-submit");

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const body = new FormData();
      body.append("access_key", WEB3FORMS_KEY);
      body.append("subject", "Zhevion launch-notify signup");
      body.append("from_name", "Zhevion landing page");
      body.append("email", email);
      body.append("message", `Notify ${email} when the Zhevion apps launch.`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="get" className="relative overflow-hidden py-24 md:py-32" aria-labelledby="get-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px 400px at 15% 20%, rgba(27,92,65,0.5), transparent 60%), radial-gradient(600px 400px at 85% 80%, rgba(124,92,255,0.5), transparent 60%)",
        }}
      />
      <div className="shell relative z-10 text-center">
        <h2 id="get-heading" className="text-balance text-4xl font-extrabold tracking-tightest sm:text-5xl">
          Eat smarter. Train stronger.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Two focused apps to take care of your body on both sides of the gym.
          Get them the day they launch.
        </p>

        {/* both apps' badges */}
        <div className="mt-9 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-lime">{GROCERY.name}</span>
            <StoreBadges
              app="grocery-cta"
              label={GROCERY.name}
              googlePlay={GROCERY.store.googlePlay}
              appStore={GROCERY.store.appStore}
              next={GROCERY.store.next}
              className="justify-center"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-volt-soft">{FORGE.name}</span>
            <StoreBadges
              app="forge-cta"
              label={FORGE.name}
              googlePlay={FORGE.store.googlePlay}
              appStore={FORGE.store.appStore}
              next={FORGE.store.next}
              className="justify-center"
            />
          </div>
        </div>

        {/* email waitlist */}
        <div className="mx-auto mt-12 max-w-md">
          <p className="mb-3 text-sm font-semibold text-cream">Follow the studio</p>
          {status === "done" ? (
            <p
              role="status"
              className="rounded-pill border border-lime/40 bg-lime/10 px-5 py-3 text-sm font-semibold text-lime"
            >
              You're on the list. We'll be in touch. ✓
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 rounded-pill border border-white/15 bg-white/5 px-5 py-3 text-sm text-cream placeholder:text-muted focus:border-white/30 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-pill bg-cream px-6 py-3 text-sm font-bold text-graphite-900 transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Notify me"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p role="alert" className="mt-2 text-sm text-red-400">
              Something went wrong. Email{" "}
              <a className="underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>{" "}
              instead.
            </p>
          )}
          <p className="mt-3 text-xs text-muted">No spam. Just launch news.</p>
        </div>
      </div>
    </section>
  );
}
