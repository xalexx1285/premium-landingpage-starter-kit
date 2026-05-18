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
    gsapPrimary: "power3.out",
    gsapEmphasis: "power4.out",
    gsapCinematic: "expo.out",
  },
  scroll: {
    scrub: 1.1,
  },
} as const;

export type MotionTokens = typeof motionTokens;
