# Premium Landing Page QA Checklist

Use this before delivery. A page is not done because it builds; it is done when strategy, visual quality, responsive behavior, accessibility, motion, and performance have been checked.

## Strategy
- [ ] One primary audience is clear.
- [ ] One primary offer is clear.
- [ ] One primary CTA is visible and repeated at logical moments.
- [ ] Proof is real or clearly marked as placeholder.
- [ ] At least one key objection is handled in FAQ/pricing.

## Visual Polish
- [ ] Hero has a strong first impression and readable hierarchy.
- [ ] Cards/surfaces have intentional hierarchy, not equal noise.
- [ ] Borders, shadows, glow, and blur are subtle.
- [ ] Background supports content and does not reduce contrast.
- [ ] Mobile spacing feels designed, not merely stacked.

## Motion
- [ ] Motion uses tokens from `lib/motion/tokens.ts`.
- [ ] Every animation has a purpose: hierarchy, attention, continuity, feedback, or story.
- [ ] `prefers-reduced-motion` is supported.
- [ ] No content remains hidden if JavaScript is delayed or motion is reduced.

## Responsive
- [ ] 375px checked.
- [ ] 390px checked.
- [ ] 430px checked.
- [ ] 768px checked.
- [ ] 1024px checked.
- [ ] 1440px+ checked.

## Pre-Deployment QA
- [ ] `npm run predeploy` erfolgreich.
- [ ] Alle Environment Variables auf der Deployment-Plattform gesetzt.
- [ ] Custom Domain konfiguriert und SSL aktiv.
- [ ] Security Headers aktiv, z. B. via `https://securityheaders.com` geprüft.
- [ ] Lighthouse Score ≥ 90 für Performance und Accessibility.
- [ ] `CHANGELOG.md` aktuell.

## Technical
- [ ] `npm run build` passes.
- [ ] `npm run lint` passes.
- [ ] No console errors in browser.
- [ ] No hydration warnings.
- [ ] Lighthouse/performance budget reviewed before production use.
