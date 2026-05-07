# Landing Page v1 — Kickoff Prompt

You're helping build the first public landing page for **A Common Thread (ACT)**, a small-business consultancy in Butte, Montana run by Heide and Will Brandin. We are pre-launch, in business development. This page is a placeholder with intent — a clean, minimal splash that announces we exist and captures email addresses from people who want to hear when we launch.

This is not a web app. It's a static site. Don't reach for frameworks.

## Repo and workflow

- Repo: https://github.com/Naturally-Inviting/act-public
- Hosting: Vercel, connected to the repo so pushes to `main` auto-deploy. Don't `vercel --prod` from CLI; commit and let Vercel build.
- Will is iterating with you. You propose, he reacts. Don't try to one-shot the whole thing — pause at real decision points (headline copy, font pairing, layout) and ask. When you propose an approach, mention the why and the trade-off so Will can make the call when there's one to make.

## Brand context (read this carefully — it's the whole job)

**What we are.** A Common Thread connects small businesses across Southwest Montana — Butte, Anaconda, Dillon, Whitehall — with the tools, people, and opportunities they need to thrive. Our lead service is helping small businesses figure out and show up on social media. Modern tooling (including AI) is a thread we weave in where it earns its keep — it's not the headline.

**Posture.** We are an amplifier, not a change agent. We don't transform Butte. We highlight what makes it special. Involved but not stealing the show — the small businesses are the protagonists; we're the people in the room who make sure they get heard. This posture should be felt in every layout decision and every line of copy. The page is not about us.

**Who we serve.** Newer / early-stage business owners with something fresh to offer who haven't found their footing yet. A yoga studio owner. A craft maker. A young restaurant. They know they need to "do social media." They don't know how, and they don't know who to ask. The customer's emotional engine is feeling left behind and underground or undiscovered. They have something valuable but invisible. Our job is to make it visible.

**Voice.** Encouraging, not rescuing. Coachable, energetic. Honest with teeth — we'll tell a client when AI isn't the answer, or that their account won't grow until they show up on camera. Rooted (Honesty, Community) and hungry (Curiosity). Never promises unreal numbers ("10x your followers in 30 days" — not us).

**Lines we don't cross.** Never offer solutions before understanding problems. Never make a client more stressed. Never promise unreal numbers. Never expose client information. Never build tools to replace roles — we augment, we don't automate away neighbors.

**Phrases worth keeping** (raw material for headline / sub-copy — pull from these, don't quote them all):

- "I don't want to transform it. I want to highlight what makes it special."
- "Building community from scratch."
- "Something Butte was missing and didn't even know it needed."
- "Underground or undiscovered."
- "Someone who understands Butte."
- "Feeling left behind."
- "We're not pushing AI. We're connecting businesses with peers, with their audience, and with modern tooling."

When you make visual or copy decisions, think as a brand designer — restraint, intention, and a clear point of view. Not generic web-dev defaults.

## Wordmark direction

We don't have a finalized logo yet, so v1 uses a typographic wordmark:

- "A Common Thread" set in a serif as the primary wordmark. Elegant, slightly editorial, but warm — not stuffy or formal. Think of a thoughtful local brand, not a law firm.
- Mix serif with a sans-serif for supporting text (sub-headers, body, form labels, footer). The contrast does the visual work — minimal everything else.
- Restraint everywhere. Lots of whitespace. Type does the heavy lifting. No textures, no gradients, no decorative flourishes in v1.
- Pick the pairing thoughtfully. Propose 2 options to Will before committing. Safe directions if you need a starting point: Fraunces + Inter, EB Garamond + Inter, Cormorant Garamond + DM Sans. Ask Will if there's a serif he's already gravitating toward from the logo work — there may be.

Self-host the fonts (download the files into `assets/fonts/`). No Google Fonts CDN — privacy plus we don't need the call.

## What to build

A single static page (`index.html` + `styles.css` + a minimal `form.js`) with:

- A clean hero with the wordmark and a headline drawn from the brand voice. The headline should land for the customer (the underground small-business owner), not describe us.
- A short paragraph (2–3 sentences) saying who we are and what we do, written in our voice.
- One email capture form. Single field plus submit. Inline success/error states. No modals, no popups. On success, replace the form with a short thank-you line in our voice.
- Footer: Butte, MT. Year. That's plenty.
- No tracking, no analytics, no cookie banner.

Draft 2–3 headline options and let Will pick before committing.

## Stack and constraints

- Plain HTML, CSS, vanilla JS. No build step, no bundler, no framework, no Tailwind, no React.
- One `index.html` at the root, one `styles.css`, one `form.js`. Add `assets/` for images and fonts.
- Mobile-first. Test mobile and desktop.
- Lighthouse: aim for 95+ on performance, accessibility, SEO, and best-practices. Achievable on a static page.
- Accessibility: real semantic HTML, proper labels, focus states, color contrast that passes WCAG AA.
- Add a sensible `vercel.json` with security headers (`X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, a basic CSP that allows the Apps Script `/exec` endpoint for the form POST).
- `.gitignore` should cover `.DS_Store` and anything else that creeps in.

## Email collection (Google Apps Script → Sheet)

Submissions land in a Google Sheet so Will can review them later. You will produce two artifacts:

1. `apps-script/Code.gs` — `doPost(e)` accepts `email` (and `source`, `submitted_at`), validates email format, appends a row to the sheet, returns JSON `{ ok: true }`. Include `doOptions` and the right CORS headers in `doPost`. Use `LockService` so concurrent submits don't collide.
2. `apps-script/SETUP.md` — step-by-step for Will to:
   - Create a new Google Sheet named `Landing Page Signups` with header row: `submitted_at | email | source | user_agent`.
   - Open Extensions → Apps Script, paste in `Code.gs`, save.
   - Deploy as Web App: execute as me, access Anyone. Copy the resulting `/exec` URL.
   - Paste that URL into a single `FORM_ENDPOINT` constant at the top of `form.js`.
   - Test once with a fake email and confirm a row lands.

`form.js` should `fetch` POST as `application/x-www-form-urlencoded` (Apps Script handles this cleanly without preflight; JSON triggers preflight and complicates things). Show inline success/error in our voice. Don't commit a real deploy URL — leave it as a placeholder constant.

## Deployment

Vercel is connected to the repo. After local files are ready: commit, push to `main`, Vercel builds. End the engagement with a short `DEPLOY.md` that documents how to roll back, where to set the custom domain when one's registered, and any environment variables (there shouldn't be any for v1 — the Apps Script URL lives in the JS file).

## Things to ask Will before starting

- Is there a specific serif he's already aligned on from the logo work, or should you propose pairings?
- Does ACT have a domain registered yet? If not, suggest reserving one before connecting it in Vercel.
- What's the ask of the visitor — "get notified when we launch" or "tell us about your business"? Different copy, different downstream funnel.
- Any phrases from the "Phrases worth keeping" list he specifically wants on the page (or not)?

## Definition of done (v1)

- `index.html`, `styles.css`, `form.js` render cleanly on mobile and desktop.
- Lighthouse 95+ across all four categories.
- `apps-script/Code.gs` + `apps-script/SETUP.md` written and tested by Will end-to-end with one real submission landing in the sheet.
- `vercel.json`, `.gitignore`, `README.md`, and `DEPLOY.md` at the repo root.
- Repo pushed; Vercel preview matches local.

---

Start by reading this prompt back to Will in your own words — particularly the brand voice and posture — so he can confirm you've absorbed it. Then come back with: 2–3 headline options, 2 font-pairing options, and answers to the four "things to ask Will" questions you need before going further.
