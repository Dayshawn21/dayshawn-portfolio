# Project Plan

> Adopted from the existing codebase, `PRODUCT.md`, and `README.md` on 2026-10-16.
> `PRODUCT.md` remains the detailed product brief; this plan summarizes it for the
> Blueprint workflow.

## 1. Problem - What problem are we solving?

Dayshawn Terry is looking for frontend and full-stack software engineering roles.
Recruiters and hiring managers need to evaluate his engineering experience and
independent full-stack work quickly. The portfolio makes that easy: it leads with
real work, explains the engineering behind Lineform, and gets visitors to the
resume and contact details.

Success means visitors understand his strengths, explore Lineform, download the
resume, and get in touch.

## 2. Users - Who is this for?

- Recruiters screening candidates, often scanning on a phone.
- Engineering hiring managers evaluating depth, usually on desktop.

Visitors may arrive while the external Lineform demo is down, so the portfolio
itself must carry enough project context.

## 3. Features - What does the MVP need?

All of these already exist:

- Sticky header with in-page navigation and active-section highlighting
- Introduction with positioning statement
- Featured Lineform project: summary, role, technologies, live/source/explanation links
- Interactive architecture pipeline (Collect, Unify, Model, Evaluate, Explore)
- Case study of key engineering decisions
- Professional experience (Visualutions: Saber, dental practice platform, Beacon)
- About section with education and grouped skills
- Contact section with email, LinkedIn, GitHub, and resume download
- Prerendered HTML so all content is readable before JavaScript loads
- SEO and sharing metadata, generated 1200 x 630 social image, sitemap, robots.txt
- Self-contained offline preview for local review

Planned: browser-verified layout and interaction fixes, unit tests for pure logic,
and the launch on dayshawnterry.com.

## 4. Data - What are we storing?

Nothing at runtime. All content is static, typed data in `src/content.ts`
(profile, projects, experience, skill groups). The resume is a static PDF in
`public/` that must stay byte-for-byte identical to the supplied original.

## 5. Tech - What stack are we using?

- React 19 + TypeScript 5.9 (strict), built with Vite 7
- Custom CSS with design tokens as custom properties (`src/styles.css`); no CSS framework
- Self-hosted variable fonts via `@fontsource-variable` (Source Sans 3, Source Serif 4)
- Build-time prerender (`scripts/prerender.mjs`) using Vite SSR and `renderToString`, then client hydration
- `@resvg/resvg-js` to rasterize the social card at build time
- npm (package-lock.json); Node.js 22.15+ (24 recommended)

No backend, database, router, or contact-form service.

## 6. Monetize - How will this make money?

It doesn't. This is a personal job-search portfolio.

## 7. UI/UX - How should this look and feel?

Clear and restrained, with editorial typography. White background, deep navy text,
cobalt accents, and pale blue supporting surfaces. Source Serif 4 headings and Source
Sans 3 body. Left-aligned, generous spacing, project-led content, and restrained
motion that respects reduced-motion preferences. The full system is in `DESIGN.md`
and `.impeccable/design.json`.

Accessibility: semantic landmarks, visible focus, keyboard navigation, reduced
motion, and WCAG AA contrast.

Content rules:

- Present employment as professional frontend experience; only independent projects (Lineform) are framed as full-stack.
- Make no predictive-success or profitability claims, and include no testimonials, internal company screenshots, or private source code.
- Projects from the old portfolio are excluded. Link to Lineform rather than embedding it.

## 8. Deployment - Where and how will this ship?

- Static site: `npm run build` outputs `dist/`, served from the site root. No server, env secrets, rewrites, or health check.
- The hosting identity is recorded in `.openai/hosting.json` (static directory `dist`). Reuse it; do not create another site.
- Optional build env var `PORTFOLIO_SITE_ORIGIN` (HTTPS origin) points the social image at a private preview origin. The final domain build runs without it.
- Domain: `dayshawnterry.com` (canonical `https://www.dayshawnterry.com/`). The existing deployment and DNS stay unchanged until the replacement is verified, and serve as the rollback.
- Uploading a hosted preview and any DNS change each require explicit approval.

> TODO (confirm): the hosting provider for the final domain cutover. The README says "the chosen hosting provider" without naming one.

## 9. Usage model and constraints (optional)

- Public, internet-facing static site; low traffic.
- No user accounts, input, or stored data, so there is no application trust boundary.
- No compliance or availability requirements beyond normal personal-site reliability.
