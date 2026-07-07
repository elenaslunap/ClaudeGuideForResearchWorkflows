"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sectionBySlug, sections, templatesSlug } from "@/lib/roadmap";
import styles from "./Header.module.css";

const referenceHref = `/${sections.find((s) => s.navGroup === "reference")!.slug}`;
const exampleHref = `/${sections.find((s) => s.navGroup === "example")!.slug}`;
const templatesHref = `/${templatesSlug}`;

export default function Header() {
  const pathname = usePathname();
  const slug = pathname.split("/")[1];
  const section = sectionBySlug(slug);

  const isReferenceCurrent = section?.navGroup === "reference";
  const isExampleCurrent = section?.navGroup === "example";
  const isTemplatesCurrent = slug === templatesSlug;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark}>
        <span className={styles.mark}>§</span> Claude Research Field Guide
      </Link>
      <nav className={styles.nav}>
        <Link
          href={referenceHref}
          className={isReferenceCurrent ? styles.current : undefined}
        >
          Reference
        </Link>
        <Link
          href={exampleHref}
          className={isExampleCurrent ? styles.current : undefined}
        >
          Worked examples
        </Link>
        <Link
          href={templatesHref}
          className={isTemplatesCurrent ? styles.current : undefined}
        >
          Templates
        </Link>
      </nav>
    </header>
  );
}
