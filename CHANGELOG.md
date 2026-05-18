# Changelog

## 1.3.0 — 2026-05-18

### Added
- Added a full theme engine with `ThemeConfig`, `themes`, `defaultTheme`, and CSS property serialization in `lib/themes/index.ts`.
- Added four complete visual identities: `industrial-ai`, `minimal-luxury`, `cyber-saas`, and `clean-startup`.
- Added `ThemeProvider` and `useTheme()` with SSR-safe initial theme application plus optional localStorage preview overrides.
- Added global theme selection via `site.theme` in `lib/content/site.ts`.
- Loaded stable body/display font variables through `next/font` to avoid layout-shifting font swaps.

### Changed
- Moved theme-relevant colors, surfaces, glows, shadows, typography, radius, and signature interaction values into CSS Custom Properties.
- Updated `app/layout.tsx` to apply the active theme as inline `<html>` styles before hydration to avoid FOUC.
- Updated `SignatureInteraction` to read its variant from the active theme while keeping a prop override for backward compatibility.
- Updated Hero and Story GSAP easing to read theme motion values from `useTheme()`.

### Verification
- All four themes were build-smoke-tested by switching `site.theme` to each theme id.
- Browser smoke-tested all four themes via localStorage preview override; no console or JavaScript errors.
- WCAG AA text/background contrast verified for all four themes: industrial-ai 17.47:1, minimal-luxury 16.86:1, cyber-saas 19.39:1, clean-startup 15.77:1.
- `npm run build` passed.
- `npm run lint` passed.

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
