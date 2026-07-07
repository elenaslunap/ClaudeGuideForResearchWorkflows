# Claude as a Research Assistant — Advanced Guide (Content Outline)
*Data science / Economics / Math — for research workflows and personal reference*

---

## How to read this guide (the roadmap)

The site should read as a path, not a pile of reference pages — each section
assumes the reader has already done the one before it, and ends by pointing
to the next. Six stages, fourteen sections:

| Stage | Sections | What it gets you |
|---|---|---|
| **1. Start here** | 1 | A working setup in under ten minutes |
| **2. Understand the model** | 2 | Why the setup in Stage 1 works the way it does |
| **3. Build your memory system** | 3–6 | Global, project, local, and nested CLAUDE.md, done properly |
| **4. Extend what Claude can do** | 7–9 | Skills, subagents, MCP connectors |
| **5. Work efficiently** | 10–12 | Plan Mode, terminal habits, token/context discipline, and a condensed do's-and-don'ts checklist |
| **6. See it all together** | 13–14 | Two full worked examples — research and personal — that draw on every stage above |

On the site, this table becomes a persistent progress rail (sidebar or a
slim horizontal stepper) so the reader always knows where they are and what
stage is next — not just a flat table of contents.

---

## 1. Quickstart: The Five Things to Add to a New Project

**This section's only job is to get someone from zero to "Claude actually
understands my project" in one sitting** — everything after this section
explains the *why* and the *advanced* version of each piece. If a reader does
nothing else in this guide, this section alone should meaningfully improve
their results.

### The five things, in order

**1. Add a project `CLAUDE.md` at the repo root.** Minimum viable version —
just three things: what this project is, where things live, how to run it.
```markdown
# Project: [name]

## What this is
One paragraph: the research question or the product, and the current stage.

## Where things live
- `data/` — [raw vs. clean, and which is safe to touch]
- `code/` — [what runs in what order]
- `output/` — [generated, don't hand-edit]

## How to run it
- Full pipeline: `[command]`
- Tests / checks: `[command]`
```
That's enough for Claude to stop guessing at your project's shape.

**2. Add a `.gitignore` entry before you do anything else.**
```
CLAUDE.local.md
.claude/memory/
```
Do this *first*, not after you've already committed a personal note or a
stray API key.

**3. Run `/init` in a new codebase.** Claude Code can scan the repo and draft
a starting `CLAUDE.md` for you — treat the draft as a first pass to edit
down, not a finished file (auto-generated files tend to include things Claude
can already infer from the code, which just adds reload cost for no benefit).

**4. Check what Claude actually loaded.** Run `/memory` at the start of a
session. If something you expected isn't listed, it's not being applied —
this is the single fastest way to debug "Claude isn't following my
instructions."

**5. Say the one thing that isn't in the code.** Whatever a new collaborator
would need explained out loud in their first five minutes — a data quirk, a
non-obvious convention, a landmine — put that in CLAUDE.md. Don't restate
what Claude can already read from the files themselves.

### What "good enough for day one" looks like
A project CLAUDE.md under 30 lines that covers *what/where/how* is worth
more than a 200-line file written before you've felt any actual friction.
Everything in Stages 3–4 of this guide (global preferences, skills,
subagents, MCP) is worth adding once a specific repeated annoyance justifies
it — not up front.

### Guide callout
This page should end with a literal checklist component (checkboxes: project
CLAUDE.md added / .gitignore updated / ran `/memory` to confirm) so it
functions as an actual quickstart a reader can complete, not just read.

---

## 2. Mental Model: The Memory Hierarchy

### Concept
Claude Code reads instructions from four layers, stacked broad → narrow. All layers are **additive** — nothing is silently overwritten, so conflicting instructions should be avoided rather than relied upon to "win."

| Layer | Location | Shared? | Purpose |
|---|---|---|---|
| Global | `~/.claude/CLAUDE.md` | No (personal, machine-wide) | Standing preferences across every project |
| Project | `./CLAUDE.md` (repo root) | Yes (commit to git) | Facts specific to this paper/dataset |
| Local | `./CLAUDE.local.md` | No (gitignored) | Your personal scratch notes on this project |
| Nested | `./paper/CLAUDE.md`, `./data/CLAUDE.md` | Yes if committed | Rules scoped to a subtree only |

There's also **auto-memory** (session-persisted notes Claude accumulates per project at `~/.claude/projects/<hash>/`), which is newer and worth teaching separately so people don't confuse it with CLAUDE.md.

### Example: how a session actually loads context
```
$ cd ~/research/inflation-expectations-paper
$ claude
# Claude Code walks up the tree and loads, in order:
#   ~/.claude/CLAUDE.md          (your global stats/citation conventions)
#   ~/research/CLAUDE.md          (if you have one for the whole research folder)
#   ~/research/inflation-expectations-paper/CLAUDE.md   (project file)
#   ~/research/inflation-expectations-paper/CLAUDE.local.md (your private notes)
# Run /memory at any time to see exactly what's active.
```

### What is the context window?
The context window is everything Claude can "see" at once in a given
turn — the system prompt, every CLAUDE.md file loaded per the hierarchy
above, any skills that got triggered, MCP tool definitions, and the full
conversation so far. It's finite (measured in tokens, roughly ¾ of a word
each), and unlike memory files, **nothing here persists once the window
fills up and old content gets pushed out or summarized** — this is why a
bloated CLAUDE.md has a real, recurring cost (it's reloaded into this same
window on every message), and why very long sessions can start to "forget"
something that was said an hour earlier. Section 11 (Token Usage & Context
Management) covers how to monitor and manage this directly; the thing worth
internalizing here is just that the memory hierarchy and the context window
are two different concepts — CLAUDE.md controls *what gets loaded*, the
context window is *the space it all has to fit in*.

### Guide section should include
- A diagram (this is a great candidate for an actual rendered diagram on the site)
- The rule of thumb: **"If it would change what Claude does, it belongs here. If Claude can infer it from the code/data, leave it out."**
- A warning against dumping everything into one file — the medium-length CLAUDE.md files (rule of thumb: under ~200 lines) perform far better than sprawling ones.

---

