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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zhevion | Software & Product Studio",
  description:
    "Zhevion designs and builds mobile apps, business systems, websites, internal tools, automation, and custom digital products.",
  keywords: [
    "Zhevion",
    "software studio",
    "product studio",
    "business systems",
    "mobile app development",
    "website development",
    "workflow automation",
    "Zebite",
    "RepForge",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Zhevion",
    title: "Zhevion | Software & Product Studio",
    description:
      "Software shaped around how businesses actually work.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Zhevion — software and product studio.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhevion | Software & Product Studio",
    description:
      "Software shaped around how businesses actually work.",
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
        {/* SmoothScroll bails out when reduced motion is requested. */}
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
