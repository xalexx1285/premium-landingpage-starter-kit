"use client";

import { motionTokens } from "@/lib/motion/tokens";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

type FadeUpProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "span";
  delay?: number;
  className?: string;
};

export function FadeUp({ children, as: Tag = "div", delay = 0, className = "" }: FadeUpProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: motionTokens.reveal.triggerMargin, threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-offset": `${motionTokens.reveal.offsetPx}px`,
    "--reveal-blur": `${motionTokens.reveal.blurPx}px`,
    "--enter-duration": `${motionTokens.duration.enter}s`,
  } as CSSProperties;

  return (
    <Tag ref={ref as never} style={style} className={`motion-fade-up ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
