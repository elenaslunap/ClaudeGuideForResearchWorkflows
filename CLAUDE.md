# Project: Claude Research Field Guide (website)

## What this is
A reference website teaching researchers (data science / economics / math)
how to use Claude as a research assistant — and, secondarily, personally.
The full content plan is finalized and lives in `content/outline.md`. That
file is the source of truth for what every page says. Don't invent new
sections or reorganize the structure without asking — the outline already
went through several rounds of revision.

The visual direction is also finalized and approved. `design/design-system.md`
is the token reference (colors, type, spacing, component patterns).
`design/reference-mockup.html` is an approved, pixel-accurate mockup of one
page (the Skills reference page) — open it in a browser and match it, don't
reinterpret the aesthetic from scratch.

## Stack
- Next.js (App Router), TypeScript
- MDX for the long-form reference pages (`@next/mdx`) — most pages are prose
  + tables + code blocks, which MDX handles better than hand-written JSX
- Plain CSS with the custom properties defined in `design/design-system.md`
  (no Tailwind, no CSS-in-JS library) — component-level CSS Modules are fine
- No backend/database — fully static, deployable anywhere that serves static
  Next.js output

## Directory map (target — build this out)
- `content/outline.md` — the full content plan. Read-only reference, not
  rendered directly.
- `design/design-system.md` — design tokens and component patterns. Read-only
  reference.
- `design/reference-mockup.html` — approved visual reference for the Skills
  page. Read-only reference.
- `app/` — Next.js routes. One route per section from the outline (13
  sections). Section 1 (Quickstart) is the root route `/` — there is no
  separate landing/marketing page in front of it.
- `content/pages/` — the actual MDX content for each route, once written
  (separate from `content/outline.md`, which is the *plan*, not the copy).
- `components/` — shared UI: `CatalogCard`, `StampBadge`, `CodePanel` (the
  copy-to-clipboard template block), `RoadmapStepper` (the persistent
  progress nav described in the outline), `SectionHero`.
- `styles/tokens.css` — the CSS custom properties from `design-system.md`,
  loaded globally.

## Commands
- Dev server: `npm run dev`
- Production build: `npm run build`
- Lint: `npm run lint`

## How to work through this project
This is a from-scratch build across ~14 pages plus shared components. Default
to **Plan Mode** for anything beyond a single small fix — in particular:
- Scaffolding the initial Next.js app and directory structure
- Building each shared component (get one reviewed before replicating the
  pattern across all 14 pages)
- Writing the actual MDX content for a section (it should follow
  `content/outline.md` closely, not shorten or improvise it)

Build order: scaffold the app shell (nav/stepper, layout, design tokens)
first, then the shared components against the Skills page (since it's the
one with an approved mockup), then the remaining 13 pages.

## Content and design rules
- Every page follows the roadmap structure in `content/outline.md`'s
  "How to read this guide" table — the `RoadmapStepper` component should
  reflect the current stage/section on every page.
- Every reference section that shows a file (CLAUDE.md variants, SKILL.md,
  subagent `.md`) needs a `CodePanel` with a working copy button — this is a
  hard requirement, not a nice-to-have.
- Voice: direct, concrete, no marketing language. Match the register already
  used in `content/outline.md`'s example prompts and callouts.
- Don't add animations, gradients, or decorative effects beyond what's in
  `design/reference-mockup.html`.

## Known open item
The real licensed fonts (Berling LT Std, Mundo Sans) aren't sourced yet —
`design-system.md` currently specifies free stand-ins (Source Serif 4,
Nunito Sans). If font files show up in `design/fonts/`, wire them up via
`@font-face` and update `design-system.md`; don't change anything else about
the type scale.

## Out of bounds
- Don't touch `content/outline.md` or `design/reference-mockup.html` — they're
  finalized references, not editable source.
- Don't switch the design direction (the archival/catalog-card aesthetic is
  decided) or the stack (Next.js/MDX is decided).