import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * Shared chrome for every /legal route.
 *
 * Nav and Footer take base="/" so their in-page anchors ("#apps") resolve to
 * "/#apps" and navigate home, instead of dead-ending on the current legal URL.
 *
 * .on-dark restores the graphite ground locally. The site rebuild moved <body>
 * to the light canvas, and these routes have not been rebuilt yet — without it
 * they would render cream text on cream. Drop the wrapper (and the rule in
 * globals.css) when /legal is redesigned.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="on-dark">
      <Nav base="/" />
      <main id="main">{children}</main>
      <Footer base="/" />
    </div>
  );
}
