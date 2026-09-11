"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./CinematicScroll.module.css";

/* ─── Shared type (consumed by StickySplitLayout) ───────────────── */
export interface CinematicItem {
    name: string;
    description: string;
    year: string;
    status: string;
    image: string;
}

/* ─── Mouse parallax hook ────────────────────────────────────────── */
function useMouseParallax() {
    const cursorX = useRef(0);
    const cursorY = useRef(0);
    const smoothX = useRef(0);
    const smoothY = useRef(0);
    const rafId = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (window.innerWidth < 768) { cursorX.current = 0; cursorY.current = 0; return; }
            cursorX.current = (e.clientX / window.innerWidth - 0.5) * 2;
            cursorY.current = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        const onLeave = () => { cursorX.current = 0; cursorY.current = 0; };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseleave", onLeave);

        const tick = () => {
            smoothX.current += (cursorX.current - smoothX.current) * 0.08;
            smoothY.current += (cursorY.current - smoothY.current) * 0.08;
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return { smoothX, smoothY };
}

/* ─── Scroll-driven top-radius animation ─────────────────────────── */
function useScrollRadius(
    triggerRef: React.RefObject<HTMLDivElement | null>,
    panelRef: React.RefObject<HTMLDivElement | null>
) {
    useEffect(() => {
        let raf: number;
        const update = () => {
            if (triggerRef.current && panelRef.current) {
                const rect = triggerRef.current.getBoundingClientRect();
                const vh = window.innerHeight;
                const progress = Math.max(0, Math.min(1, 1 - rect.top / vh));
                const radius = (1 - progress) * 1000;
                panelRef.current.style.borderTopLeftRadius = `${radius}px`;
                panelRef.current.style.borderTopRightRadius = `${radius}px`;
            }
            raf = requestAnimationFrame(update);
        };
        raf = requestAnimationFrame(update);
        return () => cancelAnimationFrame(raf);
    }, [triggerRef, panelRef]);
}

/* ─── Floating parallax image ────────────────────────────────────── */
function ParallaxImage({
    src, alt, factorX, factorY, smoothX, smoothY, className,
}: {
    src: string; alt: string;
    factorX: number; factorY: number;
    smoothX: React.RefObject<number>;
    smoothY: React.RefObject<number>;
    className: string;
}) {
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let raf: number;
        const tick = () => {
            if (imgRef.current) {
                imgRef.current.style.transform =
                    `translate(${smoothX.current! * factorX}px, ${smoothY.current! * factorY}px)`;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [factorX, factorY, smoothX, smoothY]);

    return (
        <div ref={imgRef} className={`${styles.floatImg} ${className}`}>
            <Image src={src} alt={alt} width={192} height={128} className={styles.floatImgInner} priority />
        </div>
    );
}

/* ─── Main export ─────────────────────────────────────────────────── */
export default function CinematicScroll() {
    const { smoothX, smoothY } = useMouseParallax();

    const firstPanelRef    = useRef<HTMLDivElement>(null);
    const firstTriggerRef  = useRef<HTMLDivElement>(null);

    const secondPanelRef   = useRef<HTMLDivElement>(null);
    const secondTriggerRef = useRef<HTMLDivElement>(null);

    const thirdPanelRef    = useRef<HTMLDivElement>(null);
    const thirdTriggerRef  = useRef<HTMLDivElement>(null);

    useScrollRadius(firstTriggerRef, firstPanelRef);
    useScrollRadius(secondTriggerRef, secondPanelRef);
    useScrollRadius(thirdTriggerRef, thirdPanelRef);

    return (
        <main className={styles.root}>

            {/* HERO */}
            <div className={styles.heroSection}>
                <div className={styles.heroFixed}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroLine}>The Sky Was</h1>
                        <h1 className={styles.heroLine}>
                            Never Built
                            <ParallaxImage
                                src="/imgs/1.png"
                                alt="AURORA rocket"
                                factorX={14} factorY={10}
                                smoothX={smoothX} smoothY={smoothY}
                                className={styles.floatBetweenLines}
                            />
                        </h1>
                        <h1 className={styles.heroLine}>For Us</h1>
                    </div>
                    <div className={styles.arrowWrap}>
                        <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 1ST PILL: white -> dark */}
            <div ref={firstTriggerRef} className={styles.pillTrigger}>
                <div ref={firstPanelRef} className={`${styles.pillPanel} ${styles.dark}`} />
            </div>

            {/* PROBLEM SECTION (dark) */}
            <ProblemSection smoothX={smoothX} smoothY={smoothY} />

            {/* SPACER */}
            <div className={styles.stickyDark} />

            {/* 2ND PILL: dark -> white */}
            <div className={styles.pillTriggerWrap}>
                <div ref={secondTriggerRef} className={styles.pillTriggerSensor} />
                <div ref={secondPanelRef} className={`${styles.pillPanel} ${styles.light}`} />
            </div>

            {/* DIALOG SECTION (white) */}
            <DialogSection smoothX={smoothX} smoothY={smoothY} />

            {/* SPACER */}
            <div className={styles.stickyLight} />

            {/* 3RD PILL: white -> dark */}
            <div ref={thirdTriggerRef} className={styles.pillTrigger}>
                <div ref={thirdPanelRef} className={`${styles.pillPanel} ${styles.dark}`} />
            </div>

            {/* SUBSYSTEM CARDS (dark) */}
            <SolutionSection />

            {/* HALF SPACER */}
            <div className={styles.stickyHalf} />

            {/* CTA */}
            <WaitlistSection />
        </main>
    );
}

