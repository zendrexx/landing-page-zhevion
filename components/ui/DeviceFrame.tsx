import Image from "next/image";
import { ScreenCycle, type CycleScreen } from "@/components/ui/ScreenCycle";

/**
 * iPhone-style device frame sized *from the screenshot itself*.
 *
 * The two apps ship captures at different aspect ratios, so the frame takes the
 * real pixel dimensions and derives its height from them. The screen area is
 * exactly the image's aspect ratio, which means nothing is ever cropped or
 * letterboxed.
 *
 * The frame always draws the iPhone chrome itself — Dynamic Island and home
 * indicator — because the captures come off Android and their own status bar
 * (clock, Wi-Fi, battery) and gesture bar are wrong for this frame. Both are
 * stripped before the screenshot ships. What differs is where the island gets
 * the room to sit:
 *
 *  - `bandIncluded` (Zebite): the export bakes a top and bottom band into the
 *    capture by extending its own first and last row (scripts/export-screens.py),
 *    so the island floats over a band in the screenshot's own colour. That's
 *    what lets a dimmed sheet like 41_add_to_pantry meet the bezel in its scrim
 *    rather than seaming against a fixed cream strip.
 *  - Otherwise (RepForge): the capture starts flush at the app's own header, so
 *    the frame reserves a status strip above it, filled with `chrome` — the
 *    screenshot's top-edge colour — so it reads as one continuous screen.
 *
 * Every dimension is a fraction of `width`. The frame renders at 124px in the
 * studio grid and 244px in the hero, and fixed pixel chrome that reads as an
 * iPhone at one size reads as a toy at the other.
 *
 * Pass `cycle` to make the screen flip through several captures of the same app
 * (see ScreenCycle). The frame itself stays a server component — only the image
 * stack crosses the client boundary — so the galleries that show one static
 * screen ship no extra JS.
 */
export function DeviceFrame({
  src,
  alt,
  imgWidth,
  imgHeight,
  width = 240,
  chrome = "#0b0b0c",
  bandIncluded = false,
  priority = false,
  sizes,
  cycle,
  cycleOffset = 0,
  className = "",
}: {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the capture — drives the frame's proportions. */
  imgWidth: number;
  imgHeight: number;
  width?: number;
  /** Screen fill; match the screenshot's top edge. */
  chrome?: string;
  /** True when the capture bakes in its own band for the island to sit over. */
  bandIncluded?: boolean;
  priority?: boolean;
  /** Overrides the default sizes hint when the frame is scaled up by a parent. */
  sizes?: string;
  /**
   * Captures to crossfade through, first one first — which must be the same
   * image as `src`, since that's what a no-JS render shows. Ignored below two
   * entries.
   */
  cycle?: CycleScreen[];
  /** Staggers this frame's first flip so neighbouring devices don't sync up. */
  cycleOffset?: number;
  className?: string;
}) {
  const bezel = 3;
  const screenW = width - bezel * 2;
  const statusH = bandIncluded ? 0 : Math.round(width * 0.085);
  const screenH = Math.round((screenW * imgHeight) / imgWidth) + statusH;

  // Corner radius has to scale with the frame: a fixed rem value that reads as
  // an iPhone at 240px turns a 124px thumbnail into an oval. 16% of the width
  // matches the proportions of a real device at any size.
  const radius = Math.round(width * 0.16);

  // Island and home indicator, in the proportions a 15 Pro wears them.
  const islandW = Math.round(width * 0.28);
  const islandH = Math.round(width * 0.064);
  const islandTop = Math.round(width * 0.02);
  const indicatorW = Math.round(width * 0.32);
  const indicatorH = Math.max(2, Math.round(width * 0.011));
  const indicatorBottom = Math.max(2, Math.round(width * 0.012));

  // Dark chrome needs a lighter indicator and vice versa, so it reads on both
  // the cream (Zebite) and near-black (RepForge) screens.
  const dark = isDark(chrome);

  return (
    <div
      className={`relative shrink-0 bg-graphite-700 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10 ${className}`}
      style={{ width, padding: bezel, borderRadius: radius }}
    >
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: screenW,
          height: screenH,
          background: chrome,
          borderRadius: radius - bezel,
        }}
      >
        {/* Status strip the island sits in — only for captures that didn't
            bring their own band; otherwise the island overlays the screen. */}
        {!bandIncluded && (
          <div
            className="relative z-20 flex shrink-0 items-center justify-center"
            style={{ height: statusH }}
          >
            <Island width={islandW} height={islandH} />
          </div>
        )}

        {/* Screen content — exact aspect ratio, so the full capture is visible */}
        <div className="relative flex-1">
          {cycle && cycle.length > 1 ? (
            <ScreenCycle
              screens={cycle}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
              priority={priority}
              sizes={sizes ?? `${Math.round(width * 1.3)}px`}
              startDelay={cycleOffset}
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={imgWidth}
              height={imgHeight}
              priority={priority}
              /* headroom: the hero scales its frames up on desktop, and a sizes
                 hint of exactly `width` would hand back a too-small source */
              sizes={sizes ?? `${Math.round(width * 1.3)}px`}
              className="block h-full w-full"
            />
          )}

          {bandIncluded && (
            <div
              className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
              style={{ top: islandTop }}
            >
              <Island width={islandW} height={islandH} />
            </div>
          )}

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full"
            style={{
              bottom: indicatorBottom,
              width: indicatorW,
              height: indicatorH,
              background: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** The Dynamic Island — always near-black, on light and dark screens alike. */
function Island({ width, height }: { width: number; height: number }) {
  return (
    <div
      aria-hidden
      className="rounded-full bg-[#08090a]"
      style={{ width, height }}
    />
  );
}

/** Rough perceived-luminance check on a #rrggbb string. */
function isDark(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
