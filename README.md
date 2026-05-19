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

## AI Content Generation

The starter includes a Claude-powered generation layer that can turn a business idea into a complete `SiteConfig` object.

1. Copy the env template and add your server-side Anthropic key:

```bash
cp .env.example .env.local
# edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...
```

2. Generate content from a business idea:

```bash
npm run generate -- "Ein B2B SaaS-Tool für automatisierte Rechnungsstellung für Freelancer"
```

3. The CLI writes:

```txt
lib/content/site.generated.ts
```

Generated content is intentionally ignored by git. Review it, then manually copy the parts you want into `lib/content/site.ts` or wire your own import strategy.

The same generator is available server-side through `POST /api/generate` with JSON body:

```json
{ "businessIdea": "..." }
```

The API route reads `ANTHROPIC_API_KEY` only on the server and never exposes it to client code.


## Mock Mode

Generate a complete `SiteConfig` without an Anthropic API key or credits:

```bash
# Direct shortcut:
npm run generate:mock -- "My business idea"

# Or set AI_PROVIDER in .env.local for all generate calls and the API route:
echo "AI_PROVIDER=mock" >> .env.local
npm run generate -- "My business idea"
```

The mock provider derives a brand name and theme from your input and returns
a structurally complete `SiteConfig` immediately — no network call, no cost.

**Use mock mode for:** UI development, flow testing, CI without secrets.

**Do not use mock mode for:** production content — copy is placeholder only.

Generated files include a `⚠ MOCK-GENERATED` header comment as a reminder.

## Generator UI

A browser-based generator is available at `/generator`.

1. Start the dev server: `npm run dev`
2. Open `http://localhost:3000/generator`
3. Enter a business idea (minimum 20 characters)
4. Click **Generate →**

Claude returns a complete `SiteConfig` in 8–15 seconds. The result is shown as a
structured preview with all sections. Use the "Show raw JSON" toggle to copy the
raw config.

Requirements:
- `ANTHROPIC_API_KEY` must be set in `.env.local`
- Sufficient Anthropic API credits (top up at console.anthropic.com)

The API key is **never** exposed to the browser. All generation happens server-side
via `POST /api/generate`. See [`docs/GENERATOR_UI.md`](./docs/GENERATOR_UI.md).

## CLI Generator

Der Starter enthält ein lokales CLI-Paket `create-premium-site`, das aus dem Starter Kit ein neues, vorkonfiguriertes Landingpage-Projekt erzeugt.

Start:

```bash
npm run create
```

Der Generator fragt interaktiv nach:

- Projektname und Markenname
- Branche/Nische
- Theme: `industrial-ai`, `minimal-luxury`, `cyber-saas`, `clean-startup`
- aktiven Sections: Hero, Story, Pricing, FAQ, Final CTA
- CTA-Art: Waitlist, Kaufen, Demo oder Kontakt
- optionalem Waitlist-Modus
- optionaler AI-Content-Generierung über den bestehenden `generateSiteConfig()` Layer

Ergebnis:

- Das Starter Kit wird nach `../<projektname>/` kopiert.
- `package.json`, `lib/content/site.ts` und `app/page.tsx` werden anhand der Antworten angepasst.
- `node_modules`, `.next`, `.git`, `out` und generierte Content-Dateien werden nicht kopiert.
- Im neuen Projekt werden `npm install` und `npm run build` ausgeführt.
- Falls AI-Generierung gewählt wurde, aber kein `ANTHROPIC_API_KEY` gesetzt ist, wird dieser Schritt klar gemeldet übersprungen.

Bei deaktiviertem Pricing oder FAQ entfernt das CLI die jeweilige Section aus `app/page.tsx`. Das neue Projekt bleibt auch bei Install-/Build-Fehlern bestehen und kann manuell weiterbearbeitet werden.

## Design principles

- One audience, one offer, one primary CTA.
- Motion clarifies hierarchy and story; it is not decoration.
- Surfaces use restrained gradient borders, shadows, glow, and blur.
- Mobile is intentionally redesigned through responsive CSS.
- Reduced motion must keep all content visible.

## Delivery gate

Run `npm run build`, `npm run lint`, and then complete `QA_CHECKLIST.md` before treating a project as ready.
