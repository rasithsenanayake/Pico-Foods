---
title: Next.js App Router and logo-led branding
type: decision
date: 2026-10-14
tags:
  - nextjs
  - vercel
  - branding
---

# Next.js App Router and logo-led branding

## Decision

Convert the Pico Foods Vite storefront to the Next.js App Router for Vercel hosting. Keep the existing menu and WhatsApp ordering flow, use the transparent PNG made from the supplied logo in the header and footer, and derive the shared green, gold, and neutral palette from that logo. Keep the original JPEG unchanged.

## Verification

- `npm run build` passes and prerenders `/` as a static route.
- `npm run lint` passes.
- `npm audit --omit=dev --audit-level=moderate` reports no production dependency vulnerabilities.

## Deployment

The Vercel project had no framework preset (`framework: null`), so deployments built Next.js but returned Vercel 404s. Set the project preset to Next.js and pin it in `vercel.json`. Commit `c9f79b1` deployed successfully; both `https://picofoods.vercel.app/` and the deployment URL returned HTTP 200.
