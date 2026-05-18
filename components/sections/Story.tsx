import { FadeUp } from "@/components/motion/FadeUp";
import { PremiumCard } from "@/components/surface/PremiumCard";

type StoryContent = {
  eyebrow: string;
  headline: string;
  body: string;
  chapters: readonly { kicker: string; title: string; text: string }[];
};

export function Story({ content }: { content: StoryContent }) {
  return (
    <section id="story" className="section story-section">
      <div className="container story-grid">
        <div className="section-intro sticky-intro">
          <FadeUp>
            <div className="eyebrow">{content.eyebrow}</div>
            <h2 className="headline">{content.headline}</h2>
            <p className="lead">{content.body}</p>
          </FadeUp>
        </div>
        <PremiumCard className="story-panel">
          <div className="media-stripes" aria-hidden="true" />
          <div className="chapter-list">
            {content.chapters.map((chapter, index) => (
              <FadeUp as="article" delay={index * 90} className="chapter" key={chapter.kicker}>
                <div className="eyebrow">{chapter.kicker}</div>
                <h3>{chapter.title}</h3>
                <p className="muted">{chapter.text}</p>
              </FadeUp>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
