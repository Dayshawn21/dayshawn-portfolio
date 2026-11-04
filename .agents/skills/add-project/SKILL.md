---
name: add-project
description: Add a completed project to the portfolio by appending a typed entry to the projects array in src/content.ts.
---

# Add a portfolio project

Add `$ARGUMENTS` to the `projects` array in `src/content.ts`. `App.tsx` renders every entry automatically, so no component changes should be needed.

## Gather facts first

Collect these from the user or from public sources they point to (live site, public README). Do not invent anything; ask when a fact is missing.

- Name, one-sentence summary, status (e.g. "In active development", "Complete")
- Role: what Dayshawn personally did. Use "Independent full-stack development" only for genuinely solo full-stack work.
- Technologies actually used
- `liveUrl` (required), `sourceUrl` and `explanationUrl` (optional; only public links)
- `caseStudyIntroduction` in first person
- `pipeline` stages (`name`, `technology`, `icon` from `PipelineIcon`, `heading`, `description`), or `[]`
- `decisions` (`title`, `description`, `takeaway`), or `[]`

## Rules (from PRODUCT.md)

- The project must be completed work. Never re-add projects from the old portfolio.
- No predictive-success, accuracy, or profitability claims; no testimonials; no internal company screenshots or private source code.
- Keep professional employment framed as frontend experience. Only independent projects are described as full-stack.
- `id` must be unique and URL-safe, since it is used for element ids.
- Match the tone and length of the existing Lineform entry.

## Finish

1. If a new pipeline icon is required, add it to `PipelineIcon` in `content.ts` and to `src/Icons.tsx`.
2. Run `npm run build` and fix any errors.
3. Review the new entry against the checklist in `.claude/agents/content-guard.md` (in Claude Code, run the `content-guard` agent; elsewhere, follow that file directly).
4. Show the user the final entry and the claims it makes.
