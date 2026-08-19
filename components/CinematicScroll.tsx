"use client";

import React, { useEffect, useRef } from "react";
import styles from "./CinematicScroll.module.css";
import useSlowScroll from "@/hooks/useSlowScroll";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=95",
        reveal: "bottom",
        texts: [
            { title: "DISCOVER", description: "A visual journey through distant landscapes.", position: "posBottomLeft" },
            { title: "THE JOURNEY", description: "Every road begins with a single decision.", position: "posTopRight" },
            { title: "MOMENTS", description: "Quiet moments become unforgettable memories.", position: "posCenterLeft" },
            { title: "BEYOND", description: "There is always something beyond the horizon.", position: "posBottomRight" },
            { title: "BEGIN", description: "The journey is only beginning.", position: "posTopLeft" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2400&q=95",
        reveal: "left",
        texts: [
            { title: "CITY", description: "Architecture creates the rhythm of a city.", position: "posTopLeft" },
            { title: "MOTION", description: "Thousands of stories moving at once.", position: "posCenterRight" },
            { title: "NIGHT", description: "When the lights turn on, another world begins.", position: "posBottomLeft" },
            { title: "ENERGY", description: "The city never truly stops.", position: "posTopRight" },
            { title: "ALIVE", description: "Every street has its own story.", position: "posBottomRight" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=95",
        reveal: "top",
        texts: [
            { title: "TIMELESS", description: "History remains visible in every detail.", position: "posCenterLeft" },
            { title: "MEMORY", description: "Some places feel familiar before you arrive.", position: "posTopRight" },
            { title: "DETAIL", description: "Look closer and the past begins to speak.", position: "posBottomRight" },
            { title: "STILL", description: "Time moves differently here.", position: "posTopLeft" },
            { title: "FOREVER", description: "Some places never really disappear.", position: "posBottomLeft" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=95",
        reveal: "right",
        texts: [
            { title: "ENDLESS", description: "Open roads and distant horizons.", position: "posBottomRight" },
            { title: "FORWARD", description: "Keep moving even when the destination is unknown.", position: "posTopLeft" },
            { title: "ROAD", description: "The road itself becomes the destination.", position: "posCenterRight" },
            { title: "HORIZON", description: "There is always another horizon.", position: "posBottomLeft" },
            { title: "MOVE", description: "Never stop exploring.", position: "posTopRight" }
        ]
    },
    {
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=95",
        reveal: "center",
        texts: [
            { title: "UNKNOWN", description: "The best destinations are often unexpected.", position: "posTopRight" },
            { title: "EXPLORE", description: "Step outside what you already know.", position: "posBottomLeft" },
            { title: "SEARCH", description: "Curiosity is what keeps us moving.", position: "posCenterLeft" },
            { title: "FIND", description: "Sometimes you discover more than expected.", position: "posBottomRight" },
            { title: "NEXT", description: "And then the journey starts again.", position: "posTopLeft" }
        ]
    }
];

export default function CinematicScroll() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageLayersRef = useRef<(HTMLDivElement | null)[]>([]);
    const textItemsRef = useRef<(HTMLDivElement | null)[][]>([]);
    const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const leftCurtainRef = useRef<HTMLDivElement>(null);
    const rightCurtainRef = useRef<HTMLDivElement>(null);

    // Slow scroll inside the sticky section
    useSlowScroll(sectionRef, 0.35);

    useEffect(() => {
        let target = 0;
        let smooth = 0;
        let reqId: number;

        const readScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const max = sectionRef.current.offsetHeight - window.innerHeight;
            
            target = -rect.top / max;
            target = Math.max(0, Math.min(1, target));
        };

        window.addEventListener("scroll", readScroll, { passive: true });
        readScroll();

        const ease = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const getReveal = (type: string, progress: number) => {
            const p = ease(progress);
            const size = p * 160;

            if (type === "bottom") return `circle(${size}% at 50% 115%)`;
            if (type === "left") return `circle(${size}% at -5% 50%)`;
            if (type === "top") return `circle(${size}% at 50% -10%)`;
            if (type === "right") return `circle(${size}% at 105% 50%)`;
            if (type === "center") return `circle(${size}% at 50% 50%)`;
            return `circle(${size}% at 50% 50%)`;
        };

        const animate = () => {
            smooth += (target - smooth) * 0.045;

            const total = slides.length;
            const timeline = smooth * total;
            const slideIndex = Math.floor(timeline) % total;
            const local = timeline - Math.floor(timeline);

            const revealEnd = 0.78;
            const revealProgress = Math.min(local / revealEnd, 1);

            // Images
            imageLayersRef.current.forEach((layer, index) => {
                if (!layer) return;

                if (index < slideIndex) {
                    layer.style.zIndex = String(10 + index);
                    layer.style.clipPath = getReveal(slides[index].reveal, 1);
                } else if (index === slideIndex) {
                    layer.style.zIndex = "100";
                    layer.style.clipPath = getReveal(slides[index].reveal, revealProgress);
                    const img = layer.querySelector("img");
                    if (img) {
                        img.style.transform = `scale(${1.10 - ease(revealProgress) * 0.10})`;
                    }
                } else {
                    layer.style.zIndex = "1";
                    layer.style.clipPath = getReveal(slides[index].reveal, 0);
                }
            });

            // Texts
            const textCount = slides[slideIndex].texts.length;
            const textTimeline = local * textCount;
            let visibleCount = Math.floor(textTimeline) + 1;
            visibleCount = Math.min(visibleCount, textCount);

            textItemsRef.current.forEach((items, index) => {
                if (index < slideIndex) {
                    items.forEach((item) => item?.classList.remove(styles.visible));
                } else if (index === slideIndex) {
                    items.forEach((item, i) => {
                        if (i < visibleCount) {
                            item?.classList.add(styles.visible);
                        } else {
                            item?.classList.remove(styles.visible);
                        }
                    });
                } else {
                    items.forEach((item) => item?.classList.remove(styles.visible));
                }
            });

            // Counters
            countersRef.current.forEach((counter, index) => {
                if (counter) {
                    if (index === slideIndex) {
                        counter.classList.add(styles.active);
                    } else {
                        counter.classList.remove(styles.active);
                    }
                }
            });

            // Curtains
            const curtainProgress = Math.min(smooth / 0.08, 1);
            const curtain = ease(curtainProgress);
            const movement = curtain * 110;

            if (leftCurtainRef.current) leftCurtainRef.current.style.transform = `translateX(-${movement}%)`;
            if (rightCurtainRef.current) rightCurtainRef.current.style.transform = `translateX(${movement}%)`;

            reqId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("scroll", readScroll);
            cancelAnimationFrame(reqId);
        };
    }, []);

    // Initialize refs array
    if (textItemsRef.current.length === 0) {
        slides.forEach((_, i) => {
            textItemsRef.current[i] = [];
        });
    }

    return (
        <section className={styles.scrollSection} ref={sectionRef}>
            <div className={styles.sticky}>
                
                {/* IMAGE STACK */}
                <div className={styles.imageStack}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={styles.imageLayer}
                            ref={(el) => { imageLayersRef.current[index] = el; }}
                        >
                            <img src={slide.image} alt="Background" />
                        </div>
                    ))}
                </div>

                {/* TEXT STACK */}
                <div className={styles.storyLayer}>
                    {slides.map((slide, slideIndex) => (
                        <React.Fragment key={slideIndex}>
                            {slide.texts.map((item, textIndex) => (
                                <div
                                    key={textIndex}
                                    className={`${styles.storyItem} ${styles[item.position]}`}
                                    ref={(el) => { textItemsRef.current[slideIndex][textIndex] = el; }}
                                >
                                    <div className={styles.storyNumber}>
                                        {String(slideIndex + 1).padStart(2, "0")}
                                    </div>
                                    <div className={styles.storyTitle}>{item.title}</div>
                                    <div className={styles.storyDescription}>{item.description}</div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                {/* CURTAIN */}
                <div className={`${styles.curtain} ${styles.left}`} ref={leftCurtainRef}></div>
                <div className={`${styles.curtain} ${styles.right}`} ref={rightCurtainRef}></div>

                {/* COUNTER */}
                <div className={styles.counter}>
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => { countersRef.current[index] = el; }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    ))}
                </div>

                <div className={styles.scrollLabel}>SCROLL TO EXPLORE</div>
            </div>
        </section>
    );
}
