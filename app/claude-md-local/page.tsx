import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeHeading } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function ClaudeMdLocalPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Build your memory system", "CLAUDE.local.md"]}
        title="CLAUDE.local.md"
        subtitle="Personal, ungitted scratch notes — never for a coauthor or professor to see."
      />
      <RoadmapStepper currentSlug="claude-md-local" />
      <main className={styles.main}>
        <p className={styles.intro}>
          CLAUDE.local.md is the personal counterpart to the project
          CLAUDE.md — same folder, same file format, but gitignored, so it
          never gets committed or seen by a coauthor. It&apos;s where the
          messier, half-formed context lives: true for you, on your
          machine, right now, but not something that belongs in a file
          everyone on the project reads.
        </p>
        <p className={styles.intro}>
          <strong>What belongs here:</strong> scratch hypotheses, debugging
          state, &quot;things I&apos;m still not sure about,&quot; personal
          shortcuts — never for a coauthor or professor to see.
        </p>

        <div className={styles.sectionLabel}>Example</div>

        <CodePanel label="Local" filename="CLAUDE.local.md">
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
        </CodePanel>

        <Callout kicker="Gitignore hygiene">
          Add <code>CLAUDE.local.md</code> and any <code>.claude/memory/</code>{" "}
          folder to <code>.gitignore</code> immediately, since these can end
          up holding half-formed ideas, machine-specific paths, or even
          accidental sensitive info (e.g., pasted API keys during debugging)
          — none of which belong in a shared project file.
        </Callout>
      </main>
      <NextSectionFooter currentId={5} />
    </>
  );
}
