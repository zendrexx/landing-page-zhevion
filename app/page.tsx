import type { Metadata } from "next";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/sections/Footer";
import { SignificaHome } from "@/components/landing/SignificaHome";

// Title and description come from the root layout; this only pins the
// canonical, which "/" was missing while /work and every /legal route had one.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <SiteNav variant="editorial" />
      <SignificaHome />
      <Footer />
    </>
  );
}
