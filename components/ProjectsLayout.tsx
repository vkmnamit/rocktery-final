"use client";

import { useEffect } from "react";

/* =====================================================
   PROJECTS DATA  (your content)
===================================================== */
const projects = [
    {
        id:          "aurora",
        label:       "High-Power Rocketry",
        name:        "AURORA",
        status:      "Active",
        description: "Aurora represents our most ambitious build to date — a full-scale two-stage high-power rocket designed for the 10,000 ft AGL category. Engineered for precision, this is BSCE Rocketry's flagship programme.",
        image:       "/imgs/1.png",
        bgOld:       "#f0ece6",   /* cream  ← section starts on this */
        bgNew:       "#19191b",   /* black  ← circle expands to this  */
        color:       "#f0ece6",
        stats: [
            { label: "Target Altitude", value: "10,000 ft" },
            { label: "Max Speed",       value: "Mach 0.9"  },
            { label: "Total Thrust",    value: "2499 N"    },
        ],
    },
    {
        id:          "phoenix",
        label:       "Supersonic Research",
        name:        "PHOENIX",
        status:      "Completed",
        description: "Phoenix was our first attempt at breaking the sound barrier — a slender, fin-stabilised single-stage design optimised for minimum drag and maximum velocity.",
        image:       "/imgs/2.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        stats: [
            { label: "Peak Altitude", value: "7,500 ft" },
            { label: "Max Speed",     value: "Mach 1.1" },
            { label: "Peak Thrust",   value: "1800 N"   },
        ],
    },
    {
        id:          "helios",
        label:       "Science Platform",
        name:        "HELIOS",
        status:      "Completed",
        description: "Helios was built as a high-altitude science platform, designed to carry a pressurised payload bay to 30,000 ft AGL and return data from the upper atmosphere.",
        image:       "/imgs/3.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        stats: [
            { label: "Target Altitude", value: "30,000 ft" },
            { label: "Payload Bay",     value: "4 kg"      },
            { label: "Total Impulse",   value: "40,960 Ns" },
        ],
    },
    {
        id:          "titan",
        label:       "Liquid Propulsion",
        name:        "TITAN",
        status:      "Completed",
        description: "Titan was a ground-test engine programme — our first venture into liquid propulsion. A single intelligent ecosystem connecting engines, control systems and fuel management.",
        image:       "/imgs/4.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        stats: [
            { label: "Propellants", value: "LOX / IPA" },
            { label: "Thrust",      value: "500 N"     },
            { label: "Burn Time",   value: "8 s"       },
        ],
    },
];

/* =====================================================
   EASE
===================================================== */
function easeInOutCubic(x: number) {
    return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2, 3)/2;
}

