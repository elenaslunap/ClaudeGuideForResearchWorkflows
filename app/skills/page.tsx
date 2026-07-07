import RoadmapStepper from "@/components/RoadmapStepper";
import SectionHero from "@/components/SectionHero";
import CatalogCard, { CatalogCardTab } from "@/components/CatalogCard";
import CodePanel, { CodeComment, CodeHeading, CodeKey, CodeStr } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import contentStyles from "@/styles/content.module.css";
import styles from "./page.module.css";

const externalSkills: {
  name: string;
  source: string;
  sourceHref: string;
  install: string;
  description: string;
}[] = [
  {
    name: "Scientific Agent Skills",
    source: "github.com/K-Dense-AI/scientific-agent-skills",
    sourceHref: "https://github.com/K-Dense-AI/scientific-agent-skills",
    install: "npx skills add K-Dense-AI/scientific-agent-skills",
    description:
      "148 skills across bioinformatics, cheminformatics, clinical research, ML, geospatial science, and more, plus unified access to 100+ scientific databases (PubChem, UniProt, ClinicalTrials.gov, FRED, and others). Broader than most economics/data-science work needs — install only the topical subset you'll actually use (e.g. statistical-analysis, experimental-design, eda), not the whole collection.",
  },
  {
    name: "analytics-data-analysis",
    source: "skills.sh/mindrally/skills",
    sourceHref: "https://www.skills.sh/mindrally/skills/analytics-data-analysis",
    install: "npx skills add https://github.com/mindrally/skills --skill analytics-data-analysis",
    description:
      "A pandas/matplotlib/seaborn/numpy EDA workflow — load and inspect, clean and transform, explore relationships, visualize, validate, document. Close in spirit to the data-cleaning-conventions example above; worth comparing against it rather than running both.",
  },
  {
    name: "csv-data-wrangler",
    source: "skills.sh/404kidwiz/claude-supercode-skills",
    sourceHref: "https://www.skills.sh/404kidwiz/claude-supercode-skills/csv-data-wrangler",
    install: "npx skills add https://github.com/404kidwiz/claude-supercode-skills --skill csv-data-wrangler",
    description:
      "Large-file CSV handling — encoding issues, malformed rows, merging/splitting, and querying CSVs directly with SQL via DuckDB. Handy when the raw data itself (not the analysis) is the messy part.",
  },
  {
    name: "interactive-dashboard-builder",
    source: "skills.sh/anthropics/knowledge-work-plugins",
    sourceHref: "https://www.skills.sh/anthropics/knowledge-work-plugins/interactive-dashboard-builder",
    install: "npx skills add https://github.com/anthropics/knowledge-work-plugins --skill interactive-dashboard-builder",
    description:
      "An official Anthropic skill — self-contained HTML dashboards with Chart.js, KPI cards, filters, and sortable tables, no server or build step. A good fit for the \"Visualization & tables\" stage of the worked example.",
  },
  {
    name: "ai-ml-data-science",
    source: "skills.sh/vasilyu1983/ai-agents-public",
    sourceHref: "https://www.skills.sh/vasilyu1983/ai-agents-public/ai-ml-data-science",
    install: "npx skills add https://github.com/vasilyu1983/ai-agents-public --skill ai-ml-data-science",
    description:
      "Heavier ML-engineering ground than the economics examples above — feature pipelines with leakage prevention, model selection starting from strong tabular baselines, drift monitoring, and production/MLOps patterns. Most useful once a project moves from \"estimate a model\" to \"maintain a model.\"",
  },
  {
    name: "jupyter-notebook",
    source: "skills.sh/openai/skills",
    sourceHref: "https://www.skills.sh/openai/skills/jupyter-notebook",
    install: "npx skills add https://github.com/openai/skills --skill jupyter-notebook",
    description:
      "Scaffolds clean, reproducible .ipynb notebooks for experiments or teaching-oriented walkthroughs, using bundled templates rather than hand-written notebook JSON (which is easy to corrupt by hand).",
  },
];

