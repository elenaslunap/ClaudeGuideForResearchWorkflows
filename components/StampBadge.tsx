import styles from "./StampBadge.module.css";

export default function StampBadge({ children }: { children: React.ReactNode }) {
  return <span className={styles.stamp}>{children}</span>;
}