## 3. Global CLAUDE.md — Standing Research Preferences

### What belongs here
Things that should be true no matter which paper, dataset, or coauthor you're working with.

### Example: `~/.claude/CLAUDE.md` for an economist
```markdown
# Global Research Preferences

## Statistics
- Default to heteroskedasticity-robust (HC1) standard errors unless the project
  file says otherwise. Cluster at the unit specified in the project CLAUDE.md.
- Always report both point estimate and 95% CI, not just significance stars.
- Flag when N drops meaningfully after a merge or filter — never silently drop rows.
- Never invent a citation, dataset value, or statistic. If you can't verify it,
  say so explicitly and mark it as [UNVERIFIED].

## Tooling
- Default language: R (tidyverse + fixest). Use Python only if the project says so.
- Plots: ggplot2, use the `theme_paper()` helper in ~/.R/theme_paper.R if it exists.
- Tables: modelsummary -> LaTeX, not stargazer.

## Style
- Write like an econ working paper: precise, no hedging filler, active voice.
- When summarizing a paper, always separate "what they claim" from "what they show."

## Workflow habits
- Before running a regression script, tell me what changed vs. the last run.
- After any data-cleaning step, print a before/after row count and a diff of
  dropped observations.
```

### Guide callout
Include a short "anti-pattern" example — a global file that's too broad (e.g., embedding an entire paper's methodology) — to show why that belongs in the project file instead.

---

## 4. Project CLAUDE.md — Per-Paper / Per-Dataset Contract

### What belongs here
- One-paragraph research question and design
- Data provenance and directory map
- Exact reproducible commands
- Known data quirks / landmines
- What's off-limits (e.g., never touch `raw/`)

### Example: `CLAUDE.md` for an empirical economics project
```markdown
# Project: Effect of Broadband Access on Rural Firm Entry

## Research design
Diff-in-diff using county-level broadband rollout (2010–2022) as treatment timing,
firm entry from Census BFS as outcome. Identification relies on staggered rollout;
use Callaway-Sant'Anna estimator, not naive TWFE (see /paper/CLAUDE.md for why).

## Directory map
- `data/raw/` — untouched source files. NEVER edit or overwrite.
- `data/clean/` — output of `code/01_clean.R`. Safe to regenerate.
- `code/` — numbered pipeline scripts, run in order via `make all`.
- `output/tables/`, `output/figures/` — generated, not hand-edited.
- `paper/` — LaTeX source, compiled with `latexmk`.

## Commands
- Full pipeline: `make all`
- Just re-run models: `Rscript code/03_estimate.R`
- Rebuild paper: `cd paper && latexmk -pdf main.tex`

## Known data issues
- FCC broadband data pre-2015 systematically overstates coverage (see Method note
  in data/raw/README_fcc.md) — code/01_clean.R applies the standard correction.
- County FIPS codes changed for 3 Alaska boroughs in 2013 — handled in
  `code/00_fips_crosswalk.R`, don't re-merge on raw FIPS without it.

## Out of bounds
- Do not modify anything in `data/raw/`.
- Do not change the estimator without flagging it — this is a pre-registered
  design choice.
```

### Guide callout
Show a **before/after**: a vague project file ("this project studies broadband") vs. the concrete one above, and explain concretely how each line changes a specific failure mode (wrong estimator, silently re-corrupted FIPS codes, edited raw data).

---

## 5. CLAUDE.local.md — Personal, Ungitted Notes

### What belongs here
Scratch hypotheses, debugging state, "things I'm still not sure about," personal shortcuts — never for a coauthor or professor to see.

### Example
```markdown
# Personal notes (not shared)

- My machine has a local Postgres mirror of the raw data at
  localhost:5433/econ_raw — use that instead of re-downloading the FCC files
  every session.
- I run estimation scripts with `Rscript --vanilla` locally because my global
  .Rprofile auto-loads packages that conflict with renv here.
- Advisor prefers effect sizes in percentage points, not log points — convert
  before showing her any draft table, even though the paper itself uses log
  points throughout.
- Still not fully convinced the 2016 outlier county is real vs. a coding error
  upstream — don't cite that year's estimate until I've dug in further.
```

### Guide callout
Emphasize `.gitignore` hygiene: add `CLAUDE.local.md` and any `.claude/memory/` folder to `.gitignore` immediately, since these can end up holding half-formed ideas, machine-specific paths, or even accidental sensitive info (e.g., pasted API keys during debugging) — none of which belong in a shared project file.

---

## 6. Nested CLAUDE.md — Subtree-Scoped Rules

### What belongs here
Rules only relevant while working inside a specific folder — kept out of the root file so it doesn't bloat.

### Example: `paper/CLAUDE.md`
```markdown
# Paper folder rules

- Journal target: Journal of Urban Economics. Use their citation style (author-year,
  not numbered).
- Word limit: 9,000 words excluding references/appendix — flag if a draft section
  pushes total over that.
- All regression tables must go through modelsummary → LaTeX, matching the format
  already used in Table 1.
- Never inline a number in prose that isn't sourced from an output/ table — always
  reference the exact table/cell.
```

### Example: `data/CLAUDE.md`
```markdown
# Data folder rules

- Any script here must be idempotent — rerunning it twice should give the same file.
- Raw files are read-only by convention. If you need a fix, write a correction step
  in code/, don't hand-edit data/raw/.
```

---

## 7. Skills — Reusable Research Procedures

### Concept
A Skill is a folder with a `SKILL.md` (description + instructions) that Claude loads automatically when relevant, optionally with supporting scripts/templates. Good fit for procedures you repeat across many projects.

### Skill 1: `data-cleaning-conventions`
```markdown
---
name: data-cleaning-conventions
description: Use whenever cleaning, merging, or filtering a raw dataset for
  this research group. Covers missing-data handling, outlier flags, and
  merge diagnostics.
---

# Missing data
Check for -99, "N/A", and blank cells before any merge or filter.
Never silently drop rows — always report a before/after count.

# Outliers
Winsorize at the 1st/99th percentile by default. Report both the
raw and winsorized results side by side, not winsorized alone.

# After every merge
- Row count before and after
- Uniqueness check on the join key
- A short report of unmatched keys, not just a dropped-silently count
```

