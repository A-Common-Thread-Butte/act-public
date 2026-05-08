# act-public

Public landing page for **A Common Thread**, a small-business consultancy in Butte, Montana.

This is a static site — plain HTML and CSS, no build step.

## Files

- `index.html` — the page.
- `styles.css` — single stylesheet, mobile-first, single viewport.
- `assets/fonts/` — self-hosted Fraunces + Inter (see `assets/fonts/README.md`).
- `vercel.json` — security headers and font caching.
- `DEPLOY.md` — Vercel deploy and rollback notes.
- `KICKOFF.md` — the brief this v1 was built from.

## Local preview

Any static server works. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Lead capture form

The lead capture form is an embedded Airtable form (iframe). To swap the form
(new base, new view, etc.), update the `src` on the `<iframe>` inside
`<section class="form-section">` in `index.html`. Get the URL from Airtable:
form view → Share form → Embed → copy `src`.
