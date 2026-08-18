"use client";

import { useEffect, useState } from "react";
import styles from "./ProjectPreloader.module.css";

export default function ProjectPreloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // The animation takes about 5.3s total.
    // We unmount the component after 6 seconds to completely remove it from the DOM.
    const timer = setTimeout(() => {
      setShow(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className={styles.preloader}>
      <div className={styles.logo}>
        <h1>PROJECTS</h1>
      </div>

      <div className={`${styles.preloaderLines} ${styles.base}`}>
        {Array.from({ length: 31 }).map((_, i) => (
          <span key={`base-${i}`} className={styles.line}></span>
        ))}
      </div>

      <div className={`${styles.preloaderLines} ${styles.overlay}`}>
        {Array.from({ length: 63 }).map((_, i) => (
          <span key={`overlay-${i}`} className={styles.line}></span>
        ))}
      </div>
    </div>
  );
}