/* =====================================================
   COMPONENT
===================================================== */
export default function ProjectsLayout() {

    useEffect(() => {
        const transitions =
            document.querySelectorAll<HTMLElement>(".ekl-transition-section");

        function updateTransitions() {
            transitions.forEach((section) => {

                const rect         = section.getBoundingClientRect();
                const scrollDist   = section.offsetHeight - window.innerHeight;
                let   progress     = -rect.top / scrollDist;
                progress           = Math.max(0, Math.min(1, progress));

                const expandingColor = section.querySelector<HTMLElement>(".ekl-expanding-color");
                const image          = section.querySelector<HTMLElement>(".ekl-new-image");
                const text           = section.querySelector<HTMLElement>(".ekl-new-text");

                if (!expandingColor || !image || !text) return;

                /* PHASE 1 — 0 → 58% — expanding colour */
                let colorProgress = progress / 0.58;
                colorProgress = Math.max(0, Math.min(1, colorProgress));
                colorProgress = easeInOutCubic(colorProgress);
                const scale = 0.015 + colorProgress * 1.08;
                expandingColor.style.transform = `translateX(-50%) scale(${scale})`;

                /* PHASE 2 — 58 → 78% — image appears */
                let imageProgress = (progress - 0.58) / 0.20;
                imageProgress = Math.max(0, Math.min(1, imageProgress));
                imageProgress = easeInOutCubic(imageProgress);
                image.style.opacity   = String(imageProgress);
                image.style.transform = `translateY(${100 - imageProgress*100}px) scale(${0.88 + imageProgress*0.12})`;

                /* PHASE 3 — 74 → 100% — text appears */
                let textProgress = (progress - 0.74) / 0.26;
                textProgress = Math.max(0, Math.min(1, textProgress));
                textProgress = easeInOutCubic(textProgress);
                text.style.opacity   = String(textProgress);
                text.style.transform = `translateY(${70 - textProgress*70}px)`;
            });
        }

        window.addEventListener("scroll",  updateTransitions, { passive: true });
        window.addEventListener("load",    updateTransitions);
        window.addEventListener("resize",  updateTransitions);
        updateTransitions();

        return () => {
            window.removeEventListener("scroll",  updateTransitions);
            window.removeEventListener("load",    updateTransitions);
            window.removeEventListener("resize",  updateTransitions);
        };
    }, []);

    return (
        <>
            <style>{`
                /* ── global resets for this page ── */
                .ekl-page { font-family: "DM Sans", sans-serif; overflow-x: hidden; }

                /* ── HERO ── */
                .ekl-hero {
                    height: 100vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f0ece6;
                    overflow: hidden;
                }
                .ekl-hero-content {
                    width: 100%;
                    position: relative;
                    text-align: center;
                }
                .ekl-hero-title {
                    font-size: clamp(65px, 10vw, 180px);
                    line-height: .84;
                    letter-spacing: -.085em;
                    font-weight: 700;
                    color: #19191b;
                }
                .ekl-hero-line {
                    display: block;
                    opacity: 0;
                    transform: translateY(70px);
                    animation: eklHeroText 1s cubic-bezier(.22,1,.36,1) forwards;
                }
                .ekl-hero-line:nth-child(1){ animation-delay: .1s; }
                .ekl-hero-line:nth-child(2){ animation-delay: .3s; }
                .ekl-hero-line:nth-child(3){ animation-delay: .5s; }
                @keyframes eklHeroText {
                    to { opacity: 1; transform: translateY(0); }
                }
                .ekl-hero-image {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%,-50%) translateY(50px) scale(.8);
                    width: clamp(160px, 17vw, 280px);
                    height: clamp(110px, 11vw, 180px);
                    border-radius: 40px;
                    overflow: hidden;
                    opacity: 0;
                    animation: eklHeroImage 1s cubic-bezier(.22,1,.36,1) forwards;
                    animation-delay: 1s;
                    z-index: 3;
                }
                .ekl-hero-image img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    animation: eklZoom 8s ease-in-out infinite alternate;
                }
                @keyframes eklHeroImage {
                    to { opacity:1; transform: translate(-50%,-50%) translateY(0) scale(1); }
                }
                @keyframes eklZoom {
                    from { transform: scale(1); }
                    to   { transform: scale(1.15); }
                }
                .ekl-scroll-hint {
                    position: absolute;
                    bottom: 35px; left: 50%;
                    transform: translateX(-50%);
                    font-size: 13px;
                    letter-spacing: .15em;
                    text-transform: uppercase;
                    opacity: .55;
                    color: #19191b;
                }

                /* ── TRANSITION SECTION ── */
                .ekl-transition-section {
                    height: 320vh;
                    position: relative;
                }
                .ekl-sticky-page {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                }
                .ekl-current-background {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }
                .ekl-expanding-color {
                    position: absolute;
                    width: 260vmax;
                    height: 260vmax;
                    left: 50%;
                    bottom: -130vmax;
                    border-radius: 50%;
                    transform: translateX(-50%) scale(.015);
                    transform-origin: center;
                    z-index: 2;
                    will-change: transform;
                }

                /* ── NEW CONTENT ── */
                .ekl-new-content {
                    position: relative;
                    width: 100%; height: 100%;
                    z-index: 5;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    gap: 8vw;
                    padding: 100px 8vw;
                }
                .ekl-new-image {
                    width: 100%;
                    height: min(65vh, 560px);
                    border-radius: 35px;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(100px) scale(.88);
                    will-change: transform, opacity;
                }
                .ekl-new-image img {
                    width: 100%; height: 100%;
                    object-fit: contain;
                }
                .ekl-new-text {
                    opacity: 0;
                    transform: translateY(70px);
                    will-change: opacity, transform;
                }
                .ekl-label {
                    font-size: 12px;
                    letter-spacing: .2em;
                    margin-bottom: 28px;
                    text-transform: uppercase;
                    opacity: .55;
                }
                .ekl-new-text h2 {
                    font-size: clamp(55px, 7vw, 125px);
                    line-height: .88;
                    letter-spacing: -.075em;
                    font-weight: 700;
                    margin-bottom: 28px;
                }
                .ekl-description {
                    font-size: 18px;
                    line-height: 1.7;
                    max-width: 540px;
                    opacity: .7;
                    margin-bottom: 40px;
                }
                .ekl-feature-list {
                    border-top: 1px solid currentColor;
                }
                .ekl-feature {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 18px 0;
                    border-bottom: 1px solid rgba(128,128,128,.35);
                    font-size: 17px;
                    gap: 12px;
                }
                .ekl-feature-val {
                    font-weight: 700;
                    flex: 1;
                    text-align: right;
                }
                .ekl-feature span:last-child {
                    font-size: 12px;
                    opacity: .5;
                    min-width: 22px;
                    text-align: right;
                }
                .ekl-status-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    letter-spacing: .18em;
                    text-transform: uppercase;
                    opacity: .6;
                    margin-top: 20px;
                }
                .ekl-dot {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: currentColor;
                    opacity: .35;
                }
                .ekl-dot-active {
                    background: #5fff9a !important;
                    opacity: 1 !important;
                    box-shadow: 0 0 8px rgba(95,255,154,.55);
                }
                .ekl-ghost-num {
                    position: absolute;
                    bottom: -20px; right: 5vw;
                    font-size: clamp(80px, 12vw, 180px);
                    font-weight: 900;
                    line-height: 1;
                    letter-spacing: -.05em;
                    opacity: .04;
                    pointer-events: none;
                    user-select: none;
                    z-index: 6;
                }

                /* ── FINAL SECTION ── */
                .ekl-final-section {
                    min-height: 100vh;
                    background: #f0ece6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 80px 20px;
                    color: #19191b;
                }
                .ekl-final-section h2 {
                    font-size: clamp(70px, 11vw, 190px);
                    line-height: .85;
                    letter-spacing: -.09em;
                    font-weight: 700;
                    margin-bottom: 28px;
                }
                .ekl-final-section p {
                    font-size: 20px;
                    opacity: .65;
                    margin-bottom: 35px;
                }
                .ekl-final-btn {
                    display: inline-block;
                    border: none;
                    padding: 17px 32px;
                    border-radius: 100px;
                    background: #19191b;
                    color: #f0ece6;
                    font-size: 15px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: opacity .25s;
                }
                .ekl-final-btn:hover { opacity: .75; }

                /* ── MOBILE ── */
                @media (max-width: 850px) {
                    .ekl-new-content {
                        grid-template-columns: 1fr;
                        padding: 90px 30px 40px;
                        gap: 30px;
                    }
                    .ekl-new-image { height: 38vh; min-height: 260px; }
                    .ekl-new-text h2 { font-size: 54px; }
                    .ekl-transition-section { height: 280vh; }
                    .ekl-ghost-num { display: none; }
                }
            `}</style>

            <div className="ekl-page">

                {/* =====================================================
                    HERO
                ===================================================== */}
                <section className="ekl-hero">

                    <div className="ekl-hero-content">

                        <h1 className="ekl-hero-title">
                            <span className="ekl-hero-line">The Rockets Were</span>
                            <span className="ekl-hero-line">Never Built</span>
                            <span className="ekl-hero-line">For You</span>
                        </h1>

                        <div className="ekl-hero-image">
                            <img src="/imgs/1.png" alt="BSCE Rocket" />
                        </div>

                    </div>

                    <div className="ekl-scroll-hint">Scroll to explore</div>

                </section>


                {/* =====================================================
                    TRANSITION SECTIONS  — one per project
                ===================================================== */}
                {projects.map((project, i) => (
                    <section
                        key={project.id}
                        id={project.id}
                        className="ekl-transition-section"
                    >
                        <div className="ekl-sticky-page">

                            {/* OLD PAGE COLOUR */}
                            <div
                                className="ekl-current-background"
                                style={{ background: project.bgOld }}
                            />

                            {/* EXPANDING CIRCLE */}
                            <div
                                className="ekl-expanding-color"
                                style={{ background: project.bgNew }}
                            />

                            {/* NEW CONTENT */}
                            <div
                                className="ekl-new-content"
                                style={{ color: project.color }}
                            >
                                {/* IMAGE LEFT */}
                                <div className="ekl-new-image">
                                    <img src={project.image} alt={project.name} />
                                </div>

                                {/* TEXT RIGHT */}
                                <div className="ekl-new-text">

                                    <div className="ekl-label">
                                        {project.label}
                                    </div>

                                    <h2>{project.name}</h2>

                                    <p className="ekl-description">
                                        {project.description}
                                    </p>

                                    <div className="ekl-feature-list">
                                        {project.stats.map((s, si) => (
                                            <div className="ekl-feature" key={s.label}>
                                                {s.label}
                                                <span className="ekl-feature-val">{s.value}</span>
                                                <span>{String(si + 1).padStart(2, "0")}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="ekl-status-row">
                                        <span
                                            className={`ekl-dot${project.status === "Active" ? " ekl-dot-active" : ""}`}
                                        />
                                        {project.status}
                                    </div>

                                </div>
                            </div>

                            {/* GHOST NUMBER */}
                            <div
                                className="ekl-ghost-num"
                                style={{ color: project.color }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </div>

                        </div>
                    </section>
                ))}


                {/* =====================================================
                    FINAL SECTION
                ===================================================== */}
                <section className="ekl-final-section">
                    <div>
                        <h2>Launch<br />Further.</h2>
                        <p>Engineering should adapt to every mission.</p>
                        <a href="/team" className="ekl-final-btn">
                            Meet the Team →
                        </a>
                    </div>
                </section>

            </div>
        </>
    );
}
