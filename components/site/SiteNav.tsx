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
        className="pointer-events-auto mx-auto w-full max-w-content lg:w-[680px]"
      >
        <div className="zhevion-nav-cursor relative rounded-pill border border-ink/10 bg-paper/80 px-2 py-1.5 shadow-[0_14px_38px_-24px_rgba(13,46,33,0.38)] backdrop-blur-xl sm:px-2.5">
          <div className="flex items-center justify-between gap-2">
            <a
              href={base || "/"}
              aria-label="Zhevion — home"
              className="flex min-h-10 items-center gap-2 rounded-pill px-1.5 text-ink transition-colors hover:bg-ink/5 lg:w-10 lg:justify-center lg:px-0"
            >
              <ZhevionMark size={28} />
              <span className="text-[0.9rem] font-extrabold tracking-[-0.035em] lg:hidden">Zhevion</span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={destination(link.href)}
                      className="block rounded-pill px-3 py-2 text-[0.8125rem] font-semibold text-ink-soft transition hover:bg-ink/5 hover:text-ink"
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
                className="hidden min-h-10 items-center rounded-pill bg-ink px-4 text-[0.8125rem] font-bold text-paper transition hover:-translate-y-0.5 hover:bg-forest-500 sm:inline-flex"
              >
                Start a project
              </a>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((current) => !current)}
                className="flex h-10 w-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-ink/5 lg:hidden"
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
