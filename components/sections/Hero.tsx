import { FadeUp } from "@/components/motion/FadeUp";
import { MaskedReveal } from "@/components/motion/MaskedReveal";
import { PremiumCard } from "@/components/surface/PremiumCard";

type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  meta: readonly string[];
};

export function Hero({ content, proof }: { content: HeroContent; proof: readonly string[] }) {
  return (
    <section id="top" className="section hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <FadeUp>
            <div className="eyebrow">{content.eyebrow}</div>
          </FadeUp>
          <MaskedReveal text={content.headline} className="display hero-title" />
          <FadeUp delay={120}>
            <p className="lead">{content.subheadline}</p>
          </FadeUp>
          <FadeUp delay={180}>
            <div className="cta-row">
              <a className="premium-button primary" href={content.primaryCta.href}>{content.primaryCta.label} →</a>
              <a className="premium-button" href={content.secondaryCta.href}>{content.secondaryCta.label}</a>
            </div>
          </FadeUp>
          <FadeUp delay={240}>
            <ul className="proof-row" aria-label="Included starter-kit sections">
              {proof.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </FadeUp>
        </div>
        <PremiumCard as="aside" className="hero-visual" >
          <div className="card-meta"><span>Motion token</span><span>0.9s / expo</span></div>
          <div className="orb" aria-hidden="true" />
          <div className="hero-visual-footer">
            {content.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