const skills: {
  tab: CatalogCardTab;
  callNumber: string;
  title: string;
  description: string;
  stamp: string;
  href: string;
}[] = [
  {
    tab: "rust",
    callNumber: "SK.01 — CLN.204",
    title: "data-cleaning-conventions",
    description:
      "Missing-data codes, outlier flagging, and the merge-diagnostic checklist to run after every join.",
    stamp: "Project skill",
    href: "#template-1",
  },
  {
    tab: "pine",
    callNumber: "SK.02 — ECN.118",
    title: "econometrics-diagnostics",
    description:
      "Which diagnostics to compute after any estimation, and how to report them alongside the results table.",
    stamp: "Project skill",
    href: "#template-2",
  },
  {
    tab: "rust-deep",
    callNumber: "SK.03 — REP.033",
    title: "replication-audit",
    description:
      "Re-derive a table from raw data end to end and produce a discrepancy report if a number doesn't match.",
    stamp: "Project skill",
    href: "#template-3",
  },
  {
    tab: "rust",
    callNumber: "SK.04 — CIT.077",
    title: "citation-formatting",
    description:
      "House citation style, plus the standing rule to flag rather than fabricate an uncertain reference.",
    stamp: "Personal skill",
    href: "#template-4",
  },
  {
    tab: "pine",
    callNumber: "SK.05 — LIT.052",
    title: "lit-review-synthesis",
    description:
      "A standard per-paper summary format — question, strategy, effect size, relation to your contribution.",
    stamp: "Personal skill",
    href: "#template-5",
  },
];

interface SkillTemplate {
  id: string;
  label: string;
  filename: string;
  body: React.ReactNode;
}

