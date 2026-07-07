# Design System — Claude Research Field Guide

Extracted from `reference-mockup.html` (approved). Treat this file, not the
mockup's raw CSS, as the source of truth once the site is being built —
update both together if a token changes.

## Color tokens

```css
:root{
  --ink: #042A2B;              /* dark surface: header, hero, footer, code panels */
  --ink-soft: #0A3A3B;         /* slightly lighter dark surface (code panel bg) */
  --paper: #CDEDF6;            /* page/content background — NOT cream, NOT white */
  --paper-line: #A9D3DE;       /* hairline borders on paper */
  --paper-line-strong: #7FB8C8;/* hover/emphasis borders on paper */
  --text-on-paper: #042A2B;
  --text-on-paper-muted: #3E6B70;
  --text-on-ink: #E6F5F8;
  --text-on-ink-muted: #7FAFB5;
  --rust: #EF7B45;             /* Atomic Tangerine — primary accent, tab color 1 */
  --rust-deep: #D84727;        /* Burnt Tangerine — stamp ink, tab color 3 */
  --pine: #5EB1BF;             /* Pacific Blue — tab color 2 */
  --pine-deep: #2E7885;
  --card-surface: #F2FAFC;     /* card background, lighter than page bg */
}
```

Usage rule: dark ink surfaces are for **navigation, hero sections, footers,
and code/template panels only** — never for a full page of body prose. Body
content lives on `--paper`.

## Typography

Stand-in fonts until licensed files (Berling LT Std, Mundo Sans) are sourced:

```css
--font-display: 'Source Serif 4', serif;   /* stand-in for Berling LT Std */
--font-body: 'Nunito Sans', sans-serif;     /* stand-in for Mundo Sans */
--font-mono: 'Space Mono', monospace;       /* catalog codes + code blocks */
```

Loaded via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Nunito+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

Scale (desktop):
- Hero title: 64px / 500 / `--font-display`
- Card title (h3): 21px / 500 / `--font-display`
- Body: 16px / 400 / `--font-body`, line-height 1.75
- Muted/secondary body: 14px / 400 / `--font-body`
- Eyebrow / breadcrumb / call-number / stamp: 12px / `--font-mono`, uppercase,
  letter-spacing 0.04–0.08em

## Signature component: the catalog card
The recurring motif across the whole site — every reusable "thing" (a skill,
a subagent, a template) is presented as a library catalog card:
- A colored tab at the top-left (6px tall, 46px wide, rounded bottom corners
  only) — color indicates category, cycling `--rust` / `--pine` / `--rust-deep`
- A mono "call number" above the title (e.g. `SK.01 — CLN.204`)
- Title in `--font-display`, 21px
- One-line description, muted, 14px
- Footer row: a rotated (-3deg) rust-ink "stamp" badge (e.g. `Project skill`)
  on the left, a text link on the right
- Card background `--card-surface`, 1px `--paper-line` border, 3px radius,
  hover lifts 2px and darkens the border to `--paper-line-strong`

## Component: code/template panel
Every copy-pasteable file (CLAUDE.md, SKILL.md, subagent `.md`) renders in a
dark (`--ink-soft`) panel with:
- Header row: a small rust dot + mono filename, and a "Copy" button
  (bordered, transparent, `--text-on-ink-muted`, brightens on hover)
- Copy button behavior: `navigator.clipboard.writeText`, label flips to
  "Copied" for ~1.6s, falls back to a "Press ⌘/Ctrl+C" label if the clipboard
  API fails
- Body in `<pre>`, `--font-mono`, 13px, line-height 1.7, with a small syntax
  palette: keys `#F0A87A`, strings `#8ECBD3`, comments `--text-on-ink-muted`

## Component: intro / lead paragraph
Body-content lead paragraphs (e.g. the opening paragraph explaining what a
page's section is for) use the **same max-width as the rest of the page's
content** (~1040px) — do not apply a narrower reading-width constraint to
these specifically. An earlier draft of this system used a ~680px max-width
on lead paragraphs for typographic "measure" reasons; in practice this read
as oddly cramped next to the full-width cards/tables/code panels below it,
and has been reversed. This applies site-wide, not just on one page.

## Component: hero / section header
Dark `--ink` background, mono uppercase breadcrumb (segments separated by a
faded `/`), large serif title, muted subtitle paragraph (max-width ~560px).
An optional faint ambient SVG (thin horizontal lines at 8% opacity in
`--text-on-ink`) can sit behind the hero text — decorative only, never text-bearing.

## Component: roadmap stepper
A persistent progress rail showing all 14 sections grouped into the 6 stages
from the "How to read this guide" table, with the current page highlighted
(rust, underlined) and the rest in a legible ink tone. Built as a slim
horizontal block beneath the hero on every reference/example page.

**Deliberately distinct from the rest of the page**, not matching the
standard content treatment:
- **Full page width** — breaks out of the ~1040px centered content column
  and spans edge to edge, the same way the dark hero band does. It should
  read as a landmark/wayfinding band, not another content section.
- **Background: pure white** (`--stepper-bg: #FFFFFF`) — distinct from both
  the page's `--paper` (light cyan) and the card surface (`--card-surface`),
  so it visually separates from the content flowing above and below it.
- **Text: darker than standard muted text.** Stage labels and section links
  use `--text-on-paper` (`#042A2B`) directly rather than `--text-on-paper-muted`
  — the lighter muted tone was fine for secondary card copy but reads as too
  faint for a navigation element people are meant to scan quickly.
- Current-page link: `--rust`, underlined.
- Everything else about it (mono labels, grid layout of stage groups) stays
  as already built.

## Layout
- Content max-width: ~1040px, centered, 48px side padding (22px on mobile,
  breakpoint 720px)
- Card grids: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`,
  20px gap
- Border radius: 3–4px throughout (not pill-shaped, not sharp) — this is a
  deliberate, restrained choice; don't drift toward heavier rounding

## Explicit non-goals
- No gradients, drop shadows, or glow effects anywhere
- No cream/off-white backgrounds — the content surface is the Light Cyan
  paper tone above
- No more than three tab/category colors in the catalog-card system