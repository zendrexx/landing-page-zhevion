import Image from "next/image";
import { HeroWordCycle } from "@/components/landing/HeroWordCycle";
import { HeroProjectReveal } from "@/components/landing/HeroProjectReveal";
import { GUANZON_PROJECT, STUDIO_HOME } from "@/lib/content";

export function StudioHero() {
  return <section className="studio-hero relative" aria-labelledby="studio-hero-heading"><div className="shell"><div className="studio-hero-intro"><div><p className="studio-hero-eyebrow">{STUDIO_HOME.hero.eyebrow}</p><h1 id="studio-hero-heading" className="studio-hero-heading"><span className="studio-hero-line">Software for the work</span><span className="studio-hero-line">that needs to move</span><span className="studio-hero-line"><HeroWordCycle words={STUDIO_HOME.hero.words} className="text-forest-500" /></span></h1></div><div className="studio-hero-copy"><p className="studio-hero-description">{STUDIO_HOME.hero.body}</p><div className="studio-hero-actions"><a href="#contact" className="studio-hero-primary">Start a project <span aria-hidden>→</span></a><HeroProjectReveal /></div></div></div><figure className="studio-hero-proof"><Image src={GUANZON_PROJECT.image} alt={GUANZON_PROJECT.alt} width={1630} height={965} priority quality={90} sizes="(min-width: 1280px) 1104px, 92vw" className="block h-auto w-full" /><figcaption>Guanzon GCAS — inventory stock request system <span>Real software, real workflow.</span></figcaption></figure></div></section>;
}
