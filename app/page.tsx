import type { Metadata } from "next";
import { StudioHero } from "@/components/landing/StudioHero";
import { SelectedWork } from "@/components/landing/SelectedWork";
import { Services } from "@/components/landing/Services";
import { ProcessSection, ValueSection } from "@/components/landing/ValueProcess";
import { TeamSection } from "@/components/landing/TeamAbout";
import { SiteNav } from "@/components/site/SiteNav";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Title and description come from the root layout; this only pins the
// canonical, which "/" was missing while /work and every /legal route had one.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SiteNav variant="editorial" />
      <main id="main">
        <StudioHero />
        <SelectedWork />
        <Services />
        <ValueSection />
        <ProcessSection />
        <TeamSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
