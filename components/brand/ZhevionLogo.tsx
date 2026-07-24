import Image from "next/image";

/**
 * Zhevion studio mark — Zeb, the studio mascot, on a graphite tile.
 *
 * The tile is deliberately neutral graphite rather than Zebite green or
 * RepForge blue: this mark stands for the studio, not either app. Zeb's head is
 * cut from the same artwork the app icons use, so all three read as one family.
 */
export function ZhevionMark({ size = 32 }: { size?: number }) {
  return (
    <span
      role="img"
      aria-label="Zhevion"
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[28%] bg-graphite-800 ring-1 ring-white/12"
      style={{ width: size, height: size }}
    >
      <Image
        src="/mascot/zeb/zeb-head.png"
        alt=""
        aria-hidden
        width={512}
        height={505}
        sizes={`${size}px`}
        className="h-[82%] w-[82%] object-contain"
      />
    </span>
  );
}

export function ZhevionWordmark({ size = 32 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-extrabold tracking-tightest">
      <ZhevionMark size={size} />
      <span className="text-[1.35rem] leading-none text-cream">Zhevion</span>
    </span>
  );
}
