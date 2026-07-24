import Image from "next/image";

/**
 * Per-app lockup marks — the real shipping app icons, both featuring Zeb in
 * that app's world: Zebite on lime, RepForge on near-black with a blue ring.
 *
 * Component names stay `GroceryMark` / `ForgeMark` so every existing call site
 * keeps working; only the artwork changed.
 */
function AppIcon({ src, label, size }: { src: string; label: string; size: number }) {
  return (
    <Image
      src={src}
      alt={label}
      width={256}
      height={256}
      sizes={`${size}px`}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-[30%] ring-1 ring-white/12"
    />
  );
}

export function GroceryMark({ size = 40 }: { size?: number }) {
  return <AppIcon src="/mascot/zebite/icon.png" label="Zebite" size={size} />;
}

export function ForgeMark({ size = 40 }: { size?: number }) {
  return <AppIcon src="/mascot/repforge/icon.png" label="RepForge" size={size} />;
}
