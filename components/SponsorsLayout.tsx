"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./SponsorsLayout.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
    {
        id: "sponsor-1",
        name: "Aerotech",
        tier: "gold",
        tagline: "Powering the next generation of flight",
        description: "Aerotech has been a foundational partner, supplying critical propulsion components and composite materials. Their support enables our transition to high-power, two-stage vehicles.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957624/1_4_bueu0r.png",
    },
    {
        id: "sponsor-2",
        name: "Stellar",
        tier: "silver",
        tagline: "Precision instruments for aerospace",
        description: "Stellar provides the high-fidelity avionics and telemetry systems necessary for our high-altitude flights, ensuring we receive accurate data throughout the mission profile.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957630/2_4_mw1ooq.png",
    },
    {
        id: "sponsor-3",
        name: "Nexus",
        tier: "gold",
        tagline: "Advanced manufacturing solutions",
        description: "Our complex motor casings and recovery hardware are made possible through Nexus's state-of-the-art CNC machining and additive manufacturing capabilities.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957633/3_4_zoq99i.png",
    },
    {
        id: "sponsor-4",
        name: "OmniDynamics",
        tier: "bronze",
        tagline: "Fluid and aerodynamic testing",
        description: "OmniDynamics provided crucial wind-tunnel time and CFD software licenses, allowing our aerodynamics team to validate fin designs before manufacturing.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957635/4_2_flytmz.png",
    },
    {
        id: "sponsor-5",
        name: "Velocity",
        tier: "silver",
        tagline: "Logistics and mission support",
        description: "Moving a 15-foot rocket and ground support equipment across the country is no small feat. Velocity ensures our hardware arrives safely and on time for launch day.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957637/5_3_ew7tzz.png",
    },
    {
        id: "sponsor-6",
        name: "Horizon",
        tier: "gold",
        tagline: "Pushing boundaries in deep space",
        description: "Horizon's grant funding allows us to pursue ambitious R&D projects like our liquid bipropellant testbed, expanding the scope of what our student team can achieve.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957640/6_2_npem1i.png",
    },
    {
        id: "sponsor-7",
        name: "Aegis",
        tier: "bronze",
        tagline: "Safety and recovery systems",
        description: "Aegis supplies the specialized parachutes and deployment bags needed to bring our rockets back safely. Their expertise has been vital in designing redundant recovery architectures.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957642/7_2_hz55b6.png",
    },
    {
        id: "sponsor-8",
        name: "NovaCore",
        tier: "silver",
        tagline: "Advanced energetic materials",
        description: "NovaCore provides the technical advisory and materials required for our experimental solid propellant formulations, focusing on specific impulse optimization and burn rate characterization.",
        image: "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957645/8_2_zser0y.png",
    }
];

