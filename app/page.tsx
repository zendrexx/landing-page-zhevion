import { ComingSoon } from "@/components/hero/ComingSoon";

/**
 * Temporary placeholder for the Cloudflare push: a single "launching soon"
 * screen in the same paper/ink visual language as the real rebuild, standing
 * in until Studio and Contact are built and the site is ready to go live.
 *
 * SiteNav, Hero, Work, and the legacy sections under components/sections/ all
 * still exist and are simply not mounted here — swap ComingSoon back out for
 * them once the full site is ready to ship.
 */
export default function Home() {
  return (
    <main id="main">
      <ComingSoon />
    </main>
  );
}
