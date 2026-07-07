import Link from "next/link";
import { sectionBySlug, sections, stages } from "@/lib/roadmap";
import styles from "./RoadmapStepper.module.css";

type SectionStatus = "current" | "done" | "upcoming";

function statusFor(sectionId: number, currentSectionId: number | undefined): SectionStatus {
  if (currentSectionId === undefined) return "upcoming";
  if (sectionId === currentSectionId) return "current";
  return sectionId < currentSectionId ? "done" : "upcoming";
}

export default function RoadmapStepper({ currentSlug }: { currentSlug?: string }) {
  const currentSectionId = currentSlug !== undefined ? sectionBySlug(currentSlug)?.id : undefined;

  return (
    <nav aria-label="Roadmap" className={styles.stepper}>
      {stages.map((stage) => (
        <div key={stage.id} className={styles.stageGroup}>
          <span className={styles.stageLabel}>{stage.label}</span>
          <ol className={styles.sectionList}>
            {stage.sectionIds.map((sectionId) => {
              const section = sections.find((s) => s.id === sectionId)!;
              const status = statusFor(sectionId, currentSectionId);
              return (
                <li key={section.id}>
                  <Link
                    href={`/${section.slug}`}
                    className={`${styles.sectionItem} ${styles[status]}`}
                    aria-current={status === "current" ? "page" : undefined}
                  >
                    {section.id}. {section.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}
