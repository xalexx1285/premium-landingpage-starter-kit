# Changelog

## 1.2.0 — 2026-05-18

### Added
- Added `components/motion/SignatureInteraction.tsx` as a client-only signature interaction layer.
- Added desktop/fine-pointer global pointer aura with GSAP `quickTo` smoothing.
- Added magnetic CTA behavior for `.premium-button` elements using CSS custom properties and GSAP tweening.
- Added pointer-reactive spotlight variables for premium cards, story chapters, proof chips, and QA items.
- Added signature interaction tokens in `lib/motion/tokens.ts` for aura follow/fade and magnetic strength/duration.

### Changed
- Mounted the signature interaction layer in `app/page.tsx` without changing section APIs or content shape.
- Extended component styles with spotlight gradients and reduced-motion-safe magnetic transforms.

### Verification
- `npm run lint` passed.
- `npm run build` passed.
- Browser smoke test passed at `http://localhost:3000` with no console or JavaScript errors.

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
