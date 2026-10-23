# Build Plan

Features in rough build order, one line each; details come later in `/feature`.
Run `/feature` to spec the next unchecked item, or `/feature 10` to pick one.
Keep completed items checked and append new features as the project grows.
Do not renumber completed features; their archived specs refer to those IDs.

Items 1-9 were already shipped when the project adopted the Blueprint (2026-10-16).

## Your features

- [x] 1. **Typed content model and page shell** - profile, projects, experience, and skills in `src/content.ts`, rendered by a single-page `App` with semantic landmarks
- [x] 2. **Sticky header with active-section highlighting** - in-page navigation that tracks the visible section (`useActiveSection`)
- [x] 3. **Introduction** - headline and positioning statement
- [x] 4. **Featured SportApp project** - summary, status, role, technologies, and live/source/explanation links
- [x] 5. **Interactive architecture pipeline and case study** - selectable pipeline stages with animated connectors and explanations, plus engineering decisions
- [x] 6. **Experience, about, and skills** - Visualutions work, education, and grouped skills
- [x] 7. **Contact, resume download, and footer** - email, LinkedIn, GitHub, unchanged resume PDF
- [x] 8. **Prerendered static build with sharing metadata** - build-time SSR and hydration, canonical URL, generated social image, sitemap, robots.txt
- [x] 9. **Offline preview bundle** - self-contained `.preview/index.html` with embedded assets for local review
- [ ] 10. **Browser review and fixes** - verify desktop/tablet/mobile layout, hydration, pipeline interactions, and keyboard behavior in a real browser, then fix what turns up
- [ ] 11. **Unit tests for pure logic** - add a test runner and cover pure functions such as `findActiveSection`
- [ ] 12. **Launch on dayshawnterry.com** - private hosted preview, then domain cutover with HTTPS, www/apex redirect, and link checks; keep the old deployment as rollback
