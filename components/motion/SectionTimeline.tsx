"use client";

import { type ReactNode, useRef } from "react";
import { motionTokens } from "@/lib/motion/tokens";
import { useGSAP } from "./useGSAP";

type SectionTimelineProps = {
  children: ReactNode;
  stagger?: number;
  ease?: string;
  duration?: number;
  className?: string;
};

export function SectionTimeline({
  children,
  stagger = motionTokens.staggerInterval,
  ease = motionTokens.gsapEase.stagger,
  duration = motionTokens.gsapDuration.default,
  className = "",
}: SectionTimelineProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(ref, ({ element, gsap }) => {
    const targets = gsap.utils.toArray<HTMLElement>(element.children);

    gsap.set(targets, { autoAlpha: 0, y: 28, filter: "blur(8px)" });
    gsap.to(targets, {
      autoAlpha: 1,
      y: 0,
      filter: "blur(0px)",
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: element,
        start: "top 82%",
        once: true,
      },
    });
  }, [stagger, ease, duration]);

  return <div ref={ref} className={className}>{children}</div>;
}
