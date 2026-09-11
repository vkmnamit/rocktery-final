"use client";

import { useEffect } from "react";
import type { CSSProperties } from "react";
import FloatingParticles from "./FloatingParticles";
import "./SponsorsLayout.css";

const sponsors = [
    ["Aerotech", "Gold Sponsor", "Propulsion Partner", "Powering the next generation of flight", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957624/1_4_bueu0r.png", "Aerotech supplies critical propulsion components and composite materials, helping our team move toward high-power flight vehicles.", "Propulsion systems · Composite materials"],
    ["Stellar", "Silver Sponsor", "Avionics Partner", "Precision instruments for aerospace", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957630/2_4_mw1ooq.png", "Stellar provides the avionics and telemetry systems that give us accurate data through every phase of a mission.", "Flight computers · Telemetry systems"],
    ["Nexus", "Gold Sponsor", "Manufacturing Partner", "Advanced manufacturing solutions", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957633/3_4_zoq99i.png", "Our motor casings and recovery hardware are made possible through precision manufacturing support.", "CNC machining · Additive manufacturing"],
    ["OmniDynamics", "Bronze Sponsor", "Aerodynamics Partner", "Fluid and aerodynamic testing", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957635/4_2_flytmz.png", "Wind-tunnel access and CFD tools allow our aerodynamics team to validate fin designs before production.", "Wind-tunnel testing · CFD validation"],
    ["Velocity", "Silver Sponsor", "Logistics Partner", "Logistics and mission support", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957637/5_3_ew7tzz.png", "Velocity helps our flight hardware and ground-support equipment arrive safely and on time for launch day.", "Mission logistics · Ground support"],
    ["Horizon", "Gold Sponsor", "Research Partner", "Pushing boundaries in deep space", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957640/6_2_npem1i.png", "Horizon’s grant funding gives our students room to pursue ambitious research and expand our flight systems.", "Research funding · Systems development"],
    ["Aegis", "Bronze Sponsor", "Safety Partner", "Safety and recovery systems", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957642/7_2_hz55b6.png", "Aegis supports the parachutes and deployment systems that bring our rockets back safely after every flight.", "Recovery hardware · Flight safety"],
    ["NovaCore", "Silver Sponsor", "Materials Partner", "Advanced energetic materials", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957645/8_2_zser0y.png", "NovaCore provides technical advice and materials for experimental solid-propellant research.", "Materials research · Propellant development"],
] as const;

export default function SponsorsLayout() {
    useEffect(() => {
        const wipes = Array.from(document.querySelectorAll<HTMLElement>(".sponsor-wipe"));
        const reveals = Array.from(document.querySelectorAll<HTMLElement>(".sponsor-reveal"));
        let raf = 0;
        const update = () => { raf = 0; wipes.forEach((wipe) => { const progress = Math.max(0, Math.min(1, (innerHeight - wipe.getBoundingClientRect().top) / innerHeight)); const radius = Math.round(1000 * Math.pow(1 - progress, 3)); wipe.style.borderTopLeftRadius = `${radius}px`; wipe.style.borderTopRightRadius = `${radius}px`; }); };
        const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
        const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("active"); observer.unobserve(entry.target); } }), { threshold: .25, rootMargin: "0px 0px -10% 0px" });
        reveals.forEach((reveal) => observer.observe(reveal));
        addEventListener("scroll", schedule, { passive: true }); addEventListener("resize", schedule); update();
        return () => { observer.disconnect(); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); if (raf) cancelAnimationFrame(raf); };
    }, []);
    const trackPointer = (event: React.PointerEvent<HTMLElement>) => { const rect = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`); event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`); };
    return <main className="sponsors-page">
        <section className="sponsor-hero"><p>Partner Archive · 2025</p><h1><span>Fueled By</span><span>Partners.</span></h1><div>Scroll to explore ↓</div></section>
        {sponsors.map(([name, tier, label, tagline, image, description, focus], index) => { const dark = index % 2 === 1; const background = dark ? "#151515" : "#f2ede4"; const ink = dark ? "#f2ede4" : "#151515"; const number = String(index + 1).padStart(2, "0"); return <div key={name} style={{ "--sponsor-bg": background, "--sponsor-ink": ink } as CSSProperties}>
            <section className="sponsor-wipe" style={{ "--fill": background } as CSSProperties} />
            <section className="sponsor-title sponsor-reveal"><div className="sponsor-index">{number} / 08 · {label}</div><h2><span>{name}</span><span>{tier}.</span></h2></section>
            <section className="sponsor-details sponsor-reveal"><div className="sponsor-details-wrap"><aside className="sponsor-side"><div className="sponsor-number">{number} / 08 · Partner Archive</div><h3>{label}.</h3><i /><p>{tagline}</p><div className="sponsor-image"><img src={image} alt={name} /></div></aside><div className="sponsor-main"><p className="sponsor-copy">{description}</p><div className="sponsor-spec"><span>Partnership Focus</span><p>{focus}</p></div><div className="sponsor-spec"><span>Support Level</span><p>{tier}</p></div></div></div></section>
        </div>; })}
        <section className="sponsor-end" onPointerMove={trackPointer}><FloatingParticles count={70} size={2} opacity={.65} glow={12} speed={.5} influence={150} color="#f2ede4" /><div><h2>Build With<br />Us.</h2><p>Support the next generation of student aerospace.</p><a href="mailto:rocketry@bmsce.ac.in">Become a partner →</a></div></section>
    </main>;
}
