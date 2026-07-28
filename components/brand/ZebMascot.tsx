import Image from "next/image";

/**
 * Zeb — the studio mascot, in one of his shipped poses.
 *
 * The source art is rendered on a fixed canvas with a lot of transparent
 * padding: `zebwave.png` is 1024×682 but Zeb himself only occupies a 467×591
 * box that starts 31% in from the left. Dropping one in with `object-contain`
 * therefore renders him small and visibly off-centre inside his own box, which
 * is impossible to lay out against.
 *
 * So each pose records its opaque bounding box (measured from the PNG's alpha
 * channel) and this component crops to it: the wrapper takes the *content*
 * aspect ratio, and the image is scaled up and offset inside it so the content
 * box exactly fills the wrapper. Callers can then size Zeb like any other box.
 */
const POSES = {
  /** Waving hello — the studio's greeting pose. */
  wave: { src: "/mascot/zeb/zebwave.png", w: 1024, h: 682, box: { x: 315, y: 28, w: 467, h: 591 } },
  /** Chef Zeb at the pan — Zebite / meal planning. */
  cook: { src: "/mascot/zeb/zebcook.png", w: 1024, h: 1024, box: { x: 144, y: 23, w: 762, h: 920 } },
  /** Holding a warning sign — empty and error states. */
  warn: { src: "/mascot/zeb/zebwarn.png", w: 1024, h: 682, box: { x: 263, y: 28, w: 568, h: 603 } },
} as const;

export type ZebPose = keyof typeof POSES;

export function ZebMascot({
  pose = "wave",
  alt = "",
  /** Rendered width of the *image*, ~2× the wrapper because of the crop. */
  sizes = "420px",
  priority = false,
  className = "",
}: {
  pose?: ZebPose;
  /** Leave empty for decoration; the wrapper is then hidden from a11y. */
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const p = POSES[pose];
  const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

  return (
    <span
      className={`relative block overflow-hidden ${className}`}
      style={{ aspectRatio: `${p.box.w} / ${p.box.h}` }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Image
        src={p.src}
        alt=""
        width={p.w}
        height={p.h}
        priority={priority}
        sizes={sizes}
        /* max-w-none: preflight caps images at 100% of their box, which would
           undo the blow-up the crop depends on. */
        className="absolute max-w-none select-none"
        style={{
          width: pct(p.w / p.box.w),
          height: pct(p.h / p.box.h),
          left: pct(-p.box.x / p.box.w),
          top: pct(-p.box.y / p.box.h),
        }}
        draggable={false}
      />
    </span>
  );
}
