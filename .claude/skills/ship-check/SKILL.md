---
name: ship-check
description: Run the pre-release checks for the portfolio build (typecheck, build, resume integrity, social image size, offline preview).
disable-model-invocation: true
---

# Pre-release check

Run each step in order from the project root, stop at the first failure, and report a pass/fail table at the end. Do not deploy or upload anything.

1. **Typecheck and build**: `npm run build` (runs `tsc --noEmit`, `vite build`, and `scripts/prerender.mjs`). Note whether `PORTFOLIO_SITE_ORIGIN` is set; the final domain build must run without it.
2. **Prerendered content**: confirm `dist/index.html` contains rendered markup inside `<div id="root">` (not an empty root) and includes the sections `work`, `experience`, `about`, and `contact`.
3. **Resume integrity**: the SHA-256 of both `public/Dayshawn_Terry_Resume.pdf` and `dist/Dayshawn_Terry_Resume.pdf` must equal
   `3646b598f0556fb79e5a10a82aa360dce2858b95d1f4615de653c0d7cf3ced7f`.
   Check with `node -e "const c=require('crypto'),f=require('fs');for(const p of process.argv.slice(1))console.log(c.createHash('sha256').update(f.readFileSync(p)).digest('hex'),p)" public/Dayshawn_Terry_Resume.pdf dist/Dayshawn_Terry_Resume.pdf`.
   If the user has deliberately supplied a new original resume, ask them to confirm and then update the hash in this file.
4. **Social image**: `dist/social-card.png` must be 1200 × 630 (read the PNG IHDR width/height at byte offsets 16 and 20).
5. **Canonical URL**: `dist/index.html` keeps `https://www.dayshawnterry.com/` as the canonical URL.
6. **Offline preview**: `npm run preview:offline`, then confirm `.preview/index.html` exists.
7. **Browser check (if the Playwright MCP server is available)**: run `npm run preview`, open the printed address, and capture screenshots at 375, 768, and 1280 px widths. Tab through the page to confirm visible focus, and click each SportApp pipeline stage. Report any console errors, especially hydration mismatches.
