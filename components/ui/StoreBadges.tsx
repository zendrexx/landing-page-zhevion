"use client";

import { trackCTA } from "@/lib/analytics";

/**
 * App Store + Google Play badges rendered as inline SVG.
 *
 * PRE-LAUNCH: links are placeholders (href="#"). When the apps go live, replace
 * `href` with the real store URLs. `data-cta` is forwarded to analytics.
 */
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

export function StoreBadges({
  app,
  className = "",
}: {
  app: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap gap-3 ${className}`}
      aria-label={`Download ${app}, coming soon`}
    >
      <a
        href="#"
        data-cta={`appstore-${app}`}
        onClick={() => trackCTA(`appstore-${app}`)}
        className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-cream transition hover:bg-white/10 focus-visible:bg-white/10"
      >
        <AppleBadge />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wider text-muted">Coming soon to</span>
          <span className="block text-sm font-bold">App Store</span>
        </span>
      </a>
      <a
        href="#"
        data-cta={`googleplay-${app}`}
        onClick={() => trackCTA(`googleplay-${app}`)}
        className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-cream transition hover:bg-white/10 focus-visible:bg-white/10"
      >
        <GoogleBadge />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wider text-muted">Coming soon to</span>
          <span className="block text-sm font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
