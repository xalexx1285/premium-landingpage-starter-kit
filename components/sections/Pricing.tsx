import { FadeUp } from "@/components/motion/FadeUp";
import { GradientBorder } from "@/components/surface/GradientBorder";

type PricingContent = {
  eyebrow: string;
  headline: string;
  body: string;
  plans: readonly {
    name: string;
    description: string;
    price: string;
    cta: string;
    featured: boolean;
    features: readonly string[];
  }[];
};

export function Pricing({ content }: { content: PricingContent }) {
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container">
        <FadeUp>
          <div className="eyebrow">{content.eyebrow}</div>
          <h2 className="headline">{content.headline}</h2>
          <p className="lead">{content.body}</p>
        </FadeUp>
        <div className="pricing-grid">
          {content.plans.map((plan, index) => (
            <FadeUp as="article" delay={index * 90} className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              <GradientBorder>
                <div className="price-card-inner">
                  <div>
                    <h3>{plan.name}</h3>
                    <p className="muted">{plan.description}</p>
                  </div>
                  <strong>{plan.price}</strong>
                  <a className={`premium-button ${plan.featured ? "primary" : ""}`} href="#final-cta">{plan.cta}</a>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
              </GradientBorder>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
