import { FadeUp } from "@/components/motion/FadeUp";
import { PremiumCard } from "@/components/surface/PremiumCard";

type FinalCTAContent = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type FinalCTAProps = {
  content: FinalCTAContent;
  qaChecklist: readonly string[];
};

export function FinalCTA({ content, qaChecklist }: FinalCTAProps) {
  return (
    <section id="final-cta" className="section final-section">
      <div className="container">
        <PremiumCard className="final-card">
          <FadeUp>
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 className="headline">{content.headline}</h2>
            <p className="lead">{content.body}</p>
            <div className="cta-row">
              <a className="premium-button primary" href={content.primaryCta.href}>{content.primaryCta.label} →</a>
              <a className="premium-button" href={content.secondaryCta.href}>{content.secondaryCta.label}</a>
            </div>
          </FadeUp>
          <div className="qa-checklist" aria-label="QA checklist">
            {qaChecklist.map((item, index) => (
              <FadeUp delay={index * 70} key={item}>
                <div className="qa-item"><span aria-hidden="true">✓</span>{item}</div>
              </FadeUp>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
