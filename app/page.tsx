import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { StudioIntro } from "@/components/sections/StudioIntro";
import { ShowcaseGrocery } from "@/components/sections/ShowcaseGrocery";
import { ShowcaseForge } from "@/components/sections/ShowcaseForge";
import { Philosophy } from "@/components/sections/Philosophy";
import { Us } from "@/components/sections/Us";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StudioIntro />
        {/* Both app showcases share the #apps anchor target. */}
        <div id="apps">
          <ShowcaseGrocery />
          <ShowcaseForge />
        </div>
        <Philosophy />
        <Us />
        <ClosingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
