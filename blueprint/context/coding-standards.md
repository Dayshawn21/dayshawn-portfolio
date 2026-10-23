# Coding Standards

> Matched to the existing codebase during `/adopt` (2026-10-16): React 19,
> TypeScript, Vite, custom CSS, static prerendered output.

## TypeScript

- Strict mode with `noUnusedLocals` and `noUnusedParameters`; `npm run typecheck` must pass
- No `any`; use proper types or `unknown`
- Content shapes are exported interfaces and union types in `src/content.ts` (`Project`, `PipelineStage`, `Experience`, `PipelineIcon`)
- Use `as const` for fixed lists (see `navigationItems` in `App.tsx`)
- Use inference where obvious; annotate component props inline for small components

## React

- Function components and hooks only
- Small page-section components live in `src/App.tsx` alongside `App`; extract to a new file only when a piece is reused or grows large
- Reusable behavior goes in a custom hook in its own file (`src/useActiveSection.ts`); keep pure helpers exported separately so they can be tested (`findActiveSection`)
- Rendering must be identical on server and client: no `window`, `document`, dates, or randomness during render. Browser access belongs in `useEffect`
- Copy and data come from `src/content.ts`, never hard-coded per project in components. A new project is added as data and renders automatically
- Icons are inline SVG paths in `src/Icons.tsx` keyed by a typed `IconName`; add new names to the union

## File Organization

- `src/content.ts` - all site content and its types
- `src/App.tsx` - page structure and section components
- `src/Icons.tsx` - icon set
- `src/use*.ts` - hooks
- `src/main.tsx` - client entry (hydrate or render); `src/entry-server.tsx` - prerender entry
- `scripts/*.mjs` - build-time Node scripts (prerender, offline preview)
- `public/` - static files copied as-is (resume, favicon, social card SVG, robots, sitemap)

## Naming

- Components and their files: PascalCase (`Icons.tsx`, `ProjectFeature`)
- Hooks: `useX` in camelCase files
- Functions and variables: camelCase; no SCREAMING_SNAKE_CASE constants in the codebase
- Element ids: kebab-case, derived from project `id` where per-project (`${project.id}-title`)

## Code Style

- Single quotes, semicolons, 2-space indentation
- Single-parameter arrows without parentheses (`item => ...`)
- Typographic apostrophes (’) in user-facing copy

## Styling

- Plain CSS in `src/styles.css`; no CSS framework, CSS modules, or inline styles
- Use the tokens in `:root` (`--color-*`, `--space-*`, `--radius-*`, `--duration-*`, `--ease-out`) instead of literal values
- Class names are kebab-case by component (`pipeline-stage`, `project-heading`); state modifiers use `is-*` / `has-*` (`is-reached`, `has-transition`); prefer ARIA attributes as state selectors where they exist (`[aria-pressed]`, `[aria-hidden]`)
- Every animation or transition must be disabled or reduced under `@media (prefers-reduced-motion: reduce)`
- Light theme only, per `DESIGN.md`. Keep `DESIGN.md` and `.impeccable/design.json` in sync with token or typography changes

## Accessibility

- Semantic landmarks and headings; each section is labelled (`aria-labelledby`)
- Interactive controls are native `button` / `a` elements with visible focus
- External links open in a new tab with `rel="noopener noreferrer"` and a screen-reader "(opens in a new tab)" note (use `ExternalLink`)
- Keep WCAG AA contrast with the existing palette

## Content Rules

- Employment is professional frontend experience; only independent projects are framed as full-stack
- No predictive-success, accuracy, or profitability claims; no testimonials, internal screenshots, or private source code
- Do not re-add projects from the old portfolio
- `public/Dayshawn_Terry_Resume.pdf` stays byte-for-byte identical to the original. `scripts/offline-preview.mjs` string-matches its path, so update both if `profile.resume` changes

## Testing

No test runner is configured yet, and the project has no tests. Testing is opt-in
(build-plan item 11). Until a `test` command is declared in the Commands section of
`AGENTS.md`, verify logic with `npm run typecheck`, `npm run build`, and running the
page.

**The opt-in switch is one signal: a `test` command in the Commands section of
`AGENTS.md`.** Once declared, tests become a gate for logic-bearing steps.

- **What to test:** pure logic where a wrong answer is possible, such as `findActiveSection` and any future formatters or id builders.
- **What not to test:** UI components and rendered layout; verify those with a browser screenshot and the build.
- **The gate (when a runner is configured):** a step that adds in-scope logic ships a passing test in the same diff, and the test command is green before approval, checkpoint commits, and `/complete`.
- An empty suite should fail, not pass.
- Test files live next to source files (for example `useActiveSection.test.ts`).
- Stack binding: Vitest, which reuses the existing Vite config.

## Browser Verification

For UI and interaction behavior, prefer real browser evidence over reading the code.

- A Playwright MCP server is configured in `.mcp.json` for screenshots and interaction checks. A repeatable `Browser tests` command is separately opt-in through `/tests browser`.
- Verify against the prerendered production build (`npm run build && npm run preview`), not only `npm run dev`, because dev skips prerendering and hydration.
- Check 375, 768, and 1280 px widths, keyboard tab order and focus, pipeline stage selection, and the browser console for hydration warnings.
- Browser tests are not part of the default Verify command unless the user chooses that slower gate.

## Code Quality

- No commented-out code
- No unused imports or variables (enforced by tsconfig)
- Add no dependency for something the platform or existing code already does

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.
