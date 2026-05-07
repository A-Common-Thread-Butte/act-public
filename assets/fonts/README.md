# Self-hosted fonts

Drop two variable woff2 files in this directory:

- `Fraunces-Variable.woff2`
- `Inter-Variable.woff2`

Until they're present, the page falls back to a system serif/sans stack and still looks reasonable.

## Where to get them

Both fonts are licensed under the SIL Open Font License (OFL), which permits self-hosting and redistribution.

**Inter** (variable, latin):

```sh
curl -L -o Inter-Variable.woff2 \
  "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2"
```

**Fraunces** (variable, latin):

```sh
curl -L -o Fraunces-Variable.woff2 \
  "https://cdn.jsdelivr.net/fontsource/fonts/fraunces:vf@latest/latin-wght-normal.woff2"
```

Run those commands from inside this `assets/fonts/` directory. Commit the resulting `.woff2` files. Vercel will cache them aggressively (see `vercel.json`).

If you'd rather pull from Google Fonts directly, the gstatic URLs in their `@font-face` CSS work the same way — download once, commit the woff2.
