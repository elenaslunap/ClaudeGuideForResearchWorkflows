import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel from "@/components/CodePanel";
import Checklist from "@/components/Checklist";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function QuickstartPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Start here", "Quickstart"]}
        title="Quickstart"
        subtitle="A working setup in under ten minutes."
      />
      <RoadmapStepper currentSlug="" />
      <main className={styles.main}>
        <p className={styles.intro}>
          <strong>
            This section&apos;s only job is to get someone from zero to
            &quot;Claude actually understands my project&quot; in one
            sitting
          </strong>{" "}
          — everything after this section explains the <em>why</em> and the{" "}
          <em>advanced</em> version of each piece. If a reader does nothing
          else in this guide, this section alone should meaningfully improve
          their results.
        </p>

        <h2 className={styles.subheading}>The five things, in order</h2>

        <ol className={styles.stepList}>
          <li className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Add a project <code>CLAUDE.md</code> at the repo
                root.</strong> Minimum viable version — just three things:
                what this project is, where things live, how to run it.
              </p>
              <CodePanel label="Template" filename="CLAUDE.md">
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
              </CodePanel>
              <p>That&apos;s enough for Claude to stop guessing at your project&apos;s shape.</p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Add a <code>.gitignore</code> entry before you do
                anything else.</strong>
              </p>
              <CodePanel label="Add first" filename=".gitignore">
                {`CLAUDE.local.md\n.claude/memory/`}
              </CodePanel>
              <p>
                Do this <em>first</em>, not after you&apos;ve already
                committed a personal note or a stray API key.
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Run <code>/init</code> in a new codebase.</strong>{" "}
                Claude Code can scan the repo and draft a starting{" "}
                <code>CLAUDE.md</code> for you — treat the draft as a first
                pass to edit down, not a finished file (auto-generated files
                tend to include things Claude can already infer from the
                code, which just adds reload cost for no benefit).
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>4</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Check what Claude actually loaded.</strong> Run{" "}
                <code>/memory</code> at the start of a session. If something
                you expected isn&apos;t listed, it&apos;s not being applied
                — this is the single fastest way to debug &quot;Claude
                isn&apos;t following my instructions.&quot;
              </p>
            </div>
          </li>

          <li className={styles.step}>
            <span className={styles.stepNumber}>5</span>
            <div className={styles.stepBody}>
              <p>
                <strong>Say the one thing that isn&apos;t in the code.</strong>{" "}
                Whatever a new collaborator would need explained out loud in
                their first five minutes — a data quirk, a non-obvious
                convention, a landmine — put that in CLAUDE.md. Don&apos;t
                restate what Claude can already read from the files
                themselves.
              </p>
            </div>
          </li>
        </ol>

        <h2 className={styles.subheading}>
          What &quot;good enough for day one&quot; looks like
        </h2>
        <p className={styles.intro}>
          A project CLAUDE.md under 30 lines that covers <em>what/where/how</em>{" "}
          is worth more than a 200-line file written before you&apos;ve felt
          any actual friction. Everything in Stages 3–4 of this guide
          (global preferences, skills, subagents, MCP) is worth adding once a
          specific repeated annoyance justifies it — not up front.
        </p>

        <Checklist
          items={[
            "Project CLAUDE.md added",
            ".gitignore updated",
            "Ran /memory to confirm",
          ]}
        />
      </main>
      <NextSectionFooter currentId={1} />
    </>
  );
}
