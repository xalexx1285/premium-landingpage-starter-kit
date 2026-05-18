export const motionTokens = {
  duration: {
    enter: 0.9,
    enterFast: 0.72,
    hover: 0.42,
    line: 0.86,
  },
  stagger: {
    word: 0.045,
    line: 0.11,
    card: 0.08,
  },
  reveal: {
    triggerMargin: "0px 0px -18% 0px",
    offsetPx: 32,
    largeOffsetPx: 48,
    blurPx: 8,
  },
  easing: {
    cssPremium: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  scroll: {
    scrub: 1.1,
  },
  gsapEase: {
    hero: "power3.out",
    scroll: "none",
    stagger: "power2.out",
  },
  gsapDuration: {
    fast: 0.4,
    default: 0.8,
    slow: 1.4,
  },
  scrubStrength: 1,
  staggerInterval: 0.12,
  signature: {
    ease: "power3.out",
    magnetic: {
      strength: 0.18,
      duration: 0.42,
      resetDuration: 0.62,
    },
    aura: {
      follow: { duration: 0.62, ease: "power3.out" },
      fade: { duration: 0.28, ease: "power2.out" },
    },
  },
} as const;

export type MotionTokens = typeof motionTokens;
