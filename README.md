# act-public

Public landing page for **A Common Thread**, a small-business consultancy in Butte, Montana.

This is a static site — plain HTML, CSS, and a small vanilla JS form handler. No build step.

## Files

- `index.html` — the page.
- `styles.css` — single stylesheet, mobile-first, single viewport.
- `form.js` — client-side validation for the email form. Currently shows a placeholder thank-you on valid submit; the data-collection backend is TBD.
- `assets/fonts/` — self-hosted Fraunces + Inter (see `assets/fonts/README.md`).
- `vercel.json` — security headers and font caching.
- `DEPLOY.md` — Vercel deploy and rollback notes.

## Local preview

Any static server works. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
