# Lobo VC Cup

Landing page for UNM's Lobo VC Cup — a student-run startup investment competition where student founders pitch and student VCs invest.

A single-page React site built with Vite, TypeScript, and Tailwind CSS. Deployed as a static build on Vercel.

## Tech stack

- [Vite](https://vitejs.dev/) — build tool / dev server
- [React 18](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [pdfjs-dist](https://mozilla.github.io/pdf.js/) for the in-page pitch deck viewer

## Getting started

```bash
npm install
npm run dev
```

This starts the Vite dev server (default `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check (tsc -b) then build to dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Project structure

```
index.html                  — Vite entry HTML, mounts #root
src/main.tsx                — React entry point
src/App.tsx                 — page composition: assembles all sections in order
src/components/
  layout/                   — Navbar, Footer
  hero/                     — Hero section
  sponsors/                 — LogoStrip
  tracks/                   — Startup/VC track cards
  recap/                    — 2026 recap: winners gallery, project spotlights,
                               testimonials carousel, PDF deck viewer
  schedule/                 — 2027 schedule accordion
  mentors/                  — Mentors grid
  common/                   — shared building blocks (Button, Card, Container, Logo, ...)
src/data/                   — page content as typed TS objects (nav links, schedule,
                               mentors, tracks, testimonials, winners, projects)
src/types/content.ts        — TypeScript interfaces for everything in src/data/
src/assets/                 — icons and images bundled by Vite
public/                     — static files served as-is (favicon, mentor photos, pitch deck PDFs)
```

## Editing content

There's no CMS or backend — all copy and structured content lives directly in `src/data/*.ts`, typed against `src/types/content.ts`. To change site copy (mentor bios, schedule items, tracks, testimonials, winners, project spotlights, nav links), edit the relevant file in `src/data/`.

To add a new page section, create a component under `src/components/<section>/` and add it to the composition in `src/App.tsx`.

Images referenced from components (icons, illustrations) go in `src/assets/`; large or user-facing static files (mentor headshots, pitch deck PDFs) go in `public/` and are referenced by absolute path (e.g. `/mentors/name.png`).

## Deployment

Deployed on [Vercel](https://vercel.com/). `vercel.json` configures it as a static Vite build: `npm run build` outputs to `dist/`, which Vercel serves directly.
