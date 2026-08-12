# Exquisuite

A production-oriented UK fashion storefront built with Next.js 16, Clerk authentication, Neon Postgres and Stripe Checkout.

## Features

- Responsive womenswear, menswear and designer catalogue
- Account-required, database-persisted shopping bag
- Server-trusted GBP prices and UK-only delivery
- Stripe-hosted secure checkout and signed webhook fulfilment
- Free delivery over £100 and £4.95 standard delivery
- Accessible navigation, forms and responsive product imagery

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add development credentials. Prefer a least-privilege Stripe restricted key (`rk_test_...`).
3. Run `database/schema.sql` against the Neon database.
4. Register `/api/webhooks/stripe` as a Stripe webhook for `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`.
5. Run `npm run dev`.

Never commit `.env.local` or any secret key. Use Stripe test keys until the full order flow has been verified.

## Launch checks

- Confirm every required variable in `.env.example` exists in Vercel for Development, Preview and Production.
- Run `database/schema.sql` once against the linked Neon database.
- Verify `/api/health` returns HTTP 200 on the preview deployment.
- Complete a Stripe test-mode purchase and confirm the webhook changes the order to `paid` before enabling live payments.