const templates: SkillTemplate[] = [
  {
    id: "template-1",
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
    id: "template-2",
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
    id: "template-3",
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
    id: "template-4",
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
    id: "template-5",
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
];

export default function SkillsPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Building blocks", "Skills"]}
        title="Skills"
        subtitle="Small, reusable procedures Claude loads only when the task calls for them — kept out of CLAUDE.md so the file that's reloaded on every message stays lean."
      />
      <RoadmapStepper currentSlug="skills" />
      <main className={styles.main}>
        <p className={styles.intro}>
          <strong>A skill is a folder, not a paragraph.</strong> Each one holds a{" "}
          <code>SKILL.md</code> describing when it applies and what to do,
          plus any supporting templates or scripts. Claude reads the
          description, decides whether it&apos;s relevant, and only then
          loads the body — this is why skills scale better than piling every
          convention into a single memory file.
        </p>
        <p className={styles.intro}>
          A skill exists to standardize a recurring research workflow — the
          merge-diagnostic checklist you already run by hand, the citation
          style you already enforce, the outlier-flagging rule you already
          apply. Writing it down once as a skill means every project, and
          every session, gets the same treatment instead of a slightly
          different version each time.
        </p>
        <p className={styles.intro}>
          The right mental model when writing one: you&apos;re not
          configuring a setting, you&apos;re showing someone how you do the
          task, or how you think about it. Write it the way you&apos;d walk
          a new research assistant through the procedure on their first day
          — concrete enough to actually follow, general enough to hold up
          the next time too.
        </p>
        <p className={styles.intro}>
          Personal skills live in <code>~/.claude/skills/</code>. Project
          skills live in <code>.claude/skills/</code> and are committed to
          the repo, so a coauthor&apos;s Claude follows the same conventions
          as yours.
        </p>

        <div className={styles.sectionLabel}>
          Catalog — five skills for this research group
        </div>

        <div className={styles.catalogGrid}>
          {skills.map((skill) => (
            <CatalogCard key={skill.callNumber} {...skill} />
          ))}
        </div>

        <h2 className={contentStyles.subheading}>How to build a skill</h2>
        <ol className={contentStyles.stepList}>
          <li className={contentStyles.step}>
            <span className={contentStyles.stepNumber}>1</span>
            <div className={contentStyles.stepBody}>
              <p>
                <strong>Notice the repetition first</strong> — write a
                skill once you&apos;ve done the same correction, check, or
                format by hand more than twice, not before.
              </p>
            </div>
          </li>
          <li className={contentStyles.step}>
            <span className={contentStyles.stepNumber}>2</span>
            <div className={contentStyles.stepBody}>
              <p>
                <strong>Name it by the task, not the tool</strong> —{" "}
                <code>data-cleaning-conventions</code>, not{" "}
                <code>helper</code>.
              </p>
            </div>
          </li>
          <li className={contentStyles.step}>
            <span className={contentStyles.stepNumber}>3</span>
            <div className={contentStyles.stepBody}>
              <p>
                <strong>Write the description like a router</strong> —
                it&apos;s the only part Claude reads before deciding
                whether to load the rest, so be specific about exactly when
                it applies.
              </p>
            </div>
          </li>
          <li className={contentStyles.step}>
            <span className={contentStyles.stepNumber}>4</span>
            <div className={contentStyles.stepBody}>
              <p>
                <strong>Write the body like you&apos;re training
                someone</strong> — state the rule and the reason, skip
                anything Claude could already infer from the code or data.
              </p>
            </div>
          </li>
          <li className={contentStyles.step}>
            <span className={contentStyles.stepNumber}>5</span>
            <div className={contentStyles.stepBody}>
              <p>
                <strong>Try it before trusting it</strong> — if the
                description never triggers, or triggers for the wrong
                task, fix that before touching the body.
              </p>
            </div>
          </li>
        </ol>

        {templates.map((template) => (
          <div key={template.id}>
            <div className={styles.sectionLabel}>
              Template — copy into .claude/skills/{template.filename}
            </div>
            <div id={template.id}>
              <CodePanel label={template.label} filename={template.filename}>
                {template.body}
              </CodePanel>
            </div>
          </div>
        ))}

        <div className={styles.sectionLabel}>Anatomy of a skill</div>
        <CodePanel label="Tree" filename="data-cleaning-conventions/">
          {`.claude/skills/data-cleaning-conventions/\n  SKILL.md\n  templates/merge_report.R`}
        </CodePanel>
        <p className={styles.intro}>
          <strong>Personal skills</strong> (<code>~/.claude/skills/</code>)
          vs. <strong>project skills</strong> (<code>.claude/skills/</code>,
          committed and shared with coauthors) vs.{" "}
          <strong>plugin skills</strong> (distributed as a package).
        </p>

        <div className={styles.sectionLabel}>
          Don&apos;t just build your own — install what already exists first
        </div>
        <p className={styles.intro}>
          Before writing a custom skill, check whether a well-maintained
          public one already covers it — skills are just folders, so they
          install with one command and you can always fork and edit
          afterward. A few worth pointing to directly:
        </p>
        <table>
          <thead>
            <tr>
              <th>Skill / library</th>
              <th>Source</th>
              <th>Install</th>
              <th>What it covers</th>
            </tr>
          </thead>
          <tbody>
            {externalSkills.map((skill) => (
              <tr key={skill.name}>
                <td>
                  <strong>{skill.name}</strong>
                </td>
                <td>
                  <a href={skill.sourceHref} target="_blank" rel="noopener noreferrer">
                    {skill.source}
                  </a>
                </td>
                <td>
                  <code>{skill.install}</code>
                </td>
                <td>{skill.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.intro}>
          Installation for all of these uses the same <code>npx skills add</code>{" "}
          pattern (the open Agent Skills standard) or{" "}
          <code>gh skill install</code> if the GitHub CLI is set up — both
          drop the skill into the right directory for you automatically.
        </p>

        <Callout kicker="Treat installed skills like any other dependency">
          A skill can instruct Claude to run code, install packages, and
          make network requests — a poorly written or malicious one is a
          real risk, not just a config nuisance. Before installing a
          third-party skill: read its SKILL.md, check whether it&apos;s
          from a maintainer you recognize (the Anthropic one above is a
          good example of a source with an obvious trust anchor), and
          prefer installing a narrow, named skill over an entire large
          collection at once. This is the same caution already covered for
          MCP connectors and subagents — skills are one more thing running
          with your permissions, not a passive documentation file.
        </Callout>
      </main>
      <NextSectionFooter currentId={7} />
    </>
  );
}
