# Generator UI — /generator

## Overview

The `/generator` page provides a browser-based interface for the existing server-side `POST /api/generate` endpoint. It turns a short business idea into a complete `SiteConfig` preview with meta, hero, story, pricing, FAQ, final CTA, and raw JSON output.

## Prerequisites

- Node.js 18 or newer
- Project dependencies installed with `npm install`
- `ANTHROPIC_API_KEY` configured in `.env.local` or the deployment environment
- Sufficient Anthropic API credits

## Usage

1. Start the app with `npm run dev`.
2. Open `http://localhost:3000/generator`.
3. Enter a business idea with at least 20 characters.
4. Click **Generate →**.
5. Review the structured preview or open **Show raw JSON** and copy the config.

## States (Idle, Loading, Error, Success)

- **Idle:** The form is editable and ready for input.
- **Loading:** The form remains visible, textarea and submit button are disabled, and a spinner confirms generation is running.
- **Error:** A mapped, user-safe error card explains what happened and offers **Try Again**.
- **Success:** The form is replaced by a generated preview, raw JSON toggle, copy action, and a button to generate another idea.

## Error Reference

| type | Ursache | Nutzermeldung | Lösung |
| --- | --- | --- | --- |
| `VALIDATION` | Business idea is shorter than 20 characters | Your idea is too short | Add a more detailed business description. |
| `NO_API_KEY` | `ANTHROPIC_API_KEY` is missing or still a placeholder | Generator not configured | Configure the server environment with a valid key. |
| `INSUFFICIENT_CREDITS` | Anthropic account has insufficient credits | API credit balance too low | Top up the Anthropic account at console.anthropic.com. |
| `NETWORK` | Browser could not reach the server | Connection failed | Check network connectivity and retry. |
| `INVALID_RESPONSE` | Server response did not include `siteConfig` | Invalid response | Retry and inspect server logs if it persists. |
| `SERVER_ERROR` | API returned an unexpected server failure | Generation failed / Unexpected error | Check server logs and provider status. |

## Component Architecture

- `app/generator/page.tsx` is a Server Component that renders the page shell and imports the client form.
- `GeneratorForm` owns state, validation, API calls, error mapping, and state transitions.
- `ExampleIdeaButton` fills the textarea with a random sample idea.
- `GeneratorLoading` renders the no-GSAP spinner state.
- `GeneratorError` renders mapped, safe error messages only.
- `GeneratorResult` renders the structured `SiteConfig` summary.
- `GeneratorJsonPreview` renders the collapsible raw JSON view and clipboard copy action.
- `types/generator.ts` centralizes generator UI types and the API response shape.

## Styling

All generator styles live in `app/styles/components.css` under the **Generator UI** section. The UI reuses existing system classes such as `.container`, `.section`, `.eyebrow`, `.headline`, `.lead`, `.muted`, `.premium-button`, and `.premium-card`.

New classes use only theme-aware CSS custom properties like `var(--accent)`, `var(--danger)`, `var(--line)`, `var(--surface)`, `var(--surface-2)`, `var(--muted)`, and `var(--faint)`. Pricing cards collapse to one column at `max-width: 640px`.

## Security Note (API Key bleibt serverseitig)

`ANTHROPIC_API_KEY` is never sent to the browser and must not use a `NEXT_PUBLIC_` prefix. The client only calls `fetch('/api/generate', ...)`; the Next.js route handles all Anthropic access server-side.

The UI does not call the Anthropic SDK directly and displays only mapped error messages from the client-side error mapping function.

## Future Extensions

- **Mock Mode:** Add a local fixture mode for demos without provider credits.
- **Live Theme Preview:** Apply the generated `theme` to the preview via `useTheme()`.
- **Export:** Add actions to download JSON, create `site.generated.ts`, or open the CLI handoff flow.
