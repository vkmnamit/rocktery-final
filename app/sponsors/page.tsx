"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

const SPONSORS = [
    { name: "NewSpace Research Labs", tier: "Title", image: "/imgs/1.png", description: "Enabling BMSCE Rocketry's advanced propulsion and high-altitude flight programs." },
    { name: "Vikram Sarabhai Space Association", tier: "Gold", image: "/imgs/2.png", description: "Supporting student aerospace R&D and national-level rocketry competitions." },
    { name: "AeroTech Industries", tier: "Silver", image: "/imgs/3.png", description: "Precision manufacturing partner for carbon-fiber airframes and machined rocket components." },
    { name: "Blue Origin Educational Fund", tier: "Silver", image: "/imgs/4.png", description: "Funding advanced avionics, telemetry, and recovery systems development." },
    { name: "L&T Technology Services", tier: "Bronze", image: "/imgs/5 (1).png", description: "Supporting hybrid propulsion research and static-fire test campaigns." },
    { name: "Defence Innovation Board", tier: "Bronze", image: "/imgs/6.png", description: "Enabling dual-deployment recovery system testing at altitude." },
    { name: "Ansys", tier: "Bronze", image: "/imgs/7.png", description: "Simulation software for flight dynamics, deployment analysis, and launch campaigns." },
    { name: "CST-India", tier: "Bronze", image: "/imgs/8.png", description: "Ground support equipment and launch rail systems." },
];

export default function SponsorsPage() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("impact-in-view");
                }
            },
            { threshold: 0.1 }
        );
        if (gridRef.current) {
            observer.observe(gridRef.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Navbar />
            <Stars />
            <section className="impact-section">
                <div className="impact-container">
                    <div className="impact-header">
                        <h2>SPONSORS</h2>
                        <p className="sub-headline">
                            Partnership with aerospace, defense, and technology organizations
                            powering our advanced rocketry research and student innovation.
                        </p>
                    </div>
                    <div ref={gridRef} className="sponsors-grid">
                        {SPONSORS.map((sponsor, index) => (
                            <div key={index} className="sponsor-card">
                                <img src={sponsor.image} alt={sponsor.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
