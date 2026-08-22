import Image from "next/image";
import { HAND_SCREEN_RECT } from "@/lib/content";

/**
 * The interface inside the hero phone.
 *
 * Positioned from HAND_SCREEN_RECT — percentages measured out of the master by
 * scripts/export-hand.py, not eyeballed.
 *
 * The default src is a hero-specific build of the Zebite capture: the mockup's
 * screen is 0.4354 and the raw capture is 0.4664, so `object-cover` on the
 * original would shave ~3.5% off each side and eat the UI's side margins.
 * export-hand.py instead re-bands the capture to 840x1929 by repeating its flat
 * top and bottom rows, so it drops in with no crop and no distortion.
 *
 * A Dynamic Island is drawn over the screen's own top edge rather than relying
 * on the bezel artwork's molded notch alone — the mockup's notch sits right at
 * the screen boundary, so without this the capture's own content (its top
 * padding) shows through underneath it instead of solid black.
 *
 * The image is drawn at its native 840px regardless of how small the phone
 * renders, which is deliberate: the hand is an upscale from a 370px master and
 * is a little soft, but the screen is the part the eye actually reads, so it
 * stays sharp. Swap `src` for any future Zhevion interface — that is the whole
 * API of this component. A src at a different aspect still works; it just gets
 * cover-cropped rather than fitting exactly.
 */
export function PhoneScreen({
  src = "/hero/zebite-home.png",
  alt = "Zebite's home screen, showing the week's meal plan.",
}: {
  src?: string;
  alt?: string;
}) {
  return (
    <div
      // pointer-events-auto so the cursor can react to it. It sits only over
      // the screen, never over the PNG's transparent margins, so it never eats
      // hovers meant for the wordmark behind the hand.
      className="pointer-events-auto absolute overflow-hidden bg-graphite-900"
      data-cursor="visual"
      data-cursor-label="Zebite"
      style={{
        left: `${HAND_SCREEN_RECT.left}%`,
        top: `${HAND_SCREEN_RECT.top}%`,
        width: `${HAND_SCREEN_RECT.width}%`,
        height: `${HAND_SCREEN_RECT.height}%`,
        // Two radii: the screen is far taller than it is wide, and a single
        // percentage would draw an oval at the corners.
        borderRadius: HAND_SCREEN_RECT.radius,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 40vw, 260px"
        className="object-cover"
        priority
      />

      {/* Dynamic Island */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[1.2%] z-20 -translate-x-1/2"
        style={{
          width: "28%",
          aspectRatio: "3.2 / 1",
          borderRadius: "9999px",
          background: "#000",
        }}
      />

      {/* Glass. A single soft diagonal, low enough that it reads as the room
          reflecting rather than as a gradient laid over a screenshot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(128deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 22%, rgba(255,255,255,0) 46%)",
        }}
      />
    </div>
  );
}
