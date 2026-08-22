"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HERO } from "@/lib/content";

const DWELL = 2400;

/**
 * Sized so the longest word still fits its column. "DIGITAL EXPERIENCES"
 * advances 10.88em in this face, so the usable size is column / 10.88:
 *
 *   390px viewport  -> 350px column -> 28px cap (10.88em = 305px)
 *   834px viewport  -> 466px column -> 37px     (402px)
 *   >=1200px        -> 620px column -> 56px     (609px)
 *
 * Declared once and shared with the measuring twin below so the two can
 * never drift apart.
 */
const WORD_SIZE = "clamp(1.75rem, 4.4vw, 3.5rem)";

/**
 * The rotating word in the hero statement.
 *
 * The word sits on its own line rather than inline. That is a deliberate
 * departure from a literal reading of the brief: inline, the sentence's closing
 * clause would jump sideways every 2.4s as the word swings between "SAAS" and
 * "DIGITAL EXPERIENCES", which is the opposite of calm. On its own line the
 * sentence never reflows.
 *
 * The width motion the brief wanted instead goes to the rule underneath, which
 * springs to each new word's measured width — same intent, no reflow.
 *
 * Accessibility: this whole block is aria-hidden. Hero.tsx renders the complete
 * sentence once, visually hidden, so a screen reader gets one clean sentence
 * instead of a fresh announcement every 2.4 seconds.
 */
export function WordCycle() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(() =>
    Math.max(0, HERO.words.indexOf(HERO.restWord)),
  );
  const [width, setWidth] = useState(0);
  const sizerRef = useRef<HTMLSpanElement>(null);

  const word = reduce ? HERO.restWord : HERO.words[index];

  useEffect(() => {
    if (reduce) return;

    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(
        () => setIndex((i) => (i + 1) % HERO.words.length),
        DWELL,
      );
    };
    const stop = () => clearInterval(timer);

    // Don't burn frames animating a word nobody is looking at.
    const onVisibility = () => {
      stop();
      if (document.visibilityState === "visible") start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  // A ResizeObserver on the hidden sizer covers all three ways the width can
  // change — the word swapping, the webfont finishing loading, and the viewport
  // resizing (the type is sized in vw). Measuring on index alone would leave
  // the rule wrong until the next swap after a font load.
  useEffect(() => {
    const el = sizerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <span className="block">
      {/* Off-screen twin of the live word, used only for measurement. Kept in
          flow-free absolute position so it never affects layout. */}
      <span
        ref={sizerRef}
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] top-0 whitespace-nowrap font-extrabold leading-none tracking-tightest"
        style={{ fontSize: WORD_SIZE }}
      >
        {word}
      </span>

      <span
        className="relative block overflow-hidden font-extrabold leading-none tracking-tightest text-ink"
        style={{ fontSize: WORD_SIZE, height: "1.08em" }}
      >
        {/* mode="wait" is the difference between this reading as editorial
            and reading as a smear. With both words on screen at once, two
            56px extrabold words cross-fade through each other and the
            overlap becomes the loudest moment in the hero. Sequencing them
            costs ~250ms and the motion stays legible. */}
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={word}
            className="absolute inset-x-0 top-0 block whitespace-nowrap leading-none"
            initial={reduce ? { opacity: 1 } : { y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={
              reduce
                ? { opacity: 0 }
                : { y: "-45%", opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } }
            }
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
            }
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* The only saturated colour on the page, and the only thing whose width
          moves. */}
      <motion.span
        aria-hidden
        className="mt-2 block h-[4px] rounded-pill bg-lime"
        initial={{ width: 0 }}
        animate={{ width }}
        transition={
          reduce
            ? { duration: 0 }
            // Trails the word: the sizer updates the instant the index
            // changes, and without the delay the rule leads the swap.
            : { type: "spring", stiffness: 170, damping: 26, mass: 0.9, delay: 0.12 }
        }
      />
    </span>
  );
}
