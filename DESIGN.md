---
name: Dayshawn Terry Portfolio
description: A multi-sport stadium scoreboard where the work is posted, not pitched.
colors:
  board: "#15181c"
  panel: "#1d2126"
  slot: "#0e1013"
  rule: "#353b43"
  chalk: "#aeb3ba"
  paint: "#e9e7e0"
  enamel: "#f1efe8"
  enamel-ink: "#15181c"
  enamel-muted: "#4a4f57"
  gold: "#e7b53c"
  gold-deep: "#c99a22"
  lamp: "#e5483a"
typography:
  display:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(4.25rem, 9vw, 10rem)"
    fontWeight: 850
    lineHeight: 0.86
    letterSpacing: "-.005em"
  closing:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.9rem, 5vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.9
  headline:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.6rem, 4.4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: ".01em"
  figure:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.6rem, 4.6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  title:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "30px"
    fontWeight: 850
    lineHeight: 1
    letterSpacing: ".01em"
  action:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "23px"
    fontWeight: 800
    letterSpacing: ".04em"
  label:
    fontFamily: "'Big Shoulders Display Variable', 'Arial Narrow', sans-serif"
    fontSize: "18px"
    fontWeight: 650
    letterSpacing: ".04em"
  body-lead:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "'Archivo Variable', 'Arial Narrow', sans-serif"
    fontSize: "14px"
    fontWeight: 600
rounded:
  none: "0"
  lamp: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "40px"
  xl: "56px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.enamel-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "12px 24px 10px"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.enamel}"
  button-primary-active:
    backgroundColor: "{colors.gold-deep}"
  button-outline:
    textColor: "{colors.gold}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.enamel-ink}"
  text-link:
    textColor: "{colors.paint}"
    typography: "{typography.body}"
    height: "44px"
  text-link-hover:
    textColor: "{colors.gold}"
  enamel-tile:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.enamel-ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.none}"
    padding: ".12em .3em .08em"
  bolted-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.none}"
    padding: "28px 32px"
  score-slot:
    backgroundColor: "{colors.slot}"
    textColor: "{colors.gold}"
    typography: "{typography.figure}"
    rounded: "{rounded.none}"
    padding: "12px 16px 6px"
  pipeline-stage:
    backgroundColor: "{colors.slot}"
    textColor: "{colors.paint}"
    rounded: "{rounded.none}"
    padding: "18px 16px 16px"
    width: "100%"
  pipeline-stage-selected:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.enamel-ink}"
  technology-tag:
    textColor: "{colors.paint}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "5px 11px"
  skill-chip:
    backgroundColor: "{colors.enamel-ink}"
    textColor: "{colors.enamel}"
    typography: "{typography.meta}"
    rounded: "{rounded.none}"
    padding: "5px 10px"
  navigation-link:
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    height: "44px"
  navigation-link-current:
    textColor: "{colors.gold}"
---

# Design System: Dayshawn Terry Portfolio

## Overview

**Creative North Star: "The Multi-Sport Scoreboard"**

The page is a stadium scoreboard: a painted charcoal board on which the work is posted, not pitched. Names and figures sit on white enamel tiles slotted into the board; numerals, rules and the role line are hand-painted gold; one red lamp marks what is live. Condensed uppercase board lettering carries every name, heading, figure and control, while a plain grotesque carries prose and table detail so the reading stays easy.

Long-form content (the now-posting panel, the pipeline, the decisions, the screenshot) hangs on bolted panels with flat rivet heads at the corners. Short hero copy is painted straight onto the board. Two bands change material: About is an enamel plate set in board ink, and Contact is a full gold field, the final score. The world is multi-sport (tennis, NFL, NBA), never tennis-only.

Everything is square-cornered and flat. Depth comes from slotting: dark slots behind tiles, rules framing panels, enamel against charcoal. Motion is mechanical and brief: tiles drop into their slots once, and the pipeline detail plate slides into its slot when a stage is chosen.

**Key Characteristics:**
- Charcoal board ground, enamel tiles, hand-painted gold, a single red live lamp.
- Big Shoulders Display uppercase for anything set on a tile or board; Archivo for prose and tables.
- Real figures in fixed score cells with tabular numerals and a stated source.
- Bolted panels with flat rivet heads instead of cards with shadows.
- Square corners everywhere except lamps, nav dots and rivets.
- One-time tile drop and plate slide, removed under reduced motion.

## Colors

A night-game board: near-black paint, warm off-white enamel, sign-painter gold and one red bulb.

### Primary
- **Sign-Painter Gold** (`gold`): primary action plates, the role line, score figures, project and employer names, table header rules, the current nav item, focus outlines, list bullets and the full Contact band.
- **Burnished Gold** (`gold-deep`): pressed state of the primary plate only.

### Tertiary
- **Live Lamp Red** (`lamp`): the small round lamp beside availability and project status, and the dot on the current nav item. Never text, never a fill larger than a lamp.

