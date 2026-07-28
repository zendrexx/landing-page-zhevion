"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type CycleScreen = { src: string; alt: string };

/**
 * Crossfades a device's real captures in place — the hero's motion comes from
 * the apps themselves rather than from decoration.
 *
 * The fade never dips: the outgoing capture is held at full opacity *underneath*
 * the incoming one until the incoming one has fully covered it, then it drops to
 * 0 while it's hidden. Two layers crossfading against each other would let the
 * frame's background show through at ~25% mid-transition, which reads as a flash.
 *
 * All captures are in the DOM from the first paint, so with JS off (or motion
 * reduced) the device simply shows the first screen — no blank frame, ever.
 */
export function ScreenCycle({
  screens,
  imgWidth,
  imgHeight,
  sizes,
  priority = false,
  interval = 3800,
  startDelay = 0,
}: {
  /** Two or more captures of the *same* app, so they share an aspect ratio. */
  screens: CycleScreen[];
  imgWidth: number;
  imgHeight: number;
  sizes?: string;
  priority?: boolean;
  /** Time each capture holds, in ms. */
  interval?: number;
  /** Offsets the first flip so two devices on screen don't switch in lockstep. */
  startDelay?: number;
}) {
  const [{ active, prev }, setFrame] = useState({ active: 0, prev: -1 });

  useEffect(() => {
    if (screens.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticker: ReturnType<typeof setInterval> | undefined;
    const advance = () =>
      setFrame((f) => ({
        active: (f.active + 1) % screens.length,
        prev: f.active,
      }));

    const kickoff = setTimeout(() => {
      advance();
      ticker = setInterval(advance, interval);
    }, startDelay + interval);

    return () => {
      clearTimeout(kickoff);
      if (ticker) clearInterval(ticker);
    };
  }, [screens.length, interval, startDelay]);

  return (
    <>
      {screens.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          /* Only the first capture is described: to a screen reader this is one
             illustration of one app, not four separate images worth reading. */
          alt={i === 0 ? s.alt : ""}
          width={imgWidth}
          height={imgHeight}
          priority={priority && i === 0}
          sizes={sizes}
          className="absolute inset-0 block h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none"
          style={{
            opacity: i === active || i === prev ? 1 : 0,
            zIndex: i === active ? 2 : i === prev ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}
