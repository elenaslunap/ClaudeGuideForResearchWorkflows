import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import CodePanel, { CodeComment, CodeKey, CodeStr } from "@/components/CodePanel";
import Callout from "@/components/Callout";
import NextSectionFooter from "@/components/NextSectionFooter";
import styles from "@/styles/content.module.css";

export default function WorkedExamplePersonalPage() {
  return (
    <>
      <SectionHero
        breadcrumb={[
          "Worked examples",
          "See it all together",
          "Personal Usage (Calendar, Shopping Research, Email, File Organizing, Cowork)",
        ]}
        title="Personal Usage (Calendar, Shopping Research, Email, File Organizing, Cowork)"
        subtitle="Skills, MCP connectors, subagents, and Cowork — at work in ordinary daily use, not just the paper."
      />
      <RoadmapStepper currentSlug="worked-example-personal" />
      <main className={styles.main}>
        <Callout kicker="Context note">
          This example runs mostly in the <strong>Claude.ai / Claude
          Desktop / Claude apps</strong> world (chat + connectors), not the
          Claude Code terminal. The equivalent of a &quot;global
          CLAUDE.md&quot; here is <strong>Settings → Preferences</strong>{" "}
          (standing instructions Claude uses in every chat), plus{" "}
          <strong>connectors</strong> (Google Calendar, Gmail, Google Drive,
          etc.) instead of MCP servers configured in a project. The first
          four examples below are each deliberately built around a{" "}
          <strong>skill, an MCP connector, or a subagent</strong> — the same
          building blocks from the research sections at work in ordinary
          daily use. The fifth introduces a different kind of building
          block entirely: <strong>Cowork</strong>, for tasks that need to
          run on their own rather than turn-by-turn in a chat.
        </Callout>

        <h2 className={styles.subheading}>
          14.1 Calendar: scheduling a study group / office hours around a deadline
        </h2>
        <p className={styles.intro}>
          <strong>Mechanism: MCP connector</strong> — Google Calendar (+
          Gmail, to see who replied)
        </p>
        <blockquote>
          &quot;My work hours are 9am–6pm CET. Always propose meeting times
          in my timezone. Default meeting length is 30 minutes unless I say
          otherwise. Never send an invite without showing me the draft
          first.&quot;
        </blockquote>
        <blockquote>
          &quot;Check my calendar for the next two weeks and find three
          45-minute slots where my thesis advisor and I are both free,
          avoiding my Tuesday morning class. Draft the invite but
          don&apos;t send it yet.&quot;
        </blockquote>
        <p className={styles.intro}>
          <strong>What Claude actually does:</strong> reads calendar
          availability through the Google Calendar MCP connector, proposes
          slots, drafts (but doesn&apos;t send) the invite, and waits for
          confirmation.
        </p>
        <Callout kicker="Guardrail">
          Actions that <em>send, modify, or delete</em> (sending the
          invite, not just drafting it) should always get an explicit
          confirmation step — a good moment to explain why Claude asks
          before acting on external accounts, rather than treating it as
          unnecessary friction.
        </Callout>

        <h2 className={styles.subheading}>
          14.2 Shopping research: buying a new laptop for data-heavy work
        </h2>
        <p className={styles.intro}>
          <strong>Mechanism: personal Skill</strong> —{" "}
          <code>product-comparison-framework</code>, a small skill (in{" "}
          <code>~/.claude/skills/</code>) that encodes <em>how you like
          tradeoffs presented</em>, so every purchase decision gets the same
          treatment instead of reinventing the approach each time.
        </p>
        <CodePanel label="Skill" filename="product-comparison-framework/SKILL.md">
          <CodeComment>---</CodeComment>
          {"\n"}
          <CodeKey>name:</CodeKey> <CodeStr>product-comparison-framework</CodeStr>
          {"\n"}
          <CodeKey>description:</CodeKey>{" "}
          <CodeStr>
            {`Use whenever comparing products before a purchase decision\n  (electronics, appliances, software subscriptions). Applies to any "help me\n  choose between X" request.`}
          </CodeStr>
          {"\n"}
          <CodeComment>---</CodeComment>
        </CodePanel>
        <p className={styles.intro}>
          Body: always separate &quot;what actually matters for my stated
          use case&quot; from &quot;marketing specs that don&apos;t,&quot;
          name the single spec that matters most before comparing SKUs,
          cite current prices/specs rather than relying on memory (search
          first), and never push toward one option — present tradeoffs and
          let the reader decide.
        </p>
        <blockquote>
          &quot;I need a laptop for R/Python data work — think large
          regressions and occasional local LLM experiments, budget around
          €1,500. Use my comparison framework and walk me through it.&quot;
        </blockquote>
        <p className={styles.intro}>
          <strong>What a good answer looks like:</strong> Claude explains
          the tradeoff (e.g. RAM matters more than GPU for most
          econometrics workloads; GPU matters for local ML) before
          recommending SKUs, searches for current listings, and ends with a
          factual comparison rather than a confident &quot;buy this
          one&quot; — the skill is what makes this consistent every time
          instead of a one-off good answer.
        </p>

        <h2 className={styles.subheading}>
          14.3 Email: triaging a cluttered inbox before a trip
        </h2>
        <p className={styles.intro}>
          <strong>Mechanism: MCP connector</strong> — Gmail
        </p>
        <blockquote>
          &quot;When summarizing my inbox, flag anything from my advisor or
          coauthors as high priority. Draft replies in a direct, friendly
          tone — not overly formal. Never send anything automatically.&quot;
        </blockquote>
        <blockquote>
          &quot;Summarize unread emails from the last 3 days, group them by
          urgent / can-wait / no-reply-needed, and draft replies for the
          urgent ones so I can review before I leave for the
          conference.&quot;
        </blockquote>
        <p className={styles.intro}>
          <strong>What Claude does:</strong> reads and categorizes through
          the Gmail connector (read-only, no confirmation needed), then{" "}
          <em>drafts</em> replies (still no send) — sending is the one step
          that always needs an explicit yes.
        </p>

        <h2 className={styles.subheading}>
          14.4 File organizing: cleaning up a messy Drive/downloads folder
        </h2>
        <p className={styles.intro}>
          <strong>Mechanism: MCP connector + subagent</strong> — Google
          Drive connector for the files themselves, and a dedicated{" "}
          <code>file-organizer</code> subagent so the (fairly mechanical,
          somewhat repetitive) sorting work happens in its own context
          window instead of cluttering your main chat.
        </p>
        <CodePanel label="Subagent" filename="file-organizer.md">
          <CodeComment>---</CodeComment>
          {"\n"}
          <CodeKey>name:</CodeKey> <CodeStr>file-organizer</CodeStr>
          {"\n"}
          <CodeKey>description:</CodeKey>{" "}
          <CodeStr>
            {`Use when the user wants to sort, rename, or declutter files in\n  Drive or a local folder. Proposes a plan; never moves or deletes files\n  without approval.`}
          </CodeStr>
          {"\n"}
          <CodeKey>tools:</CodeKey> <CodeStr>read</CodeStr>
          {"\n"}
          <CodeComment>---</CodeComment>
          {`
You help organize messy file collections. Given a folder listing: (1) group
files by apparent type/project using name and date, (2) flag likely
duplicates or obviously stale files (old drafts, "final_final_v3"-style
names), (3) propose a folder structure and rename plan as a table, and
(4) never move, rename, or delete anything until the plan is approved.`}
        </CodePanel>
        <blockquote>
          &quot;Use the file-organizer subagent to look at my &apos;Thesis
          Drafts&apos; Drive folder — it&apos;s a mess of v1/v2/final
          files. Propose a clean structure and a rename plan, but
          don&apos;t touch anything yet.&quot;
        </blockquote>
        <p className={styles.intro}>
          <strong>What Claude does:</strong> the subagent reads the folder
          via the Drive connector, returns a proposed structure and rename
          table to the main conversation, and only executes
          (moving/renaming through the connector) after you approve —
          keeping the exploratory back-and-forth about &quot;wait, keep
          that one&quot; out of your main session context.
        </p>

        <h2 className={styles.subheading}>
          14.5 Cowork: a weekly literature-scan handed off, not chatted through
        </h2>
        <p className={styles.intro}>
          <strong>Mechanism: Cowork</strong>, not a skill/MCP/subagent —
          this is a different surface, not a different building block
          layered onto chat. Where the rest of this section is &quot;ask,
          get an answer in the same conversation,&quot; Cowork is for
          describing an <em>outcome</em>, stepping away, and coming back to
          finished work — it runs your task in its own environment, keeps
          going even if you close your laptop, and can be scheduled to
          repeat on its own.
        </p>
        <blockquote>
          &quot;Every Monday morning, check for new working papers matching
          &apos;minimum wage&apos; or &apos;monopsony&apos; on my usual
          sources, summarize the two or three most relevant using our
          standard lit-review format, and put together a short slide deck
          of the highlights. Message me when it&apos;s ready.&quot;
        </blockquote>
        <p className={styles.intro}>
          <strong>What Cowork actually does:</strong> it plans the task,
          runs it in its own isolated session (not tying up your main
          chat), produces an actual slide deck as a file rather than just a
          chat reply, and — because this was set up as a recurring
          scheduled task — repeats it automatically every week without
          being asked again. You get a notification when it&apos;s done, on
          whichever device you check next.
        </p>
        <p className={styles.intro}>
          <strong>Where this differs from everything else in Section 14:</strong>{" "}
          the calendar, email, and file-organizing examples all still
          happen turn-by-turn inside a conversation you&apos;re actively
          watching. Cowork is the right tool specifically when the task is
          multi-step, takes real time, and doesn&apos;t need you present
          for every step of it — a one-off &quot;find me a laptop&quot;
          question doesn&apos;t need this; a recurring literature scan that
          ends in a deliverable file does.
        </p>
        <Callout kicker="Guardrail">
          Cowork can take real actions with real access (local files,
          connected apps, sometimes your computer directly) — the same
          draft-then-confirm discipline from the rest of this section still
          applies, and it&apos;s worth being deliberate about which
          folders/accounts a scheduled task can reach, precisely because it
          runs unattended.
        </Callout>

        <div className={styles.sectionLabel}>Personal preference (Settings) → example</div>
        <table>
          <thead>
            <tr>
              <th>Personal preference (Settings)</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scheduling</td>
              <td>&quot;Always draft, never send, calendar invites without confirmation&quot;</td>
            </tr>
            <tr>
              <td>Tone</td>
              <td>&quot;Draft emails in a direct, friendly tone&quot;</td>
            </tr>
            <tr>
              <td>Shopping</td>
              <td>&quot;Give tradeoffs before recommendations, never push me toward one option&quot;</td>
            </tr>
            <tr>
              <td>File organizing</td>
              <td>&quot;Always propose a plan before moving or deleting anything&quot;</td>
            </tr>
            <tr>
              <td>Cowork / scheduled tasks</td>
              <td>&quot;Confirm which folders/accounts a task can reach before the first run&quot;</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.sectionLabel}>Same building blocks, in daily use</div>
        <table>
          <thead>
            <tr>
              <th>Example</th>
              <th>Building block used</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Calendar scheduling</td>
              <td>MCP connector (Google Calendar)</td>
            </tr>
            <tr>
              <td>Shopping research</td>
              <td>
                Personal Skill (<code>product-comparison-framework</code>)
              </td>
            </tr>
            <tr>
              <td>Email triage</td>
              <td>MCP connector (Gmail)</td>
            </tr>
            <tr>
              <td>File organizing</td>
              <td>
                MCP connector (Drive) + Subagent (<code>file-organizer</code>)
              </td>
            </tr>
            <tr>
              <td>Weekly literature scan</td>
              <td>Cowork (scheduled task, own environment, file output)</td>
            </tr>
          </tbody>
        </table>
      </main>
      <NextSectionFooter currentId={14} />
    </>
  );
}
