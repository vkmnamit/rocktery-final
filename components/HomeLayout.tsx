"use client";

import "./HomeLayout.css";
import "./HomeLayoutOverrides.css";
import "./HomeLayoutImpact.css";
import "./HomeLayoutWordmark.css";
import "./HomeReveal.css";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUs from "./AboutUs";

const cards = [
    ["PHOENIX", "NAF-2 Mk II / 2026", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch3_qvout0.png"],
    ["LUMOS", "S3P3 / 2026", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch4_uzpbw1.png"],
    ["BVYOMAGNI", "Mission archive / 2025", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285444/missionpatch2_keupyc.png"],
    ["NAF-2", "Mission archive / 2025", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781285445/missionpatch1_gz05ro.png"],
];

export default function HomeLayout() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".home-reference-wordmark .giant-text",
                { x: () => -window.innerWidth * .55, opacity: 0.8 },
                {
                    x: () => window.innerWidth * .55,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".home-reference-wordmark",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });
        // One observer watches every section AND every inner reveal element.
        // Each one toggles its own class, so it animates on its OWN scroll
        // position and REPLAYS every time it leaves and re-enters the viewport.
        const targets = Array.from(document.querySelectorAll<HTMLElement>(".home-reveal, .home-reveal-title, .home-reveal-label, .home-reveal-body"));
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        // Reset + reflow so the blur-rise animation replays every entry
                        el.classList.remove("home-in-view");
                        void el.offsetWidth;
                        el.classList.add("home-in-view");
                    } else {
                        // Reset on exit so the NEXT entry plays the full hidden → visible animation
                        el.classList.remove("home-in-view");
                    }
                });
            },
            { threshold: 0.2 }
        );
        targets.forEach((target) => revealObserver.observe(target));
        return () => { ctx.revert(); revealObserver.disconnect(); };
    }, []);
    return <main className="home-reference">
        <section className="home-reference-hero home-reveal"><img src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355125/DSC_2121_d9tbu7.jpg" alt="BMSCE Rocketry team" /><i /><div><header><span>Student Rocketry Team / Bengaluru</span><span>Est. 2019</span></header><h1 className="home-reveal-title"><span className="home-reveal-line">Pushing</span><span className="home-reveal-line">Boundaries.</span></h1><footer><p className="home-reveal-body">Defying gravity with every launch. We are a student-led engineering team designing, building and launching ambitious aerospace projects from BMS College of Engineering.</p><nav><a href="#about">Explore mission ↓</a><Link href="/projects">Our work ↗</Link></nav></footer></div></section>
        <div className="home-reference-ticker"><div><span>Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ </span><span>Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ </span><span>Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ </span><span>Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ Design ✦ Build ✦ Test ✦ Launch ✦ Learn ✦ Repeat ✦ </span></div></div>
        <section className="giant-text-section home-reference-wordmark" aria-label="BMSCE Rocketry"><div><h2 className="giant-text">BMSCE ROCKETRY</h2></div></section>
        <AboutUs />
        <section className="home-reference-intro home-reveal" id="about"><span className="home-reveal-label">01 / Who we are</span><div><h2 className="home-reveal-title druk-display"><span className="home-reveal-line">Built by</span><span className="home-reveal-line">students.</span></h2><article className="home-reveal-body"><p>From the first sketch to launch day, we bring together engineering, experimentation and ambition to build vehicles that push us further.</p><small>BMSCE Rocketry is a multidisciplinary student team driven by curiosity and hands-on learning. Our members work across propulsion, avionics, structures, recovery, operations and mission strategy.</small></article></div></section>
        <section className="home-reference-missions home-reveal"><header className="sticky-head"><h2 className="home-reveal-title"><span className="home-reveal-line">See the</span><span className="home-reveal-line">impact.</span></h2><p className="home-reveal-body">Our missions turn ambitious ideas into real engineering.</p></header><div className="sticky-fold">{cards.map(([name, label, image]) => <article key={name} className="home-reveal-body"><span>{label}</span><img src={image} alt={`${name} mission patch`} /><b>{name}</b></article>)}</div></section>
        <section className="home-reference-impact home-reveal"><header className="sticky-head"><h2 className="home-reveal-title"><span className="home-reveal-line">By the</span><span className="home-reveal-line">numbers.</span></h2><p className="home-reveal-body">A growing team, a growing archive and a shared commitment to turning ideas into real engineering.</p></header><div className="sticky-fold">{[["05+", "Years of innovation"], ["40+", "Team members"], ["06", "Technical domains"], ["∞", "Ideas to test"]].map(([number, label]) => <article key={label} className="home-reveal-body"><b>{number}</b><span>{label}</span></article>)}</div></section>
    </main>;
}
