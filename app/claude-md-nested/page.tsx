import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeHeading } from "@/components/CodePanel";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function ClaudeMdNestedPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Build your memory system", "Nested CLAUDE.md"]}
        title="Nested CLAUDE.md"
        subtitle="Rules scoped to a specific folder — kept out of the root file so it doesn't bloat."
      />
      <RoadmapStepper currentSlug="claude-md-nested" />
      <main className={styles.main}>
        <p className={styles.intro}>
          A nested CLAUDE.md lives inside a subfolder rather than at the
          repo root, and only applies once Claude is actually working
          inside that folder — a <code>paper/CLAUDE.md</code> governs the{" "}
          <code>paper/</code> subtree, a <code>data/CLAUDE.md</code>{" "}
          governs <code>data/</code>, and neither one&apos;s rules leak
          onto the rest of the project. Same file format and the same
          committed, shared-with-coauthors status as the project
          CLAUDE.md, just scoped to one part of the repo instead of the
          whole thing.
        </p>
        <p className={styles.intro}>
          <strong>What belongs here:</strong> rules only relevant while
          working inside a specific folder — kept out of the root file so
          it doesn&apos;t bloat.
        </p>

        <div className={styles.sectionLabel}>Example — paper/CLAUDE.md</div>

        <CodePanel label="Nested" filename="paper/CLAUDE.md">
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
        </CodePanel>

        <div className={styles.sectionLabel}>Example — data/CLAUDE.md</div>

        <CodePanel label="Nested" filename="data/CLAUDE.md">
          <CodeHeading># Data folder rules</CodeHeading>
          {`

- Any script here must be idempotent — rerunning it twice should give the same file.
- Raw files are read-only by convention. If you need a fix, write a correction step
  in code/, don't hand-edit data/raw/.`}
        </CodePanel>
      </main>
      <NextSectionFooter currentId={6} />
    </>
  );
}
