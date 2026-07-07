import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function PlanModeAndTerminalPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Work efficiently", "Plan Mode & Terminal"]}
        title="Plan Mode & Terminal"
        subtitle="The single highest-value habit for research work — approve a plan before Claude touches your data or results."
      />
      <RoadmapStepper currentSlug="plan-mode-and-terminal" />
      <main className={styles.main}>
        <h2 className={styles.subheading}>Plan Mode</h2>
        <p className={styles.intro}>
          A read-only permission state: Claude can explore files, run
          searches, and read data, but <strong>cannot</strong> edit files,
          run state-changing commands, or touch MCP tools that modify
          anything — until you approve a written plan. This is the single
          highest-value habit for research work, because a &quot;quick
          regression&quot; prompt can otherwise quietly rewrite a cleaning
          script, overwrite a results table, or change an estimator without
          you noticing until it&apos;s already done.
        </p>

        <h2 className={styles.subheading}>How to activate</h2>
        <ul className={styles.plainList}>
          <li>
            <code>Shift+Tab</code> twice from the default mode (cycles
            Default → Auto-Accept → Plan)
          </li>
          <li>
            <code>/plan</code> at the start of a prompt — plans just that
            one turn
          </li>
          <li>
            Start the whole session in it: <code>claude --permission-mode plan</code>
          </li>
          <li>
            Headless/scripted: <code>claude --print --permission-mode plan &quot;your task&quot;</code>
          </li>
        </ul>

        <h2 className={styles.subheading}>When it matters most for research (not just code)</h2>
        <ul className={styles.plainList}>
          <li>Any task touching the data pipeline (cleaning, merging, recoding variables)</li>
          <li>Changing an estimator or specification</li>
          <li>Regenerating tables/figures that feed directly into the paper draft</li>
          <li>Anything where you&apos;d be annoyed to discover the change <em>after</em> it happened</li>
        </ul>

        <p className={styles.intro}>
          <strong>When to skip it:</strong> read-only questions
          (&quot;what does this column mean&quot;), single-line tweaks,
          exploratory one-off questions with no side effects.
        </p>

        <h2 className={styles.subheading}>Example session</h2>
        <CodePanel label="Terminal" filename="plan mode session">
          {`$ claude --permission-mode plan
> Re-derive Table 3 using the corrected FIPS crosswalk and tell me if the
  estimate changes meaningfully.

Claude (plan mode): I'll (1) read data/raw/fips_crosswalk_v2.csv, (2) re-run
code/00_fips_crosswalk.R with the corrected file, (3) re-run code/03_estimate.R,
(4) diff the new coefficient against the one currently in paper/main.tex.
I will not overwrite output/tables/table3.tex — I'll write to
output/tables/table3_v2_check.tex instead so you can compare both.
Proceed? [y/n]`}
        </CodePanel>

        <h2 className={styles.subheading}>Other terminal features worth teaching</h2>
        <ul className={styles.plainList}>
          <li>
            <code>/clear</code> — wipes conversation history but keeps
            CLAUDE.md/project files available; use between unrelated tasks
            (e.g., switching from &quot;clean the data&quot; to &quot;draft
            the intro&quot;).
          </li>
          <li>
            <code>/compact [instructions]</code> — summarizes the
            conversation instead of wiping it; use mid-task.{" "}
            <code>/compact focus on the estimation decisions and diagnostics, not the plotting back-and-forth</code>{" "}
            keeps what matters for research continuity.
          </li>
          <li>
            <code>/rewind</code> (or Esc twice) — step back to an earlier
            checkpoint in the conversation, with the option to
            &quot;Summarize from here&quot; or &quot;Summarize up to
            here&quot; for partial compaction.
          </li>
          <li>
            <code>--resume</code> / <code>--continue</code> — reopen a past
            session; useful for picking up a long data-cleaning session the
            next day, but be aware it also reloads that session&apos;s
            accumulated context (see the token usage section next).
          </li>
          <li>
            <code>/model</code> — switch models mid-session; Sonnet for
            routine cleaning/EDA scripting, Opus for a genuinely hard
            identification/estimation-strategy question.
          </li>
          <li>
            <code>/agents</code> — manage subagents interactively rather
            than hand-editing files.
          </li>
          <li>
            <code>/mcp</code> — see and disconnect connected MCP servers
            (useful for both permissions and token budget).
          </li>
          <li>
            <code>/usage</code> and <code>/cost</code> — check plan usage /
            running spend for the session.
          </li>
        </ul>

        <Callout kicker="Habits, not just features">
          Plan Mode for anything touching data or results, <code>/clear</code>{" "}
          between tasks, and checking <code>/model</code> before a long
          estimation-strategy discussion.
        </Callout>
      </main>
      <NextSectionFooter currentId={10} />
    </>
  );
}
