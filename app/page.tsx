import type { Metadata } from "next";
import { HomeLanding } from "@/components/landing/HomeLanding";
import { HomeFooter } from "@/components/sections/HomeFooter";
import { HomeNav } from "@/components/site/HomeNav";

// Title and description come from the root layout; this only pins the
// canonical, which "/" was missing while /work and every /legal route had one.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HomeNav />
      <HomeLanding />
      <HomeFooter />
    </>
  );
}
