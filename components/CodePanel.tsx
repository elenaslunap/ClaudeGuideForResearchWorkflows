"use client";

import { useRef, useState } from "react";
import styles from "./CodePanel.module.css";

type CopyState = "idle" | "copied" | "fallback";

interface CodePanelProps {
  label: string;
  filename: string;
  children: React.ReactNode;
}

export default function CodePanel({ label, filename, children }: CodePanelProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("fallback");
    }
    setTimeout(() => setCopyState("idle"), 1600);
  }

  const buttonLabel =
    copyState === "copied" ? "Copied" : copyState === "fallback" ? "Press ⌘/Ctrl+C" : "Copy";

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderLeft}>
          <span className={styles.tabDot} />
          <span className={styles.panelTitle}>
            {label} <span className={styles.muted}>·</span> {filename}
          </span>
        </div>
        <button type="button" className={styles.copyBtn} onClick={handleCopy}>
          {buttonLabel}
        </button>
      </div>
      <pre ref={preRef} className={styles.pre}>
        {children}
      </pre>
    </div>
  );
}

export function CodeKey({ children }: { children: React.ReactNode }) {
  return <span className={styles.cmKey}>{children}</span>;
}

export function CodeStr({ children }: { children: React.ReactNode }) {
  return <span className={styles.cmStr}>{children}</span>;
}

export function CodeComment({ children }: { children: React.ReactNode }) {
  return <span className={styles.cmComment}>{children}</span>;
}

export function CodeHeading({ children }: { children: React.ReactNode }) {
  return <span className={styles.cmHeading}>{children}</span>;
}
