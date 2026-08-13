# Elit Projekt — Next.js

Real estate showcase website for Elit Projekt, migrated from React + Vite to Next.js (App Router).

## Stack

- Next.js 15 (App Router, JavaScript)
- Tailwind CSS v3
- Framer Motion, Swiper, Lenis, react-markdown
- Strapi headless CMS (content) + AWS S3 (media)

## Architecture

- **Locale-prefixed routes**: `/hr`, `/en`, `/de` — `proxy.js` (Next 16's renamed middleware) detects the visitor's language (cookie, then `Accept-Language`) and redirects bare URLs.
- **Static generation + ISR**: every page is prerendered; project detail pages use `generateStaticParams`. Content revalidates every hour, or instantly via the Strapi webhook.
- **Server-side data**: all Strapi fetching happens in server components through `lib/strapi.js`. No client-side data fetching, no loading spinners for content.
- **Server actions**: contact forms post through `app/actions/contact.js`, so Strapi API tokens never reach the browser.

## Setup

```bash
cp .env.example .env.local   # fill in tokens
npm install
npm run dev
```

## Strapi revalidation webhook

In Strapi: Settings → Webhooks → create a webhook pointing to:

```
https://<your-domain>/api/revalidate?secret=<REVALIDATE_SECRET>
```

Enable events: entry publish, unpublish, update, delete. Publishing content then regenerates the affected pages within seconds while everything stays statically served.

## Deployment (Vercel)

1. Push this repo to GitHub and import it in Vercel.
2. Set the env vars from `.env.example` in the Vercel project settings.
3. Point the domain's DNS at Vercel.
