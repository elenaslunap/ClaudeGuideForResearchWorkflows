import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeHeading } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function ClaudeMdGlobalPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Build your memory system", "Global CLAUDE.md"]}
        title="Global CLAUDE.md"
        subtitle="Standing research preferences that hold true no matter which paper, dataset, or coauthor you're working with."
      />
      <RoadmapStepper currentSlug="claude-md-global" />
      <main className={styles.main}>
        <p className={styles.intro}>
          CLAUDE.md is a plain-text file Claude reads automatically at the
          start of every session — not a special config format, just
          markdown you write once that Claude treats as standing context
          for how to work with you. Think of it as the instructions
          you&apos;d give a new collaborator on their first day, except
          Claude reads it every single time, not just once: what this
          project is, how things are organized, and whatever isn&apos;t
          obvious from the code or data alone. Because it loads
          automatically, it replaces re-explaining the same context turn
          after turn, session after session.
        </p>
        <p className={styles.intro}>
          <strong>What belongs here:</strong> things that should be true no
          matter which paper, dataset, or coauthor you&apos;re working with.
        </p>

        <div className={styles.sectionLabel}>
          Example — ~/.claude/CLAUDE.md for an economist
        </div>

        <CodePanel label="Global" filename="~/.claude/CLAUDE.md">
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
        </CodePanel>

        <Callout kicker="Anti-pattern">
          A global file that&apos;s too broad — e.g., embedding an entire
          paper&apos;s methodology — belongs in the project file instead.
          The global file should hold true across every project; anything
          specific to one paper or dataset doesn&apos;t belong here.
        </Callout>
      </main>
      <NextSectionFooter currentId={3} />
    </>
  );
}
