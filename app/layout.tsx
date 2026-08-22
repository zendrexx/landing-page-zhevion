import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";

/**
 * No `weight` array: omitting it makes next/font serve the variable font, which
 * is fewer bytes than the three static cuts it replaces and gives us the 400
 * and 600 the editorial hierarchy needs. The old list stopped at 500/700/800,
 * so every `font-semibold` in the codebase was silently synthesising.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// Canonical origin. The /legal/* URLs derived from this are what the store
// listings and OAuth consent screens point at — don't change it casually.
const SITE_URL = "https://zhevion.com";

// TODO: This metadata reflects the temporary "launching soon" placeholder
// (see app/page.tsx). Restore the full "We design and build" copy below once
// the real site is ready to go live.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zhevion | Launching soon",
  description:
    "Zhevion is an independent design and product studio, currently rebuilding the site. Say hello in the meantime.",
  keywords: [
    "Zhevion",
    "Zebite",
    "RepForge",
    "AI grocery planner",
    "meal planning app",
    "powerlifting app",
    "AI apps",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Zhevion",
    title: "Zhevion | Launching soon",
    description:
      "An independent design and product studio, currently rebuilding the site.",
    // TODO: /og.png still carries the old app-led artwork and headline. It
    // needs regenerating once the rebuilt visual language is settled.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Zhevion — an independent design and product studio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhevion | Launching soon",
    description:
      "An independent design and product studio, currently rebuilding the site.",
    images: ["/og.png"],
  },
};

// The studio surface is the light canvas now. /legal/* is still dark and wraps
// itself in .on-dark, but theme-color is document-global, so those six routes
// report the light chrome colour until they are rebuilt too.
export const viewport: Viewport = {
  themeColor: "#F2F1EC",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* Flag JS availability before paint so scroll-reveal only hides
            content when it can actually be revealed (no-JS shows everything). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {/* ── Analytics slot ────────────────────────────────────────────
            Drop your provider snippet here (Plausible / PostHog / GA) and
            assign window.zhevionAnalytics so lib/analytics.ts can forward
            CTA events. No real key is committed.
            e.g. <Script src="..." data-domain="zhevion.app" /> */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {/* Both no-op unless they apply: SmoothScroll bails under reduced
            motion, Cursor unless the pointer is fine. Neither renders DOM. */}
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
