# Couverture de la Rive-Nord — Marketing Website

Next.js 14 marketing site for Couverture de la Rive-Nord Inc., a Quebec roofing company specializing in white EPDM/TPO membranes for flat roofs.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in MAKE_WEBHOOK_URL
npm run dev
```

Open http://localhost:3000

## Environment variables

| Name | Required | Description |
|---|---|---|
| `MAKE_WEBHOOK_URL` | Yes (prod) | Make.com webhook URL the contact form POSTs to |

## Project layout

- `app/` — Next.js App Router routes
- `components/` — React components
- `lib/` — Shared constants and content data
- `public/` — Static images, hero video
- `docs/` — Design spec and implementation plans
- `_archive/preview/` — Phase 1 static HTML preview (frozen reference)
- `images_site/` — Source-of-truth client images

## Deploy

Pushes to `main` auto-deploy on Vercel. Set `MAKE_WEBHOOK_URL` in Vercel project settings → Environment Variables.

## Spec

See `docs/superpowers/specs/2026-05-09-couvrivenord-site-design.md`.
