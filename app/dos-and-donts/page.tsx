import SectionHero from "@/components/SectionHero";
import RoadmapStepper from "@/components/RoadmapStepper";
import NextSectionFooter from "@/components/NextSectionFooter";
import contentStyles from "@/styles/content.module.css";
import styles from "./page.module.css";

interface ChecklistGroup {
  title: string;
  items: React.ReactNode[];
}

const groups: ChecklistGroup[] = [
  {
    title: "Memory (CLAUDE.md)",
    items: [
      <>
        <strong>Do</strong> keep it under ~200–300 lines — only things that
        change Claude&apos;s behavior, not things it can infer from the
        code.
      </>,
      <>
        <strong>Do</strong> run <code>/memory</code> after writing one, to
        confirm what&apos;s actually loaded.
      </>,
      <>
        <strong>Don&apos;t</strong> treat CLAUDE.md as documentation for
        humans — it&apos;s reloaded every message, so bloat has a real
        recurring cost.
      </>,
      <>
        <strong>Don&apos;t</strong> wait until after your first commit to{" "}
        <code>.gitignore</code> <code>CLAUDE.local.md</code> — do it first.
      </>,
    ],
  },
  {
    title: "Skills",
    items: [
      <>
        <strong>Do</strong> check whether a well-maintained public skill
        already covers what you need before writing your own (Section 7).
      </>,
      <>
        <strong>Don&apos;t</strong> install a third-party skill without
        reading its <code>SKILL.md</code> first — it can run code and hit
        the network, same risk class as any dependency.
      </>,
      <>
        <strong>Don&apos;t</strong> build several skills with overlapping
        trigger descriptions — they&apos;ll compete instead of one clearly
        winning.
      </>,
    ],
  },
  {
    title: "Subagents",
    items: [
      <>
        <strong>Do</strong> give a subagent a genuinely distinct role (a
        skeptical <code>model-critic</code>, not a second copy of the main
        assistant).
      </>,
      <>
        <strong>Don&apos;t</strong> chain more subagents than a task
        actually needs — each hop adds latency and a summarization step
        that can lose detail.
      </>,
    ],
  },
  {
    title: "MCP connectors",
    items: [
      <>
        <strong>Do</strong> choose <code>--scope</code> deliberately (local
        / project / user) rather than always defaulting to one.
      </>,
      <>
        <strong>Don&apos;t</strong> leave unused connectors attached
        &quot;just in case&quot; — they cost context budget on every
        message whether you use them or not.
      </>,
      <>
        <strong>Don&apos;t</strong> assume an MCP result is verified just
        because it came from a real system — read it the way you&apos;d
        read any pulled data.
      </>,
    ],
  },
  {
    title: "Plan Mode & terminal habits",
    items: [
      <>
        <strong>Do</strong> default to Plan Mode for anything touching the
        data pipeline, shared docs, or results — not just big changes.
      </>,
      <>
        <strong>Don&apos;t</strong> skip it because a change &quot;feels
        small&quot; — that&apos;s exactly the category of change that
        quietly corrupts a cleaning script.
      </>,
      <>
        <strong>Do</strong> check <code>/context</code> periodically in
        long sessions; don&apos;t wait until Claude visibly starts
        forgetting something.
      </>,
    ],
  },
  {
    title: "Research practice specifically",
    items: [
      <>
        <strong>Do</strong> ask for before/after row counts on every merge
        or filter, and diagnostics alongside every estimate, not just the
        point estimate.
      </>,
      <>
        <strong>Don&apos;t</strong> let an uncertain citation or number
        pass through unflagged — this is the one place
        &quot;helpful-sounding&quot; and &quot;correct&quot; can silently
        diverge.
      </>,
    ],
  },
  {
    title: "Personal use",
    items: [
      <>
        <strong>Do</strong> require draft-then-confirm for anything that
        sends, deletes, or modifies something external (email, calendar,
        files) — never one-shot it.
      </>,
      <>
        <strong>Don&apos;t</strong> rely on Claude remembering a one-off
        personal preference — write it into Settings/preferences once
        instead of repeating it per chat.
      </>,
    ],
  },
];

export default function DosAndDontsPage() {
  return (
    <>
      <SectionHero
        breadcrumb={["Reference", "Work efficiently", "Do's and Don'ts Checklist"]}
        title="Do's and Don'ts Checklist"
        subtitle="The condensed version of Stages 2–5, before diving into the two full worked examples."
      />
      <RoadmapStepper currentSlug="dos-and-donts" />
      <main className={contentStyles.main}>
        <div className={styles.checklistGrid}>
          {groups.map((group) => (
            <div key={group.title} className={styles.checklistGroup}>
              <div className={styles.checklistGroupTitle}>{group.title}</div>
              <ul className={styles.checklistItems}>
                {group.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <NextSectionFooter currentId={12} />
    </>
  );
}
