import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { Footer } from "@/components/sections/Footer";
import { formatPostDate, getPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Thinking | Zhevion", description: "Notes on products, software, systems, and the work of making them useful.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  const posts = getPublishedPosts();

  return <><SiteNav base="/" /><main id="main" className="blog-page"><div className="shell"><p className="eyebrow">Thinking</p><h1>Notes from the work.</h1><p className="blog-intro">A place for practical observations on product decisions, design, development, and building better systems.</p>{posts.length ? <div className="blog-list">{posts.map((post) => <article key={post.slug} className="blog-card"><p>{formatPostDate(post.date)} <span>·</span> {post.author}</p><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p><Link href={`/blog/${post.slug}`} className="blog-read">Read note <span aria-hidden>→</span></Link></article>)}</div> : <div className="blog-empty"><p>No articles have been published yet.</p><span>The first verified Zhevion note is on its way.</span></div>}</div></main><Footer base="/" /></>;
}
