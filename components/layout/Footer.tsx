import type { FooterConfig } from "@/lib/content/site.schema";

type FooterProps = {
  content: FooterConfig;
};

export function Footer({ content }: FooterProps) {
  return (
    <footer className="footer-section">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label={`${content.brand} home`}>
            {content.brand}
          </a>
          {content.tagline ? <p>{content.tagline}</p> : null}
          <p className="footer-legal">{content.legal}</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {content.links.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
