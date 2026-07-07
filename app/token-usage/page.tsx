import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function TokenUsagePage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Work efficiently", "Token Usage & Context"]}
        title="Token Usage & Context"
        subtitle="Context is Claude's working memory for the session — manage it like a budget."
      />
      <RoadmapStepper currentSlug="token-usage" />
      <main className={styles.main}>
        <p className={styles.intro}>
          Research sessions are prone to exactly the failure mode that
          burns context fastest: reading large data files, long
          back-and-forth on a modeling decision, and carrying a whole
          literature review in one conversation. Context is Claude&apos;s{" "}
          <strong>working memory</strong> for the session — as it fills,
          quality degrades before you hit any hard limit, not just at it.
        </p>

        <h2 className={styles.subheading}>
          What fills the context window before you even type
        </h2>
        <ul className={styles.plainList}>
          <li>The system prompt and tool definitions</li>
          <li>
            CLAUDE.md (global + project + local + nested) — reloaded on
            every single message
          </li>
          <li>
            Any connected MCP servers&apos; tool definitions (an idle
            Zotero/database connector still costs tokens)
          </li>
          <li>
            Skills only load when invoked — this is <em>why</em> skills are
            cheaper than stuffing everything into CLAUDE.md
          </li>
          <li>Auto-memory notes</li>
        </ul>

        <h2 className={styles.subheading}>The core commands</h2>
        <table>
          <thead>
            <tr>
              <th>Command</th>
              <th>What it does</th>
              <th>When to use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>/context</code>
              </td>
              <td>Shows a full breakdown of what&apos;s consuming the window</td>
              <td>Every 30–60 min in a long session</td>
            </tr>
            <tr>
              <td>
                <code>/compact [instructions]</code>
              </td>
              <td>Summarizes history, keeps working</td>
              <td>Mid-task, ~50–60% full</td>
            </tr>
            <tr>
              <td>
                <code>/clear</code>
              </td>
              <td>Wipes history, keeps CLAUDE.md/files</td>
              <td>Switching tasks entirely</td>
            </tr>
            <tr>
              <td>
                <code>/rewind</code> → &quot;Summarize up to here&quot;
              </td>
              <td>Partial compaction of only the older part</td>
              <td>Long sessions with one part that&apos;s now irrelevant</td>
            </tr>
          </tbody>
        </table>

        <h2 className={styles.subheading}>
          Example: a realistic research session budget
        </h2>
        <CodePanel label="Terminal" filename="session start">
          {`$ claude
> /context
System prompt + tools:      ~8%
CLAUDE.md (global+project):  ~4%
Skills loaded (2 invoked):   ~3%
MCP tool defs (GitHub, DB):  ~5%
Conversation so far:         ~12%
Free:                        ~68%`}
        </CodePanel>
        <p className={styles.intro}>
          After an hour of reading raw CSVs and iterating on a cleaning
          script:
        </p>
        <CodePanel label="Terminal" filename="an hour later">
          {`> /context
Conversation so far:         ~58%
Free:                        ~30%   <- time to /compact
> /compact focus on the merge logic and the final row-count diagnostics,
  drop the intermediate debugging back-and-forth`}
        </CodePanel>

        <h2 className={styles.subheading}>Research-specific token discipline</h2>
        <ul className={styles.plainList}>
          <li>
            <strong>Don&apos;t paste large datasets or raw CSVs into the
            chat</strong> — reference the file path and let Claude read
            only what it needs (or better, have it summarize/query rather
            than dump full contents).
          </li>
          <li>
            <strong>Use subagents for literature search and EDA</strong> —
            they run in their own context window and report back a
            summary, keeping your main session clean. This is the single
            best lever for a literature-heavy project.
          </li>
          <li>
            <strong>Disconnect MCP servers you&apos;re not using this
            session</strong> (<code>/mcp</code>) — an idle
            reference-manager or database connector still costs tokens on
            every message.
          </li>
          <li>
            <strong>Keep CLAUDE.md lean</strong> (rule of thumb: under
            ~200–300 lines) — it&apos;s reloaded on every message, so a
            bloated file is a recurring tax, not a one-time cost.
          </li>
          <li>
            <strong>Split sessions by stage</strong>, not by calendar day —
            one session for cleaning, a fresh one for modeling, a fresh one
            for writing, rather than one marathon session covering all
            three.
          </li>
          <li>
            <strong>API-key users:</strong> <code>/cost</code> shows
            running spend; be aware prompt caching lowers the{" "}
            <em>dollar</em> cost of repeated context like CLAUDE.md, but it
            still occupies context-window <em>space</em>.
          </li>
        </ul>

        <Callout kicker="Decision box">
          &quot;Claude seems to be forgetting something we agreed on 20
          minutes ago&quot; → check <code>/context</code>, then{" "}
          <code>/compact</code> or <code>/clear</code> depending on whether
          you&apos;re still mid-task or moving on.
        </Callout>
      </main>
      <NextSectionFooter currentId={11} />
    </>
  );
}
