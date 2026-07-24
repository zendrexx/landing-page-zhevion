import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

/**
 * Shared chrome for every /legal route.
 *
 * Nav and Footer take base="/" so their in-page anchors ("#apps") resolve to
 * "/#apps" and navigate home, instead of dead-ending on the current legal URL.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav base="/" />
      <main id="main">{children}</main>
      <Footer base="/" />
    </>
  );
}
