# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lobo VC Cup 2026 — UNM's startup investment competition landing page. A static frontend with a content API backend, deployed to Vercel.

## Development

**Install dependencies** (from repo root):
```bash
npm install
cd backend && npm install
```

**Run the backend locally** (serves both API and frontend at `http://localhost:3000`):
```bash
cd backend && npm run dev
```

No frontend build step — `frontend/` is plain HTML/CSS/JS and is served statically by Express in dev mode (`NODE_ENV !== 'production'`).

**Environment**: copy `backend/.env.example` to `backend/.env` and set `PORT` (defaults to 3000).

## Architecture

```
api/index.js          — Vercel serverless entry point (re-exports Express app)
backend/src/app.js    — Express app: content API + static serving in dev
backend/src/config/env.js  — reads PORT and NODE_ENV from process.env
content/*.md          — all page content as Markdown files
frontend/index.html   — single-page layout; fetches content from API at runtime
frontend/assets/js/nav.js  — shared nav renderer, injected via <div id="nav-root">
frontend/assets/styles/main.css
vercel.json           — routes /api/* → serverless function, everything else → static
```

**Content pattern**: all section text lives in `content/*.md`. The backend reads these and converts them to HTML via `marked`. The frontend fetches them with `loadContent(page, targetId)` calls at the bottom of `index.html`.

**Adding a new content page**: create `content/<name>.md` AND add `<name>` to `VALID_PAGES` in `backend/src/app.js:30`. Then call `loadContent('<name>', 'target-element-id')` in the frontend.

**Nav rendering**: every page that needs a navbar gets `<div id="nav-root" data-page="..." data-hero="true|false" data-base=""></div>` followed by `<script src="assets/js/nav.js"></script>`. `data-base` is the relative path prefix to reach the repo root (e.g. `"../"` for subpages).

## Deployment

Deployed on Vercel. `vercel.json` wires up the two build outputs:
- `@vercel/node` builds `api/index.js` (includes `content/**` and `backend/src/**` via `includeFiles`)
- `@vercel/static` serves `frontend/**`
