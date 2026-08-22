"use client";

import { motion, useReducedMotion } from "motion/react";
import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { ContactGlyph } from "@/components/ui/ContactIcons";
import { CONTACT, HERO } from "@/lib/content";

const LETTERS = "ZHEVION".split("");
const EASE = [0.16, 1, 0.3, 1] as const;

// Same measured ratio as the full Hero wordmark — see components/hero/Hero.tsx
// for the derivation. Keep the two in sync if the display face ever changes.
const WORDMARK_SIZE = "clamp(3.5rem, 19.3vw, 15.05rem)";

/**
 * Single-screen "launching soon" placeholder — same paper/ink visual language
 * as the real Hero (wordmark rise, paper grain, eyebrow, pill contact links)
 * but self-contained, since #work/#studio/#contact don't exist while it's the
 * only thing mounted. Swap back to Hero/Work in app/page.tsx once the site is
 * ready to go live.
 */
export function ComingSoon() {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4 },
        }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <div className="paper-grain relative isolate min-h-[100svh] overflow-hidden bg-paper">
      <div className="relative mx-auto flex min-h-[100svh] max-w-content flex-col px-[var(--page-x)]">
        <motion.div {...rise(0.1)} className="flex items-center pt-[clamp(28px,5vh,44px)]">
          <ZhevionMark size={32} />
        </motion.div>

        <motion.p
          {...rise(0.25)}
          className="eyebrow mt-[clamp(48px,10vh,96px)] text-ink-faint"
        >
          {HERO.eyebrow}
        </motion.p>

        {/* ---- Wordmark ---------------------------------------------------
            Same letter-rise treatment as Hero.tsx, duplicated rather than
            imported so this placeholder stays a self-contained drop-in. */}
        <h1 className="mt-[clamp(10px,2vh,20px)]">
          <span className="sr-only">Zhevion</span>
          <span
            aria-hidden
            className="flex w-full justify-between font-extrabold leading-[0.84] text-ink"
            style={{ fontSize: WORDMARK_SIZE }}
          >
            {LETTERS.map((letter, i) => (
              <span key={i} className="letter-mask shrink-0">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: "0%" }}
                  transition={
                    reduce
                      ? { duration: 0.4 }
                      : { duration: 0.9, delay: 0.35 + i * 0.04, ease: EASE }
                  }
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-[clamp(32px,6vh,64px)] max-w-[560px]">
          <motion.div
            {...rise(0.85)}
            className="inline-flex items-center rounded-pill border border-ink/10 bg-paper/70 px-4 py-2 backdrop-blur-xl"
          >
            <span className="eyebrow text-ink">Launching soon</span>
          </motion.div>

          <motion.p
            {...rise(0.95)}
            className="mt-5 text-[clamp(1.05rem,2vw,1.4rem)] font-medium leading-snug text-ink-soft"
          >
            We&apos;re rebuilding the studio site from the ground up. New look,
            same two apps. Say hello in the meantime.
          </motion.p>
        </div>

        <motion.div
          {...rise(1.15)}
          className="mt-auto flex flex-col gap-4 pb-[clamp(28px,5vh,48px)] pt-[clamp(28px,6vh,56px)] sm:flex-row sm:items-end sm:justify-between"
        >
          <ul className="flex flex-wrap items-center gap-2">
            {CONTACT.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-2 rounded-pill border border-ink/10 bg-paper/60 px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-ink/20 hover:bg-ink hover:text-paper"
                >
                  <ContactGlyph name={l.icon} size={15} />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <span className="eyebrow text-[0.6875rem] text-ink-faint">
            © 2026 Zhevion
          </span>
        </motion.div>
      </div>
    </div>
  );
}
