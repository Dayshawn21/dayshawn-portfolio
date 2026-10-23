# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

AI Blueprint workflow instructions (shared across AI coding tools) live in AGENTS.md:

@AGENTS.md

## Commands

Requires Node.js 22.15+ (Node 24 recommended). On Windows, use `npm.cmd` if PowerShell blocks `npm`.

```sh
npm ci                    # install
npm run dev               # Vite dev server on 127.0.0.1 (client-rendered, no prerender)
npm run typecheck         # tsc --noEmit
npm run build             # typecheck + vite build + scripts/prerender.mjs -> dist/
npm run preview           # serve dist/
npm run preview:offline   # after build: writes self-contained .preview/index.html
```

There is no test runner or linter configured. Verify changes with `npm run typecheck` and `npm run build`.

Project automations in `.claude/`: a PostToolUse hook type-checks after edits to `src/**/*.ts(x)`, and a PreToolUse hook blocks writes to the resume PDF. `/add-project` adds a project entry, `/ship-check` runs the pre-release checks, and the `content-guard` agent reviews copy changes against `PRODUCT.md`. `.mcp.json` provides Playwright (browser checks) and context7 (library docs).

## Architecture

A one-page static React 19 + TypeScript portfolio built with Vite. There is no router, backend, or CSS framework.

- **Content and rendering are separate.** All copy, links, projects, experience, and skills live in typed data in `src/content.ts`. `src/App.tsx` renders it generically. To add a project, add an entry to the `projects` array; components render it automatically. Use empty `pipeline`/`decisions` arrays when those sections don't apply.
- **Prerender + hydrate.** `npm run build` runs `scripts/prerender.mjs`, which SSR-loads `src/entry-server.tsx` through Vite and injects `renderToString(<App />)` into `<div id="root"></div>` in `dist/index.html`. `src/main.tsx` calls `hydrateRoot` when the root already has children and `createRoot` otherwise (as in dev). Keep `App` output deterministic between server and client: no `window`/`document` access during render; put that in effects (see `src/useActiveSection.ts`).
- **Social image.** The prerender script also rasterizes `public/social-card.svg` to `dist/social-card.png` (1200×630) with `@resvg/resvg-js`. The optional env var `PORTFOLIO_SITE_ORIGIN` (HTTPS origin, no path) rewrites only the social-image URL for private hosted previews. The canonical URL stays `https://www.dayshawnterry.com/`.
- **Offline preview.** `scripts/offline-preview.mjs` inlines the built JS, CSS, fonts, favicon, and resume (as data URIs) into `.preview/index.html`. It finds the resume by string-matching `'/Dayshawn_Terry_Resume.pdf'` in both the HTML and the JS bundle so hydration still matches. If you change `profile.resume` in `content.ts`, update this script too. This file is a local review artifact, not the deploy bundle.
- **Styling.** All styles are in `src/styles.css`, using design tokens as CSS custom properties. The design system is documented in `DESIGN.md` and `.impeccable/design.json`; keep them in sync with token or typography changes. Motion must respect `prefers-reduced-motion`.
- **Fonts** are self-hosted through `@fontsource-variable` (Source Sans 3 for body, Source Serif 4 for headings).

## Content and product constraints

From `PRODUCT.md` and `README.md`:

- Audience: recruiters and engineering hiring managers. Present employment as professional **frontend** experience; do not recast it as full-stack. SportApp is the independent full-stack project.
- SportApp is the only independent project. Projects from the old portfolio are intentionally excluded.
- Make no predictive-success or profitability claims, and add no testimonials, internal company screenshots, or private source code.
- `public/Dayshawn_Terry_Resume.pdf` must stay byte-for-byte identical to the supplied original. Replace it only with a new original.
- Accessibility requirements: semantic landmarks, visible focus, keyboard navigation, reduced motion, and WCAG AA contrast.

## Hosting

The hosting identity is recorded in `.openai/hosting.json`. Reuse it and don't create another site. Uploading a hosted preview requires explicit user authorization. Don't change the existing `dayshawnterry.com` deployment or its DNS without the user's direction.
