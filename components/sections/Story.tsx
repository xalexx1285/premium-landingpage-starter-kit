"use client";

import { useRef } from "react";
import { FadeUp } from "@/components/motion/FadeUp";
import { useGSAP } from "@/components/motion/useGSAP";
import { PremiumCard } from "@/components/surface/PremiumCard";
import { motionTokens } from "@/lib/motion/tokens";
import { useTheme } from "@/lib/themes/ThemeProvider";

type StoryContent = {
  eyebrow: string;
  headline: string;
  body: string;
  chapters: readonly { kicker: string; title: string; text: string }[];
};

export function Story({ content }: { content: StoryContent }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();

  useGSAP(sectionRef, ({ element, gsap }) => {
    const chapters = gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".story-chapter"));
    const stripes = element.querySelector(".media-stripes");

    chapters.forEach((chapter) => {
      const parts = gsap.utils.toArray<HTMLElement>(chapter.querySelectorAll(".eyebrow, h3, p"));
      gsap.set(parts, { autoAlpha: 0, y: 22, filter: "blur(7px)" });

      gsap.to(parts, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: motionTokens.gsapDuration.default,
        ease: motionTokens.gsapEase.stagger,
        stagger: motionTokens.staggerInterval,
        scrollTrigger: {
          trigger: chapter,
          start: "top 84%",
          once: true,
        },
      });
    });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!stripes) return;

      const scrub = gsap.fromTo(stripes, { autoAlpha: 0.18 }, {
        autoAlpha: 0.56,
        ease: theme.motion.easeScroll,
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 35%",
          scrub: motionTokens.scrubStrength,
        },
      });

      return () => scrub.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [theme.motion.easeScroll]);

  return (
    <section id="story" className="section story-section" ref={sectionRef}>
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
            {content.chapters.map((chapter) => (
              <article className="chapter story-chapter" key={chapter.kicker}>
                <div className="eyebrow">{chapter.kicker}</div>
                <h3>{chapter.title}</h3>
                <p className="muted">{chapter.text}</p>
              </article>
            ))}
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
