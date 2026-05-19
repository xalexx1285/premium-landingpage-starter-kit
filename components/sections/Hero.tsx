"use client";

import { useRef } from "react";
import { MaskedReveal } from "@/components/motion/MaskedReveal";
import { useGSAP } from "@/components/motion/useGSAP";
import type { HeroConfig } from "@/lib/content/site.schema";
import { motionTokens } from "@/lib/motion/tokens";
import { useTheme } from "@/lib/themes/ThemeProvider";

type HeroContent = HeroConfig;

export function Hero({ content, proof }: { content: HeroContent; proof: readonly string[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();

  useGSAP(sectionRef, ({ element, gsap, ScrollTrigger }) => {
    const eyebrow = element.querySelector(".hero-eyebrow");
    const headlineWords = gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".hero-title .masked-word-inner"));
    const lead = element.querySelector(".hero-lead");
    const ctas = gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".hero-cta-row .premium-button"));
    const proofChips = gsap.utils.toArray<HTMLElement>(element.querySelectorAll(".hero-proof-row li"));
    const visual = visualRef.current;

    const revealTargets = [eyebrow, ...headlineWords, lead, ...ctas, ...proofChips, visual].filter(Boolean);

    gsap.set(revealTargets, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
    gsap.set(visual, { y: 18, rotateX: 2, transformPerspective: 900 });

    const timeline = gsap.timeline({ defaults: { ease: theme.motion.easeHero } });
    timeline
      .to(eyebrow, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: motionTokens.gsapDuration.fast })
      .to(headlineWords, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: motionTokens.gsapDuration.default,
        stagger: motionTokens.stagger.word,
      }, "-=0.12")
      .to(lead, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: motionTokens.gsapDuration.default }, "-=0.3")
      .to(ctas, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: motionTokens.gsapDuration.fast, stagger: 0.08 }, "-=0.35")
      .to(proofChips, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: motionTokens.gsapDuration.fast, stagger: 0.05 }, "-=0.25")
      .to(visual, { autoAlpha: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: motionTokens.gsapDuration.slow }, 0.18);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      if (!visual) return;

      const parallax = gsap.to(visual, {
        y: 40,
        ease: theme.motion.easeScroll,
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: motionTokens.scrubStrength,
        },
      });

      return () => parallax.scrollTrigger?.kill();
    });

    return () => {
      timeline.kill();
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element || trigger.trigger === visual) trigger.kill();
      });
    };
  }, [theme.motion.easeHero, theme.motion.easeScroll]);

  return (
    <section id="top" className="section hero-section" ref={sectionRef}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">{content.eyebrow}</div>
          <MaskedReveal text={content.headline} className="display hero-title" />
          <p className="lead hero-lead">{content.subheadline}</p>
          <div className="cta-row hero-cta-row">
            <a className="premium-button primary" href={content.primaryCta.href}>{content.primaryCta.label} →</a>
            <a className="premium-button" href={content.secondaryCta.href}>{content.secondaryCta.label}</a>
          </div>
          <ul className="proof-row hero-proof-row" aria-label="Included starter-kit sections">
            {proof.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <aside className="premium-card hero-visual" ref={visualRef}>
          <div className="card-meta"><span>Motion token</span><span>GSAP / ScrollTrigger</span></div>
          {content.media ? (
            <figure className="hero-media">
              {content.media.type === "image" ? (
                <img src={content.media.src} alt={content.media.alt ?? ""} />
              ) : (
                <video src={content.media.src} poster={content.media.poster} autoPlay muted loop playsInline />
              )}
            </figure>
          ) : (
            <div className="orb" aria-hidden="true" />
          )}
          <div className="hero-visual-footer">
            {content.meta.map((item) => <span key={item}>{item}</span>)}
          </div>
        </aside>
      </div>
    </section>
  );
}
