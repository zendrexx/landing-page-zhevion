"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { trackCTA } from "@/lib/analytics";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

/**
 * The existing shared navigation, expanded for the studio homepage. `base`
 * keeps the legal routes able to point back to the homepage anchors.
 */
export function SiteNav({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const destination = (href: string) => `${base}${href}`;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto mx-auto max-w-content"
      >
        <div className="relative rounded-[22px] border border-ink/10 bg-paper/80 px-2.5 py-2 shadow-[0_16px_50px_-28px_rgba(13,46,33,0.45)] backdrop-blur-xl sm:px-3">
          <div className="flex items-center justify-between gap-4">
            <a
              href={base || "/"}
              aria-label="Zhevion — home"
              className="flex min-h-11 items-center gap-2.5 rounded-pill px-1.5 pr-3 text-ink transition-colors hover:bg-ink/5"
            >
              <ZhevionMark size={31} />
              <span className="text-[0.95rem] font-extrabold tracking-[-0.035em]">Zhevion</span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={destination(link.href)}
                      className="block rounded-pill px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-ink/5 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5">
              <a
                href={destination("#contact")}
                onClick={() => trackCTA("nav-start-project")}
                className="hidden min-h-11 items-center rounded-pill bg-ink px-5 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500 sm:inline-flex"
              >
                Start a project
              </a>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((current) => !current)}
                className="flex h-11 w-11 items-center justify-center rounded-pill text-ink transition-colors hover:bg-ink/5 lg:hidden"
              >
                <span className="relative block h-4 w-[18px]" aria-hidden>
                  <span
                    className={`absolute left-0 top-[3px] h-[1.5px] w-full rounded-full bg-current transition ${
                      open ? "translate-y-[4px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-[3px] left-0 h-[1.5px] w-full rounded-full bg-current transition ${
                      open ? "-translate-y-[4px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.nav
                id="site-menu"
                aria-label="Mobile navigation"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.12 : 0.22 }}
                className="border-t border-ink/10 px-1 pb-2 pt-3 lg:hidden"
              >
                <ul className="grid gap-1">
                  {LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={destination(link.href)}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center justify-between rounded-xl px-3 text-base font-semibold text-ink-soft transition hover:bg-ink/5 hover:text-ink"
                      >
                        {link.label}
                        <span aria-hidden>↘</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={destination("#contact")}
                  onClick={() => {
                    setOpen(false);
                    trackCTA("nav-mobile-start-project");
                  }}
                  className="mt-2 flex min-h-12 items-center justify-center rounded-pill bg-ink px-5 text-sm font-bold text-paper sm:hidden"
                >
                  Start a project
                </a>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
