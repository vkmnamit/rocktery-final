"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./PageTransition.module.css";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Global slow scroll — slows wheel scroll across the whole site
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            window.scrollBy({
                top: e.deltaY * 0.4,
                behavior: "auto",
            });
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, []);

    // Page transition on route change
    useEffect(() => {
        const wrapper = wrapperRef.current;
        const overlay = overlayRef.current;
        if (!wrapper || !overlay) return;

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
