import Link from "next/link";
import { FORGE, GROCERY } from "@/lib/content";
import type { LegalApp, LegalBlock, LegalDoc, LegalSection } from "@/lib/legal";

/**
 * Renders one legal document from lib/legal.ts.
 *
 * Deliberately server-rendered with no <Reveal> and no client JS: these pages
 * are read by store reviewers and by people looking for one specific clause,
 * so every word must be present on first paint and findable with Ctrl+F.
 */

const WORLD: Record<LegalApp, string> = {
  zebite: "world-grocery",
  repforge: "world-forge",
  website: "world-studio",
};

const APP_LABEL: Record<LegalApp, string> = {
  zebite: GROCERY.name,
  repforge: FORGE.name,
  website: "Website",
};

export function LegalDocPage({ doc }: { doc: LegalDoc }) {
  const kindLabel = doc.kind === "privacy" ? "Privacy" : "Terms";

  return (
    <article className={`${WORLD[doc.app]} pb-24 pt-10 md:pb-32 md:pt-14`}>
      <div className="shell">
        <Breadcrumb app={doc.app} kindLabel={kindLabel} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow text-[color:var(--accent)]">
            {APP_LABEL[doc.app]} · {kindLabel}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tightest sm:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{doc.summary}</p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-5 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted">Effective</dt>
              <dd className="font-semibold text-cream">{doc.effective}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">Last updated</dt>
              <dd className="font-semibold text-cream">{doc.updated}</dd>
            </div>
          </dl>
        </header>

        {/* The plain-language summary. Not a substitute for the document —
            said so explicitly, so it can't be read as the operative text. */}
        <section
          aria-labelledby="tldr-heading"
          className="mt-10 rounded-card border border-[color:var(--accent-line)] bg-[color:var(--accent-tint)] p-6 sm:p-8"
        >
          <h2
            id="tldr-heading"
            className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--accent)]"
          >
            The short version
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {doc.tldr.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-cream/90">
                <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted">
            A summary for skimming. The full text below is what actually applies.
          </p>
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <TableOfContents sections={doc.sections} />

          <div className="legal-prose min-w-0">
            {doc.sections.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2 id={`${section.id}-heading`}>
                  <span aria-hidden className="legal-num">
                    {i + 1}
                  </span>
                  {section.heading}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Breadcrumb({ app, kindLabel }: { app: LegalApp; kindLabel: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-cream">
            Zhevion
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/legal" className="transition hover:text-cream">
            Legal
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="text-cream">
          {APP_LABEL[app]} {kindLabel.toLowerCase()}
        </li>
      </ol>
    </nav>
  );
}

function TableOfContents({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">On this page</h2>
      <ol className="mt-4 flex flex-col gap-2.5 text-sm">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-2.5">
            <span aria-hidden className="w-4 shrink-0 text-right tabular-nums text-muted/60">
              {i + 1}
            </span>
            <a href={`#${s.id}`} className="text-muted transition hover:text-cream">
              {s.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;

    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "table":
      // Wide tables scroll inside their own container so the page body never does.
      return (
        <div className="legal-table-wrap" role="region" tabIndex={0} aria-label="Data table">
          <table>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={i}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
