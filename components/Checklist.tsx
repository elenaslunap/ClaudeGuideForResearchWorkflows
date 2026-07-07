"use client";

import { useState } from "react";
import styles from "./Checklist.module.css";

export default function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  function toggle(index: number) {
    setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={item} className={styles.item}>
          <label>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={() => toggle(index)}
            />
            <span className={checked[index] ? styles.done : undefined}>{item}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
