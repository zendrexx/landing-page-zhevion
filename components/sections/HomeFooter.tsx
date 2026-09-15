import { ZhevionMark } from "@/components/brand/ZhevionLogo";
import { CONTACT, FORGE, GROCERY } from "@/lib/content";

const studioLinks = [
  { href: "#work", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
] as const;

export function HomeFooter() {
  return (
    <footer className="zv-home-footer">
      <div className="zv-container zv-home-footer-grid">
        <div className="zv-home-footer-brand">
          <a href="/" aria-label="Zhevion home">
            <ZhevionMark size={34} />
            <span>Zhevion</span>
          </a>
          <p>Software shaped around how businesses actually work.</p>
        </div>

        <FooterColumn title="Studio">
          {studioLinks.map((link) => (
            <FooterLink href={link.href} key={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Products">
          <FooterLink href={GROCERY.learnMoreHref} external>
            {GROCERY.name}
          </FooterLink>
          <li>{FORGE.name}</li>
          <FooterLink href="/work">All work</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contact">
          <FooterLink href={`mailto:${CONTACT.email}`}>{CONTACT.email}</FooterLink>
          <FooterLink href="/legal">Privacy &amp; terms</FooterLink>
        </FooterColumn>
      </div>

      <div className="zv-container zv-home-footer-bottom">
        <p>© {new Date().getFullYear()} Zhevion</p>
        <p>Independent software &amp; product studio</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="zv-home-footer-column">
      <h2>{title}</h2>
      <ul>{children}</ul>
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
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    </li>
  );
}
