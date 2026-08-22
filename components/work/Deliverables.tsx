"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { WORK } from "@/lib/content";

const CARD_WIDTH = 340;
const GAP = 24;

/**
 * "What we build" — a horizontally-scrolling strip.
 *
 * Desktop/tablet: true scroll-jacking. The section reserves extra vertical
 * scroll height; while it's pinned (`sticky`), vertical scroll position
 * drives the row's horizontal `x`. Because this rides the page's own real
 * scroll rather than capturing wheel/touch events on a nested container,
 * keyboard paging and screen-reader traversal are unaffected — the pin never
 * traps focus or scroll the way a nested `overflow-x` capture would.
 *
 * Mobile, or `prefers-reduced-motion`: no pinning and no reserved height —
 * the same cards render in a plain native horizontal-scroll row instead.
 */
export function Deliverables() {
  const reduce = useReducedMotion();
  const [pin, setPin] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPin(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  return pin ? <PinnedRow /> : <PlainRow />;
}

function PinnedRow() {
  const items = WORK.deliverables;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackWidth = items.length * (CARD_WIDTH + GAP);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -trackWidth]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${100 + items.length * 55}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <p className="shell eyebrow mb-8 text-ink-faint">What we build</p>
        <motion.div
          style={{ x }}
          className="mx-auto flex max-w-content gap-6 pl-[var(--page-x)]"
        >
          {items.map((item, i) => (
            <Card key={item.title} index={i} title={item.title} body={item.body} />
          ))}
          {/* Trailing breathing room so the last card doesn't stop flush
              against the viewport edge at the end of the pin. */}
          <div className="w-[30vw] shrink-0" aria-hidden />
        </motion.div>
      </div>
    </div>
  );
}

function PlainRow() {
  const items = WORK.deliverables;
  return (
    <div className="shell py-[clamp(48px,10vh,96px)]">
      <p className="eyebrow mb-6 text-ink-faint">What we build</p>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {items.map((item, i) => (
          <div key={item.title} className="snap-start">
            <Card index={i} title={item.title} body={item.body} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="flex h-[240px] w-[min(80vw,340px)] shrink-0 flex-col justify-between rounded-card border border-ink/10 bg-paper-deep p-7 md:w-[340px]">
      <span className="eyebrow text-ink-faint">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-ink-soft">{body}</p>
      </div>
    </div>
  );
}
