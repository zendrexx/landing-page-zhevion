"use client";

import { trackCTA } from "@/lib/analytics";

/**
 * App Store + Google Play badges rendered as inline SVG.
 *
 * Each store is one of three states, driven by `lib/content.ts` (GROCERY.store
 * / FORGE.store) so launch status is flipped there, not here:
 *   - live      → a URL is passed → clickable "Get it on" badge
 *   - next      → no URL, but named in `next` → emphasized "Up next" hint
 *                 (still not a link — it just signals which store lands first)
 *   - coming    → no URL → muted "Coming soon" badge
 *
 * Today both apps are pre-launch; Zebite's Google Play is marked `next`.
 */
type StoreKey = "googlePlay" | "appStore";
type Tone = "grocery" | "forge";

/** Accent styling for the "up next" hint, per app. lime/volt are real theme
 *  colours, so opacity modifiers (bg-lime/10) generate fine. */
const TONE: Record<Tone, { text: string; ring: string; tint: string; dot: string }> = {
  grocery: { text: "text-lime", ring: "border-lime/45", tint: "bg-lime/10", dot: "bg-lime" },
  forge: { text: "text-volt-soft", ring: "border-volt/45", tint: "bg-volt/10", dot: "bg-volt-soft" },
};

function AppleBadge() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M16.365 12.86c-.02-2.02 1.65-2.99 1.72-3.04-0.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.3 2-1.4 2.44-.36 6.05 1.01 8.03.67.97 1.47 2.06 2.51 2.02 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.99 2.44-1.96.77-1.12 1.09-2.21 1.11-2.27-.02-.01-2.13-.82-2.15-3.25zM14.4 6.06c.56-.68.94-1.62.83-2.56-.81.03-1.79.54-2.37 1.21-.52.6-.98 1.56-.86 2.48.9.07 1.83-.46 2.4-1.13z" />
    </svg>
  );
}

function GoogleBadge() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M3.6 2.1c-.2.2-.3.5-.3.9v18c0 .4.1.7.3.9l10-9.9-10-9.9z" fill="#00D3FF" />
      <path d="M17.3 8.9l-3.7-2.1L4.6 2 15.9 13l1.4-4.1z" fill="#00F076" />
      <path d="M13.6 12L4.6 22l9-5.1 3.7-2.1L13.6 12z" fill="#FF3A44" />
      <path d="M17.3 8.9L15.9 13l4.5 2.6c.9-.5 1.4-1.2 1.4-2.6 0-1.4-.5-2.1-1.4-2.6l-3.1-1.5z" fill="#FFC800" />
    </svg>
  );
}

/** One badge. Live link when `href` is set; otherwise a non-link that is either
 *  an emphasized "up next" hint (`next`) or a muted "coming soon". */
function Badge({
  href,
  next,
  tone,
  cta,
  icon,
  liveTop,
  store,
  appName,
}: {
  href: string | null;
  next: boolean;
  tone: Tone;
  cta: string;
  icon: React.ReactNode;
  liveTop: string; // small line shown when live, e.g. "Get it on"
  store: string; // store name, e.g. "Google Play"
  appName: string; // for the hint's accessible label
}) {
  // Live: clickable download link.
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-cta={cta}
        onClick={() => trackCTA(cta)}
        className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-cream transition hover:bg-white/10 focus-visible:bg-white/10"
      >
        {icon}
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wider text-muted">{liveTop}</span>
          <span className="block text-sm font-bold">{store}</span>
        </span>
      </a>
    );
  }

  // Up next: not a link, but visually promoted so it reads as "first to land".
  if (next) {
    const t = TONE[tone];
    return (
      <span
        aria-disabled="true"
        aria-label={`${appName} on ${store} — coming soon, launching first`}
        className={`inline-flex items-center gap-2.5 rounded-xl border ${t.ring} ${t.tint} px-4 py-2.5 text-cream`}
      >
        {icon}
        <span className="text-left leading-tight">
          <span className={`flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider ${t.text}`}>
            <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${t.dot} animate-pulse`} />
            Up next
          </span>
          <span className="block text-sm font-bold">{store}</span>
        </span>
      </span>
    );
  }

  // Coming soon: muted, non-interactive.
  return (
    <span
      aria-disabled="true"
      className="inline-flex cursor-default items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-cream/55"
    >
      {icon}
      <span className="text-left leading-tight">
        <span className="block text-[9px] uppercase tracking-wider text-muted">Coming soon to</span>
        <span className="block text-sm font-bold">{store}</span>
      </span>
    </span>
  );
}

export function StoreBadges({
  app,
  label,
  googlePlay = null,
  appStore = null,
  next = null,
  className = "",
}: {
  /** Analytics id, e.g. "grocery" / "grocery-cta". Not shown to users. */
  app: string;
  /** Human app name for accessible labels (e.g. "Zebite"). Falls back to `app`. */
  label?: string;
  /** Google Play listing URL, or null for "coming soon". */
  googlePlay?: string | null;
  /** App Store listing URL, or null for "coming soon". */
  appStore?: string | null;
  /** Which coming-soon store to promote as "up next" (first to launch). */
  next?: StoreKey | null;
  className?: string;
}) {
  const anyLive = Boolean(googlePlay || appStore);
  const appId = app.replace(/-cta$/, "");
  const appName = label ?? appId;
  // Colour the "up next" hint to match the app being shown.
  const tone: Tone = appId.startsWith("forge") ? "forge" : "grocery";

  return (
    <div
      className={`flex flex-wrap gap-3 ${className}`}
      aria-label={anyLive ? `Download ${appName}` : `Download ${appName}, coming soon`}
    >
      <Badge
        href={appStore}
        next={!appStore && next === "appStore"}
        tone={tone}
        cta={`appstore-${app}`}
        icon={<AppleBadge />}
        liveTop="Download on the"
        store="App Store"
        appName={appName}
      />
      <Badge
        href={googlePlay}
        next={!googlePlay && next === "googlePlay"}
        tone={tone}
        cta={`googleplay-${app}`}
        icon={<GoogleBadge />}
        liveTop="Get it on"
        store="Google Play"
        appName={appName}
      />
    </div>
  );
}
