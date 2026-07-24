import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Canonical origin. The /legal/* URLs derived from this are what the store
// listings and OAuth consent screens point at — don't change it casually.
const SITE_URL = "https://zhevion.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zhevion | Eat smarter. Train stronger.",
  description:
    "Zhevion is a small studio building focused, AI-powered apps for health and performance: Zebite and RepForge. Two apps, one mission.",
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
    title: "Zhevion | Eat smarter. Train stronger.",
    description:
      "A studio building focused, AI-powered apps for health and performance: Zebite and RepForge.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Zhevion | Eat smarter. Train stronger.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhevion | Eat smarter. Train stronger.",
    description:
      "Two focused, AI-powered apps for health and performance: Zebite and RepForge.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0F10",
  colorScheme: "dark",
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
        {children}
      </body>
    </html>
  );
}
