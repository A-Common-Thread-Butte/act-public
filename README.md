# act-public

Public landing page for **A Common Thread**, a small-business consultancy in Butte, Montana.

This is a static site — plain HTML, CSS, and a small vanilla JS form handler. No build step.

## Files

- `index.html` — the page.
- `styles.css` — single stylesheet, mobile-first, single viewport.
- `form.js` — submits the email form to the Apps Script endpoint.
- `assets/fonts/` — self-hosted Fraunces + Inter (see `assets/fonts/README.md`).
- `apps-script/` — `Code.gs` and `SETUP.md` for the Google Apps Script that captures signups into a private Google Sheet.
- `vercel.json` — security headers and font caching.
- `DEPLOY.md` — Vercel deploy and rollback notes.
- `KICKOFF.md` — the brief this v1 was built from.

## Local preview

Any static server works. For example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Connecting the form

Follow `apps-script/SETUP.md` to deploy the Apps Script and paste the `/exec` URL into `FORM_ENDPOINT` at the top of `form.js`.
