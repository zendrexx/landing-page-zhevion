"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { trackCTA } from "@/lib/analytics";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

const PILL =
  "rounded-pill border border-ink/10 bg-paper/70 backdrop-blur-xl " +
  "shadow-[0_1px_2px_rgba(13,46,33,0.04),0_10px_30px_-16px_rgba(13,46,33,0.25)]";

/**
 * Floating navigation — one object centered on the page, not a bar spanning
 * it. The mark and the links share a single pill; the mark has no wordmark
 * next to it since "Zhevion" alongside the Zhevion icon is redundant.
 *
 * `base` prefixes every in-page anchor, matching the contract the previous nav
 * established: sub-pages pass "/" so "#work" resolves to "/#work" and navigates
 * home rather than dead-ending on the current route.
 *
 * Note: #work / #studio / #contact are the anchors the later sections will
 * claim. Until those land, SmoothScroll deliberately falls through to native
 * behaviour for targets that don't exist rather than jumping to the top.
 */
export function SiteNav({ base = "" }: { base?: string }) {
  const [compact, setCompact] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 40));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const enter = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : {
        initial: { opacity: 0, y: -14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex justify-center px-[var(--page-x)] py-5">
        <motion.div {...enter} className="pointer-events-auto relative">
          <motion.div
            animate={{ scale: compact && !reduce ? 0.94 : 1 }}
            style={{ originX: 0.5, originY: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className={`${PILL} flex items-center gap-1 p-2`}>
              <a
                href={base || "/"}
                aria-label="Zhevion — home"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill transition-colors hover:bg-ink/5"
              >
                <ZhevionMark size={28} />
              </a>

              {/* ---- Links (desktop) --------------------------------- */}
              <nav aria-label="Primary" className="hidden md:block">
                <ul
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHovered(null)}
                >
                  {LINKS.map((l) => {
                    const isHovered = hovered === l.href;
                    return (
                      <li key={l.href}>
                        <a
                          href={`${base}${l.href}`}
                          onMouseEnter={() => setHovered(l.href)}
                          onFocus={() => setHovered(l.href)}
                          onClick={() =>
                            l.href === "#contact" && trackCTA("nav-contact")
                          }
                          className="relative block rounded-pill px-5 py-2.5 text-sm font-semibold"
                        >
                          {/* One puck, shared across items — motion interpolates
                              its box between them, so it slides instead of
                              cross-fading. */}
                          {isHovered ? (
                            <motion.span
                              layoutId="nav-puck"
                              className="absolute inset-0 rounded-pill bg-ink"
                              transition={
                                reduce
                                  ? { duration: 0 }
                                  : { type: "spring", stiffness: 420, damping: 38 }
                              }
                            />
                          ) : null}
                          <span
                            className={`relative z-10 transition-colors duration-200 ${
                              isHovered ? "text-paper" : "text-ink-soft"
                            }`}
                          >
                            {l.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* ---- Menu button (mobile) ----------------------------- */}
              <button
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-ink/5 md:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* ---- Menu (mobile, expanded) --------------------------------- */}
          {/* Centering (-translate-x-1/2) lives on this static wrapper, not the
              motion.nav below — framer writes its own inline `transform` for
              y/scale, which would otherwise clobber a Tailwind translate class
              on the same element. */}
          <div className="absolute left-1/2 top-full mt-2 w-[min(15rem,70vw)] -translate-x-1/2 md:hidden">
            <AnimatePresence>
              {open ? (
                <motion.nav
                  id="site-menu"
                  aria-label="Primary"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0.5, originY: 0 }}
                  className={`${PILL} pointer-events-auto rounded-card p-2`}
                >
                  <ul className="flex flex-col">
                    {LINKS.map((l) => (
                      <li key={l.href}>
                        <a
                          href={`${base}${l.href}`}
                          onClick={() => {
                            if (l.href === "#contact") trackCTA("nav-contact");
                            setOpen(false);
                          }}
                          className="block rounded-[14px] px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
