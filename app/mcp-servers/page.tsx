import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function McpServersPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Building blocks", "MCP Servers"]}
        title="MCP Servers"
        subtitle="Connectors that let Claude read and query your research tools directly."
      />
      <RoadmapStepper currentSlug="mcp-servers" />
      <main className={styles.main}>
        <p className={styles.intro}>
          An MCP server is a standing connection between Claude and
          something outside the conversation — a database, a code host, a
          shared drive, a reference manager — exposed as a set of tools
          Claude can call directly instead of you exporting, copying, or
          pasting data in by hand.
        </p>
        <p className={styles.intro}>
          Where a skill standardizes how a task gets done, an MCP connector
          standardizes access to a system: once it&apos;s added, every
          session (yours and, if it&apos;s project-scoped, your
          coauthors&apos;) reaches the same database or repository the
          same way, instead of everyone working from their own export.
        </p>
        <p className={styles.intro}>
          The right mental model here is different from a skill or a
          subagent: you&apos;re not writing instructions or defining a
          role, you&apos;re granting a capability Claude doesn&apos;t have
          on its own. The judgment call is less about what to write and
          more about what to connect, and with what scope.
        </p>

        <h2 className={styles.subheading}>How to install one, and where it lives</h2>
        <CodePanel label="Terminal" filename="install an MCP server">
          {"claude mcp add --transport http github https://api.githubcopilot.com/mcp/"}
        </CodePanel>
        <p className={styles.intro}>
          That&apos;s the general pattern:{" "}
          <code>claude mcp add --transport &lt;http|sse|stdio&gt; &lt;name&gt; &lt;url-or-command&gt;</code>.
          Where it gets stored depends on the <code>--scope</code> flag:
        </p>
        <ul className={styles.plainList}>
          <li>
            <strong>--scope local</strong> (default) — this project only,
            saved in your personal <code>~/.claude.json</code> under that
            project&apos;s path. Not shared with coauthors.
          </li>
          <li>
            <strong>--scope project</strong> — shared with anyone who
            clones the repo, via a <code>.mcp.json</code> file at the
            project root (safe to commit — it holds server addresses, not
            your personal credentials). Coauthors get a one-time approval
            prompt the first time they open the project.
          </li>
          <li>
            <strong>--scope user</strong> — available across every project
            on your machine, stored in <code>~/.claude.json</code>. Good
            for personal-utility connectors you use everywhere (e.g. Google
            Drive), not project-specific ones.
          </li>
        </ul>
        <p className={styles.intro}>
          Check what&apos;s connected any time with{" "}
          <code>claude mcp list</code>, or <code>/mcp</code> from inside a
          session to see live status and toggle servers on/off.
        </p>

        <h2 className={styles.subheading}>Core connectors worth setting up</h2>
        <ul className={styles.plainList}>
          <li>
            <strong>GitHub</strong> — version control of code/data pipeline,
            PR review of analysis scripts
          </li>
          <li>
            <strong>Google Drive</strong> — shared drafts, professor-facing
            documents, comments
          </li>
          <li>
            <strong>A database connector</strong> (e.g. Postgres) — if
            source data lives in a DB rather than flat files, so Claude can
            query directly instead of you exporting CSVs by hand
          </li>
          <li>
            <strong>Jupyter/notebook or code-execution connector</strong> —
            for driving actual analysis sessions interactively rather than
            only editing scripts
          </li>
          <li>
            <strong>Reference manager</strong> (Zotero-style, where
            available) — pulling citation metadata directly instead of
            retyping it
          </li>
        </ul>

        <h2 className={styles.subheading}>Example use in a project</h2>
        <blockquote>
          &quot;Pull the three most-cited papers from our Zotero library
          tagged &apos;broadband&apos; and compare their identification
          strategies using the literature-reviewer subagent.&quot;
        </blockquote>
        <blockquote>
          &quot;Query the course Postgres database for county-year firm
          entry counts for 2010–2022, then hand off to the data-scientist
          subagent for EDA.&quot;
        </blockquote>

        <Callout kicker="Read vs. write boundary">
          MCP tools that read/query data can run without confirmation;
          anything that would modify a shared doc, push to a shared repo, or
          send data externally should always be confirmed before Claude
          acts, especially in a shared research setting with a
          professor&apos;s data.
        </Callout>
      </main>
      <NextSectionFooter currentId={9} />
    </>
  );
}
