import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import { Footer } from "@/components/sections/Footer";
import { SiteNav } from "@/components/site/SiteNav";
import { FORGE, GROCERY, GUANZON_PROJECT } from "@/lib/content";

const SLUGS = ["guanzon", "zebite", "repforge"] as const;
type Slug = (typeof SLUGS)[number];

export function generateStaticParams() { return SLUGS.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return {};
  const titles: Record<Slug, string> = { guanzon: "Guanzon GCAS", zebite: "Zebite", repforge: "RepForge" };
  return { title: `${titles[slug as Slug]} | Zhevion`, alternates: { canonical: `/work/${slug}` } };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();
  return <><SiteNav base="/" /><main id="main" className="project-page">{slug === "guanzon" ? <Guanzon /> : slug === "zebite" ? <Product product={GROCERY} tone="zebite" /> : <Product product={FORGE} tone="repforge" />}</main><Footer base="/" /></>;
}

function PageHead({ type, title, summary, credit }: { type: string; title: string; summary: string; credit: string }) {
  return <header className="project-head shell"><Link href="/work" className="project-back">← All work</Link><div><p>{type}</p><h1>{title}</h1></div><div><p className="project-summary">{summary}</p><small>{credit}</small></div></header>;
}

function Guanzon() {
  return <><PageHead type="Business system" title="Guanzon GCAS" summary={GUANZON_PROJECT.summary} credit={GUANZON_PROJECT.role} /><section className="project-full-bleed project-guanzon"><Image src={GUANZON_PROJECT.image} alt={GUANZON_PROJECT.alt} width={1630} height={965} priority sizes="100vw" className="h-auto w-full" /></section><section className="project-detail shell"><p>Context</p><div><h2>One structured transaction workflow across six business divisions.</h2><p>{GUANZON_PROJECT.divisions}</p><p>{GUANZON_PROJECT.requestTypes}</p></div></section><section className="project-detail shell"><p>Built around the work</p><div className="project-operations">{GUANZON_PROJECT.operations.map((item) => <article key={item.n}><span>{item.n}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section></>;
}

function Product({ product, tone }: { product: typeof GROCERY | typeof FORGE; tone: "zebite" | "repforge" }) {
  const credit = tone === "zebite" ? "A Zhevion product" : "Designed and developed at Zhevion";
  return <><PageHead type="Mobile product" title={product.name} summary={product.blurb} credit={credit} /><section className={`product-gallery product-gallery-${tone}`}>{product.screens.slice(0, 3).map((screen, index) => <DeviceFrame key={screen.src} src={screen.src} alt={screen.alt} imgWidth={product.screenSize.w} imgHeight={product.screenSize.h} width={index === 1 ? 280 : 240} chrome={product.screenChrome} bandIncluded={product.screenBandIncluded} priority={index === 0} sizes="(min-width: 768px) 280px, 55vw" />)}</section><section className="project-detail shell"><p>Product experience</p><div><h2>{product.pitch}</h2><p>{product.platforms}</p></div></section><section className="project-detail shell"><p>Selected capabilities</p><div className="project-operations">{product.features.map((feature, index) => <article key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div></section>{product.learnMoreHref ? <div className="shell project-external"><a href={product.learnMoreHref} target="_blank" rel="noreferrer">Visit {product.name} →</a></div> : null}</>;
}