/* ─── Problem section ─────────────────────────────────────────────── */
function ProblemSection({
    smoothX, smoothY,
}: { smoothX: React.RefObject<number>; smoothY: React.RefObject<number> }) {
    return (
        <div className={`${styles.section} ${styles.dark} ${styles.sectionFull}`}>
            <div className={styles.sectionInner}>
                <h1 className={styles.sectionLine}>
                    <ParallaxImage
                        src="/imgs/2.png"
                        alt="PHOENIX rocket"
                        factorX={10} factorY={8}
                        smoothX={smoothX} smoothY={smoothY}
                        className={styles.floatLeft}
                    />
                    Supersonic Speeds
                </h1>
                <h1 className={styles.sectionLine}>Complex Airframes</h1>
                <h1 className={styles.sectionLine}>
                    <ParallaxImage
                        src="/imgs/4.png"
                        alt="TITAN engine"
                        factorX={-14} factorY={12}
                        smoothX={smoothX} smoothY={smoothY}
                        className={styles.floatRight}
                    />
                    Liquid Propulsion
                </h1>
            </div>
        </div>
    );
}

/* ─── Dialog section ─────────────────────────────────────────────── */
function DialogSection({
    smoothX, smoothY,
}: { smoothX: React.RefObject<number>; smoothY: React.RefObject<number> }) {
    return (
        <div className={`${styles.section} ${styles.light} ${styles.sectionFull}`}>
            <div className={styles.sectionInner}>
                <h1 className={`${styles.sectionLine} ${styles.darkText}`}>We Just Need</h1>
                <h1 className={`${styles.sectionLine} ${styles.darkText}`}>
                    A Bigger
                    <ParallaxImage
                        src="/imgs/3.png"
                        alt="HELIOS rocket"
                        factorX={12} factorY={9}
                        smoothX={smoothX} smoothY={smoothY}
                        className={styles.floatBetweenLines}
                    />
                </h1>
                <h1 className={`${styles.sectionLine} ${styles.darkText}`}>Rocket</h1>
            </div>
        </div>
    );
}

/* ─── Subsystem cards section ─────────────────────────────────────── */
function SolutionSection() {
    const cards = [
        {
            title: "AEROSTRUCTURE",
            desc: "Precision-engineered composite airframes for aerodynamic stability under high-g supersonic loads.",
        },
        {
            title: "PROPULSION",
            desc: "Custom solid motors with optimised grain geometry delivering precise thrust curves for each mission.",
        },
        {
            title: "AVIONICS",
            desc: "Redundant flight computers & long-range telemetry monitoring altitude, GPS and orientation in real-time.",
        },
        {
            title: "RECOVERY",
            desc: "Dual-deployment drogue and main parachute systems triggered autonomously for a precision touchdown.",
        },
    ];

    return (
        <div className={`${styles.solutionSection} ${styles.stickyTop}`}>
            {cards.map((c, i) => (
                <div key={i} className={styles.card}>
                    <div className={styles.cardNumber}>{String(i + 1).padStart(2, "0")}</div>
                    <h3 className={styles.cardTitle}>{c.title}</h3>
                    <p className={styles.cardDesc}>{c.desc}</p>
                </div>
            ))}
        </div>
    );
}

/* ─── CTA section ────────────────────────────────────────────────── */
function WaitlistSection() {
    return (
        <div className={styles.waitlistSection}>
            <Image
                src="/imgs/8.png"
                alt="BMSCE Rocketry launch"
                width={1920}
                height={1080}
                className={styles.waitlistBg}
                priority
            />
            <div className={styles.waitlistOverlay} />
            <div className={styles.waitlistContent}>
                <p className={styles.waitlistEyebrow}>BMSCE Rocketry · Est. 2019</p>
                <h2 className={styles.waitlistTitle}>Advancing Aerospace</h2>
                <h2 className={styles.waitlistTitle}>Innovation</h2>
                <a href="/contact-us" className={styles.waitlistBtn}>Join the Mission</a>
            </div>
        </div>
    );
}
