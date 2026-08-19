"use client";

import { useEffect, RefObject } from "react";

/**
 * Slows down scroll speed when the user is scrolling within a target section.
 * @param sectionRef - ref to the sticky scroll section
 * @param factor - how much to slow scroll (0.3 = 30% of normal speed)
 */
export default function useSlowScroll(
    sectionRef: RefObject<HTMLElement | null>,
    factor = 0.3
) {
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const isInSection =
                rect.top <= 0 && rect.bottom >= window.innerHeight;

            if (!isInSection) return;

            // Prevent default and apply slowed scroll
            e.preventDefault();
            window.scrollBy({
                top: e.deltaY * factor,
                behavior: "auto",
            });
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [sectionRef, factor]);
}
