import { ZhevionWordmark } from "@/components/brand/ZhevionLogo";
import { CONTACT, GROCERY, FORGE } from "@/lib/content";

/** `base` prefixes in-page anchors — see the note on <Nav>. */
export function Footer({ base = "" }: { base?: string }) {
  return (
    <footer className="border-t border-white/10 bg-graphite-900 py-14">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <ZhevionWordmark size={28} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A small studio building focused, AI-powered apps for health and
              performance.
            </p>
          </div>

          <FooterCol title="Apps">
            <FooterLink href={`${base}#apps`}>{GROCERY.name}</FooterLink>
            <FooterLink href={`${base}#apps`}>{FORGE.name}</FooterLink>
            <FooterLink href={`${base}#get`}>Get the apps</FooterLink>
          </FooterCol>

          <FooterCol title="Studio">
            <FooterLink href={`${base}#about`}>About</FooterLink>
            <FooterLink href={`${base}#us`}>Us</FooterLink>
            <FooterLink href={`${base}#contact`}>Contact</FooterLink>
            {CONTACT.links
              .filter((l) => l.label !== "Email")
              .map((l) => (
                <FooterLink key={l.label} href={l.href} external>
                  {l.label}
                </FooterLink>
              ))}
          </FooterCol>

          <FooterCol title="Legal">
            <FooterLink href="/legal">Privacy &amp; terms</FooterLink>
            <FooterLink href="/legal/zebite/privacy">{GROCERY.name} privacy</FooterLink>
            <FooterLink href="/legal/repforge/privacy">{FORGE.name} privacy</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Zhevion. All rights reserved.</p>
          <p>Made for a stronger, smarter you.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-cream/80">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-sm">{children}</ul>
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
        className="text-muted transition hover:text-cream"
      >
        {children}
      </a>
    </li>
  );
}
