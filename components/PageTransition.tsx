"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // NOTE: no custom wheel handler — native browser scrolling is kept
    // so laptop trackpads get full-speed smooth momentum scrolling.
    // (A previous version multiplied every wheel delta by 0.4, which made
    // trackpad scrolling feel sticky and ~2.5x too slow.)

    // Page transition on route change
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const overlay = overlayRef.current;
        if (!wrapper || !overlay) return;

        let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

        // Once the entrance transition ends, remove the transform entirely.
        // A leftover transform on the wrapper would break position:fixed
        // descendants (navbar / side menu / overlay) and make them overlap
        // or scroll away with the page.
        const clearTransform = () => {
            wrapper.style.transform = "none";
            wrapper.style.transition = "";
            wrapper.removeEventListener("transitionend", clearTransform);
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
        wrapper.addEventListener("transitionend", clearTransform);
        fallbackTimer = setTimeout(clearTransform, 1200);

        // Page enter: overlay slides out revealing the page
        overlay.style.transform = "translateY(0%)";
        overlay.style.transition = "none";
        wrapper.style.opacity = "0";
        wrapper.style.transform = "translateY(20px)";

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.style.transition = "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)";
                overlay.style.transform = "translateY(-100%)";

                wrapper.style.transition = "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s";
                wrapper.style.opacity = "1";
                wrapper.style.transform = "translateY(0px)";
            });
        });

        return () => {
            wrapper.removeEventListener("transitionend", clearTransform);
            if (fallbackTimer) clearTimeout(fallbackTimer);
        };
    }, [pathname]);

    return (
        <>
            {/* Full-page wipe overlay */}
            <div ref={overlayRef} className={styles.overlay} />
            {/* Page content */}
            <div ref={wrapperRef} className={styles.wrapper}>
                {children}
            </div>
        </>
    );
}
