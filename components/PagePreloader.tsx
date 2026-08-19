"use client";

import { useEffect, useState } from "react";
import styles from "./PagePreloader.module.css";

interface PagePreloaderProps {
  title: string;
}

export default function PagePreloader({ title }: PagePreloaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Total animation: lines grow ~1.8s, overlay ~2.0-2.8s, logo fades in @2.5s,
    // overlay expands @3.5s, preloader hides @4.5s. Unmount at 5.5s.
    const timer = setTimeout(() => {
      setShow(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.preloader}>
      {/* Center title text */}
      <div className={styles.logo}>
        <h1>{title}</h1>
      </div>

      {/* Base vertical lines growing from top */}
      <div className={`${styles.preloaderLines} ${styles.base}`}>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={`base-${i}`} className={styles.line} />
        ))}
      </div>

      {/* Overlay horizontal lines expanding from center */}
      <div className={`${styles.preloaderLines} ${styles.overlay}`}>
        {Array.from({ length: 63 }).map((_, i) => (
          <span key={`overlay-${i}`} className={styles.line} />
        ))}
      </div>
    </div>
  );
}
