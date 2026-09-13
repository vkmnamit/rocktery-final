"use client";

import { useMemo, useState } from "react";
import "./DocumentationLayout.css";

const documents = [
    { title: "Independent Launch Operations", category: "mission", meta: "Mission 01 · Dec 2025 · Rev. 02", type: "Report", image: "https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=900&q=80", description: "Mission configuration, launch operations and recovery outcome." },
    { title: "Propulsion Test Programme", category: "propulsion", meta: "Propulsion · Engineering · Rev. 01", type: "Report", image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=900&q=80", description: "Development and static-test records for increasing impulse." },
    { title: "Avionics & Telemetry Architecture", category: "avionics", meta: "Avionics · Telemetry · Rev. 03", type: "Technical", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80", description: "Onboard electronics, telemetry and flight-data flow." },
    { title: "Redundant Recovery System", category: "recovery", meta: "Recovery · Safety · Rev. 02", type: "System", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80", description: "Deployment logic and the systems used for safe descent." },
    { title: "GFRP Airframe Documentation", category: "structures", meta: "Structures · Manufacturing · Rev. 01", type: "Drawing", image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=900&q=80", description: "Material, structure and fabrication decisions for the airframe." },
    { title: "Post-Flight Analysis", category: "mission", meta: "Flight Data · Mission 01 · Rev. 01", type: "Analysis", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=900&q=80", description: "Observed behaviour, flight performance and lessons for the next mission." },
] as const;

const filters = ["all", "mission", "propulsion", "avionics", "recovery", "structures"] as const;
type Filter = (typeof filters)[number];

export default function DocumentationLayout() {
    const [filter, setFilter] = useState<Filter>("all");
    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState<(typeof documents)[number] | null>(null);
    const visibleDocuments = useMemo(() => documents.filter((document) => {
        const matchesFilter = filter === "all" || document.category === filter;
        const haystack = `${document.title} ${document.category} ${document.meta}`.toLowerCase();
        return matchesFilter && haystack.includes(search.trim().toLowerCase());
    }), [filter, search]);

    return <main className="docs-page">
        <section className="docs-hero">
            <span className="docs-eyebrow">01 / Engineering knowledge base</span>
            <div className="docs-hero-grid">
                <h1>Documentation.</h1>
            </div>
            <div className="docs-hero-meta"><span>BMSCE Rocketry / Technical Archive</span><span>Rev. 2026</span></div>
        </section>

        <section className="docs-archive" id="documents">
            <header className="docs-archive-heading"><h2>Technical<br />Archive.</h2><p>Search the archive or filter it by subsystem.</p></header>
            <div className="docs-toolbar">
                <label className="docs-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="SEARCH DOCUMENTATION..." /></label>
                <div className="docs-filters" aria-label="Filter documentation">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
            </div>
            <div className="docs-list">
                {visibleDocuments.map((document) => <article className="docs-row" key={document.title} tabIndex={0} onMouseEnter={() => setPreview(document)} onMouseLeave={() => setPreview(null)} onFocus={() => setPreview(document)} onBlur={() => setPreview(null)}>
                    <span className="docs-number">{String(documents.indexOf(document) + 1).padStart(2, "0")}</span>
                    <h3>{document.title}</h3><p>{document.meta}</p><span className="docs-type">PDF / {document.type}</span><span className="docs-arrow">↗</span>
                </article>)}
                {!visibleDocuments.length && <p className="docs-empty">No documents match that search.</p>}
            </div>
            {preview && <aside className="docs-preview" aria-live="polite"><img src={preview.image} alt="" /><div><span>{preview.category} / {preview.type}</span><h3>{preview.title}</h3><p>{preview.description}</p></div></aside>}
        </section>

        <section className="docs-disciplines"><span className="docs-eyebrow">03 / Browse by discipline</span><div>
            {filters.slice(2).map((item, index) => <button key={item} onClick={() => { setFilter(item); document.getElementById("documents")?.scrollIntoView({ behavior: "smooth" }); }}><span>0{index + 1}</span><strong>{item}.</strong><p>{({ propulsion: "Motor systems, testing, impulse and performance records.", avionics: "Telemetry, electronics, sensing and flight software.", recovery: "Deployment systems, parachutes and flight safety.", structures: "Airframes, materials, CAD and manufacturing." } as Record<string, string>)[item]}</p></button>)}
        </div></section>
    </main>;
}