### Skill 2: `econometrics-diagnostics`
```markdown
---
name: econometrics-diagnostics
description: Use automatically after any regression or estimation is run.
  Covers which diagnostics to compute and how to report them alongside
  results, not buried in an appendix.
---

# Always compute
- Heteroskedasticity test (Breusch-Pagan or White) — report even if using
  robust SEs, so the reader knows robustness was checked, not assumed.
- Variance inflation factors (VIF) for any model with more than one regressor.
- If IV: first-stage F-statistic, flag anything under 10 as weak.
- If diff-in-diff or event study: a pre-trend test / pre-period coefficient
  plot, not just the post-period estimate.

# How to report
Add a short "Diagnostics" block directly under the results table itself —
three or four lines, not a separate appendix section the reader has to
hunt for. If a diagnostic fails, say so plainly rather than omitting it.
```

### Skill 3: `replication-audit`
```markdown
---
name: replication-audit
description: Use when asked to verify, replicate, or audit a specific
  table or figure against raw data. Re-derives the number independently
  rather than checking the existing code for bugs.
---

# Procedure
1. Start from data/raw/ only — do not reuse any intermediate file from
   the existing pipeline, even if it looks correct.
2. Re-run cleaning, merging, and estimation from scratch in a scratch
   directory, following the steps documented in the project CLAUDE.md.
3. Compare the re-derived number to the one currently in the draft or
   output/ table, allowing for reasonable rounding only.
4. If it matches: say so plainly, don't hedge.
5. If it doesn't: report the exact discrepancy (both values, and at which
   pipeline step they first diverge) rather than guessing at the cause.
```

### Skill 4: `citation-formatting`
```markdown
---
name: citation-formatting
description: Use whenever adding, checking, or formatting a citation in
  this project's writing. Applies to in-text citations and reference lists.
---

# House style
Author-year in-text (e.g. "Card and Krueger, 1994"), not numbered.
Reference list alphabetical by first author's surname.

# The one hard rule
Never fabricate a citation, author list, year, or venue. If a paper's
existence or exact details can't be verified, say so explicitly and mark
it [UNVERIFIED] rather than guessing plausible-looking details.
```

### Skill 5: `lit-review-synthesis`
```markdown
---
name: lit-review-synthesis
description: Use when summarizing one or more academic papers for a
  literature review. Produces a consistent, comparable format across
  papers instead of ad hoc summaries.
---

# Per-paper summary format
For each paper, produce exactly these fields:
- Research question (one sentence)
- Identification strategy (the actual method, not just "regression")
- Main result, with effect size in units comparable across papers
  (e.g. percentage points, not just "significant")
- Limitations the authors themselves acknowledge
- One line on how it relates to this project's contribution

# When comparing multiple papers
Output a comparison table using the fields above as columns, not five
separate prose summaries — this is what makes 20 papers actually
comparable at a glance.
```

### Guide callout: anatomy of a skill
Show the actual file tree for a skill:
```
.claude/skills/data-cleaning-conventions/
  SKILL.md
  templates/merge_report.R
```
And the distinction: **personal skills** (`~/.claude/skills/`) vs **project skills**
(`.claude/skills/`, committed and shared with coauthors) vs **plugin skills**
(distributed as a package).

### Don't just build your own — install what already exists first
Before writing a custom skill, check whether a well-maintained public one
already covers it — skills are just folders, so they install with one command
and you can always fork and edit afterward. A few worth pointing to directly:

| Skill / library | Source | Install | What it covers |
|---|---|---|---|
| **Scientific Agent Skills** | [github.com/K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | `npx skills add K-Dense-AI/scientific-agent-skills` | 148 skills across bioinformatics, cheminformatics, clinical research, ML, geospatial science, and more, plus unified access to 100+ scientific databases (PubChem, UniProt, ClinicalTrials.gov, FRED, and others). Broader than most economics/data-science work needs — install only the topical subset you'll actually use (e.g. `statistical-analysis`, `experimental-design`, `eda`), not the whole collection. |
| **analytics-data-analysis** | [skills.sh/mindrally/skills](https://www.skills.sh/mindrally/skills/analytics-data-analysis) | `npx skills add https://github.com/mindrally/skills --skill analytics-data-analysis` | A pandas/matplotlib/seaborn/numpy EDA workflow — load and inspect, clean and transform, explore relationships, visualize, validate, document. Close in spirit to the `data-cleaning-conventions` example above; worth comparing against it rather than running both. |
| **csv-data-wrangler** | [skills.sh/404kidwiz/claude-supercode-skills](https://www.skills.sh/404kidwiz/claude-supercode-skills/csv-data-wrangler) | `npx skills add https://github.com/404kidwiz/claude-supercode-skills --skill csv-data-wrangler` | Large-file CSV handling — encoding issues, malformed rows, merging/splitting, and querying CSVs directly with SQL via DuckDB. Handy when the raw data itself (not the analysis) is the messy part. |
| **interactive-dashboard-builder** | [skills.sh/anthropics/knowledge-work-plugins](https://www.skills.sh/anthropics/knowledge-work-plugins/interactive-dashboard-builder) | `npx skills add https://github.com/anthropics/knowledge-work-plugins --skill interactive-dashboard-builder` | An official Anthropic skill — self-contained HTML dashboards with Chart.js, KPI cards, filters, and sortable tables, no server or build step. A good fit for the "Visualization & tables" stage of the worked example. |
| **ai-ml-data-science** | [skills.sh/vasilyu1983/ai-agents-public](https://www.skills.sh/vasilyu1983/ai-agents-public/ai-ml-data-science) | `npx skills add https://github.com/vasilyu1983/ai-agents-public --skill ai-ml-data-science` | Heavier ML-engineering ground than the economics examples above — feature pipelines with leakage prevention, model selection starting from strong tabular baselines, drift monitoring, and production/MLOps patterns. Most useful once a project moves from "estimate a model" to "maintain a model." |
| **jupyter-notebook** | [skills.sh/openai/skills](https://www.skills.sh/openai/skills/jupyter-notebook) | `npx skills add https://github.com/openai/skills --skill jupyter-notebook` | Scaffolds clean, reproducible `.ipynb` notebooks for experiments or teaching-oriented walkthroughs, using bundled templates rather than hand-written notebook JSON (which is easy to corrupt by hand). |

Installation for all of these uses the same `npx skills add` pattern (the
open Agent Skills standard) or `gh skill install` if the GitHub CLI is set
up — both drop the skill into the right directory for you automatically.

### Guide callout: treat installed skills like any other dependency
A skill can instruct Claude to run code, install packages, and make network
requests — a poorly written or malicious one is a real risk, not just a
config nuisance. Before installing a third-party skill: read its `SKILL.md`,
check whether it's from a maintainer you recognize (the Anthropic one above
is a good example of a source with an obvious trust anchor), and prefer
installing a narrow, named skill over an entire large collection at once.
This is the same caution already covered for MCP connectors and subagents —
skills are one more thing running with your permissions, not a passive
documentation file.

---

## 8. Subagents — Specialized Roles with Isolated Context

### Concept
A subagent is a separate context window with its own system prompt and tool access — useful for keeping a large literature search or an adversarial review from polluting your main working context.

### Example: `literature-reviewer` subagent (`.claude/agents/literature-reviewer.md`)
```markdown
---
name: literature-reviewer
description: Searches and summarizes academic literature relevant to a research
  question. Use when the user asks to find, summarize, or compare papers.
tools: web_search, web_fetch
model: sonnet
---
You are a literature review specialist for economics/data science research.
For each paper: extract research question, identification strategy, main result
(with effect size in comparable units), and limitations. Never fabricate a
citation. Flag when a claim in a paper conflicts with another paper you found.
Output a comparison table, not prose paragraphs.
```

### Example: `model-critic` subagent
```markdown
---
name: model-critic
description: Reviews an estimation strategy for identification problems, before
  or after results are produced. Use proactively after any regression is run.
tools: read, bash
---
You are a skeptical peer reviewer. For any estimation: (1) state the identifying
assumption in plain language, (2) list the most likely threats to it, (3) check
whether the code's diagnostics actually address those threats, (4) suggest the
single most valuable robustness check if one is missing. Be blunt about weak
identification — do not soften a real problem to be polite.
```

### Example: `replication-auditor` subagent
Given read-only access to `data/raw/` and the pipeline scripts, independently
re-runs the pipeline and diffs its output numbers against the ones currently
cited in the paper draft, flagging any mismatch.

### Chaining example (advanced usage)
```
literature-reviewer  →  data-scientist (EDA)  →  model-critic  →  writer
```
Each subagent hands off a structured summary rather than raw context, keeping
each step's window focused.

### Guide callout
Explain **automatic delegation** (Claude routes to a subagent based on its
description) vs **explicit invocation** ("use the model-critic subagent to review
this"), and when to prefer each (automatic for routine steps, explicit when you
want a second opinion on demand).

---

## 9. MCP Servers Relevant to Research Work

### How to install one, and where it lives
```
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```
That's the general pattern: `claude mcp add --transport <http|sse|stdio> <name> <url-or-command>`.
Where it gets stored depends on the `--scope` flag:
- **`--scope local`** (default) — this project only, saved in your personal
  `~/.claude.json` under that project's path. Not shared with coauthors.
- **`--scope project`** — shared with anyone who clones the repo, via a
  `.mcp.json` file at the project root (safe to commit — it holds server
  addresses, not your personal credentials). Coauthors get a one-time
  approval prompt the first time they open the project.
- **`--scope user`** — available across every project on your machine,
  stored in `~/.claude.json`. Good for personal-utility connectors you use
  everywhere (e.g. Google Drive), not project-specific ones.
Check what's connected any time with `claude mcp list`, or `/mcp` from
inside a session to see live status and toggle servers on/off.

### Core connectors worth setting up
- **GitHub** — version control of code/data pipeline, PR review of analysis scripts
- **Google Drive** — shared drafts, professor-facing documents, comments
- **A database connector** (e.g. Postgres) — if source data lives in a DB rather than flat files, so Claude can query directly instead of you exporting CSVs by hand
- **Jupyter/notebook or code-execution connector** — for driving actual analysis sessions interactively rather than only editing scripts
- **Reference manager** (Zotero-style, where available) — pulling citation metadata directly instead of retyping it

### Example use in a project
```
"Pull the three most-cited papers from our Zotero library tagged 'broadband'
and compare their identification strategies using the literature-reviewer subagent."
```
```
"Query the course Postgres database for county-year firm entry counts for
2010–2022, then hand off to the data-scientist subagent for EDA."
```

### Guide callout
Note the boundary: MCP tools that read/query data can run without confirmation;
anything that would modify a shared doc, push to a shared repo, or send data
externally should always be confirmed before Claude acts, especially in a
shared research setting with a professor's data.

---

## 10. Plan Mode & Other Terminal Features

### Plan Mode
A read-only permission state: Claude can explore files, run searches, and read
data, but **cannot** edit files, run state-changing commands, or touch MCP
tools that modify anything — until you approve a written plan. This is the
single highest-value habit for research work, because a "quick regression"
prompt can otherwise quietly rewrite a cleaning script, overwrite a results
table, or change an estimator without you noticing until it's already done.

**How to activate:**
- `Shift+Tab` twice from the default mode (cycles Default → Auto-Accept → Plan)
- `/plan` at the start of a prompt — plans just that one turn
- Start the whole session in it: `claude --permission-mode plan`
- Headless/scripted: `claude --print --permission-mode plan "your task"`

**When it matters most for research (not just code):**
- Any task touching the data pipeline (cleaning, merging, recoding variables)
- Changing an estimator or specification
- Regenerating tables/figures that feed directly into the paper draft
- Anything where you'd be annoyed to discover the change *after* it happened

**When to skip it:** read-only questions ("what does this column mean"), single-line
tweaks, exploratory one-off questions with no side effects.

**Example session**
```
$ claude --permission-mode plan
> Re-derive Table 3 using the corrected FIPS crosswalk and tell me if the
  estimate changes meaningfully.

Claude (plan mode): I'll (1) read data/raw/fips_crosswalk_v2.csv, (2) re-run
code/00_fips_crosswalk.R with the corrected file, (3) re-run code/03_estimate.R,
(4) diff the new coefficient against the one currently in paper/main.tex.
I will not overwrite output/tables/table3.tex — I'll write to
output/tables/table3_v2_check.tex instead so you can compare both.
Proceed? [y/n]
```

### Other terminal features worth teaching
- **`/clear`** — wipes conversation history but keeps CLAUDE.md/project files available; use between unrelated tasks (e.g., switching from "clean the data" to "draft the intro").
- **`/compact [instructions]`** — summarizes the conversation instead of wiping it; use mid-task. `/compact focus on the estimation decisions and diagnostics, not the plotting back-and-forth` keeps what matters for research continuity.
- **`/rewind`** (or Esc twice) — step back to an earlier checkpoint in the conversation, with the option to "Summarize from here" or "Summarize up to here" for partial compaction.
- **`--resume` / `--continue`** — reopen a past session; useful for picking up a long data-cleaning session the next day, but be aware it also reloads that session's accumulated context (see token section below).
- **`/model`** — switch models mid-session; Sonnet for routine cleaning/EDA scripting, Opus for a genuinely hard identification/estimation-strategy question.
- **`/agents`** — manage subagents interactively rather than hand-editing files.
- **`/mcp`** — see and disconnect connected MCP servers (useful for both permissions and token budget — see below).
- **`/usage`** and **`/cost`** — check plan usage / running spend for the session.

### Guide callout
Frame this section as "the habits, not just the features": Plan Mode for
anything touching data or results, `/clear` between tasks, and checking
`/model` before a long estimation-strategy discussion.

---

## 11. Token Usage & Context Management

### Why this matters specifically for research work
Research sessions are prone to exactly the failure mode that burns context fastest:
reading large data files, long back-and-forth on a modeling decision, and
carrying a whole literature review in one conversation. Context is Claude's
**working memory** for the session — as it fills, quality degrades before you
hit any hard limit, not just at it.

### What fills the context window before you even type
- The system prompt and tool definitions
- CLAUDE.md (global + project + local + nested) — reloaded on every single message
- Any connected MCP servers' tool definitions (an idle Zotero/database connector still costs tokens)
- Skills only load when invoked — this is *why* skills are cheaper than stuffing everything into CLAUDE.md
- Auto-memory notes

### The core commands
| Command | What it does | When to use |
|---|---|---|
| `/context` | Shows a full breakdown of what's consuming the window | Every 30–60 min in a long session |
| `/compact [instructions]` | Summarizes history, keeps working | Mid-task, ~50–60% full |
| `/clear` | Wipes history, keeps CLAUDE.md/files | Switching tasks entirely |
| `/rewind` → "Summarize up to here" | Partial compaction of only the older part | Long sessions with one part that's now irrelevant |

### Example: a realistic research session budget
```
$ claude
> /context
System prompt + tools:      ~8%
CLAUDE.md (global+project):  ~4%
Skills loaded (2 invoked):   ~3%
MCP tool defs (GitHub, DB):  ~5%
Conversation so far:         ~12%
Free:                        ~68%
```
After an hour of reading raw CSVs and iterating on a cleaning script:
```
> /context
Conversation so far:         ~58%
Free:                        ~30%   <- time to /compact
> /compact focus on the merge logic and the final row-count diagnostics,
  drop the intermediate debugging back-and-forth
```

### Research-specific token discipline
- **Don't paste large datasets or raw CSVs into the chat** — reference the file path and let Claude read only what it needs (or better, have it summarize/query rather than dump full contents).
- **Use subagents for literature search and EDA** — they run in their own context window and report back a summary, keeping your main session clean. This is the single best lever for a literature-heavy project.
- **Disconnect MCP servers you're not using this session** (`/mcp`) — an idle reference-manager or database connector still costs tokens on every message.
- **Keep CLAUDE.md lean** (rule of thumb: under ~200–300 lines) — it's reloaded on every message, so a bloated file is a recurring tax, not a one-time cost.
- **Split sessions by stage**, not by calendar day — one session for cleaning, a fresh one for modeling, a fresh one for writing, rather than one marathon session covering all three.
- **API-key users**: `/cost` shows running spend; be aware prompt caching lowers the *dollar* cost of repeated context like CLAUDE.md, but it still occupies context-window *space*.

### Guide callout
A short decision box: *"Claude seems to be forgetting something we agreed on 20 minutes ago"* → check `/context`, then `/compact` or `/clear` depending on whether you're still mid-task or moving on.

---

## 12. Do's and Don'ts Checklist

**The condensed version of Stages 2–5**, before diving into the two full
worked examples. This page should read fast — a scannable checklist, not
more prose — and works as the natural "before you go further, here's the
short version" checkpoint at the end of the reference stages.

### Memory (CLAUDE.md)
- **Do** keep it under ~200–300 lines — only things that change Claude's
  behavior, not things it can infer from the code.
- **Do** run `/memory` after writing one, to confirm what's actually loaded.
- **Don't** treat CLAUDE.md as documentation for humans — it's reloaded
  every message, so bloat has a real recurring cost.
- **Don't** wait until after your first commit to `.gitignore`
  `CLAUDE.local.md` — do it first.

### Skills
- **Do** check whether a well-maintained public skill already covers what
  you need before writing your own (Section 7).
- **Don't** install a third-party skill without reading its `SKILL.md` first
  — it can run code and hit the network, same risk class as any dependency.
- **Don't** build several skills with overlapping trigger descriptions —
  they'll compete instead of one clearly winning.

### Subagents
- **Do** give a subagent a genuinely distinct role (a skeptical
  `model-critic`, not a second copy of the main assistant).
- **Don't** chain more subagents than a task actually needs — each hop adds
  latency and a summarization step that can lose detail.

### MCP connectors
- **Do** choose `--scope` deliberately (local / project / user) rather than
  always defaulting to one.
- **Don't** leave unused connectors attached "just in case" — they cost
  context budget on every message whether you use them or not.
- **Don't** assume an MCP result is verified just because it came from a
  real system — read it the way you'd read any pulled data.

### Plan Mode & terminal habits
- **Do** default to Plan Mode for anything touching the data pipeline,
  shared docs, or results — not just big changes.
- **Don't** skip it because a change "feels small" — that's exactly the
  category of change that quietly corrupts a cleaning script.
- **Do** check `/context` periodically in long sessions; don't wait until
  Claude visibly starts forgetting something.

### Research practice specifically
- **Do** ask for before/after row counts on every merge or filter, and
  diagnostics alongside every estimate, not just the point estimate.
- **Don't** let an uncertain citation or number pass through unflagged —
  this is the one place "helpful-sounding" and "correct" can silently diverge.

### Personal use
- **Do** require draft-then-confirm for anything that sends, deletes, or
  modifies something external (email, calendar, files) — never one-shot it.
- **Don't** rely on Claude remembering a one-off personal preference — write
  it into Settings/preferences once instead of repeating it per chat.

---

## 13. Worked Example: Research Stages End-to-End

**Not the site's navigation** — this is a single, continuous walkthrough
showing sections 2–11 (the memory system, skills, subagents, MCP, Plan Mode,
and token discipline) applied together on one real project, start to finish.
Unlike the reference pages, this one should read like a tutorial someone can
actually follow along with, not a table of skills and prompts — narrate it,
show what Claude actually does at each step, and use a dataset the reader can
download themselves.

### The project used throughout this walkthrough
**Question:** did recent state minimum wage increases reduce employment in
the restaurant/food-service sector at the county level?

This is a deliberately real, well-trodden design (in the tradition of
Cengiz, Dube, Lindner & Zipperer 2019 and related work) built entirely from
two public, freely downloadable sources, so a reader can rebuild the whole
example themselves:
- **Outcome data:** the BLS **Quarterly Census of Employment and Wages**
  (QCEW) — county-by-industry employment and establishment counts, published
  quarterly back to the 1990s, free as CSV from bls.gov/cew. NAICS 722
  (food services) at the county level is the relevant slice.
- **Treatment timing:** the **Vaghul–Zipperer historical state and sub-state
  minimum wage dataset** (Washington Center for Equitable Growth,
  `github.com/benzipperer/historicalminwage`) — a daily/monthly panel of
  every state and sub-state minimum wage change, free to clone.

Both are exactly the kind of publicly available data the guide has been
describing all along — nothing here needs an institutional subscription.

The walkthrough below follows one continuous project folder, structured the
way Section 4 (Project CLAUDE.md) recommends: `data/raw/`, `data/clean/`,
`code/`, `output/`.

---

### Stage 1 — Question formation & literature review
*(Skill: `lit-review-synthesis`. Subagent: `literature-reviewer`.)*

Before touching data, the goal is to know what's already been shown and
which estimator the literature has converged on for this design.

```
> Use the literature-reviewer subagent to find the main recent papers on
  minimum wage effects on restaurant employment using county-level QCEW
  data. I want to know which estimator each one uses and whether they find
  meaningful disemployment effects.
```

The subagent runs in its own context window and comes back with a comparison
table rather than five separate summaries — this keeps the literature dump
out of the main session, per the token-discipline habits from Section 11.
It should surface that staggered-timing designs in this literature have
mostly moved toward **Callaway–Sant'Anna** or similar heterogeneity-robust
estimators instead of naive two-way fixed effects, because minimum wage
increases are staggered across states and years — exactly the situation
naive TWFE handles badly. That single fact determines the estimator choice
for the rest of the walkthrough.

---

### Stage 2 — Data acquisition & cleaning
*(Skill: `data-cleaning-conventions`.)*

```
> Download QCEW county-level, NAICS 722 employment data for 2015–2023, and
  clone the Vaghul-Zipperer minimum wage repo. Merge them into a county-
  quarter panel with the effective state minimum wage attached to each row.
  Apply our standard merge diagnostics before you show me anything.
```

Because the skill is loaded, Claude doesn't need to be told the group's
merge conventions turn-by-turn — it already knows to report a before/after
row count and flag unmatched keys rather than silently dropping them:

> *Merged 3,142 counties × 36 quarters. 96 county-quarters dropped for
> disclosure-suppressed employment (QCEW withholds cells with too few
> reporting establishments) — listed in `output/dropped_counties.csv`.
> Minimum wage series matched on state + effective date with no gaps.*

This is the moment Plan Mode (Section 10) earns its keep — downloading,
merging, and writing `data/clean/panel.csv` are exactly the kind of
pipeline-touching actions worth reviewing as a plan before they run.

---

### Stage 3 — Exploratory data analysis
*(Built-in `data-scientist` subagent type.)*

```
> Give me summary stats and a plot of food-service employment trends by
  state, split into states that raised their minimum wage during this
  window vs. those that didn't. Flag anything that looks like a data
  problem before I model it.
```

A good EDA pass here should surface the two things that matter before any
regression: whether pre-trends look parallel-ish across the two groups, and
whether any single large state (e.g. California) is doing most of the work
in the "raised" group — a classic case for weighting or a robustness check
later.

---

### Stage 4 — Modeling / estimation
*(Skill: `econometrics-diagnostics`. Subagent: `model-critic`.)*

```
> Estimate the effect of minimum wage increases on log county food-service
  employment using the Callaway-Sant'Anna estimator, treating each state's
  first minimum wage increase in the window as its treatment date. Then have
  the model-critic subagent review the identification assumption.
```

The `model-critic` subagent's job here is specifically to push back, not
confirm:

> *The identifying assumption is parallel trends in the absence of
> treatment, conditional on covariates. The main threat: states raise
> minimum wages partly in response to local labor market strength, which
> could bias results upward. The current code doesn't yet report a
> pre-trend event-study plot — that's the single most valuable missing
> check before this goes in the draft.*

---

### Stage 5 — Robustness, validation, replication
*(Skill: `replication-audit`. Subagent: `replication-auditor`.)*

```
> Have the replication-auditor subagent re-derive the main estimate
  independently, starting from the raw QCEW files, and tell me if anything
  doesn't match.
```

This re-runs the pipeline end to end in a separate context, rather than
trusting that the version already in memory is still accurate — the same
discipline as re-running someone else's code before trusting their number.

---

### Stage 6 — Visualization & tables
```
> Turn the Callaway-Sant'Anna output into an event-study figure and a
  modelsummary table formatted to match our house style.
```
This is also a natural point to reach for the **interactive-dashboard-builder**
skill from Section 7 if the goal is an exploratory internal dashboard rather
than a static paper figure.

---

### Stage 7 — Writing & LaTeX assembly
*(Nested `paper/CLAUDE.md` rules apply — citation style, word limit.)*
```
> Draft the results section. Reference only numbers that exist in
  output/tables/, and cite each claim to the specific table and cell.
```

---

### Stage 8 — Version control & reproducibility hygiene
```
> Before I commit, confirm data/raw/ wasn't modified, and that re-running
  make all reproduces every number currently in the draft.
```

### What this walkthrough demonstrates end to end
Every stage reused something already introduced earlier in the guide — a
skill, a subagent, a Plan Mode habit, or a token-discipline choice — rather
than improvising a new technique per step. That repetition is the point: the
same five or six building blocks cover the whole research pipeline.

---

## 14. Worked Example: Personal Usage (Calendar, Shopping Research, Email, File Organizing, Cowork)

**Also not main navigation** — a second "putting it together" page, this one
showing that everything in sections 2–11 isn't just for the paper. It matters
for two reasons on the site: (1) it shows the professor this isn't a one-trick
research tool, and (2) it's genuinely where most people get the most *personal*
daily value once they've set up preferences once.

**Context note for the site:** this example runs mostly in the **Claude.ai /
Claude Desktop / Claude apps** world (chat + connectors), not the Claude Code
terminal — worth a one-line callout so readers don't go looking for a
`CLAUDE.md` file for this part. The equivalent of a "global CLAUDE.md" here is
**Settings → Preferences** (standing instructions Claude uses in every chat),
plus **connectors** (Google Calendar, Gmail, Google Drive, etc.) instead of MCP
servers configured in a project. The first four examples below are each
deliberately built around a **skill, an MCP connector, or a subagent** — the
same building blocks from the research sections at work in ordinary daily
use. The fifth introduces a different kind of building block entirely:
**Cowork**, for tasks that need to run on their own rather than turn-by-turn
in a chat.

### 14.1 Calendar: scheduling a study group / office hours around a deadline
- **Mechanism: MCP connector** — Google Calendar (+ Gmail, to see who replied)
- Preference example (set once, in Settings, not per-chat):
  > "My work hours are 9am–6pm CET. Always propose meeting times in my
  > timezone. Default meeting length is 30 minutes unless I say otherwise.
  > Never send an invite without showing me the draft first."
- Example prompt:
  > "Check my calendar for the next two weeks and find three 45-minute slots
  > where my thesis advisor and I are both free, avoiding my Tuesday morning
  > class. Draft the invite but don't send it yet."
- What Claude actually does: reads calendar availability through the Google
  Calendar MCP connector, proposes slots, drafts (but doesn't send) the invite,
  and waits for confirmation.
- Guardrail worth teaching explicitly: actions that *send, modify, or delete*
  (sending the invite, not just drafting it) should always get an explicit
  confirmation step — a good moment to explain why Claude asks before acting
  on external accounts, rather than treating it as unnecessary friction.

### 14.2 Shopping research: buying a new laptop for data-heavy work
- **Mechanism: personal Skill** — `product-comparison-framework`, a small
  skill (in `~/.claude/skills/`) that encodes *how you like tradeoffs
  presented*, so every purchase decision gets the same treatment instead of
  reinventing the approach each time.
  ```yaml
  ---
  name: product-comparison-framework
  description: Use whenever comparing products before a purchase decision
    (electronics, appliances, software subscriptions). Applies to any "help me
    choose between X" request.
  ---
  ```
  Body: always separate "what actually matters for my stated use case" from
  "marketing specs that don't," name the single spec that matters most before
  comparing SKUs, cite current prices/specs rather than relying on memory
  (search first), and never push toward one option — present tradeoffs and let
  the reader decide.
- Example prompt:
  > "I need a laptop for R/Python data work — think large regressions and
  > occasional local LLM experiments, budget around €1,500. Use my comparison
  > framework and walk me through it."
- What a good answer looks like: Claude explains the tradeoff (e.g. RAM
  matters more than GPU for most econometrics workloads; GPU matters for local
  ML) before recommending SKUs, searches for current listings, and ends with a
  factual comparison rather than a confident "buy this one" — the skill is
  what makes this consistent every time instead of a one-off good answer.

### 14.3 Email: triaging a cluttered inbox before a trip
- **Mechanism: MCP connector** — Gmail
- Preference example:
  > "When summarizing my inbox, flag anything from my advisor or coauthors as
  > high priority. Draft replies in a direct, friendly tone — not overly
  > formal. Never send anything automatically."
- Example prompt:
  > "Summarize unread emails from the last 3 days, group them by urgent /
  > can-wait / no-reply-needed, and draft replies for the urgent ones so I can
  > review before I leave for the conference."
- What Claude does: reads and categorizes through the Gmail connector
  (read-only, no confirmation needed), then *drafts* replies (still no send) —
  sending is the one step that always needs an explicit yes.

### 14.4 File organizing: cleaning up a messy Drive/downloads folder
- **Mechanism: MCP connector + subagent** — Google Drive connector for the
  files themselves, and a dedicated `file-organizer` subagent so the (fairly
  mechanical, somewhat repetitive) sorting work happens in its own context
  window instead of cluttering your main chat.
  ```markdown
  ---
  name: file-organizer
  description: Use when the user wants to sort, rename, or declutter files in
    Drive or a local folder. Proposes a plan; never moves or deletes files
    without approval.
  tools: read
  ---
  You help organize messy file collections. Given a folder listing: (1) group
  files by apparent type/project using name and date, (2) flag likely
  duplicates or obviously stale files (old drafts, "final_final_v3"-style
  names), (3) propose a folder structure and rename plan as a table, and
  (4) never move, rename, or delete anything until the plan is approved.
  ```
- Example prompt:
  > "Use the file-organizer subagent to look at my 'Thesis Drafts' Drive folder
  > — it's a mess of v1/v2/final files. Propose a clean structure and a rename
  > plan, but don't touch anything yet."
- What Claude does: the subagent reads the folder via the Drive connector,
  returns a proposed structure and rename table to the main conversation, and
  only executes (moving/renaming through the connector) after you approve —
  keeping the exploratory back-and-forth about "wait, keep that one" out of
  your main session context.

### 14.5 Cowork: a weekly literature-scan handed off, not chatted through
- **Mechanism: Cowork**, not a skill/MCP/subagent — this is a different
  surface, not a different building block layered onto chat. Where the
  rest of this section is "ask, get an answer in the same conversation,"
  Cowork is for describing an *outcome*, stepping away, and coming back to
  finished work — it runs your task in its own environment, keeps going
  even if you close your laptop, and can be scheduled to repeat on its own.
- Example prompt (started from the Cowork tab, not a regular chat):
  > "Every Monday morning, check for new working papers matching 'minimum
  > wage' or 'monopsony' on my usual sources, summarize the two or three
  > most relevant using our standard lit-review format, and put together a
  > short slide deck of the highlights. Message me when it's ready."
- What Cowork actually does: it plans the task, runs it in its own isolated
  session (not tying up your main chat), produces an actual slide deck as a
  file rather than just a chat reply, and — because this was set up as a
  recurring scheduled task — repeats it automatically every week without
  being asked again. You get a notification when it's done, on whichever
  device you check next.
- Where this differs from everything else in Section 14: the calendar,
  email, and file-organizing examples all still happen turn-by-turn inside
  a conversation you're actively watching. Cowork is the right tool
  specifically when the task is multi-step, takes real time, and doesn't
  need you present for every step of it — a one-off "find me a laptop"
  question doesn't need this; a recurring literature scan that ends in a
  deliverable file does.
- Guardrail worth teaching explicitly: Cowork can take real actions with
  real access (local files, connected apps, sometimes your computer
  directly) — the same draft-then-confirm discipline from the rest of this
  section still applies, and it's worth being deliberate about which
  folders/accounts a scheduled task can reach, precisely because it runs
  unattended.

### Guide callout for this whole section
A short table mirroring the research-preferences one from Section 2:

| Personal preference (Settings) | Example |
|---|---|
| Scheduling | "Always draft, never send, calendar invites without confirmation" |
| Tone | "Draft emails in a direct, friendly tone" |
| Shopping | "Give tradeoffs before recommendations, never push me toward one option" |
| File organizing | "Always propose a plan before moving or deleting anything" |
| Cowork / scheduled tasks | "Confirm which folders/accounts a task can reach before the first run" |

A second short table makes the "same building blocks" point explicit:

| Example | Building block used |
|---|---|
| Calendar scheduling | MCP connector (Google Calendar) |
| Shopping research | Personal Skill (`product-comparison-framework`) |
| Email triage | MCP connector (Gmail) |
| File organizing | MCP connector (Drive) + Subagent (`file-organizer`) |
| Weekly literature scan | Cowork (scheduled task, own environment, file output) |

---

## Site Structure Notes

- **No separate landing/placeholder homepage.** Section 1 (Quickstart) *is*
  the first thing a reader sees at `/` — don't build a "coming soon" or
  marketing-style landing page in front of it. The roadmap stage table above
  can still live at the top of the Quickstart page itself as the orientation
  device, rather than on a separate route.
- **Navigation should read as a roadmap, not a flat list.** Use the six-stage
  grouping from "How to read this guide" as the actual nav structure — a
  persistent progress rail (sidebar stepper, or a slim horizontal bar at the
  top of every page) showing all 14 sections grouped into their stage, with
  the current page highlighted and the next one visually next in line. Each
  page ends with a literal "Next: Section N — Title →" link, not just a
  generic "next page" arrow, so the path stays legible even if someone lands
  on a page directly from search.
- **Sections 2–11** are the reference stages (Mental Model; Global, Project,
  Local, and Nested CLAUDE.md; Skills; Subagents; MCP Servers; Plan Mode &
  Terminal Features; Token Usage & Context Management), each its own page.
- **Section 12 (Do's and Don'ts Checklist)** closes out Stage 5 — a fast,
  scannable page, not more long-form prose. It's a good candidate for a
  denser/two-column layout given how short each line is, unlike every page
  before it.
- **Sections 13–14 (worked examples)** are Stage 6 — two "Putting It
  Together" pages, Research Stages End-to-End and Personal Usage, placed
  after every building block has its own page. Worth a visible split in the
  nav (a "Reference" group vs. an "Examples" group) so the professor-facing
  framing (research) and the personal-use framing don't blur together.
  Section 14 ends the roadmap — no separate closing page after it.
- **Section 14 specifically** needs a short framing note on its page that it
  lives in Claude.ai/Desktop + connectors, not the terminal — otherwise
  readers coming from the CLAUDE.md sections may look for a config file that
  doesn't apply here. Its Cowork segment (14.5) needs an extra line making
  clear Cowork is a different surface/tab, not another connector or setting
  within regular chat.
- **Copy-pasteable templates**: every reference section above that shows a
  file (global CLAUDE.md, project CLAUDE.md, CLAUDE.local.md, nested
  CLAUDE.md, each SKILL.md, each subagent `.md`) should have a corresponding
  downloadable/copy-button code block on its site page — the examples above
  are already written in a template-ready form (swap the project-specific
  details for the reader's own). Section 14's preference table is also
  copy-paste-ready for someone's own Settings page. Section 1's quickstart
  template should be the very first copy-button a reader encounters.
- **Lead/intro paragraphs use full content width, not a narrower measure.**
  An earlier draft of the design system constrained intro paragraphs to a
  narrower max-width than the rest of the page content (a common typographic
  convention for readability) — this read as oddly cramped in practice and
  has been reversed. Intro/lead text should match the same content width as
  everything else on the page, site-wide. See `design-system.md`.

*Next step: confirm this section list and nav order, then build the site.*