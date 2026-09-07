import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { CONTACT, FORGE, GROCERY } from "@/lib/content";

const STUDIO_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="border-t border-white/10 bg-graphite-900 py-12 text-cream sm:py-16">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.65fr_0.65fr_0.8fr]">
          <div>
            <a href={base || "/"} className="inline-flex items-center gap-3" aria-label="Zhevion home">
              <ZhevionMark size={38} />
              <span className="text-xl font-extrabold tracking-[-0.04em]">Zhevion</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-[1.75] text-cream/55">
              A software and product studio building mobile apps, business systems, websites, internal tools, and custom digital products.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-block text-sm font-bold text-cream underline decoration-white/20 underline-offset-4 hover:decoration-white"
            >
              {CONTACT.email}
            </a>
          </div>

          <FooterColumn title="Studio">
            {STUDIO_LINKS.map((link) => (
              <FooterLink key={link.href} href={`${base}${link.href}`}>{link.label}</FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Products">
            <FooterLink href={GROCERY.learnMoreHref} external>{GROCERY.name}</FooterLink>
            <li className="text-sm text-cream/40">{FORGE.name}</li>
            <FooterLink href="https://zendrex.zhevion.com" external>Portfolio</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/legal">Privacy &amp; terms</FooterLink>
            <FooterLink href="/legal/zebite/privacy">Zebite privacy</FooterLink>
            <FooterLink href="/legal/repforge/privacy">RepForge privacy</FooterLink>
            <FooterLink href="/legal/website">Website privacy</FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zhevion. All rights reserved.</p>
          <p>Software shaped around the work.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-cream/40">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="text-sm font-medium text-cream/55 transition hover:text-cream"
      >
        {children}
      </a>
    </li>
  );
}
