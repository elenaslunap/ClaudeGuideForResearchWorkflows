import { Fragment } from "react";
import styles from "./SectionHero.module.css";

interface SectionHeroProps {
  breadcrumb: string[];
  title: string;
  subtitle: string;
}

export default function SectionHero({ breadcrumb, title, subtitle }: SectionHeroProps) {
  return (
    <section className={styles.hero}>
      <svg
        className={styles.drawerLines}
        viewBox="0 0 420 400"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <line x1="0" y1="60" x2="420" y2="60" stroke="#E6F5F8" strokeOpacity="0.08" />
        <line x1="0" y1="140" x2="420" y2="140" stroke="#E6F5F8" strokeOpacity="0.08" />
        <line x1="0" y1="220" x2="420" y2="220" stroke="#E6F5F8" strokeOpacity="0.08" />
        <line x1="0" y1="300" x2="420" y2="300" stroke="#E6F5F8" strokeOpacity="0.08" />
        <line x1="0" y1="380" x2="420" y2="380" stroke="#E6F5F8" strokeOpacity="0.08" />
      </svg>
      <div className={styles.breadcrumb}>
        {breadcrumb.map((segment, index) => (
          <Fragment key={segment}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {segment}
          </Fragment>
        ))}
      </div>
      <h1 className={styles.heroTitle}>{title}</h1>
      <p className={styles.heroSub}>{subtitle}</p>
    </section>
  );
}
