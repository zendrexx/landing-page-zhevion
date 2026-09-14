import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Footer";
import { SiteNav } from "@/components/site/SiteNav";
import { formatPostDate, getPublishedPost, getPublishedPosts } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPublishedPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Zhevion`, description: post.description, alternates: { canonical: `/blog/${post.slug}` } };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const post = getPublishedPost((await params).slug);
  if (!post) notFound();

  return <><SiteNav base="/" /><main id="main" className="blog-article"><article className="shell"><Link href="/blog" className="blog-back">← All notes</Link><header className="blog-article-head"><p className="eyebrow">{formatPostDate(post.date)} · {post.author}</p><h1>{post.title}</h1><p>{post.description}</p></header><div className="blog-prose">{post.sections.map((section, index) => <section key={`${section.heading ?? "opening"}-${index}`}>{section.heading ? <h2>{section.heading}</h2> : null}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>)}</div></article></main><Footer base="/" /></>;
}
