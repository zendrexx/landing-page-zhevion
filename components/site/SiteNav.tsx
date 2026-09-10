"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { trackCTA } from "@/lib/analytics";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

/**
 * The existing shared navigation, expanded for the studio homepage. `base`
 * keeps the legal routes able to point back to the homepage anchors.
 */
export function SiteNav({ base = "", variant = "floating" }: { base?: string; variant?: "floating" | "editorial" }) {
  const [open, setOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * The nav floats over the page rather than sitting on its own background,
   * so it has to recolor itself whenever a dark section (`.dark-panel`,
   * `.on-dark`, or the graphite footer) scrolls underneath it — otherwise
   * the light pill goes low-contrast against a dark section the same way
   * the custom cursor would if it didn't do the same `onDark` check.
   *
   * Shrinking the observer's root to just the pill's own band at the top of
   * the viewport (via a negative bottom rootMargin) means "intersecting"
   * means "currently under the nav," not "anywhere on screen."
   */
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".dark-panel, .on-dark, .bg-graphite-900"),
    );
    if (!targets.length) return;

    const NAV_BAND = 100;
    const intersecting = new Set<Element>();
    let observer: IntersectionObserver;

    const observe = () => {
      observer?.disconnect();
      intersecting.clear();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) intersecting.add(entry.target);
            else intersecting.delete(entry.target);
          }
          setOnDark(intersecting.size > 0);
        },
        { rootMargin: `0px 0px -${Math.max(window.innerHeight - NAV_BAND, 0)}px 0px`, threshold: 0 },
      );
      targets.forEach((target) => observer.observe(target));
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);

  const destination = (href: string) => `${base}${href}`;

  const pillSurface = onDark
    ? "border-white/12 bg-graphite-900/70 shadow-[0_14px_38px_-24px_rgba(0,0,0,0.65)]"
    : "border-ink/10 bg-paper/80 shadow-[0_14px_38px_-24px_rgba(13,46,33,0.38)]";
  const brandText = onDark ? "text-cream hover:bg-white/10" : "text-ink hover:bg-ink/5";
  const navLinkText = onDark
    ? "text-cream/70 hover:bg-white/10 hover:text-cream"
    : "text-ink-soft hover:bg-ink/5 hover:text-ink";
  const ctaSurface = onDark
    ? "bg-cream text-graphite-900 hover:bg-paper"
    : "bg-ink text-paper hover:bg-forest-500";
  const menuButtonText = onDark ? "text-cream hover:bg-white/10" : "text-ink hover:bg-ink/5";
  const mobileMenuBorder = onDark ? "border-white/12" : "border-ink/10";

  return (
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5 ${variant === "editorial" ? "studio-masthead" : ""}`} data-on-dark={onDark}>
      <motion.div
        initial={variant === "editorial" ? false : reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="site-nav-frame pointer-events-auto mx-auto w-full max-w-content lg:w-fit"
      >
        <div
          className={`site-nav-surface relative rounded-pill border px-2 py-1.5 backdrop-blur-xl transition-colors duration-300 sm:px-2.5 lg:px-3 ${pillSurface}`}
        >
          <div className="site-nav-row flex items-center justify-between gap-2 lg:justify-start lg:gap-2">
            <a
              href={base || "/"}
              aria-label="Zhevion — home"
              className={`site-nav-brand flex min-h-10 items-center gap-2 rounded-pill px-1.5 transition-colors lg:w-10 lg:justify-center lg:px-0 ${brandText}`}
            >
              <ZhevionMark size={variant === "editorial" ? 32 : 28} />
              <span className="site-nav-wordmark text-[0.9rem] font-extrabold tracking-[-0.035em] lg:hidden">Zhevion</span>
            </a>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={destination(link.href)}
                      className={`site-nav-link block rounded-pill px-2.5 py-2 text-[0.8125rem] font-semibold transition ${navLinkText}`}
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
                className={`site-nav-cta hidden min-h-10 items-center rounded-pill px-4 text-[0.8125rem] font-bold transition hover:-translate-y-0.5 sm:inline-flex ${ctaSurface}`}
              >
                Start a project
              </a>
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((current) => !current)}
                className={`flex h-10 w-10 items-center justify-center rounded-pill transition-colors lg:hidden ${menuButtonText}`}
              >
                <span className="relative block h-4 w-[18px]" aria-hidden>
                  <span
                    className={`absolute left-0 top-[3px] h-[1.5px] w-full rounded-pill bg-current transition ${
                      open ? "translate-y-[4px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-[3px] left-0 h-[1.5px] w-full rounded-pill bg-current transition ${
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
                className={`border-t px-1 pb-2 pt-3 transition-colors duration-300 lg:hidden ${mobileMenuBorder}`}
              >
                <ul className="grid gap-1">
                  {LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={destination(link.href)}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-11 items-center justify-between rounded-control px-3 text-base font-semibold transition ${navLinkText}`}
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
                  className={`mt-2 flex min-h-12 items-center justify-center rounded-pill px-5 text-sm font-bold sm:hidden ${ctaSurface}`}
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
