# Changelog

## 1.1.0 — 2026-05-18

### Added
- Installed `gsap` and `@gsap/react` as project dependencies.
- Added client-safe GSAP setup in `lib/motion/gsap.ts` with `ScrollTrigger` registration.
- Added `components/motion/useGSAP.ts` for scoped GSAP usage, reduced-motion gating, and cleanup of created ScrollTrigger instances.
- Added `components/motion/ScrollScene.tsx` for reusable scroll-triggered scenes with optional desktop-only pinning.
- Added `components/motion/SectionTimeline.tsx` for section-level staggered GSAP timelines.
- Added active GSAP motion tokens in `lib/motion/tokens.ts` for hero easing, scroll easing, stagger easing, durations, scrub strength, and stagger interval.

### Changed
- Upgraded `components/sections/Hero.tsx` to a client component with GSAP orchestration for eyebrow, headline words, lead copy, CTA pair, proof chips, and hero visual card.
- Added desktop-only ScrollTrigger parallax to the Hero visual card.
- Upgraded `components/sections/Story.tsx` to a client component with per-chapter ScrollTrigger timelines and desktop-only atmospheric stripe opacity scrub.
- Kept existing section structure, class names, content API, responsive layout, and reduced-motion CSS behavior intact.

### Verification
- `npm run build` passed.
- `npm run lint` passed.
