import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, FORGE, GROCERY } from "@/lib/content";
import { LEGAL_INDEX, LEGAL_UPDATED, type LegalApp } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal | Zhevion",
  description: `Privacy policies and terms of service for ${GROCERY.name}, ${FORGE.name}, and the Zhevion website.`,
  alternates: { canonical: "/legal" },
};

/** Matches the accent scopes in app/globals.css. */
const WORLD: Record<LegalApp, string> = {
  zebite: "world-grocery",
  repforge: "world-forge",
  website: "world-studio",
};

export default function LegalIndexPage() {
  return (
    <div className="pb-24 pt-10 md:pb-32 md:pt-14">
      <div className="shell">
        <header className="max-w-2xl">
          <p className="eyebrow text-muted">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tightest sm:text-5xl">
            Privacy &amp; terms
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            One set of documents per app, because the two apps handle your data
            very differently. {GROCERY.name} uses an account and a server;{" "}
            {FORGE.name} keeps everything on your device and talks to nothing.
            Each document describes only what its app actually does.
          </p>
          <p className="mt-4 text-sm text-muted">Last updated {LEGAL_UPDATED}.</p>
        </header>

        <div className="mt-14 flex flex-col gap-10">
          {LEGAL_INDEX.map((group) => (
            <section key={group.app} className={WORLD[group.app]} aria-labelledby={`${group.app}-heading`}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2
                  id={`${group.app}-heading`}
                  className="text-2xl font-extrabold tracking-tightest text-[color:var(--accent)]"
                >
                  {group.label}
                </h2>
                <p className="text-sm text-muted">{group.note}</p>
              </div>

              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {group.docs.map((d) => (
                  <li key={d.href}>
                    <Link
                      href={d.href}
                      className="group flex h-full flex-col rounded-card border border-white/10 bg-graphite-800 p-6 transition hover:border-[color:var(--accent-line)] hover:bg-graphite-700"
                    >
                      <span className="flex items-center gap-2 font-bold text-cream">
                        {d.title}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className="transition group-hover:translate-x-0.5"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-muted">{d.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-14 max-w-2xl border-t border-white/10 pt-6 text-sm leading-relaxed text-muted">
          Something unclear, or a request about your data? Email{" "}
          <a className="text-cream underline underline-offset-4" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          . We&rsquo;re two people and we answer personally.
        </p>
      </div>
    </div>
  );
}
