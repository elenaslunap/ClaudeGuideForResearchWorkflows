import Link from "next/link";
import { nextSection, sections } from "@/lib/roadmap";
import styles from "./NextSectionFooter.module.css";

const firstSection = sections.find((section) => section.id === 1)!;

export default function NextSectionFooter({ currentId }: { currentId: number }) {
  const next = nextSection(currentId);
  const href = next ? `/${next.slug}` : `/${firstSection.slug}`;
  const label = next ? "Next in reference" : "Set up a new project";
  const title = next ? next.title : firstSection.title;

  return (
    <Link href={href} className={styles.footer}>
      <div>
        <div className={styles.label}>{label}</div>
        <div className={styles.next}>{title}</div>
      </div>
      <div className={styles.arrow}>→</div>
    </Link>
  );
}
