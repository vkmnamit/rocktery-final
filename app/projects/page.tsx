"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

const PROJECTS = [
    {
        name: "PHOENIX - NAF-2 Mk II",
        year: "2026",
        image: "/imgs/1.png",
        description:
            "Our most advanced high-power rocket featuring dual-deployment recovery, carbon fiber airframe, and an integrated flight computer with real-time telemetry. Designed to reach unprecedented altitudes for a student-built vehicle.",
        status: "In Development",
    },
    {
        name: "LUMOS S3P3",
        year: "2026",
        image: "/imgs/2.png",
        description:
            "Advanced avionics platform with a dedicated payload bay for research experiments. Features redundant sensor arrays, GPS tracking, and high-speed data downlink for real-time mission monitoring.",
        status: "In Development",
    },
    {
        name: "BVYOMAGNI",
        year: "2025",
        image: "/imgs/3.png",
        description:
            "Recovery system upgrade demonstrator. Validated dual-event deployment with redundant ejection charges and shock-absorbing harnesses for safe payload recovery.",
        status: "Flown",
    },
    {
        name: "NAF-2",
        year: "2025",
        image: "/imgs/4.png",
        description:
            "Our most-flown launch vehicle. A reliable high-power rocket platform that has been static-fired and launched multiple times, validating our propulsion and avionics systems.",
        status: "Flown",
    },
    {
        name: "Solid Motor Test Vehicle",
        year: "2024",
        image: "/imgs/5 (1).png",
        description:
            "Custom solid rocket motor development platform. Used for static fire testing of propellant grains, nozzle designs, and ignition systems.",
        status: "Tested",
    },
    {
        name: "Dual-Event Recovery Demonstrator",
        year: "2024",
        image: "/imgs/6.png",
        description:
            "Recovery system testbed for validating drogue and main parachute deployment sequences at various altitudes and velocities.",
        status: "Tested",
    },
    {
        name: "Hybrid Propulsion Testbed",
        year: "2023",
        image: "/imgs/7.png",
        description:
            "Research platform for hybrid rocket propulsion. Testing nitrous oxide and solid fuel combinations for future high-altitude missions.",
        status: "Research",
    },
    {
        name: "High-Altitude Telemetry Testbed",
        year: "2023",
        image: "/imgs/8.png",
        description:
            "Avionics development platform for testing flight computers, sensor arrays, and real-time telemetry systems at high altitudes.",
        status: "Research",
    },
];

export default function ProjectsPage() {
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
                        <h2>PROJECTS</h2>
                        <p className="sub-headline">
                            Designing, manufacturing, and launching high-power sounding rockets
                            to a world-class standard.
                        </p>
                    </div>
                    <div ref={gridRef} className="impact-grid">
                        {PROJECTS.map((project, index) => (
                            <div key={index} className="impact-card">
                                <div className="impact-label">{project.name}</div>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "160px",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        marginBottom: "20px",
                                        background: "#000",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <p
                                    style={{
                                        color: "#aaa",
                                        fontSize: "0.95rem",
                                        lineHeight: "1.6",
                                        marginBottom: "15px",
                                        textAlign: "center",
                                    }}
                                >
                                    {project.description}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        color: "#888",
                                        fontSize: "0.8rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    <span>{project.year}</span>
                                    <span>{project.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
