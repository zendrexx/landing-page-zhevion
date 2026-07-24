"use client";

import { useEffect, useState } from "react";
import { ZhevionWordmark } from "@/components/brand/ZhevionLogo";
import { trackCTA } from "@/lib/analytics";

const LINKS = [
  { href: "#apps", label: "Apps" },
  { href: "#about", label: "About" },
  { href: "#us", label: "Us" },
  { href: "#contact", label: "Contact" },
];

/**
 * `base` prefixes every in-page anchor. The home page leaves it empty so the
 * links stay bare fragments; sub-pages (/legal/*) pass "/" so "#apps" becomes
 * "/#apps" and navigates home instead of dead-ending on the current route.
 */
export function Nav({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-graphite-900/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between" aria-label="Primary">
        <a href={base || "#"} className="rounded-md" aria-label="Zhevion home">
          <ZhevionWordmark size={30} />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm font-medium text-muted">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={`${base}${l.href}`} className="rounded-md transition hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`${base}#get`}
            onClick={() => trackCTA("nav-get-apps")}
            className="rounded-pill bg-cream px-5 py-2 text-sm font-bold text-graphite-900 transition hover:opacity-90"
          >
            Get the apps
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-graphite-900/95 backdrop-blur-md md:hidden"
      >
        <ul className="shell flex flex-col gap-1 py-4 text-base font-medium">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={`${base}${l.href}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2.5 text-cream/90 hover:bg-white/5"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={`${base}#get`}
              onClick={() => {
                trackCTA("nav-get-apps-mobile");
                setOpen(false);
              }}
              className="block rounded-pill bg-cream px-5 py-3 text-center font-bold text-graphite-900"
            >
              Get the apps
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