export default function SponsorsLayout() {
    const pageRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<(HTMLElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each sponsor section as it scrolls into view
            sponsors.forEach((_, index) => {
                const section = sectionsRef.current[index];
                if (!section) return;

                // Elements to animate within this section
                const imgCol = section.querySelector(`.${styles.imgCol}`);
                const textElements = section.querySelectorAll(".animate-text");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%", // Trigger animation when top of section is 75% down viewport
                        toggleActions: "play none none reverse"
                    }
                });

                // Image animation: slide in from left/right depending on layout
                if (imgCol) {
                    const isEven = index % 2 === 1; // 0-indexed, so 1,3,5 are 'even' visual items (right side image)
                    tl.fromTo(imgCol,
                        { x: isEven ? 60 : -60, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
                    );
                }

                // Text animation: stagger fade up
                if (textElements.length) {
                    tl.fromTo(textElements,
                        { y: 30, opacity: 0, filter: "blur(5px)" },
                        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" },
                        "-=0.6" // Overlap with image animation
                    );
                }

                // ScrollTrigger to track active index for the side counter
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 50%",
                    end: "bottom 50%",
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                });
            });

            // Parallax effect on ghost numbers
            const ghostNums = document.querySelectorAll(`.${styles.ghostNum}`);
            ghostNums.forEach((num) => {
                gsap.to(num, {
                    yPercent: -50,
                    ease: "none",
                    scrollTrigger: {
                        trigger: num.closest(`.${styles.sponsorSection}`),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

        }, pageRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (index: number) => {
        sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.page} ref={pageRef}>
            
            {/* ── FIXED SIDE COUNTER ── */}
            <div className={styles.sideCounter}>
                {sponsors.map((_, i) => (
                    <button
                        key={`dot-${i}`}
                        className={`${styles.counterDot} ${i === activeIndex ? styles.active : ""}`}
                        onClick={() => scrollToSection(i)}
                        aria-label={`Go to sponsor ${i + 1}`}
                        style={{ border: 'none', padding: 0, cursor: 'pointer' }}
                    />
                ))}
            </div>

            {/* ── HERO SECTION ── */}
            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <div className={styles.heroEyebrow}>Partnerships</div>
                <h1 className={styles.heroTitle}>
                    Powered By<br/>Industry
                </h1>
                <p className={styles.heroSub}>
                    Our missions are made possible by the organizations that share our vision for the future of aerospace. 
                    Together, we turn ambitious designs into reality.
                </p>
                
                <div className={styles.scrollHint}>
                    <span>Scroll to explore</span>
                    <div className={styles.scrollHintArrow} />
                </div>
            </section>
            
            <div className={styles.divider} />

            {/* ── SPONSOR SECTIONS ── */}
            {sponsors.map((sponsor, index) => {
                // Alternating layout: odd index (0, 2, 4) -> imgLeft; even index (1, 3, 5) -> imgRight
                const isImageLeft = index % 2 === 0;
                const layoutClass = isImageLeft ? styles.imgLeft : styles.imgRight;
                const displayNum = String(index + 1).padStart(2, "0");

                return (
                    <section
                        key={sponsor.id}
                        className={styles.sponsorSection}
                        ref={(el) => { sectionsRef.current[index] = el; }}
                    >
                        <div className={`${styles.split} ${layoutClass}`}>
                            
                            {/* IMAGE COLUMN */}
                            <div className={styles.imgCol}>
                                <div className={styles.imgWrapper}>
                                    <img 
                                        src={sponsor.image} 
                                        alt={sponsor.name} 
                                        className={styles.sponsorImg} 
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                </div>
                                <div className={styles.ghostNum}>{displayNum}</div>
                            </div>

                            {/* TEXT COLUMN */}
                            <div className={styles.textCol}>
                                <div className={`${styles.sectionIndex} animate-text`}>
                                    {displayNum} 
                                    <span className={styles.indexLine} />
                                </div>

                                <div className={`${styles.tierBadge} ${styles[sponsor.tier]} animate-text`}>
                                    <span className={styles.tierDot} />
                                    {sponsor.tier} Sponsor
                                </div>

                                <h2 className={`${styles.sponsorName} animate-text`}>
                                    {sponsor.name}
                                </h2>
                                
                                <h3 className={`${styles.tagline} animate-text`}>
                                    {sponsor.tagline}
                                </h3>
                                
                                <div className={`${styles.textDivider} animate-text`} />

                                <p className={`${styles.description} animate-text`}>
                                    {sponsor.description}
                                </p>
                                
                                <div className="animate-text">
                                    <a href="#" className={styles.ctaLink} onClick={(e) => e.preventDefault()}>
                                        Visit Website <span className={styles.ctaArrow}>→</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </section>
                );
            })}

            {/* ── END CTA SECTION ── */}
            <section className={styles.endSection}>
                <h2 className={styles.endText}>
                    Join us in pushing the boundaries of <span>what's possible.</span>
                </h2>
                <div className={styles.endActions}>
                    <a href="/contact-us" className={styles.endBtnPrimary + " " + styles.endBtn}>
                        Become a Sponsor
                    </a>
                    <a href="/projects" className={styles.endBtnSecondary + " " + styles.endBtn}>
                        View Our Work
                    </a>
                </div>
            </section>

        </div>
    );
}
