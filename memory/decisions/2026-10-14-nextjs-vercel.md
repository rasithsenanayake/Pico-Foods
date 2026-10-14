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

The repository push is separate from deployment. Import the repository in Vercel; no Vercel project or production deployment was created in this change.
