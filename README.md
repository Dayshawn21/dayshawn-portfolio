# Dayshawn Terry's portfolio

A static React + TypeScript portfolio featuring SportApp and professional frontend experience. Built with Vite, custom CSS, and self-hosted Source Sans 3 / Source Serif 4 fonts. The production HTML is prerendered, so all substantive content is readable before JavaScript loads.

## Run locally

Requires Node.js 22.15+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev
```

The development server prints its local address. On Windows, `npm.cmd` can be used in place of `npm` if PowerShell blocks the npm script.

```sh
npm run typecheck
npm run build
npm run preview
```

The production output is `dist/`. Serve it from an HTTP server; root-relative assets are intended for the site root. This one-page site needs no client-side route rewrites or backend.

## Open the offline preview

After building, run `npm run preview:offline` and open `.preview/index.html` in a browser. The generated file embeds the application, fonts, favicon, and unchanged resume, so it can be reviewed without running a server. Its scripts and rendered links are adapted together for the embedded resume. This is a local review artifact, not the deployment bundle. Regenerate it after rebuilding.

## Update content

- Edit `src/content.ts` for profile details, project information, case-study copy, experience, and skills.
- Add a completed project to the `projects` array. Give it a unique `id`, accurate links, technologies, role, summary, and case-study introduction. Use an empty `pipeline` or `decisions` array when those sections are not relevant. The site renders added projects automatically.
- Replace `public/Dayshawn_Terry_Resume.pdf` to update the download. The current copy is byte-for-byte identical to the supplied original.
- Adjust reusable visual tokens and responsive rules in `src/styles.css`; refer to `DESIGN.md` and `.impeccable/design.json` for the implemented system.
- Edit `public/social-card.svg` to change sharing artwork. The build creates `dist/social-card.png` at 1200 × 630.

## Hosting and the existing domain

The private Sites identity is recorded in `.openai/hosting.json`. Reuse that identity; do not create another Site for this project. No credentials are stored in this checkout.

Hosted preview upload requires explicit authorization because the deployment includes source and the unmodified resume. The existing `dayshawnterry.com` deployment and DNS have not been changed.

Use the Sites source workflow to synchronize the exact source commit and package `dist/`. Preserve private access during preview. An optional `PORTFOLIO_SITE_ORIGIN` HTTPS origin changes the generated social-image URL for a private hosted preview; the canonical URL remains `https://www.dayshawnterry.com/`.

After preview review, connect the existing domain through the chosen hosting provider, follow its returned DNS instructions, verify HTTPS and the `www`/apex redirect, and check contact, resume, and project links again. Keep the old deployment and its DNS record values until the replacement is verified; they provide the rollback path. Rebuild without the preview-origin override for the final domain.

## Verification

TypeScript and production build passed. Generated HTML, section links, local assets, excluded-project checks, resume hash, social-image dimensions, and text contrast were checked. The Impeccable mechanical detector returned no findings. A separate source review found no required fixes and approved moving to preview.

The motion refinement adds animated pipeline connectors and explanations, subtle action-icon feedback, and a sticky header with active section highlighting. It adds no dependencies and respects reduced-motion preferences. Section-tracking boundary checks and a separate review of the new behavior passed. A later detector pass surfaced advisory warnings about pre-existing typography values missing from the limited documented type ramp; this refinement changes no font sizes.

No browser surface was available in the build environment. Rendered desktop/tablet/mobile layout, actual hydration, pipeline interactions, and keyboard behavior still need browser review. Source-level responsive and accessibility checks do not substitute for those tests.

## Content sources

- User-supplied Dayshawn Terry resume, reviewed October 16, 2026.
- [SportApp explanation](https://sportapp-web-7v3r.onrender.com/#/how-it-works), public deployed copy inspected October 16, 2026.
- [SportApp repository](https://github.com/Dayshawn21/TennisPredictor), public README and manifests; may lag the live application.

Old portfolio projects are intentionally excluded. No predictive-success claims, testimonials, internal company screenshots, or private company source code are included.
