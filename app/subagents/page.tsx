import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeComment, CodeKey, CodeStr } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function SubagentsPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Building blocks", "Subagents"]}
        title="Subagents"
        subtitle="Specialized roles with isolated context — keep a big literature search or adversarial review out of your main window."
      />
      <RoadmapStepper currentSlug="subagents" />
      <main className={styles.main}>
        <p className={styles.intro}>
          A subagent is a separate context window with its own system
          prompt and tool access — useful for keeping a large literature
          search or an adversarial review from polluting your main working
          context.
        </p>
        <p className={styles.intro}>
          Where a skill hands Claude a reusable procedure to run inline, a
          subagent hands off an entire piece of work to a
          separately-configured version of Claude — its own role, its own
          tools, and no visibility into your main conversation beyond what
          you give it. That isolation is the point: a subagent can
          specialize (a skeptical reviewer, a literature searcher, a
          replication auditor) without every specialization permanently
          occupying your main context.
        </p>
        <p className={styles.intro}>
          The right mental model when writing one: you&apos;re defining a
          role, not cloning yourself. A good subagent has a job narrow
          enough to do one thing well, and — where it matters — a reason
          to disagree with the main conversation: a{" "}
          <code>model-critic</code> rewarded for finding problems, not for
          agreeing with the estimate you already like.
        </p>

        <h2 className={styles.subheading}>How to build a subagent</h2>
        <ol className={styles.stepList}>
          <li className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Start from friction, not ambition</strong> — write
                one when a specific step (a literature scan, an adversarial
                review) keeps bloating your main context, not because a
                role sounds useful in the abstract.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Give it one job and say so in the description</strong>{" "}
                — the description is what triggers automatic delegation, so
                it needs to name the exact situation, not a general area of
                expertise.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Scope its tools deliberately</strong> — a reviewer
                that only reads code shouldn&apos;t have bash; the tool
                list doubles as a safety boundary.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNumber}>4</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Write the system prompt like a job description</strong>{" "}
                — the role, what to check, what to output, in that order.
              </p>
            </div>
          </li>
          <li className={styles.step}>
            <span className={styles.stepNumber}>5</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Decide how it hands work back</strong> — a
                comparison table, a structured summary, a flagged list — so
                the main conversation gets something usable, not a wall of
                text to re-read.
              </p>
            </div>
          </li>
        </ol>

        <div className={styles.sectionLabel}>
          Example — .claude/agents/literature-reviewer.md
        </div>
        <CodePanel label="Subagent" filename="literature-reviewer.md">
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
        </CodePanel>

        <div className={styles.sectionLabel}>
          Example — .claude/agents/model-critic.md
        </div>
        <CodePanel label="Subagent" filename="model-critic.md">
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
        </CodePanel>

        <div className={styles.sectionLabel}>
          Example — replication-auditor subagent
        </div>
        <p className={styles.intro}>
          Given read-only access to <code>data/raw/</code> and the pipeline
          scripts, independently re-runs the pipeline and diffs its output
          numbers against the ones currently cited in the paper draft,
          flagging any mismatch.
        </p>

        <h2 className={styles.subheading}>Chaining example (advanced usage)</h2>
        <CodePanel label="Chain" filename="advanced usage">
          {"literature-reviewer  →  data-scientist (EDA)  →  model-critic  →  writer"}
        </CodePanel>
        <p className={styles.intro}>
          Each subagent hands off a structured summary rather than raw
          context, keeping each step&apos;s window focused.
        </p>

        <Callout kicker="Automatic vs. explicit">
          Claude routes to a subagent <strong>automatically</strong> based
          on its description, or you can <strong>explicitly invoke</strong>{" "}
          one (&quot;use the model-critic subagent to review this&quot;).
          Prefer automatic delegation for routine steps, explicit invocation
          when you want a second opinion on demand.
        </Callout>
      </main>
      <NextSectionFooter currentId={8} />
    </>
  );
}
