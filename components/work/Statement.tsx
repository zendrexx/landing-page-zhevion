"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { WORK } from "@/lib/content";

const WORDS = WORK.statement.split(" ");

// Words finish resolving by 80% of the pin's scroll distance — the remaining
// 20% is the "hold": viewport still anchored, line fully readable, before it
// releases into Deliverables. That hold is what reads as "anchored until the
// text is done" rather than a passive fade while scrolling past.
const REVEAL_END = 0.8;

/**
 * A dark, pinned panel. Scrolling into it anchors the viewport (sticky, extra
 * scroll height reserved) while each word resolves from ghosted to full cream
 * against the dark ground — the same contrast that makes Hero's "settle &
 * round" exit transform visible as it scales/rounds above this panel.
 *
 * Reduced motion: no pin, no reserved height, full sentence visible
 * immediately — same principle Deliverables.tsx already applies.
 */
export function Statement() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <div className="dark-panel py-[clamp(64px,14vh,140px)]">
        <div className="shell">
          <p className="max-w-[38rem] text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-tightest text-cream">
            {WORK.statement}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="dark-panel relative" style={{ height: "260vh" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell">
          <p className="max-w-[38rem] text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.2] tracking-tightest text-cream">
            {WORDS.map((word, i) => (
              <Fragment key={i}>
                <Word word={word} index={i} total={WORDS.length} progress={scrollYProgress} />
                {i < WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * REVEAL_END;
  const end = ((index + 1) / total) * REVEAL_END;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const blur = useTransform(progress, [start, end], [6, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.span style={{ opacity, filter }} className="inline-block">
      {word}
    </motion.span>
  );
}
