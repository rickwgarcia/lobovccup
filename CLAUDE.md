# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lobo VC Cup — UNM's student-run startup investment competition landing page. A single-page React + Vite site, statically built and deployed to Vercel.

## Development

```bash
npm install
npm run dev      # Vite dev server, http://localhost:5173
```

```bash
npm run build     # tsc -b type-check, then vite build to dist/
npm run preview   # serve the production build locally
npm run lint       # eslint
```

## Architecture

```
index.html            — Vite entry HTML, mounts #root
src/main.tsx           — React entry point
src/App.tsx             — page composition: assembles all sections in order
src/components/         — one folder per section (layout, hero, sponsors, tracks,
                           recap, schedule, mentors) plus common/ shared building blocks
src/data/*.ts            — all page content as typed TS objects
src/types/content.ts       — TypeScript interfaces for everything in src/data/
src/assets/               — icons/images bundled by Vite, imported by components
public/                   — static files served as-is (favicon, mentor photos, pitch deck PDFs),
                            referenced by absolute path e.g. /mentors/name.png
vercel.json               — static Vite build config (buildCommand/outputDirectory)
```

**Content pattern**: there is no backend or CMS. All copy and structured content lives in `src/data/*.ts`, typed against `src/types/content.ts` (nav links, schedule items, mentors, tracks, testimonials, winners, project spotlights). Edit the relevant data file directly to change site copy.

**Adding a new section**: create a component under `src/components/<section>/`, add any typed content it needs to `src/data/` and `src/types/content.ts`, then include the component in the composition in `src/App.tsx`.

## Deployment

Deployed on Vercel as a static Vite build: `vercel.json` sets `buildCommand: npm run build` and `outputDirectory: dist`.
