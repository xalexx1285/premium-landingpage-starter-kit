# Premium Landing Page Starter Kit

Version: 1.0

A reusable Next.js starter kit generated from the Premium Landing Page Skill Lab. It provides a conversion-aware page structure, motion tokens, surface/card system, responsive layout, reduced-motion support, and a QA checklist.

## Structure

```txt
app/
  page.tsx
  layout.tsx
  globals.css
components/
  sections/
    Hero.tsx
    Story.tsx
    Pricing.tsx
    FAQ.tsx
    FinalCTA.tsx
  motion/
    FadeUp.tsx
    MaskedReveal.tsx
    StaggeredList.tsx
    useReducedMotion.ts
  surface/
    PremiumCard.tsx
    GradientBorder.tsx
    ProgressiveBlur.tsx
lib/
  content/
    site.ts
  motion/
    tokens.ts
QA_CHECKLIST.md
```

## Edit points

- Content: `lib/content/site.ts`
- Motion defaults: `lib/motion/tokens.ts`
- Global visual system: `app/globals.css`
- Section composition: `components/sections/*`
- Surface system: `components/surface/*`

## Commands

```bash
npm install
npm run build
npm run lint
npm run predeploy
npm run dev
```

## Deployment

Deployment automation is included for production handoff:

- `npm run predeploy` runs lint, build, and delivery-file checks.
- `vercel.json` configures Vercel builds, the Frankfurt region, and baseline security headers.
- `netlify.toml` configures Netlify builds with `@netlify/plugin-nextjs` and matching security headers.
- `.env.example` documents future environment variables without committing secrets.

Read the full deployment guide in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## Design principles

- One audience, one offer, one primary CTA.
- Motion clarifies hierarchy and story; it is not decoration.
- Surfaces use restrained gradient borders, shadows, glow, and blur.
- Mobile is intentionally redesigned through responsive CSS.
- Reduced motion must keep all content visible.

## Delivery gate

Run `npm run build`, `npm run lint`, and then complete `QA_CHECKLIST.md` before treating a project as ready.
