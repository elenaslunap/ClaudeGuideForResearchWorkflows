import styles from "./Callout.module.css";

interface CalloutProps {
  kicker?: string;
  children: React.ReactNode;
}

export default function Callout({ kicker, children }: CalloutProps) {
  return (
    <div className={styles.callout}>
      {kicker && <div className={styles.kicker}>{kicker}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
