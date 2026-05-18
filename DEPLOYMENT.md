# Deployment Guide

This guide explains how to validate and deploy the Premium Landing Page Starter Kit to Vercel or Netlify.

## Requirements

- Node.js 20 or newer
- npm 10 or newer recommended
- A GitHub repository connected to your deployment platform
- Optional platform CLIs:
  - Vercel CLI: `npm install -g vercel`
  - Netlify CLI: `npm install -g netlify-cli`

Check local versions:

```bash
node --version
npm --version
```

## Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and verify the page renders without console errors.

## Pre-deploy check

Run the automated gate before every production deployment:

```bash
npm run predeploy
```

The script runs:

1. `npm run lint`
2. `npm run build`
3. A local `.env.local` warning if present
4. A `CHANGELOG.md` warning if missing

A successful run ends with:

```txt
✅ Pre-Deploy Check bestanden. Bereit für Deployment.
```

## Environment variables

Copy the template when local secrets or public deployment values are needed:

```bash
cp .env.example .env.local
```

Current project state does not require secrets for a static landing page. Reserved future variables include:

- `NEXT_PUBLIC_SITE_URL` — canonical public URL for future metadata/integrations
- `ANTHROPIC_API_KEY` — reserved for the future AI generation layer

Never commit `.env.local` or real credentials.

## Vercel deployment

The repository includes `vercel.json` with:

- Next.js framework detection
- `npm install` install command
- `npm run build` build command
- `.next` output directory
- `fra1` region for Europe-oriented deployments
- Baseline security headers

### Option A — Git integration

1. Push the repository to GitHub.
2. In Vercel, choose "Add New Project".
3. Import the GitHub repository.
4. Keep the detected framework as Next.js.
5. Add environment variables if needed.
6. Deploy.

### Option B — CLI

```bash
npm run predeploy
npm run deploy:vercel
```

If this is the first deployment, the Vercel CLI will ask to link or create a project.

## Netlify deployment

The repository includes `netlify.toml` with:

- `npm run build` as build command
- `.next` publish directory
- Node.js 20 build environment
- `@netlify/plugin-nextjs`
- Baseline security headers
- 404 fallback redirect

### Option A — Git integration

1. Push the repository to GitHub.
2. In Netlify, choose "Add new site" → "Import an existing project".
3. Select the GitHub repository.
4. Netlify reads `netlify.toml` automatically.
5. Add environment variables if needed.
6. Deploy.

### Option B — CLI

```bash
npm run predeploy
npm run deploy:netlify
```

If this is the first deployment, run `netlify init` or link the site when prompted.

## Custom domain setup

### Vercel

1. Open the Vercel project dashboard.
2. Go to Settings → Domains.
3. Add your domain.
4. Follow the displayed DNS instructions.
5. Wait for DNS propagation and SSL provisioning.

### Netlify

1. Open the Netlify site dashboard.
2. Go to Domain management.
3. Add your custom domain.
4. Configure the DNS records shown by Netlify.
5. Confirm SSL is active under HTTPS settings.

## Security headers

Both `vercel.json` and `netlify.toml` set baseline headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` for common restricted browser APIs
- `Content-Security-Policy` baseline for app assets and Next.js runtime

After production deployment, verify headers with:

- `curl -I https://yourdomain.com`
- `https://securityheaders.com`

If future integrations add external scripts, analytics, images, or APIs, update the CSP allowlist intentionally.

## Troubleshooting

### `npm run predeploy` fails during lint

Run:

```bash
npm run lint
```

Fix the reported ESLint errors and retry `npm run predeploy`.

### `npm run predeploy` fails during build

Run:

```bash
npm run build
```

Fix the TypeScript or Next.js build error. Common causes are invalid imports, missing environment variables, or server/client component boundary issues.

### Vercel deploy cannot find the output directory

Confirm `vercel.json` contains:

```json
"outputDirectory": ".next"
```

Then rerun `npm run build` locally.

### Netlify deploy does not handle Next.js routes

Confirm `@netlify/plugin-nextjs` is installed and `netlify.toml` includes:

```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Then rerun `npm install` and deploy again.

### CSP blocks an asset or integration

Open the browser console and identify the blocked domain. Add the narrowest possible allowlist entry to `Content-Security-Policy` in both `vercel.json` and `netlify.toml`.

### `.env.local` warning appears

This is expected if you use local environment variables. Ensure `.env.local` is not staged:

```bash
git status --short
```
