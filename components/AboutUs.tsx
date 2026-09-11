"use client";

import { useEffect, useRef } from "react";

const aboutItems = [
    {
        title: "THE TEAM",
        desc: "A highly selective incubator of 90+ student engineers across several engineering disciplines, functioning with the discipline of a professional aerospace organization. Guided by industry advisors, our team designs, builds, and launches complex flight systems from the ground up.",
    },
    {
        title: "OUR VISION",
        desc: "To systematically expand our altitude capabilities and pioneer advanced rocketry technologies in India. We are scaling from high-power rockets toward international competitions, hybrid propulsion research, and suborbital spaceflight targeting the Kármán line.",
    },
    {
        title: "OUR ROCKETS",
        desc: "100% student-designed and flight-validated rockets engineered for high stability, dual-event recovery, and real-time telemetry. Built using custom composite airframes and advanced avionics, our launch vehicles serve as reliable platforms for real-world research payloads.",
    },
    {
        title: "OUR SPONSORS",
        desc: "Deep-tech & aerospace partnerships powering our scaling research platform.",
    },
];

const AboutUs = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        // Reset the animation so it replays every time you scroll back
                        el.classList.remove("about-in-view", "home-in-view");
                        void el.offsetWidth; // force reflow
                        el.classList.add("about-in-view", "home-in-view");
                    } else if (entry.target === section) {
                        // Leaving resets the section so the NEXT entry replays everything
                        section.classList.remove("about-in-view", "home-in-view");
                    } else {
                        // Inner items reset individually so EACH sub-content replays on re-entry
                        el.classList.remove("about-in-view", "home-in-view");
                    }
                });
            },
            { threshold: 0.2 }
        );
        // Watch the section plus every inner reveal element individually,
        // so sub-content animates at ITS scroll position and replays every time.
        const innerTargets = Array.from(
            section.querySelectorAll<HTMLElement>(".home-reveal-title, .home-reveal-label, .home-reveal-body")
        );
        observer.observe(section);
        innerTargets.forEach((target) => observer.observe(target));

        // Scroll-linked blur: title is sharp at viewport center, blurs as it scrolls away
        // (same feel as the project-page headings)
        let ticking = false;
        const applyScrollBlur = () => {
            ticking = false;
            const title = titleRef.current;
            if (!title) return;
            const rect = title.getBoundingClientRect();
            const vh = window.innerHeight;
            const center = rect.top + rect.height / 2;
            const distance = Math.abs(center - vh / 2) / (vh / 2); // 0 at center → 1+ at edges
            const blur = Math.min(12, distance * 12);
            const fade = Math.max(0.25, 1 - distance * 0.6);
            title.style.filter = blur < 0.4 && section.classList.contains("about-in-view") ? "" : `blur(${blur.toFixed(1)}px)`;
            title.style.opacity = section.classList.contains("about-in-view") ? String(fade) : "";
        };
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(applyScrollBlur);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section ref={sectionRef} className="about-us-section home-reveal">
            <div className="about-content">
                <div className="about-intro">
                    <div className="about-index home-reveal-label">01 / Who We Are · BMSCE Rocketry</div>
                    <h2 ref={titleRef} className="about-title home-reveal-title">
                        <span className="about-title-line about-title-line-1 home-reveal-line">ABOUT</span>
                        <span className="about-title-line about-title-line-2 home-reveal-line">US</span>
                    </h2>
                    <p className="about-lead home-reveal-body">
                        At BMSCE Rocketry Team, we design, manufacture, and launch
                        high-power sounding rockets to a world-class standard.
                    </p>
                </div>

                <div className="about-list">
                    {aboutItems.map((item, index) => (
                        <div key={index} className="about-item home-reveal-body">
                            <h3 className="about-item-title">{item.title}</h3>
                            <p className="about-item-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;