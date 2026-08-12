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

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Reset the animation so it replays every time you scroll back
                        section.classList.remove("about-in-view");
                        void section.offsetWidth; // force reflow
                        section.classList.add("about-in-view");
                    }
                });
            },
            { threshold: 0.2 }
        );
        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="about-us-section">
            <div className="about-content">
                <div className="about-intro">
                    <h2 className="about-title">
                        <span className="about-title-line about-title-line-1">ABOUT</span>
                        <span className="about-title-line about-title-line-2">US</span>
                    </h2>
                    <p className="about-lead">
                        At BMSCE Rocketry Team, we design, manufacture, and launch
                        high-power sounding rockets to a world-class standard.
                    </p>
                </div>

                <div className="about-list">
                    {aboutItems.map((item, index) => (
                        <div key={index} className="about-item">
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