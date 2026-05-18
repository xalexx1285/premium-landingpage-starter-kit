import { FadeUp } from "@/components/motion/FadeUp";
import { PremiumCard } from "@/components/surface/PremiumCard";

type FAQHeader = {
  eyebrow: string;
  headline: string;
  body: string;
};

type FAQItem = { question: string; answer: string };

type FAQProps = {
  header: FAQHeader;
  items: readonly FAQItem[];
};

export function FAQ({ header, items }: FAQProps) {
  return (
    <section id="qa" className="section faq-section">
      <div className="container faq-grid">
        <FadeUp className="section-intro">
          <div className="eyebrow">{header.eyebrow}</div>
          <h2 className="headline">{header.headline}</h2>
          <p className="lead">{header.body}</p>
        </FadeUp>
        <div className="faq-list">
          {items.map((item, index) => (
            <FadeUp key={item.question} delay={index * 70}>
              <PremiumCard as="article" className="faq-item">
                <h3>{item.question}</h3>
                <p className="muted">{item.answer}</p>
              </PremiumCard>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
