"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DWELL = 4200;

/**
 * Reserve the longest word's natural width, including before hydration.
 * Quiet fades keep the original word cycle without moving the headline's
 * line breaks or baseline. Reduced motion keeps the first word visible.
 */
export function HeroWordCycle({ words, className = "" }: { words: readonly string[]; className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const word = reduce ? words[0] : words[index];

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), DWELL);
    return () => clearInterval(timer);
  }, [reduce, words.length]);

  return (
    <span
      className={`relative inline-grid align-baseline ${className}`}
    >
      {words.map((candidate) => (
        <span
          key={candidate}
          aria-hidden
          className="pointer-events-none invisible whitespace-nowrap [grid-area:1/1]"
        >
          {candidate}
        </span>
      ))}

      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={word}
          className="block whitespace-nowrap [grid-area:1/1]"
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
