import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function WorkedExampleResearchPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Worked examples", "See it all together", "Research Stages End-to-End"]}
        title="Research Stages End-to-End"
        subtitle="Every building block from Stages 2–5, applied together across one real project, stage by stage."
      />
      <RoadmapStepper currentSlug="worked-example-research" />
      <main className={styles.main}>
        <h2 className={styles.subheading}>13.1 Question formation & literature review</h2>
        <p className={styles.intro}>
          Skill: <code>lit-review-synthesis</code>. Subagent:{" "}
          <code>literature-reviewer</code>.
        </p>
        <blockquote>
          &quot;Find 10 recent papers on monetary policy transmission
          through small-bank lending; summarize using our standard format
          and flag any that contradict each other on the transmission
          channel.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.2 Data acquisition & cleaning</h2>
        <p className={styles.intro}>
          Skill: <code>data-cleaning-conventions</code>.
        </p>
        <blockquote>
          &quot;Merge the FCC broadband files with Census BFS county data;
          apply our standard pre-2015 correction, and give me a
          before/after row count and a list of unmatched counties.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.3 Exploratory data analysis</h2>
        <p className={styles.intro}>
          Subagent: built-in <code>data-scientist</code> type.
        </p>
        <blockquote>
          &quot;Give me summary stats and a distribution plot for firm entry
          by treatment cohort, flag anything that looks like a data error
          before I model it.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.4 Modeling / estimation</h2>
        <p className={styles.intro}>
          Skill: <code>econometrics-diagnostics</code>. Subagent:{" "}
          <code>model-critic</code>.
        </p>
        <blockquote>
          &quot;Estimate the Callaway-Sant&apos;Anna diff-in-diff, then have
          the model-critic subagent review the identification assumption
          and flag any missing robustness check.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.5 Robustness, validation, replication</h2>
        <p className={styles.intro}>
          Skill: <code>replication-audit</code>. Subagent:{" "}
          <code>replication-auditor</code>.
        </p>
        <blockquote>
          &quot;Re-derive Table 3 from raw data independently and tell me
          if anything doesn&apos;t match the current draft.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.6 Visualization & tables</h2>
        <blockquote>
          &quot;Turn the estimation output into a modelsummary LaTeX table
          matching the format of Table 1, and a ggplot event-study figure
          with our theme_paper() styling.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.7 Writing & LaTeX assembly</h2>
        <p className={styles.intro}>
          Nested <code>paper/CLAUDE.md</code> rules apply here (citation
          style, word limit).
        </p>
        <blockquote>
          &quot;Draft the results section referencing only numbers that
          exist in output/tables/, cite each claim to the specific
          table/cell.&quot;
        </blockquote>

        <h2 className={styles.subheading}>13.8 Version control & reproducibility hygiene</h2>
        <blockquote>
          &quot;Before I commit, check that data/raw/ wasn&apos;t modified
          and that <code>make all</code> reproduces every number currently
          in the draft.&quot;
        </blockquote>
      </main>
      <NextSectionFooter currentId={13} />
    </>
  );
}
