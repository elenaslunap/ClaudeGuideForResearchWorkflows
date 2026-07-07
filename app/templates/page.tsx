import SectionHero from "@/components/SectionHero";
import CatalogCard, { CatalogCardTab } from "@/components/CatalogCard";
import CodePanel, { CodeComment, CodeHeading, CodeKey, CodeStr } from "@/components/CodePanel";
import styles from "@/styles/content.module.css";

interface TemplateCard {
  tab: CatalogCardTab;
  callNumber: string;
  title: string;
  description: string;
  stamp: string;
  href: string;
}

const cards: TemplateCard[] = [
  {
    tab: "rust",
    callNumber: "TPL.01",
    title: "CLAUDE.md (project template)",
    description: "Minimum-viable project CLAUDE.md — what/where/how. From the Quickstart page.",
    stamp: "CLAUDE.md",
    href: "#template-1",
  },
  {
    tab: "pine",
    callNumber: "TPL.02",
    title: ".gitignore",
    description: "Entries to add before you do anything else. From the Quickstart page.",
    stamp: "Config",
    href: "#template-2",
  },
  {
    tab: "rust-deep",
    callNumber: "TPL.03",
    title: "~/.claude/CLAUDE.md",
    description: "Standing preferences for an economist, true across every project. From the Global CLAUDE.md page.",
    stamp: "CLAUDE.md",
    href: "#template-3",
  },
  {
    tab: "rust",
    callNumber: "TPL.04",
    title: "CLAUDE.md (project)",
    description: "Research design, directory map, and known data issues for one project. From the Project CLAUDE.md page.",
    stamp: "CLAUDE.md",
    href: "#template-4",
  },
  {
    tab: "pine",
    callNumber: "TPL.05",
    title: "CLAUDE.local.md",
    description: "Personal, ungitted scratch notes — never shared. From the CLAUDE.local.md page.",
    stamp: "CLAUDE.md",
    href: "#template-5",
  },
  {
    tab: "rust-deep",
    callNumber: "TPL.06",
    title: "paper/CLAUDE.md",
    description: "Paper-folder rules: journal style, word limit, table format. From the Nested CLAUDE.md page.",
    stamp: "CLAUDE.md",
    href: "#template-6",
  },
  {
    tab: "rust",
    callNumber: "TPL.07",
    title: "data/CLAUDE.md",
    description: "Data-folder rules: idempotent scripts, read-only raw files. From the Nested CLAUDE.md page.",
    stamp: "CLAUDE.md",
    href: "#template-7",
  },
  {
    tab: "pine",
    callNumber: "TPL.08",
    title: "data-cleaning-conventions",
    description: "Missing-data codes, outlier flagging, merge diagnostics. From the Skills page.",
    stamp: "SKILL.md",
    href: "#template-8",
  },
  {
    tab: "rust-deep",
    callNumber: "TPL.09",
    title: "econometrics-diagnostics",
    description: "Diagnostics to compute after any estimation. From the Skills page.",
    stamp: "SKILL.md",
    href: "#template-9",
  },
  {
    tab: "rust",
    callNumber: "TPL.10",
    title: "replication-audit",
    description: "Re-derive a table from raw data and report discrepancies. From the Skills page.",
    stamp: "SKILL.md",
    href: "#template-10",
  },
  {
    tab: "pine",
    callNumber: "TPL.11",
    title: "citation-formatting",
    description: "House citation style and the no-fabrication rule. From the Skills page.",
    stamp: "SKILL.md",
    href: "#template-11",
  },
  {
    tab: "rust-deep",
    callNumber: "TPL.12",
    title: "lit-review-synthesis",
    description: "Standard per-paper summary format for literature reviews. From the Skills page.",
    stamp: "SKILL.md",
    href: "#template-12",
  },
  {
    tab: "rust",
    callNumber: "TPL.13",
    title: "product-comparison-framework",
    description: "How you like product tradeoffs presented, before a purchase. From the Personal Usage page.",
    stamp: "SKILL.md",
    href: "#template-13",
  },
  {
    tab: "pine",
    callNumber: "TPL.14",
    title: "literature-reviewer",
    description: "Searches and compares academic literature relevant to a question. From the Subagents page.",
    stamp: "Subagent",
    href: "#template-14",
  },
  {
    tab: "rust-deep",
    callNumber: "TPL.15",
    title: "model-critic",
    description: "Reviews an estimation strategy for identification problems. From the Subagents page.",
    stamp: "Subagent",
    href: "#template-15",
  },
  {
    tab: "rust",
    callNumber: "TPL.16",
    title: "file-organizer",
    description: "Sorts/renames messy files, proposes a plan before touching anything. From the Personal Usage page.",
    stamp: "Subagent",
    href: "#template-16",
  },
];

