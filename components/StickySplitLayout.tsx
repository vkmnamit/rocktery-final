"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./StickySplitLayout.module.css";
import { CinematicItem } from "./CinematicScroll";

interface StickySplitLayoutProps {
    items: CinematicItem[];
}

export default function StickySplitLayout({ items }: StickySplitLayoutProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Options for the observer: trigger when a block crosses the middle of the screen
        const options = {
            root: null,
            rootMargin: "-40% 0px -40% 0px", // Trigger when the item is roughly in the middle 20% of the screen
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = entry.target.getAttribute("data-index");
                    if (index !== null) {
                        setActiveIndex(parseInt(index, 10));
                    }
                }
            });
        }, options);

        textBlocksRef.current.forEach((block) => {
            if (block) {
                observerRef.current?.observe(block);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [items]);

    return (
        <section className={styles.container}>
            {/* Left Column: Scrolling Text */}
            <div className={styles.textColumn}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={styles.textBlock}
                        ref={(el) => {
                            textBlocksRef.current[index] = el;
                        }}
                        data-index={index}
                    >
                        <h2>{item.name}</h2>
                        <p className={styles.description}>{item.description}</p>
                        <div className={styles.meta}>
                            <span>{item.year}</span>
                            <span>{item.status}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Column: Sticky Images */}
            <div className={styles.imageColumn}>
                <div className={styles.imageContainer}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.imageLayer} ${
                                index === activeIndex ? styles.active : ""
                            }`}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
