# Deploy

## How it deploys

Vercel is connected to this repo. Pushes to `main` build and deploy automatically. Pushes to other branches produce preview URLs.

There is no build step — `index.html` and its assets are served as-is.

## First-time Vercel setup

If the project isn't yet linked to Vercel:

1. Sign in to [vercel.com](https://vercel.com) and **Add New → Project**.
2. Import `Naturally-Inviting/act-public`.
3. Framework preset: **Other** (or "No framework").
4. Build command: leave empty. Output directory: leave empty (defaults to repo root).
5. Click **Deploy**.

## Custom domain (when one is registered)

1. In the Vercel project: **Settings → Domains → Add**.
2. Enter the domain. Follow the DNS instructions Vercel shows (an `A` record or `CNAME` depending on whether it's the apex or a subdomain).
3. Once DNS propagates, Vercel issues a TLS cert automatically.

No environment variables are needed for v1 — the Apps Script `/exec` URL lives directly in `form.js`.

## Rolling back

In the Vercel dashboard:

1. Open the project.
2. **Deployments** tab.
3. Find the last good deployment, click the `…` menu, and **Promote to Production**.

That swaps production back to the older build instantly. No redeploy needed.

## Smoke test after deploy

- Page loads at the Vercel URL.
- Headline and form render on mobile and desktop without scrolling on a typical viewport.
- Submitting a real email lands a row in the **Landing Page Signups** sheet (see `apps-script/SETUP.md`).
- DevTools → Network shows no third-party requests (everything served from the same origin).
