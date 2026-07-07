import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeHeading } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function ClaudeMdProjectPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Build your memory system", "Project CLAUDE.md"]}
        title="Project CLAUDE.md"
        subtitle="The per-paper, per-dataset contract — data provenance, commands, and landmines."
      />
      <RoadmapStepper currentSlug="claude-md-project" />
      <main className={styles.main}>
        <p className={styles.intro}>
          The project CLAUDE.md sits at the repo root and is committed to
          git — it&apos;s the one a coauthor sees the moment they clone the
          project, so it functions less like a personal note and more like
          a contract: the facts about this specific paper or dataset that
          Claude needs to get right from the very first session, not
          something you explain fresh every time you sit down to work.
        </p>
        <p className={styles.intro}>
          <strong>What belongs here:</strong>
        </p>
        <ul className={styles.plainList}>
          <li>One-paragraph research question and design</li>
          <li>Data provenance and directory map</li>
          <li>Exact reproducible commands</li>
          <li>Known data quirks / landmines</li>
          <li>
            What&apos;s off-limits (e.g., never touch <code>raw/</code>)
          </li>
        </ul>

        <div className={styles.sectionLabel}>
          Example — CLAUDE.md for an empirical economics project
        </div>

        <CodePanel label="Project" filename="CLAUDE.md">
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
        </CodePanel>

        <Callout kicker="Before / after">
          A vague project file — &quot;this project studies broadband&quot;
          — leaves Claude guessing. The concrete version above prevents
          specific failure modes line by line: the research-design line
          stops Claude from reaching for naive TWFE instead of
          Callaway-Sant&apos;Anna; the directory map stops it from
          overwriting <code>data/raw/</code>; the known-data-issues section
          stops it from re-merging on raw, uncorrected FIPS codes.
        </Callout>
      </main>
      <NextSectionFooter currentId={4} />
    </>
  );
}