### Neutral
- **Board Charcoal** (`board`): the page ground and the header rail.
- **Panel Charcoal** (`panel`): bolted panels (now posting, pipeline surface, decisions).
- **Slot Black** (`slot`): recessed cells behind figures, sport labels, pipeline stages, the screenshot frame and the job period; also the spread ring that seats a tile.
- **Board Rule** (`rule`): 2px panel frames, 1px tag outlines, unreached pipeline connectors, unlit nav dots.
- **Chalk** (`chalk`): secondary prose, captions, table headers and inactive nav on the board.
- **Board Paint** (`paint`): primary text painted on the board.
- **Enamel** (`enamel`): tiles, sport names, the selected stage, the pipeline detail plate and the About band.
- **Enamel Ink** (`enamel-ink`): letters on enamel and gold; the inverted board title and skill chips inside About. Same value as the board.
- **Enamel Grey** (`enamel-muted`): supporting text on enamel surfaces.

Rivet heads use a fixed flat grey (#434a53) inside their data-URI SVG; it is part of the rivet asset, not a palette role.

**The One Lamp Rule.** Red is a status light, not an accent. It appears only as a 10px lamp or an 8px nav dot.

**The Material Switch Rule.** A section changes material (board, enamel, gold) rather than tint. On enamel and gold, text, focus outlines and selection invert to enamel ink.

## Typography

**Display Font:** Big Shoulders Display Variable (with Arial Narrow, sans-serif)
**Body Font:** Archivo Variable (with Arial Narrow, sans-serif)

**Character:** Big Shoulders is stadium lettering: condensed, heavy and always uppercase, built to be read across a field. Archivo is a sturdy, neutral grotesque that keeps sentences and table detail quiet beside it. Both are self-hosted through @fontsource-variable; the social card rasterizes with static Big Shoulders 700/900 and Archivo 400 TTFs.

### Hierarchy
- **Display** (850, `clamp(4.25rem, 9vw, 10rem)`, 0.86): the name, one word per enamel tile. On phones (560px) it becomes `clamp(3.2rem, 17.5vw, 5.4rem)`.
- **Closing** (900, `clamp(2.9rem, 5vw, 4.5rem)`, 0.92): the Contact headline on the gold band.
- **Headline** (800, `clamp(2.6rem, 4.4vw, 3.75rem)`, 1): section titles set on a single enamel tile (Lineform, Experience, About).
- **Figure** (800, `clamp(2.6rem, 4.6vw, 4.25rem)`, 1, tabular): gold numerals in line-score slots. Larger painted names use the same voice: now-posting title (64px), job employer (42px), case-study title (`clamp(2rem, 3vw, 2.5rem)`), pipeline index (56px).
- **Title** (850, 30px, 1): decision names; stage names (28px, 800), box-score product names (34px), skill group names (27px) and pipeline heading (40px) sit in this band.
- **Action** (800, 23px, .04em, uppercase): primary plate and header contact (21px, 700).
- **Label** (650, 18px, .04em, uppercase): table column headers and the board-column nav (21px). The decision "Lesson" field label (18px, 700, .06em) is a content label inside the plate.
- **Body Lead** (Archivo 400, 19px, 1.6): section introductions, about and contact prose; intro copy at 18px, project summary at 21px.
- **Body** (Archivo 400, 17px, 1.6): decision and job prose, box-score bullets; measures capped between 36ch and 75ch.
- **Meta** (Archivo 600, 14px): technology tags, skill chips, captions and stack lines (400 for captions).

**The Board Lettering Rule.** Anything set on a tile, painted as a name, or used as a control is Big Shoulders uppercase. Sentences are always Archivo in mixed case.

**The Fixed Cell Rule.** Numerals in score cells, ordinals and periods use tabular figures so columns hold still.

## Layout

A centered board, `min(1440px, 100% - 96px)` wide, with left-aligned contents. Side space narrows to 64px total at 1100px and 32px at 560px; body minimum is 320px.

The first viewport splits 1.5fr / 1fr: tiles, role line, copy and actions at left; the now-posting panel at right; a full-width line score below. At 1100px the board stacks and the now-posting panel lays its sport slots beside the title; at 800px it returns to a column. Section introductions, project headings and About use asymmetric `1fr / 1.25fr` grids with a 56px gap (40px at 1100px); jobs use `1fr / 1.6fr` with a sticky summary. Decisions run three columns, then two at 1100px, then one at 800px. Skills run three columns, one at 800px.

The pipeline is five equal columns with gold connectors between stages; connectors disappear at 800px and stages become a single list of compact rows at 560px. The line score becomes stacked labelled rows at 560px, its header row visually hidden. The header rail is 84px (72px at 800px; 112px at 560px, where nav wraps to its own row).

Section rhythm is `--space-section`: 120px, 88px at 800px, 72px at 560px. Gaps step through 8, 14, 24, 40 and 56px.

## Elevation & Depth

The board is flat. No surface floats. Depth is slotting: a tile is seated in a dark slot by a hard spread ring with no blur or offset, panels are framed by a 2px rule, and recessed cells are slot black against panel charcoal. The header earns a 2px rule only once the page scrolls.

### Shadow Vocabulary
- **Slot ring** (`box-shadow: 0 0 0 5px var(--color-slot)`; 4px on board titles and phone tiles, 3px on the monogram): the slot edge around an enamel tile. It is a border drawn outside the box, not elevation.
- **Lamp bevel** (`box-shadow: inset 0 -2px 0 rgb(0 0 0 / .25)`): the shaded underside of the lamp bulb only.

**The Rivets Not Shadows Rule.** Panels are fixed to the board with four flat rivet heads (8px circles, 10px in from each corner) drawn as background images. Never add blur, offset or drop shadows.

## Shapes

Square corners on every tile, plate, panel, slot, button, tag and chip (radius 0). The only round forms are hardware: the 10px live lamp, the 8px nav dots and the 8px rivet heads. Box-score bullets are 8px squares. Borders are 2px for frames, table rules and the decision lesson divider; 1px for tag outlines and box-score row ends. Icons are simple stroked inline SVG.

## Components

### Buttons
Painted plates you could bolt to the board.
- **Shape:** square (0), minimum height 54px.
- **Primary:** gold plate with enamel-ink lettering, `12px 24px 10px` padding, a 20px icon at a 16px gap. Hover turns the plate enamel; pressing turns it burnished gold. Color feedback lasts 180ms.
- **Outline (header contact):** 2px gold frame with gold lettering, 44px tall; hover or current section fills gold with enamel-ink text.
- **Focus:** 3px gold outline at 4px offset; on enamel and gold bands the outline is enamel ink.

### Text Links
Archivo 650 at 17px in board paint, 44px tall with a 19px icon. Hover turns gold and underlines (2px, 6px offset). In the case study and job summary they are gold at rest. Action icons nudge 2-3px in their arrow's direction on hover or focus with a fine pointer.

### Chips
- **Technology tags:** noninteractive Archivo 600 at 14px in board paint inside a 1px rule outline.
- **Skill chips:** inside About, enamel-ink fill with enamel text. Neither has hover or selected states.

### Cards / Containers
- **Corner Style:** square (0).
- **Background:** panel charcoal for bolted panels; slot black for the screenshot frame.
- **Shadow Strategy:** none; see Rivets Not Shadows.
- **Border:** 2px board rule; the now-posting panel's frame turns gold on hover.
- **Internal Padding:** 28-36px on desktop, 16-22px on phones.

### Navigation
The board's top rail. A square enamel monogram tile (44px, slot ring) beside the name in board lettering. Section links are uppercase Big Shoulders in chalk, each led by an unlit 8px rule-colored dot; hover brightens to board paint; the current section (`aria-current="location"`) turns gold and lights its dot red. On phones nav wraps to its own row under the name.

### Enamel Tile
The system's signature. White enamel, board-ink lettering, slot ring. The hero name uses one tile per word, stacked with a 14px gap, dropping 18px into place once over 620ms (second tile 110ms later). Section titles sit on one tile; in About the tile inverts to enamel ink with no ring.

### Line Score
A real-figure scoreboard row: the team name on an enamel cell, the period and figures in slot-black cells separated by 8px, gold tabular numerals, chalk uppercase headers over a 2px gold rule, and a source caption beneath. Figures are static; only the name tiles drop in on load. On phones each cell becomes a labelled row.

### Pipeline Stage Selector
Stages are tiles hung on the board: real buttons on slot black with a 2px rule frame, an icon, a gold ordinal, an uppercase name and chalk technology. Hover frames the stage gold; the selected stage (`aria-pressed="true"`) is solid enamel with ink text. Reached connectors turn gold and the incoming one draws over 320ms. The enamel detail plate below shows a large index (n/total) and the explanation, which slides in 24px from half opacity over 240ms. All motion is removed under `prefers-reduced-motion`, as is smooth scrolling and icon displacement.

### Bands
- **About:** a full-width enamel band in board ink, the page's quiet passage; a 2px ink rule opens the skills grid.
- **Contact:** a full-width gold band; the email sits on an enamel-ink plate in gold lettering that turns enamel on hover.

## Do's and Don'ts

### Do:
- **Do** set names, titles, figures and controls in Big Shoulders Display uppercase and keep sentences in Archivo.
- **Do** seat enamel tiles with the slot ring (`0 0 0 4-5px` slot black) and keep every corner square.
- **Do** hang long-form content on bolted panels with flat rivet heads and a 2px rule frame.
- **Do** post only real figures, in tabular cells, with their source stated.
- **Do** keep the board multi-sport: tennis, NFL and NBA side by side.
- **Do** invert text, focus and selection to enamel ink on enamel and gold bands.
- **Do** remove tile drop, plate slide, connector draw and icon nudges under `prefers-reduced-motion`.

### Don't:
- **Don't** add blurred, offset or drop shadows; depth is slots, rules and rivets.
- **Don't** round tiles, plates, panels or buttons; circles belong only to lamps, nav dots and rivets.
- **Don't** use lamp red for text, fills or emphasis beyond a status lamp.
- **Don't** use the selected enamel stage fill for hover; hover only frames in gold.
- **Don't** loop or repeat the tile drop; it plays once on load.
- **Don't** let the board read as tennis-only.
