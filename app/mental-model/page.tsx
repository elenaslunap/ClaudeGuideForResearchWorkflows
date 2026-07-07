import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function MentalModelPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Understand the model", "Mental Model"]}
        title="Mental Model"
        subtitle="Why the setup in Stage 1 works the way it does."
      />
      <RoadmapStepper currentSlug="mental-model" />
      <main className={styles.main}>
        <p className={styles.intro}>
          Claude Code reads instructions from four layers, stacked broad →
          narrow. All layers are <strong>additive</strong> — nothing is
          silently overwritten, so conflicting instructions should be
          avoided rather than relied upon to &quot;win.&quot;
        </p>

        <table>
          <thead>
            <tr>
              <th>Layer</th>
              <th>Location</th>
              <th>Shared?</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Global</td>
              <td>
                <code>~/.claude/CLAUDE.md</code>
              </td>
              <td>No (personal, machine-wide)</td>
              <td>Standing preferences across every project</td>
            </tr>
            <tr>
              <td>Project</td>
              <td>
                <code>./CLAUDE.md</code> (repo root)
              </td>
              <td>Yes (commit to git)</td>
              <td>Facts specific to this paper/dataset</td>
            </tr>
            <tr>
              <td>Local</td>
              <td>
                <code>./CLAUDE.local.md</code>
              </td>
              <td>No (gitignored)</td>
              <td>Your personal scratch notes on this project</td>
            </tr>
            <tr>
              <td>Nested</td>
              <td>
                <code>./paper/CLAUDE.md</code>, <code>./data/CLAUDE.md</code>
              </td>
              <td>Yes if committed</td>
              <td>Rules scoped to a subtree only</td>
            </tr>
          </tbody>
        </table>

        <p className={styles.intro}>
          There&apos;s also <strong>auto-memory</strong> (session-persisted
          notes Claude accumulates per project at{" "}
          <code>~/.claude/projects/&lt;hash&gt;/</code>), which is newer and
          worth teaching separately so people don&apos;t confuse it with
          CLAUDE.md.
        </p>

        <div className={styles.stackDiagram}>
          <div className={styles.stackLayer}>
            <div className={styles.stackLayerTitle}>Global</div>
            <div className={styles.stackLayerBody}>~/.claude/CLAUDE.md — loads first, every project</div>
          </div>
          <div className={styles.stackLayer}>
            <div className={styles.stackLayerTitle}>Project</div>
            <div className={styles.stackLayerBody}>./CLAUDE.md — this repo, shared with coauthors</div>
          </div>
          <div className={styles.stackLayer}>
            <div className={styles.stackLayerTitle}>Local</div>
            <div className={styles.stackLayerBody}>./CLAUDE.local.md — this machine only, gitignored</div>
          </div>
          <div className={styles.stackLayer}>
            <div className={styles.stackLayerTitle}>Nested</div>
            <div className={styles.stackLayerBody}>./paper/CLAUDE.md, ./data/CLAUDE.md — loads last, subtree only</div>
          </div>
        </div>

        <h2 className={styles.subheading}>
          Example: how a session actually loads context
        </h2>
        <CodePanel label="Terminal" filename="session start">
          {`$ cd ~/research/inflation-expectations-paper
$ claude
# Claude Code walks up the tree and loads, in order:
#   ~/.claude/CLAUDE.md          (your global stats/citation conventions)
#   ~/research/CLAUDE.md          (if you have one for the whole research folder)
#   ~/research/inflation-expectations-paper/CLAUDE.md   (project file)
#   ~/research/inflation-expectations-paper/CLAUDE.local.md (your private notes)
# Run /memory at any time to see exactly what's active.`}
        </CodePanel>

        <h2 className={styles.subheading}>What is the context window?</h2>
        <p className={styles.intro}>
          The context window is everything Claude can &quot;see&quot; at
          once in a given turn — the system prompt, every CLAUDE.md file
          loaded per the hierarchy above, any skills that got triggered,
          MCP tool definitions, and the full conversation so far. It&apos;s
          finite (measured in tokens, roughly ¾ of a word each), and unlike
          memory files, <strong>nothing here persists once the window fills
          up and old content gets pushed out or summarized</strong> — this
          is why a bloated CLAUDE.md has a real, recurring cost
          (it&apos;s reloaded into this same window on every message), and
          why very long sessions can start to &quot;forget&quot; something
          that was said an hour earlier. Section 11 (Token Usage &amp;
          Context Management) covers how to monitor and manage this
          directly; the thing worth internalizing here is just that the
          memory hierarchy and the context window are two different
          concepts — CLAUDE.md controls <em>what gets loaded</em>, the
          context window is <em>the space it all has to fit in</em>.
        </p>

        <Callout kicker="Rule of thumb">
          If it would change what Claude does, it belongs here. If Claude
          can infer it from the code/data, leave it out.
        </Callout>

        <Callout kicker="Watch out">
          Don&apos;t dump everything into one file — medium-length CLAUDE.md
          files (rule of thumb: under ~200 lines) perform far better than
          sprawling ones.
        </Callout>
      </main>
      <NextSectionFooter currentId={2} />
    </>
  );
}
