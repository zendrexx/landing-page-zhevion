"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DWELL = 2200;

/**
 * The rotating close of the studio hero headline ("...forward." / "faster."
 * / "further." / "ahead."), sitting inline at the end of the sentence rather
 * than on its own line — unlike `hero/WordCycle.tsx`, this headline is short
 * enough that the reflow from a width change never reaches earlier lines.
 *
 * A hidden measuring twin drives the wrapper's width so the swap animates
 * width->new-width instead of snapping, matching the spring language the
 * rest of the site's text motion uses.
 */
export function HeroWordCycle({ words, className = "" }: { words: readonly string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const sizerRef = useRef<HTMLSpanElement>(null);

  const word = reduce ? words[0] : words[index];

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), DWELL);
    return () => clearInterval(timer);
  }, [reduce, words.length]);

  useEffect(() => {
    const el = sizerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [word]);

  return (
    <motion.span
      className={`relative inline-block overflow-hidden align-bottom ${className}`}
      animate={{ width }}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28, mass: 0.7 }}
      style={{ height: "1em" }}
    >
      {/* Off-screen twin, measured only — never visible, never affects layout. */}
      <span
        ref={sizerRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
      >
        {word}
      </span>

      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={word}
          className="absolute left-0 top-0 block whitespace-nowrap"
          initial={reduce ? { opacity: 1 } : { y: "60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-55%", opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
