# Changelog

## 1.8.0 — 2026-05-19

### Added
- Added Provider Architecture: lib/ai/providers/types.ts, anthropic.ts, mock.ts, index.ts.
- Added mock provider that derives brand name via stop-word filter and theme via
  keyword matching, returns a full valid SiteConfig with no API call.
- Added AI_PROVIDER environment variable for provider selection (anthropic | mock).
- Added npm run generate:mock shortcut script.
- Mock-generated files include ⚠ MOCK-GENERATED header comment.

### Changed
- app/api/generate/route.ts: uses getProvider() instead of direct generateSiteConfig import.
  API key check is skipped when AI_PROVIDER=mock.
- scripts/generate-site.ts: uses getProvider(), toTypeScript() accepts isMock flag.
- Updated .env.example with AI_PROVIDER documentation.
- Updated README.md with Mock Mode section.

### Unchanged
- lib/ai/generate-site-config.ts — not modified.
- packages/create-premium-site — not modified (migration planned for 1.9.0).

### Verification
- npm run lint passed.
- npm run build passed.
- Mock CLI tested with 3 different business ideas.
- API mock-mode tested without ANTHROPIC_API_KEY.
- Anthropic provider path confirmed unbroken.

## 1.7.0 — 2026-05-19

### Added
- Added `/generator` Web-UI for browser-based landing page generation via POST /api/generate.
- Added components: GeneratorForm, GeneratorResult, GeneratorJsonPreview,
  GeneratorError, GeneratorLoading, ExampleIdeaButton under components/generator/.
- Added types/generator.ts with GeneratorStatus, GeneratorErrorType, GeneratorError,
  GenerateApiResponse TypeScript types.
- Added generator CSS classes in app/styles/components.css.
- Added docs/GENERATOR_UI.md with usage and architecture documentation.

### Changed
- Updated README.md with Generator UI section.

### Verification
- npm run lint passed.
- npm run build passed.
- /generator browser smoke-tested for validation, missing key, insufficient credits, network error, and success UI with a mocked valid API response.

## 1.6.0 — 2026-05-18

### Added
- Added monorepo-style CLI package `packages/create-premium-site`.
- Added `create-premium-site` entry point with interactive project generation flow.
- Added prompt layer for project name, brand, industry, theme, sections, CTA type, waitlist mode, and optional AI generation.
- Added scaffold logic that copies the starter kit to `../<project-name>` while ignoring `node_modules`, `.next`, `.git`, `out`, and generated files.
- Added configuration logic for `package.json`, `lib/content/site.ts`, and `app/page.tsx` in generated projects.
- Added optional AI generation bridge that calls `generateSiteConfig()` when `ANTHROPIC_API_KEY` is available and skips clearly otherwise.
- Added colored CLI logging, install/build execution, overwrite protection, and final generation summary.
- Added root `npm run create` script.

### Changed
- Updated README with CLI Generator usage and generated-project behavior.
- Added CLI dependencies for prompts, terminal colors, spinners, and filesystem copying.

### Verification
- `npm run create` generated `../test-site` with TestBrand/B2B SaaS/clean-startup/demo/no-AI test data.
- `npm run build` passed in generated `../test-site`.
- `npm run lint` passed in the starter kit.

## 1.5.0 — 2026-05-18

### Added
- Added `SiteConfig` schema/type definitions in `lib/content/site.schema.ts` with documented fields for generated landing page content.
- Added Claude-powered generation core in `lib/ai/generate-site-config.ts` using `claude-sonnet-4-20250514` and strict JSON validation.
- Added `POST /api/generate` for server-side landing page generation with `ANTHROPIC_API_KEY` protection.
- Added `scripts/generate-site.ts` and `npm run generate` to write generated content to `lib/content/site.generated.ts`.
- Added `@anthropic-ai/sdk` and `tsx` dependencies required by the generation layer.

### Changed
- Annotated `lib/content/site.ts` with `SiteConfig` and added `meta.ogImageAlt`.
- Updated `.env.example`, `.gitignore`, and README for AI generation setup and ignored generated content.

### Verification
- `npm run generate -- "Ein B2B SaaS-Tool für automatisierte Rechnungsstellung für Freelancer"` correctly stops with a clear missing `ANTHROPIC_API_KEY` error in this environment.
- `npm run build` passed.
- `npm run lint` passed.

## 1.4.0 — 2026-05-18

### Added
- Added deployment automation via `scripts/pre-deploy.sh` and `npm run predeploy`.
- Added Vercel production configuration with build settings, Frankfurt region, and baseline security headers.
- Added Netlify production configuration with `@netlify/plugin-nextjs`, Node 20, security headers, and 404 fallback.
- Added `.env.example` as a safe environment variable template for future integrations.
- Added `DEPLOYMENT.md` with Vercel, Netlify, environment, custom domain, security header, and troubleshooting guidance.

### Changed
- Added `deploy:vercel` and `deploy:netlify` npm scripts.
- Updated `.gitignore` for local env files and platform build folders while allowing `.env.example`.
- Extended README and QA checklist with deployment handoff steps.

### Verification
- `bash scripts/pre-deploy.sh` passed.
- `npm run build` passed.
- `npm run lint` passed.

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
