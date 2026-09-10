"use client";

import { useEffect } from "react";

/* =====================================================
   PROJECTS DATA
===================================================== */
const projects = [
    {
        id:          "aurora",
        label:       "High-Power Rocketry",
        name:        "AURORA",
        status:      "Active",
        description: "Aurora represents our most ambitious build to date — a full-scale two-stage high-power rocket designed for the 10,000 ft AGL category. Engineered for precision, this is BMSCE Rocketry's flagship programme.",
        image:       "/imgs/1.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        imgFirst:    true,
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
        imgFirst:    false,
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
        imgFirst:    true,
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
        imgFirst:    false,
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
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/* =====================================================
   COMPONENT
===================================================== */
export default function ProjectsLayout() {

    useEffect(() => {
        const sections =
            document.querySelectorAll<HTMLElement>(".prj-transition-section");

        function update() {
            sections.forEach((section) => {
                const rect       = section.getBoundingClientRect();
                const scrollDist = section.offsetHeight - window.innerHeight;
                const p          = Math.max(0, Math.min(1, -rect.top / scrollDist));

                const reveal = section.querySelector<HTMLElement>(".prj-reveal-layer");
                const img    = section.querySelector<HTMLElement>(".prj-new-image");
                const txt    = section.querySelector<HTMLElement>(".prj-new-text");
                if (!reveal || !img || !txt) return;

                // ── Phase 1: 0→60% scroll — circle grows from BOTTOM-CENTER ──
                //
                // Use PIXEL coords so there is zero ambiguity about where
                // 50%/100% resolves.  We read the element's actual dimensions,
                // put the clip-path center at (w/2, h) in pixels
                // = exact bottom-center of the sticky viewport, then grow
                // the radius from 0 to the diagonal length (farthest corner).
                const sticky  = section.querySelector<HTMLElement>(".prj-sticky-page");
                if (!sticky) return;
                const w       = sticky.offsetWidth;
                const h       = sticky.offsetHeight;
                const cx      = w / 2;                           // horizontal center
                const cy      = h;                               // BOTTOM of element
                const maxR    = Math.hypot(cx, h) + 20;         // diagonal + margin
                const cp      = easeInOutCubic(Math.max(0, Math.min(1, p / 0.60)));
                const radius  = cp * maxR;
                reveal.style.clipPath = `circle(${radius}px at ${cx}px ${cy}px)`;

                // ── Phase 2: 60→80% — image rises up ──
                const ip = easeInOutCubic(Math.max(0, Math.min(1, (p - 0.60) / 0.20)));
                img.style.opacity   = String(ip);
                img.style.transform = `translateY(${(1 - ip) * 90}px) scale(${0.88 + ip * 0.12})`;

                // ── Phase 3: 75→100% — text fades up ──
                const tp = easeInOutCubic(Math.max(0, Math.min(1, (p - 0.75) / 0.25)));
                txt.style.opacity   = String(tp);
                txt.style.transform = `translateY(${(1 - tp) * 65}px)`;
            });
        }

        window.addEventListener("scroll",  update, { passive: true });
        window.addEventListener("resize",  update, { passive: true });
        window.addEventListener("load",    update);
        update();

        return () => {
            window.removeEventListener("scroll",  update);
            window.removeEventListener("resize",  update);
            window.removeEventListener("load",    update);
        };
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

                /* ── page ── */
                .prj-page {
                    font-family: "DM Sans", sans-serif;
                    overflow-x: hidden;
                    background: #f0ece6;
                    color: #19191b;
                }

                /* ── HERO ── */
                .prj-hero {
                    height: 100vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f0ece6;
                    overflow: hidden;
                }
                .prj-hero-content {
                    width: 100%;
                    position: relative;
                    text-align: center;
                }
                .prj-hero-title {
                    font-size: clamp(65px, 10vw, 180px);
                    line-height: .84;
                    letter-spacing: -.085em;
                    font-weight: 700;
                    color: #19191b;
                }
                .prj-hero-line {
                    display: block;
                    opacity: 0;
                    transform: translateY(70px);
                    animation: prjHeroText 1s cubic-bezier(.22,1,.36,1) forwards;
                }
                .prj-hero-line:nth-child(1) { animation-delay: .1s; }
                .prj-hero-line:nth-child(2) { animation-delay: .3s; }
                .prj-hero-line:nth-child(3) { animation-delay: .5s; }
                @keyframes prjHeroText {
                    to { opacity: 1; transform: translateY(0); }
                }
                .prj-hero-image {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%,-50%) translateY(50px) scale(.8);
                    width: clamp(160px, 17vw, 280px);
                    height: clamp(110px, 11vw, 180px);
                    border-radius: 40px;
                    overflow: hidden;
                    opacity: 0;
                    animation: prjHeroImage 1s cubic-bezier(.22,1,.36,1) 1s forwards;
                    z-index: 3;
                }
                .prj-hero-image img {
                    width: 100%; height: 100%;
                    object-fit: cover;
                    animation: prjZoom 8s ease-in-out infinite alternate;
                }
                @keyframes prjHeroImage {
                    to { opacity:1; transform: translate(-50%,-50%) translateY(0) scale(1); }
                }
                @keyframes prjZoom {
                    from { transform: scale(1); }
                    to   { transform: scale(1.15); }
                }
                .prj-scroll-hint {
                    position: absolute;
                    bottom: 35px; left: 50%;
                    transform: translateX(-50%);
                    font-size: 13px;
                    letter-spacing: .15em;
                    text-transform: uppercase;
                    opacity: .55;
                    color: #19191b;
                    animation: prjPulse 2.5s ease-in-out 2s infinite;
                }
                @keyframes prjPulse {
                    0%, 100% { opacity: .3; }
                    50%      { opacity: .65; }
                }

                /* Orbit rings decoration */
                .prj-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(25,25,27,0.06);
                    top: 50%; left: 50%;
                    transform: translate(-50%,-50%);
                    animation: prjRotate 30s linear infinite;
                    pointer-events: none;
                }
                .prj-ring-2 { animation-duration: 20s; animation-direction: reverse; }
                @keyframes prjRotate {
                    from { transform: translate(-50%,-50%) rotate(0deg); }
                    to   { transform: translate(-50%,-50%) rotate(360deg); }
                }

                /* ── TRANSITION SECTION ── */
                .prj-transition-section {
                    height: 320vh;
                    position: relative;
                }
                .prj-sticky-page {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                }
                /* Old background — always fully visible behind the reveal layer */
                .prj-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }
                /*
                 * Reveal layer — the entire new-page world lives here.
                 * clip-path clips it to the expanding circle shape.
                 * At progress=0 → clip-path: circle(0% ...) — nothing visible.
                 * As scroll grows → circle expands until it covers the screen.
                 * The clip origin is bottom-center of the viewport.
                 */
                .prj-reveal-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    /* Start fully clipped (invisible) */
                    clip-path: circle(0vmax at 50% 100%);
                    will-change: clip-path;
                    overflow: hidden;
                }
                /* New solid background fill inside the reveal layer */
                .prj-reveal-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }

                /* ── CONTENT GRID (lives inside .prj-reveal-layer) ── */
                .prj-content {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    gap: 8vw;
                    padding: 100px 8vw;
                }
                .prj-new-image {
                    width: 100%;
                    height: min(65vh, 560px);
                    border-radius: 35px;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(90px) scale(.88);
                    will-change: transform, opacity;
                }
                .prj-new-image img {
                    width: 100%; height: 100%;
                    object-fit: contain;
                }
                .prj-new-text {
                    opacity: 0;
                    transform: translateY(65px);
                    will-change: opacity, transform;
                }
                .prj-label {
                    font-size: 12px;
                    letter-spacing: .2em;
                    margin-bottom: 28px;
                    text-transform: uppercase;
                    opacity: .55;
                }
                .prj-new-text h2 {
                    font-family: "Instrument Serif", serif;
                    font-size: clamp(55px, 7vw, 125px);
                    line-height: .88;
                    letter-spacing: -.075em;
                    font-weight: 400;
                    margin-bottom: 28px;
                }
                .prj-description {
                    font-size: 18px;
                    line-height: 1.7;
                    max-width: 540px;
                    opacity: .7;
                    margin-bottom: 40px;
                }
                .prj-feature-list {
                    border-top: 1px solid currentColor;
                }
                .prj-feature {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 18px 0;
                    border-bottom: 1px solid rgba(128,128,128,.35);
                    font-size: 17px;
                    gap: 12px;
                }
                .prj-feature-val {
                    font-weight: 700;
                    flex: 1;
                    text-align: right;
                    margin-right: 16px;
                }
                .prj-feature-num {
                    font-size: 12px;
                    opacity: .45;
                    min-width: 22px;
                    text-align: right;
                }
                .prj-status-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 11px;
                    letter-spacing: .18em;
                    text-transform: uppercase;
                    opacity: .6;
                    margin-top: 20px;
                }
                .prj-dot {
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: currentColor;
                    opacity: .35;
                }
                .prj-dot-active {
                    background: #5fff9a !important;
                    opacity: 1 !important;
                    box-shadow: 0 0 8px rgba(95,255,154,.55);
                }
                .prj-ghost-num {
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
                .prj-final {
                    min-height: 100vh;
                    background: #f0ece6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 80px 5vw;
                    flex-direction: column;
                    color: #19191b;
                }
                .prj-final-eyebrow {
                    font-size: 12px;
                    letter-spacing: .2em;
                    text-transform: uppercase;
                    opacity: .4;
                    margin-bottom: 40px;
                }
                .prj-final h2 {
                    font-family: "Instrument Serif", serif;
                    font-size: clamp(72px, 12vw, 200px);
                    line-height: .84;
                    letter-spacing: -.085em;
                    font-weight: 400;
                    margin-bottom: 36px;
                }
                .prj-final p {
                    font-size: 19px;
                    opacity: .6;
                    max-width: 480px;
                    line-height: 1.65;
                    margin-bottom: 48px;
                }
                .prj-final-btn {
                    display: inline-block;
                    padding: 18px 38px;
                    border-radius: 100px;
                    background: #19191b;
                    color: #f0ece6;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: .04em;
                    cursor: pointer;
                    border: none;
                    text-decoration: none;
                    transition: opacity .25s, transform .25s;
                }
                .prj-final-btn:hover { opacity: .8; transform: translateY(-2px); }
                .prj-final-footer {
                    margin-top: 100px;
                    font-size: 13px;
                    opacity: .28;
                    letter-spacing: .1em;
                }

                /* ── MOBILE ── */
                @media (max-width: 860px) {
                    .prj-content {
                        grid-template-columns: 1fr;
                        padding: 90px 28px 40px;
                        gap: 32px;
                    }
                    .prj-new-image { height: 38vh; min-height: 260px; }
                    .prj-new-text h2 { font-size: 54px; }
                    .prj-transition-section { height: 280vh; }
                    .prj-ghost-num { display: none; }
                }
            ` }} />

            <div className="prj-page">

                {/* ── HERO ── */}
                <section className="prj-hero">
                    {/* Decorative orbit rings */}
                    <div className="prj-ring"  style={{ width: "min(60vw,560px)", height: "min(60vw,560px)" }} />
                    <div className="prj-ring prj-ring-2" style={{ width: "min(40vw,380px)", height: "min(40vw,380px)" }} />

                    <div className="prj-hero-content">
                        <h1 className="prj-hero-title">
                            <span className="prj-hero-line">We Build</span>
                            <span className="prj-hero-line">
                                <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>Rockets.</em>
                            </span>
                            <span className="prj-hero-line">From Scratch.</span>
                        </h1>

                        <div className="prj-hero-image">
                            <img src="/imgs/1.png" alt="BMSCE Rocket" />
                        </div>
                    </div>

                    <div className="prj-scroll-hint">Scroll to explore</div>
                </section>


                {/* ── TRANSITION SECTIONS — one per project ── */}
                {projects.map((proj, i) => (
                    <section
                        key={proj.id}
                        id={proj.id}
                        className="prj-transition-section"
                    >
                        <div className="prj-sticky-page">

                            {/* ── OLD BACKGROUND — visible beneath the circle ── */}
                            <div className="prj-bg" style={{ background: proj.bgOld }} />

                            {/*
                             * ── REVEAL LAYER ──
                             * clip-path is driven by scroll: starts as circle(0%) at
                             * bottom-center, expands until it covers the whole screen.
                             * Everything new (bg, image, text) lives inside here so
                             * nothing shows until the circle has grown over it.
                             */}
                            <div className="prj-reveal-layer">

                                {/* New solid background fill */}
                                <div className="prj-reveal-bg" style={{ background: proj.bgNew }} />

                                {/* CONTENT GRID */}
                                <div className="prj-content" style={{ color: proj.color }}>

                                    {/* IMAGE */}
                                    <div
                                        className="prj-new-image"
                                        style={{ order: proj.imgFirst ? 0 : 2 }}
                                    >
                                        <img src={proj.image} alt={proj.name} />
                                    </div>

                                    {/* TEXT */}
                                    <div className="prj-new-text" style={{ order: 1 }}>
                                        <div className="prj-label">{proj.label}</div>

                                        <h2>{proj.name}</h2>

                                        <p className="prj-description">{proj.description}</p>

                                        <div className="prj-feature-list">
                                            {proj.stats.map((s, si) => (
                                                <div className="prj-feature" key={s.label}>
                                                    {s.label}
                                                    <span className="prj-feature-val">{s.value}</span>
                                                    <span className="prj-feature-num">
                                                        {String(si + 1).padStart(2, "0")}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="prj-status-row">
                                            <span
                                                className={`prj-dot${proj.status === "Active" ? " prj-dot-active" : ""}`}
                                            />
                                            {proj.status}
                                        </div>
                                    </div>
                                </div>

                                {/* GHOST NUMBER */}
                                <div
                                    className="prj-ghost-num"
                                    style={{ color: proj.color }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </div>

                            </div>{/* /prj-reveal-layer */}

                        </div>
                    </section>
                ))}


                {/* ── FINAL CTA ── */}
                <section className="prj-final">
                    <div className="prj-final-eyebrow">The People Behind the Rockets</div>
                    <h2>
                        Meet the<br />
                        <em style={{ fontStyle: "italic" }}>Team.</em>
                    </h2>
                    <p>
                        Twenty-three students across propulsion, structures, avionics and recovery.
                        One shared obsession: getting something into the sky and safely back down.
                    </p>
                    <a href="/members" className="prj-final-btn">
                        Meet the Team →
                    </a>
                    <div className="prj-final-footer">
                        BMSCE Rocketry · Est. 2019 · Flying Higher Every Year
                    </div>
                </section>

            </div>
        </>
    );
}