interface TemplatePanel {
  id: string;
  sectionLabel: string;
  label: string;
  filename: string;
  body: React.ReactNode;
}

const panels: TemplatePanel[] = [
  {
    id: "template-1",
    sectionLabel: "Template — copy into CLAUDE.md (project root)",
    label: "Template",
    filename: "CLAUDE.md",
    body: (
      <>
        {`# Project: [name]

## What this is
One paragraph: the research question or the product, and the current stage.

## Where things live
- data/ — [raw vs. clean, and which is safe to touch]
- code/ — [what runs in what order]
- output/ — [generated, don't hand-edit]

## How to run it
- Full pipeline: [command]
- Tests / checks: [command]`}
      </>
    ),
  },
  {
    id: "template-2",
    sectionLabel: "Template — copy into .gitignore",
    label: "Add first",
    filename: ".gitignore",
    body: <>{"CLAUDE.local.md\n.claude/memory/"}</>,
  },
  {
    id: "template-3",
    sectionLabel: "Template — copy into ~/.claude/CLAUDE.md",
    label: "Global",
    filename: "~/.claude/CLAUDE.md",
    body: (
      <>
        <CodeHeading># Global Research Preferences</CodeHeading>
        {"\n\n"}
        <CodeHeading>## Statistics</CodeHeading>
        {`
- Default to heteroskedasticity-robust (HC1) standard errors unless the project
  file says otherwise. Cluster at the unit specified in the project CLAUDE.md.
- Always report both point estimate and 95% CI, not just significance stars.
- Flag when N drops meaningfully after a merge or filter — never silently drop rows.
- Never invent a citation, dataset value, or statistic. If you can't verify it,
  say so explicitly and mark it as [UNVERIFIED].
`}
        {"\n"}
        <CodeHeading>## Tooling</CodeHeading>
        {`
- Default language: R (tidyverse + fixest). Use Python only if the project says so.
- Plots: ggplot2, use the theme_paper() helper in ~/.R/theme_paper.R if it exists.
- Tables: modelsummary -> LaTeX, not stargazer.
`}
        {"\n"}
        <CodeHeading>## Style</CodeHeading>
        {`
- Write like an econ working paper: precise, no hedging filler, active voice.
- When summarizing a paper, always separate "what they claim" from "what they show."
`}
        {"\n"}
        <CodeHeading>## Workflow habits</CodeHeading>
        {`
- Before running a regression script, tell me what changed vs. the last run.
- After any data-cleaning step, print a before/after row count and a diff of
  dropped observations.`}
      </>
    ),
  },
  {
    id: "template-4",
    sectionLabel: "Template — copy into CLAUDE.md (project root)",
    label: "Project",
    filename: "CLAUDE.md",
    body: (
      <>
        <CodeHeading># Project: Effect of Broadband Access on Rural Firm Entry</CodeHeading>
        {"\n\n"}
        <CodeHeading>## Research design</CodeHeading>
        {`
Diff-in-diff using county-level broadband rollout (2010–2022) as treatment timing,
firm entry from Census BFS as outcome. Identification relies on staggered rollout;
use Callaway-Sant'Anna estimator, not naive TWFE (see /paper/CLAUDE.md for why).
`}
        {"\n"}
        <CodeHeading>## Directory map</CodeHeading>
        {`
- data/raw/ — untouched source files. NEVER edit or overwrite.
- data/clean/ — output of code/01_clean.R. Safe to regenerate.
- code/ — numbered pipeline scripts, run in order via make all.
- output/tables/, output/figures/ — generated, not hand-edited.
- paper/ — LaTeX source, compiled with latexmk.
`}
        {"\n"}
        <CodeHeading>## Commands</CodeHeading>
        {`
- Full pipeline: make all
- Just re-run models: Rscript code/03_estimate.R
- Rebuild paper: cd paper && latexmk -pdf main.tex
`}
        {"\n"}
        <CodeHeading>## Known data issues</CodeHeading>
        {`
- FCC broadband data pre-2015 systematically overstates coverage (see Method note
  in data/raw/README_fcc.md) — code/01_clean.R applies the standard correction.
- County FIPS codes changed for 3 Alaska boroughs in 2013 — handled in
  code/00_fips_crosswalk.R, don't re-merge on raw FIPS without it.
`}
        {"\n"}
        <CodeHeading>## Out of bounds</CodeHeading>
        {`
- Do not modify anything in data/raw/.
- Do not change the estimator without flagging it — this is a pre-registered
  design choice.`}
      </>
    ),
  },
  {
    id: "template-5",
    sectionLabel: "Template — copy into CLAUDE.local.md",
    label: "Local",
    filename: "CLAUDE.local.md",
    body: (
      <>
        <CodeHeading># Personal notes (not shared)</CodeHeading>
        {`

- My machine has a local Postgres mirror of the raw data at
  localhost:5433/econ_raw — use that instead of re-downloading the FCC files
  every session.
- I run estimation scripts with Rscript --vanilla locally because my global
  .Rprofile auto-loads packages that conflict with renv here.
- Advisor prefers effect sizes in percentage points, not log points — convert
  before showing her any draft table, even though the paper itself uses log
  points throughout.
- Still not fully convinced the 2016 outlier county is real vs. a coding error
  upstream — don't cite that year's estimate until I've dug in further.`}
      </>
    ),
  },
  {
    id: "template-6",
    sectionLabel: "Template — copy into paper/CLAUDE.md",
    label: "Nested",
    filename: "paper/CLAUDE.md",
    body: (
      <>
        <CodeHeading># Paper folder rules</CodeHeading>
        {`

- Journal target: Journal of Urban Economics. Use their citation style (author-year,
  not numbered).
- Word limit: 9,000 words excluding references/appendix — flag if a draft section
  pushes total over that.
- All regression tables must go through modelsummary → LaTeX, matching the format
  already used in Table 1.
- Never inline a number in prose that isn't sourced from an output/ table — always
  reference the exact table/cell.`}
      </>
    ),
  },
  {
    id: "template-7",
    sectionLabel: "Template — copy into data/CLAUDE.md",
    label: "Nested",
    filename: "data/CLAUDE.md",
    body: (
      <>
        <CodeHeading># Data folder rules</CodeHeading>
        {`

- Any script here must be idempotent — rerunning it twice should give the same file.
- Raw files are read-only by convention. If you need a fix, write a correction step
  in code/, don't hand-edit data/raw/.`}
      </>
    ),
  },
  {
    id: "template-8",
    sectionLabel: "Template — copy into .claude/skills/data-cleaning-conventions/SKILL.md",
    label: "SK.01",
    filename: "data-cleaning-conventions/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>data-cleaning-conventions</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use whenever cleaning, merging, or filtering a raw\n  dataset for this research group. Covers missing-data handling,\n  outlier flags, and merge diagnostics.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {"\n"}
        {"\n"}
        <CodeHeading># Missing data</CodeHeading>
        {"\n"}
        {`Check for -99, "N/A", and blank cells before any merge or filter.\nNever silently drop rows — always report a before/after count.`}
        {"\n"}
        {"\n"}
        <CodeHeading># Outliers</CodeHeading>
        {"\n"}
        {`Winsorize at the 1st/99th percentile by default. Report both the\nraw and winsorized results side by side, not winsorized alone.`}
        {"\n"}
        {"\n"}
        <CodeHeading># After every merge</CodeHeading>
        {"\n"}
        {`- Row count before and after\n- Uniqueness check on the join key\n- A short report of unmatched keys, not just a dropped-silently count`}
      </>
    ),
  },
  {
    id: "template-9",
    sectionLabel: "Template — copy into .claude/skills/econometrics-diagnostics/SKILL.md",
    label: "SK.02",
    filename: "econometrics-diagnostics/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>econometrics-diagnostics</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use automatically after any regression or estimation is run.\n  Covers which diagnostics to compute and how to report them alongside\n  results, not buried in an appendix.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {"\n"}
        {"\n"}
        <CodeHeading># Always compute</CodeHeading>
        {`
- Heteroskedasticity test (Breusch-Pagan or White) — report even if using
  robust SEs, so the reader knows robustness was checked, not assumed.
- Variance inflation factors (VIF) for any model with more than one regressor.
- If IV: first-stage F-statistic, flag anything under 10 as weak.
- If diff-in-diff or event study: a pre-trend test / pre-period coefficient
  plot, not just the post-period estimate.
`}
        {"\n"}
        <CodeHeading># How to report</CodeHeading>
        {`
Add a short "Diagnostics" block directly under the results table itself —
three or four lines, not a separate appendix section the reader has to
hunt for. If a diagnostic fails, say so plainly rather than omitting it.`}
      </>
    ),
  },
  {
    id: "template-10",
    sectionLabel: "Template — copy into .claude/skills/replication-audit/SKILL.md",
    label: "SK.03",
    filename: "replication-audit/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>replication-audit</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use when asked to verify, replicate, or audit a specific\n  table or figure against raw data. Re-derives the number independently\n  rather than checking the existing code for bugs.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {"\n"}
        {"\n"}
        <CodeHeading># Procedure</CodeHeading>
        {`
1. Start from data/raw/ only — do not reuse any intermediate file from
   the existing pipeline, even if it looks correct.
2. Re-run cleaning, merging, and estimation from scratch in a scratch
   directory, following the steps documented in the project CLAUDE.md.
3. Compare the re-derived number to the one currently in the draft or
   output/ table, allowing for reasonable rounding only.
4. If it matches: say so plainly, don't hedge.
5. If it doesn't: report the exact discrepancy (both values, and at which
   pipeline step they first diverge) rather than guessing at the cause.`}
      </>
    ),
  },
  {
    id: "template-11",
    sectionLabel: "Template — copy into .claude/skills/citation-formatting/SKILL.md",
    label: "SK.04",
    filename: "citation-formatting/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>citation-formatting</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use whenever adding, checking, or formatting a citation in\n  this project's writing. Applies to in-text citations and reference lists.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {"\n"}
        {"\n"}
        <CodeHeading># House style</CodeHeading>
        {`
Author-year in-text (e.g. "Card and Krueger, 1994"), not numbered.
Reference list alphabetical by first author's surname.
`}
        {"\n"}
        <CodeHeading># The one hard rule</CodeHeading>
        {`
Never fabricate a citation, author list, year, or venue. If a paper's
existence or exact details can't be verified, say so explicitly and mark
it [UNVERIFIED] rather than guessing plausible-looking details.`}
      </>
    ),
  },
  {
    id: "template-12",
    sectionLabel: "Template — copy into .claude/skills/lit-review-synthesis/SKILL.md",
    label: "SK.05",
    filename: "lit-review-synthesis/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>lit-review-synthesis</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use when summarizing one or more academic papers for a\n  literature review. Produces a consistent, comparable format across\n  papers instead of ad hoc summaries.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {"\n"}
        {"\n"}
        <CodeHeading># Per-paper summary format</CodeHeading>
        {`
For each paper, produce exactly these fields:
- Research question (one sentence)
- Identification strategy (the actual method, not just "regression")
- Main result, with effect size in units comparable across papers
  (e.g. percentage points, not just "significant")
- Limitations the authors themselves acknowledge
- One line on how it relates to this project's contribution
`}
        {"\n"}
        <CodeHeading># When comparing multiple papers</CodeHeading>
        {`
Output a comparison table using the fields above as columns, not five
separate prose summaries — this is what makes 20 papers actually
comparable at a glance.`}
      </>
    ),
  },
  {
    id: "template-13",
    sectionLabel: "Template — copy into ~/.claude/skills/product-comparison-framework/SKILL.md",
    label: "Skill",
    filename: "product-comparison-framework/SKILL.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>product-comparison-framework</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use whenever comparing products before a purchase decision\n  (electronics, appliances, software subscriptions). Applies to any "help me\n  choose between X" request.`}
        </CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
      </>
    ),
  },
  {
    id: "template-14",
    sectionLabel: "Template — copy into .claude/agents/literature-reviewer.md",
    label: "Subagent",
    filename: "literature-reviewer.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>literature-reviewer</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Searches and summarizes academic literature relevant to a research\n  question. Use when the user asks to find, summarize, or compare papers.`}
        </CodeStr>
        {"\n"}
        <CodeKey>tools:</CodeKey> <CodeStr>web_search, web_fetch</CodeStr>
        {"\n"}
        <CodeKey>model:</CodeKey> <CodeStr>sonnet</CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {`
You are a literature review specialist for economics/data science research.
For each paper: extract research question, identification strategy, main result
(with effect size in comparable units), and limitations. Never fabricate a
citation. Flag when a claim in a paper conflicts with another paper you found.
Output a comparison table, not prose paragraphs.`}
      </>
    ),
  },
  {
    id: "template-15",
    sectionLabel: "Template — copy into .claude/agents/model-critic.md",
    label: "Subagent",
    filename: "model-critic.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>model-critic</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Reviews an estimation strategy for identification problems, before\n  or after results are produced. Use proactively after any regression is run.`}
        </CodeStr>
        {"\n"}
        <CodeKey>tools:</CodeKey> <CodeStr>read, bash</CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {`
You are a skeptical peer reviewer. For any estimation: (1) state the identifying
assumption in plain language, (2) list the most likely threats to it, (3) check
whether the code's diagnostics actually address those threats, (4) suggest the
single most valuable robustness check if one is missing. Be blunt about weak
identification — do not soften a real problem to be polite.`}
      </>
    ),
  },
  {
    id: "template-16",
    sectionLabel: "Template — copy into .claude/agents/file-organizer.md",
    label: "Subagent",
    filename: "file-organizer.md",
    body: (
      <>
        <CodeComment>---</CodeComment>
        {"\n"}
        <CodeKey>name:</CodeKey> <CodeStr>file-organizer</CodeStr>
        {"\n"}
        <CodeKey>description:</CodeKey>{" "}
        <CodeStr>
          {`Use when the user wants to sort, rename, or declutter files in\n  Drive or a local folder. Proposes a plan; never moves or deletes files\n  without approval.`}
        </CodeStr>
        {"\n"}
        <CodeKey>tools:</CodeKey> <CodeStr>read</CodeStr>
        {"\n"}
        <CodeComment>---</CodeComment>
        {`
You help organize messy file collections. Given a folder listing: (1) group
files by apparent type/project using name and date, (2) flag likely
duplicates or obviously stale files (old drafts, "final_final_v3"-style
names), (3) propose a folder structure and rename plan as a table, and
(4) never move, rename, or delete anything until the plan is approved.`}
      </>
    ),
  },
];

export default function TemplatesPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Templates"]}
        title="Templates"
        subtitle="Every copy-paste template from across the guide, collected in one place."
      />
      <main className={styles.main}>
        <p className={styles.intro}>
          Every CLAUDE.md variant, SKILL.md, and subagent <code>.md</code>{" "}
          shown anywhere on this site, in one catalog. Each card opens the
          full file below — copy it straight into your project.
        </p>

        <div className={styles.sectionLabel}>
          Catalog — every copy-paste template
        </div>

        <div className={styles.catalogGrid}>
          {cards.map((card) => (
            <CatalogCard key={card.callNumber} {...card} />
          ))}
        </div>

        {panels.map((panel) => (
          <div key={panel.id}>
            <div className={styles.sectionLabel}>{panel.sectionLabel}</div>
            <div id={panel.id}>
              <CodePanel label={panel.label} filename={panel.filename}>
                {panel.body}
              </CodePanel>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
