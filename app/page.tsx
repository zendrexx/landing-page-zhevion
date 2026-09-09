import { StudioHero } from "@/components/landing/StudioHero";
import { SelectedWork } from "@/components/landing/SelectedWork";
import { Services } from "@/components/landing/Services";
import { ProcessSection, ValueSection } from "@/components/landing/ValueProcess";
import { AboutSection, TeamSection } from "@/components/landing/TeamAbout";
import { SiteNav } from "@/components/site/SiteNav";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

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
        <AboutSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
