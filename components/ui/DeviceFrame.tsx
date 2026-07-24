import Image from "next/image";

/**
 * iPhone-style device frame sized *from the screenshot itself*.
 *
 * The two apps ship captures at different aspect ratios (grocery 720×1471,
 * Forge 720×1560), so the frame takes the real pixel dimensions and derives its
 * height from them. The screen area is exactly the image's aspect ratio, which
 * means nothing is ever cropped or letterboxed.
 *
 * The captures are full-bleed app UIs with their own header at the very top, so
 * the dynamic island sits in a dedicated status strip *above* the screenshot,
 * tinted to the screenshot's own top-edge colour (`chrome`) so it reads as one
 * continuous screen instead of a black bar stuck on a cream app.
 */
export function DeviceFrame({
  src,
  alt,
  imgWidth,
  imgHeight,
  width = 240,
  chrome = "#0b0b0c",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  /** Intrinsic pixel size of the capture — drives the frame's proportions. */
  imgWidth: number;
  imgHeight: number;
  width?: number;
  /** Status-strip fill; match the screenshot's top edge. */
  chrome?: string;
  priority?: boolean;
  className?: string;
}) {
  const bezel = 3;
  const screenW = width - bezel * 2;
  const statusH = Math.round(width * 0.085);
  const screenH = Math.round((screenW * imgHeight) / imgWidth) + statusH;

  // Corner radius has to scale with the frame: a fixed rem value that reads as
  // an iPhone at 240px turns a 124px thumbnail into an oval. 16% of the width
  // matches the proportions of a real device at any size.
  const radius = Math.round(width * 0.16);

  // Dark chrome needs a lighter island and vice versa, so the island reads on
  // both the cream (grocery) and near-black (Forge) status strips.
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
        {/* Status strip with dynamic island — device chrome, above app content */}
        <div
          className="relative z-20 flex shrink-0 items-center justify-center"
          style={{ height: statusH }}
        >
          <div
            className="rounded-full"
            style={{
              height: Math.round(width * 0.062),
              width: "30%",
              background: dark ? "#000" : "rgba(0,0,0,0.82)",
            }}
          />
        </div>

        {/* Screen content — exact aspect ratio, so the full capture is visible */}
        <div className="relative flex-1">
          <Image
            src={src}
            alt={alt}
            width={imgWidth}
            height={imgHeight}
            priority={priority}
            /* headroom: the hero scales its frames up on desktop, and a sizes
               hint of exactly `width` would hand back a too-small source */
            sizes={`${Math.round(width * 1.3)}px`}
            className="block h-full w-full"
          />
          {/* Home indicator */}
          <div
            className="pointer-events-none absolute bottom-[5px] left-1/2 z-20 h-[3px] w-[30%] -translate-x-1/2 rounded-full"
            style={{ background: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)" }}
          />
        </div>
      </div>
    </div>
  );
}

/** Rough perceived-luminance check on a #rrggbb string. */
function isDark(hex: string) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
