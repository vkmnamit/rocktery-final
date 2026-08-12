"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";
import AboutUs from "@/components/AboutUs";
import { useEffect, useRef, useState } from "react";

const HERO_LINES = ["Pushing", "Boundaries.", "Defying Gravity With Every Launch"];

export default function Home() {
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const featureContentRef = useRef<HTMLDivElement>(null);
    const giantTextRef = useRef<HTMLHeadingElement>(null);
    const [typedLines, setTypedLines] = useState<string[]>(["", "", ""]);
    const [typingDone, setTypingDone] = useState(false);

    useEffect(() => {
        const giantText = giantTextRef.current;
        if (!giantText) return;

        const section = giantText.closest(".giant-text-section");
        const viewportHeight = window.innerHeight;

        let ticking = false;
        let rafId = 0;

        const updateTransform = () => {
            if (giantText && section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
                    const clamped = Math.max(0, Math.min(1, progress));
                    const translateX = -60 + clamped * 120;
                    giantText.style.transform = `translate3d(${translateX}%, 0, 0)`;
                }
            }
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                rafId = requestAnimationFrame(updateTransform);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateTransform);
        updateTransform();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateTransform);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Typing effect for hero title
    useEffect(() => {
        let lineIndex = 0;
        let charIndex = 0;
        let interval: ReturnType<typeof setInterval>;

        const startTyping = () => {
            interval = setInterval(() => {
                const currentLine = HERO_LINES[lineIndex];
                charIndex += 1;
                setTypedLines((prev) => {
                    const next = [...prev];
                    next[lineIndex] = currentLine.slice(0, charIndex);
                    return next;
                });

                if (charIndex >= currentLine.length) {
                    charIndex = 0;
                    lineIndex += 1;
                    if (lineIndex >= HERO_LINES.length) {
                        clearInterval(interval);
                        setTypingDone(true);
                    }
                }
            }, 45);
        };

        const timeout = setTimeout(startTyping, 300);
        return () => {
            clearTimeout(timeout);
            if (interval) clearInterval(interval);
        };
    }, []);

    // Impact section scroll-triggered animation
    useEffect(() => {
        const section = document.querySelector(".impact-section");
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        section.classList.remove("impact-in-view");
                        void (section as HTMLElement).offsetWidth;
                        section.classList.add("impact-in-view");
                    }
                });
            },
            { threshold: 0.3 }
        );
        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const heroTitle = heroTitleRef.current;
        const featureContent = featureContentRef.current;

        if (heroTitle) {
            heroTitle.style.opacity = "0";
            heroTitle.style.transform = "translateY(50px)";
            requestAnimationFrame(() => {
                setTimeout(() => {
                    heroTitle.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
                    heroTitle.style.opacity = "1";
                    heroTitle.style.transform = "translateY(0)";
                }, 200);
            });
        }

        if (featureContent) {
            featureContent.style.opacity = "0";
            featureContent.style.transform = "translateY(30px)";
            featureContent.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            featureContent.style.opacity = "1";
                            featureContent.style.transform = "translateY(0)";
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.3 }
            );
            observer.observe(featureContent);
        }
    }, []);

    return (
        <div className="page-wrapper">
            <Navbar />
            <Stars />
            <main className="modern-layout">
                <div className="cover-element" />

                <section className="hero-split">
                    <div className="hero-left-content entrance-animation">
                        <h1 ref={heroTitleRef} className="hero-title">
                            {typedLines[0]}
                            <br />
                            {typedLines[1]}
                            <br />
                            {typedLines[2]}
                            <span className={`hero-caret${typingDone ? " done" : ""}`}>|</span>
                        </h1>
                        <div className="hero-dot">●</div>
                    </div>
                </section>

                <div className="marquee-section">
                    <div className="marquee-track">
                        <span>
                            AEROSPACE ENGINEERING • HIGH ALTITUDE FLIGHT • PROPULSION SYSTEMS • AVIONICS • RECOVERY •
                        </span>
                        <span>
                            AEROSPACE ENGINEERING • HIGH ALTITUDE FLIGHT • PROPULSION SYSTEMS • AVIONICS • RECOVERY •
                        </span>
                        <span>
                            AEROSPACE ENGINEERING • HIGH ALTITUDE FLIGHT • PROPULSION SYSTEMS • AVIONICS • RECOVERY •
                        </span>
                    </div>
                </div>

                <section className="giant-text-section">
                    <h1 ref={giantTextRef} className="giant-text">
                        BMSCE ROCKETRY
                    </h1>
                </section>

                <AboutUs />

                {/* Impact Section - mission patches promo style */}
                <section className="impact-section">
                    <div className="impact-container">
                        <div className="impact-header">
                            <h2>See the Impact</h2>
                        </div>

                        <div className="impact-grid">
                            <div className="impact-card">
                                <div className="impact-label">PHOENIX - NAF-2 Mk II (2026)</div>
                                <img
                                    className="impact-patch"
                                    src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch3_qvout0.png"
                                    alt="Pardalote mission patch - 2023 to 2025"
                                />
                            </div>
                            <div className="impact-card">
                                <div className="impact-label">LUMOS S3P3 (2026)</div>
                                <img
                                    className="impact-patch"
                                    src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch4_uzpbw1.png"
                                    alt="Rosella mission patch - 2022 to 2023"
                                />
                            </div>
                            <div className="impact-card">
                                <div className="impact-label">BVYOMAGNI (2025)</div>
                                <img
                                    className="impact-patch"
                                    src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch2_keupyc.png"
                                    alt="Bluewren mission patch - 2021 to 2022"
                                />
                            </div>
                            <div className="impact-card">
                                <div className="impact-label">NAF-2 (2025)</div>
                                <img
                                    className="impact-patch"
                                    src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285445/missionpatch1_gz05ro.png"
                                    alt="Firetail mission patch"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="feature-split text-only">
                    <div className="feature-content full-width">
                        <h2 className="sub-headline">
                            5+ Years of Innovation &<br />
                            Engineering Excellence.
                        </h2>
                        <p className="feature-desc">
                            To become a globally recognized student-led team known for engineering
                            excellence, inspiring young minds across India by demonstrating that hard
                            work leads to success.
                        </p>
                        <Link className="pill-btn" href="/contact-us">
                            CONTACT US
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-col footer-brand">
                        <h3>BMSCE ROCKETRY</h3>
                        <p>
                            Designing, manufacturing and launching high-power sounding rockets
                            to a world-class standard.
                        </p>
                    </div>

                    <div className="footer-col">
                        <h4>EXPLORE</h4>
                        <a href="/">Home</a>
                        <a href="/members">Members</a>
                        <a href="/projects">Projects</a>
                        <a href="/sponsors">Sponsors</a>
                        <a href="/contact-us">Contact</a>
                    </div>

                    <div className="footer-col">
                        <h4>CONTACT</h4>
                        <a href="mailto:rocketry@bmsce.ac.in">rocketry@bmsce.ac.in</a>
                        <a href="/contact-us">Get In Touch</a>
                        <span>Bangalore, India</span>
                    </div>

                    <div className="footer-col">
                        <h4>FOLLOW US</h4>
                        <div className="footer-social">
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                                Instagram
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                                YouTube
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <svg className="social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>© 2025 BMSCE Rocketry. All rights reserved.</span>
                    <span>Advancing Aerospace Innovation</span>
                </div>
            </footer>
        </div>
    );
}