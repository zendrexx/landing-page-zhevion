"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HERO } from "@/lib/content";
import { HeroHand } from "./HeroHand";
import { WordCycle } from "./WordCycle";

const LETTERS = "ZHEVION".split("");

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Wordmark size.
 *
 * Measured, not guessed: "ZHEVION" in Plus Jakarta Sans ExtraBold advances
 * 4.507em, so the exact edge-to-edge size is contentWidth / 4.507. The vw
 * coefficient below is that ratio with ~1.5% held back, which keeps the letters
 * from ever being squeezed by flex and leaves justify-between a few pixels of
 * even tracking to distribute. Re-derive it if the display face ever changes.
 *
 *   390px viewport  -> 350px content  -> 75px   (exact fit 77.7)
 *   834px viewport  -> 751px content  -> 161px  (exact fit 166.6)
 *   >=1200px        -> 1104px content -> 241px  (exact fit 244.9)
 */
const WORDMARK_SIZE = "clamp(3.5rem, 19.3vw, 15.05rem)";

export function Hero() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement | null>(null);

  // "Becomes a container": scrolling in pins the hero (extra scroll height
  // reserved on the outer div, sticky inner) while it settles and its bottom
  // corners round off, revealing the dark ground behind it as a frame — then
  // holds there before releasing into Statement. Dark is what makes this
  // visible at all: the shrink has nothing to read against on a same-colour
  // backdrop.
  //
  // transformOrigin "50% 0%" (top-center) means the top edge never moves —
  // only the sides and bottom recede. One uniform `scale` (not separate
  // scaleX/scaleY) is deliberate: different X/Y factors stretch everything
  // inside out of proportion — the wordmark, the phone, the nav pill all read
  // as squeezed rather than settled. A single small scale keeps every side's
  // reveal proportionally correct and the motion reads as scrolling into
  // place, not the page being squashed. Only the bottom corners round, since
  // the top edge stays flush and a rounded top corner would look wrong
  // sitting exactly at the pin's own top edge.
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.97, 0.97]);
  const bottomRadius = useTransform(scrollYProgress, [0, 0.6, 1], [0, 24, 24]);
  const exitRadius = useTransform(bottomRadius, (r) => `0px 0px ${r}px ${r}px`);

  const rise = (delay: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay: 0 },
        }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <div
      ref={pinRef}
      className={reduce ? "relative" : "dark-panel relative"}
      style={reduce ? undefined : { height: "170vh" }}
    >
      <div className={reduce ? undefined : "sticky top-0 h-screen overflow-hidden"}>
        <motion.section
          style={
            reduce
              ? undefined
              : {
                  scale: exitScale,
                  borderRadius: exitRadius,
                  transformOrigin: "50% 0%",
                }
          }
          className="paper-grain relative isolate min-h-[100svh] overflow-hidden bg-paper"
        >
      <div className="relative mx-auto flex min-h-[100svh] max-w-content flex-col px-[var(--page-x)]">
        <motion.p
          {...rise(0.2)}
          className="eyebrow pt-[clamp(96px,12vh,132px)] text-ink-faint"
        >
          {HERO.eyebrow}
        </motion.p>

        {/* ---- Wordmark --------------------------------------------------
            justify-between guarantees the first and last letters land exactly
            on the content edges whatever the font metrics do; shrink-0 stops
            flex from squeezing a glyph into its own overflow:hidden mask if the
            size is ever a pixel too large. Letters carry no letter-spacing — on
            a flex child that adds trailing space after the final glyph and the
            right edge stops being flush. */}
        <h1 className="mt-[clamp(12px,2.5vh,28px)]">
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
                      : { duration: 0.9, delay: 0.3 + i * 0.04, ease: EASE }
                  }
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* ---- Statement --------------------------------------------------
            Full width on mobile: the longest word runs 10.88em, and capping
            this column is exactly what pushes it off the screen edge. From md
            up the hand shares the row, so it caps at 62%. */}
        <div className="relative z-30 mt-[clamp(36px,6vh,88px)] max-w-full md:max-w-[min(620px,62%)]">
          <p className="sr-only">{HERO.spoken}</p>

          <div aria-hidden>
            <motion.p
              {...rise(0.7)}
              className="text-[clamp(1rem,1.9vw,1.35rem)] font-medium text-ink-soft"
            >
              {HERO.lead}
            </motion.p>

            <motion.div {...rise(0.78)} className="mt-2">
              <WordCycle />
            </motion.div>

            <motion.p
              {...rise(0.86)}
              className="mt-4 text-[clamp(1rem,1.9vw,1.35rem)] font-medium text-ink-soft"
            >
              {HERO.tail}
            </motion.p>
          </div>
        </div>

        {/* ---- Baseline row -----------------------------------------------
            Capped at 62% from md so the meta never lands on the hand. On mobile
            the hand reaches too far left for anything to sit beside the scroll
            cue, so the meta is dropped rather than overlapped. */}
        <motion.div
          {...rise(1.2)}
          className="relative z-30 mt-auto flex items-end justify-between gap-6 pb-[clamp(22px,5vh,44px)] pt-[clamp(28px,6vh,64px)] md:max-w-[62%]"
        >
          <ScrollCue reduce={!!reduce} />
          <span className="eyebrow hidden text-[0.6875rem] text-ink-faint md:inline">
            {HERO.meta}
          </span>
        </motion.div>

        {/* Inside the container, so the hand tracks the content column rather
            than the viewport edge once max-w-content caps out. */}
        <HeroHand />
      </div>
        </motion.section>
      </div>
    </div>
  );
}

/** A hairline that keeps travelling down its own track. */
function ScrollCue({ reduce }: { reduce: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative block h-[26px] w-px overflow-hidden bg-ink/15">
        {!reduce ? (
          <motion.span
            className="absolute inset-x-0 top-0 block h-[10px] bg-ink"
            animate={{ y: [-10, 26] }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              ease: [0.65, 0, 0.35, 1],
              repeatDelay: 0.35,
            }}
          />
        ) : null}
      </span>
      <span className="eyebrow text-[0.6875rem] text-ink-faint">Scroll</span>
    </span>
  );
}
