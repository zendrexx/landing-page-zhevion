import Link from "next/link";

export function Thinking() {
  return <section id="thinking" className="thinking-section" aria-labelledby="thinking-heading"><div className="shell"><div className="thinking-head"><p>Thinking</p><h2 id="thinking-heading">Notes from the work.</h2><Link href="/blog">Visit the journal →</Link></div><div className="thinking-empty"><p>Product decisions, systems, design, and the practical lessons that come with making software useful.</p><span>Publishing soon</span></div></div></section>;
}
