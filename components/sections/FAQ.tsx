import { FadeUp } from "@/components/motion/FadeUp";
import { PremiumCard } from "@/components/surface/PremiumCard";

type FAQItem = { question: string; answer: string };

export function FAQ({ items }: { items: readonly FAQItem[] }) {
  return (
    <section id="qa" className="section faq-section">
      <div className="container faq-grid">
        <FadeUp className="section-intro">
          <div className="eyebrow">FAQ + QA</div>
          <h2 className="headline">Reusable does not mean generic.</h2>
          <p className="lead">The FAQ is where uncertainty gets removed. The QA checklist is where premium quality becomes repeatable.</p>
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
