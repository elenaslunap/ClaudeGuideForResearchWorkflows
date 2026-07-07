import StampBadge from "./StampBadge";
import styles from "./CatalogCard.module.css";

export type CatalogCardTab = "rust" | "pine" | "rust-deep";

interface CatalogCardProps {
  tab: CatalogCardTab;
  callNumber: string;
  title: string;
  description: string;
  stamp: string;
  href: string;
  linkLabel?: string;
}

const tabClass: Record<CatalogCardTab, string> = {
  rust: styles.tabRust,
  pine: styles.tabPine,
  "rust-deep": styles.tabRustDeep,
};

export default function CatalogCard({
  tab,
  callNumber,
  title,
  description,
  stamp,
  href,
  linkLabel = "View template ↓",
}: CatalogCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.tab} ${tabClass[tab]}`} />
      <div className={styles.callNumber}>{callNumber}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.cardFooter}>
        <StampBadge>{stamp}</StampBadge>
        <a className={styles.openLink} href={href}>
          {linkLabel}
        </a>
      </div>
    </div>
  );
}
