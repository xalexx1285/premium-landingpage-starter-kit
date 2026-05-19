"use client";

import type { SiteConfig } from "@/lib/content/site.schema";
import { PremiumCard } from "@/components/surface/PremiumCard";

type GeneratorResultProps = {
  result: SiteConfig;
};

export function GeneratorResult({ result }: GeneratorResultProps) {
  return (
    <div className="generator-result">
      <PremiumCard className="generator-result-block">
        <p className="eyebrow">Meta &amp; Theme</p>
        <span className="generator-theme-badge">{result.theme}</span>
        <p className="eyebrow-styled">{result.meta.title}</p>
        <p className="muted">{result.meta.description}</p>
      </PremiumCard>

      <PremiumCard className="generator-result-block">
        <p className="eyebrow">Hero</p>
        <p className="muted">{result.hero.eyebrow}</p>
        <h2 className="headline">{result.hero.headline}</h2>
        <p className="lead">{result.hero.subheadline}</p>
        <div className="generator-result-divider" />
        <p className="muted">
          CTAs: {result.hero.primaryCta.label} · {result.hero.secondaryCta.label}
        </p>
        <p className="muted">Meta: {Array.from(result.hero.meta).join(", ")}</p>
      </PremiumCard>

      <PremiumCard className="generator-result-block">
        <p className="eyebrow">Story Summary</p>
        <h2>{result.story.headline}</h2>
        <ul className="generator-compact-list">
          {Array.from(result.story.chapters).slice(0, 4).map((chapter) => (
            <li key={`${chapter.kicker}-${chapter.title}`}>
              <span>{chapter.kicker}</span> — {chapter.title}
            </li>
          ))}
        </ul>
      </PremiumCard>

      <PremiumCard className="generator-result-block">
        <p className="eyebrow">Pricing</p>
        <div className="generator-pricing-grid">
          {Array.from(result.pricing.plans).map((plan) => (
            <article
              className={`generator-pricing-plan ${plan.featured ? "generator-pricing-plan--featured" : ""}`}
              key={plan.name}
            >
              {plan.featured ? <p className="generator-plan-featured-badge">Featured</p> : null}
              <h3 className="generator-plan-name">{plan.name}</h3>
              <p className="generator-plan-price">{plan.price}</p>
              <ul className="generator-compact-list">
                {Array.from(plan.features).slice(0, 3).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard className="generator-result-block">
        <p className="eyebrow">FAQ Summary</p>
        <p className="muted">{result.faq.items.length} FAQs generated</p>
        <ul className="generator-compact-list">
          {Array.from(result.faq.items).slice(0, 3).map((item) => (
            <li key={item.question}>{item.question}</li>
          ))}
        </ul>
      </PremiumCard>

      <PremiumCard className="generator-result-block">
        <p className="eyebrow">Final CTA</p>
        <h2>{result.finalCta.headline}</h2>
        <p className="muted">{result.finalCta.primaryCta.label}</p>
      </PremiumCard>
    </div>
  );
}
