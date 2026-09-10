"use client";

import { useEffect } from "react";

/* =====================================================
   SPONSORS DATA
===================================================== */
const sponsors = [
    {
        id:          "aerotech",
        name:        "Aerotech",
        tier:        "Gold",
        label:       "Propulsion Partner",
        tagline:     "Powering the next generation of flight",
        description: "Aerotech has been a foundational partner, supplying critical propulsion components and composite materials. Their support enables our transition to high-power, two-stage vehicles.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957624/1_4_bueu0r.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        imgFirst:    true,
    },
    {
        id:          "stellar",
        name:        "Stellar",
        tier:        "Silver",
        label:       "Avionics Partner",
        tagline:     "Precision instruments for aerospace",
        description: "Stellar provides the high-fidelity avionics and telemetry systems necessary for our high-altitude flights, ensuring we receive accurate data throughout the mission profile.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957630/2_4_mw1ooq.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        imgFirst:    false,
    },
    {
        id:          "nexus",
        name:        "Nexus",
        tier:        "Gold",
        label:       "Manufacturing Partner",
        tagline:     "Advanced manufacturing solutions",
        description: "Our complex motor casings and recovery hardware are made possible through Nexus's state-of-the-art CNC machining and additive manufacturing capabilities.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957633/3_4_zoq99i.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        imgFirst:    true,
    },
    {
        id:          "omnidynamics",
        name:        "OmniDynamics",
        tier:        "Bronze",
        label:       "Aerodynamics Partner",
        tagline:     "Fluid and aerodynamic testing",
        description: "OmniDynamics provided crucial wind-tunnel time and CFD software licenses, allowing our aerodynamics team to validate fin designs before manufacturing.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957635/4_2_flytmz.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        imgFirst:    false,
    },
    {
        id:          "velocity",
        name:        "Velocity",
        tier:        "Silver",
        label:       "Logistics Partner",
        tagline:     "Logistics and mission support",
        description: "Moving a 15-foot rocket and ground support equipment across the country is no small feat. Velocity ensures our hardware arrives safely and on time for launch day.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957637/5_3_ew7tzz.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        imgFirst:    true,
    },
    {
        id:          "horizon",
        name:        "Horizon",
        tier:        "Gold",
        label:       "Research Partner",
        tagline:     "Pushing boundaries in deep space",
        description: "Horizon's grant funding allows us to pursue ambitious R&D projects like our liquid bipropellant testbed, expanding the scope of what our student team can achieve.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957640/6_2_npem1i.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        imgFirst:    false,
    },
    {
        id:          "aegis",
        name:        "Aegis",
        tier:        "Bronze",
        label:       "Safety Partner",
        tagline:     "Safety and recovery systems",
        description: "Aegis supplies the specialized parachutes and deployment bags needed to bring our rockets back safely. Their expertise has been vital in designing redundant recovery architectures.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957642/7_2_hz55b6.png",
        bgOld:       "#f0ece6",
        bgNew:       "#19191b",
        color:       "#f0ece6",
        imgFirst:    true,
    },
    {
        id:          "novacore",
        name:        "NovaCore",
        tier:        "Silver",
        label:       "Materials Partner",
        tagline:     "Advanced energetic materials",
        description: "NovaCore provides the technical advisory and materials required for our experimental solid propellant formulations, focusing on specific impulse optimization and burn rate characterization.",
        image:       "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1788957645/8_2_zser0y.png",
        bgOld:       "#19191b",
        bgNew:       "#f0ece6",
        color:       "#19191b",
        imgFirst:    false,
    },
];

/* =====================================================
   TIER COLORS
===================================================== */
const TIER_COLORS: Record<string, string> = {
    Gold:   "#d4a843",
    Silver: "#8a9ba8",
    Bronze: "#b07040",
};

/* =====================================================
   EASE
===================================================== */
function easeInOutCubic(x: number) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/* =====================================================
   COMPONENT
===================================================== */
export default function SponsorsLayout() {

    useEffect(() => {
        const sections =
            document.querySelectorAll<HTMLElement>(".spl-transition-section");

        function update() {
            sections.forEach((section) => {
                const rect       = section.getBoundingClientRect();
                const scrollDist = section.offsetHeight - window.innerHeight;
                const p          = Math.max(0, Math.min(1, -rect.top / scrollDist));

                const reveal = section.querySelector<HTMLElement>(".spl-reveal-layer");
                const img    = section.querySelector<HTMLElement>(".spl-new-image");
                const txt    = section.querySelector<HTMLElement>(".spl-new-text");
                if (!reveal || !img || !txt) return;

                // ── Phase 1: 0→60% scroll — circle grows from BOTTOM-CENTER ──
                // Pixel coords: zero ambiguity about where center lands.
                const sticky  = section.querySelector<HTMLElement>(".spl-sticky-page");
                if (!sticky) return;
                const w       = sticky.offsetWidth;
                const h       = sticky.offsetHeight;
                const cx      = w / 2;
                const cy      = h;
                const maxR    = Math.hypot(cx, h) + 20;
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
                .spl-page {
                    font-family: "DM Sans", sans-serif;
                    overflow-x: hidden;
                    background: #f0ece6;
                    color: #19191b;
                }

                /* ── HERO ── */
                .spl-hero {
                    height: 100vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f0ece6;
                    overflow: hidden;
                }
                .spl-hero-content {
                    width: 100%;
                    position: relative;
                    text-align: center;
                }
                .spl-hero-title {
                    font-size: clamp(65px, 10vw, 180px);
                    line-height: .84;
                    letter-spacing: -.085em;
                    font-weight: 700;
                    color: #19191b;
                }
                .spl-hero-line {
                    display: block;
                    opacity: 0;
                    transform: translateY(70px);
                    animation: splHeroText 1s cubic-bezier(.22,1,.36,1) forwards;
                }
                .spl-hero-line:nth-child(1) { animation-delay: .1s; }
                .spl-hero-line:nth-child(2) { animation-delay: .3s; }
                .spl-hero-line:nth-child(3) { animation-delay: .5s; }
                @keyframes splHeroText {
                    to { opacity: 1; transform: translateY(0); }
                }
                .spl-hero-sub {
                    margin-top: clamp(32px, 4vw, 56px);
                    font-size: clamp(16px, 1.8vw, 20px);
                    opacity: 0;
                    animation: splFadeUp .9s cubic-bezier(.22,1,.36,1) .8s forwards;
                    opacity: 0;
                    max-width: 560px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                    opacity: 0;
                }
                @keyframes splFadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: .6; transform: translateY(0); }
                }
                .spl-scroll-hint {
                    position: absolute;
                    bottom: 35px; left: 50%;
                    transform: translateX(-50%);
                    font-size: 13px;
                    letter-spacing: .15em;
                    text-transform: uppercase;
                    opacity: .55;
                    color: #19191b;
                    animation: splPulse 2.5s ease-in-out 1.5s infinite;
                }
                @keyframes splPulse {
                    0%, 100% { opacity: .3; }
                    50%      { opacity: .65; }
                }

                /* Decorative rings */
                .spl-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(25,25,27,0.06);
                    top: 50%; left: 50%;
                    transform: translate(-50%,-50%);
                    animation: splRotate 30s linear infinite;
                    pointer-events: none;
                }
                .spl-ring-2 { animation-duration: 20s; animation-direction: reverse; }
                @keyframes splRotate {
                    from { transform: translate(-50%,-50%) rotate(0deg); }
                    to   { transform: translate(-50%,-50%) rotate(360deg); }
                }

                /* Sponsor count badge */
                .spl-hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    margin-top: 48px;
                    padding: 10px 22px;
                    border-radius: 100px;
                    border: 1px solid rgba(25,25,27,.15);
                    font-size: 13px;
                    letter-spacing: .08em;
                    opacity: 0;
                    animation: splFadeUp .9s cubic-bezier(.22,1,.36,1) 1s forwards;
                }
                .spl-badge-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #d4a843;
                }

                /* ── TRANSITION SECTION ── */
                .spl-transition-section {
                    height: 320vh;
                    position: relative;
                }
                .spl-sticky-page {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                }
                /* Old background — always visible beneath the reveal layer */
                .spl-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }
                /*
                 * Reveal layer — clip-path driven by scroll.
                 * Starts as circle(0%) at bottom-center; expands to cover screen.
                 * Everything new lives inside so nothing bleeds through prematurely.
                 */
                .spl-reveal-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    clip-path: circle(0vmax at 50% 100%);
                    will-change: clip-path;
                    overflow: hidden;
                }
                /* New solid background fill inside the reveal layer */
                .spl-reveal-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                }

                /* ── CONTENT GRID (lives inside .spl-reveal-layer) ── */
                .spl-content {
                    position: absolute;
                    inset: 0;
                    z-index: 2;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    gap: 8vw;
                    padding: 100px 8vw;
                }
                .spl-new-image {
                    width: 100%;
                    height: min(65vh, 560px);
                    border-radius: 35px;
                    overflow: hidden;
                    opacity: 0;
                    transform: translateY(90px) scale(.88);
                    will-change: transform, opacity;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .spl-new-image img {
                    width: 80%;
                    height: 80%;
                    object-fit: contain;
                }
                .spl-new-text {
                    opacity: 0;
                    transform: translateY(65px);
                    will-change: opacity, transform;
                }
                .spl-label {
                    font-size: 12px;
                    letter-spacing: .2em;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                    opacity: .55;
                }
                .spl-tier-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 5px 14px;
                    border-radius: 100px;
                    border: 1px solid currentColor;
                    font-size: 11px;
                    letter-spacing: .12em;
                    text-transform: uppercase;
                    opacity: .7;
                    margin-bottom: 24px;
                }
                .spl-tier-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }
                .spl-new-text h2 {
                    font-family: "Instrument Serif", serif;
                    font-size: clamp(55px, 7vw, 125px);
                    line-height: .88;
                    letter-spacing: -.075em;
                    font-weight: 400;
                    margin-bottom: 16px;
                }
                .spl-tagline {
                    font-size: 18px;
                    font-weight: 500;
                    opacity: .5;
                    margin-bottom: 28px;
                    letter-spacing: -.01em;
                }
                .spl-description {
                    font-size: 17px;
                    line-height: 1.75;
                    max-width: 540px;
                    opacity: .7;
                    margin-bottom: 36px;
                }
                .spl-cta-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: .04em;
                    text-decoration: none;
                    color: inherit;
                    opacity: .85;
                    transition: opacity .2s, gap .2s;
                    border-bottom: 1px solid currentColor;
                    padding-bottom: 4px;
                }
                .spl-cta-link:hover { opacity: 1; gap: 14px; }

                .spl-ghost-num {
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
                .spl-final {
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
                .spl-final-eyebrow {
                    font-size: 12px;
                    letter-spacing: .2em;
                    text-transform: uppercase;
                    opacity: .4;
                    margin-bottom: 40px;
                }
                .spl-final h2 {
                    font-family: "Instrument Serif", serif;
                    font-size: clamp(64px, 11vw, 190px);
                    line-height: .84;
                    letter-spacing: -.085em;
                    font-weight: 400;
                    margin-bottom: 36px;
                }
                .spl-final p {
                    font-size: 19px;
                    opacity: .6;
                    max-width: 480px;
                    line-height: 1.65;
                    margin-bottom: 48px;
                }
                .spl-final-actions {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .spl-btn-primary {
                    display: inline-block;
                    padding: 18px 38px;
                    border-radius: 100px;
                    background: #19191b;
                    color: #f0ece6;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: .04em;
                    text-decoration: none;
                    transition: opacity .25s, transform .25s;
                }
                .spl-btn-primary:hover { opacity: .8; transform: translateY(-2px); }
                .spl-btn-secondary {
                    display: inline-block;
                    padding: 18px 38px;
                    border-radius: 100px;
                    border: 1px solid rgba(25,25,27,.25);
                    color: #19191b;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: .04em;
                    text-decoration: none;
                    transition: border-color .25s, transform .25s;
                }
                .spl-btn-secondary:hover { border-color: #19191b; transform: translateY(-2px); }
                .spl-final-footer {
                    margin-top: 100px;
                    font-size: 13px;
                    opacity: .28;
                    letter-spacing: .1em;
                }

                /* ── MOBILE ── */
                @media (max-width: 860px) {
                    .spl-content {
                        grid-template-columns: 1fr;
                        padding: 90px 28px 40px;
                        gap: 32px;
                    }
                    .spl-new-image { height: 38vh; min-height: 260px; }
                    .spl-new-text h2 { font-size: 54px; }
                    .spl-transition-section { height: 280vh; }
                    .spl-ghost-num { display: none; }
                }
            ` }} />

            <div className="spl-page">

                {/* ── HERO ── */}
                <section className="spl-hero">
                    <div className="spl-ring"  style={{ width: "min(60vw,560px)", height: "min(60vw,560px)" }} />
                    <div className="spl-ring spl-ring-2" style={{ width: "min(40vw,380px)", height: "min(40vw,380px)" }} />

                    <div className="spl-hero-content">
                        <h1 className="spl-hero-title">
                            <span className="spl-hero-line">Fueled</span>
                            <span className="spl-hero-line">
                                <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontWeight: 400 }}>By Partners.</em>
                            </span>
                        </h1>

                        <div className="spl-hero-badge">
                            <span className="spl-badge-dot" />
                            8 Partner Organisations · 2024–25 Season
                        </div>
                    </div>

                    <div className="spl-scroll-hint">Scroll to explore</div>
                </section>


                {/* ── TRANSITION SECTIONS — one per sponsor ── */}
                {sponsors.map((sponsor, i) => {
                    const tierColor = TIER_COLORS[sponsor.tier] ?? "currentColor";
                    return (
                        <section
                            key={sponsor.id}
                            id={sponsor.id}
                            className="spl-transition-section"
                        >
                            <div className="spl-sticky-page">

                                {/* ── OLD BACKGROUND ── */}
                                <div className="spl-bg" style={{ background: sponsor.bgOld }} />

                                {/*
                                 * ── REVEAL LAYER ──
                                 * clip-path starts as circle(0%) at bottom-center.
                                 * Driven by scroll to expand until full screen.
                                 * New bg + image + text all live inside.
                                 */}
                                <div className="spl-reveal-layer">

                                    {/* New background fill */}
                                    <div className="spl-reveal-bg" style={{ background: sponsor.bgNew }} />

                                    {/* CONTENT GRID */}
                                    <div className="spl-content" style={{ color: sponsor.color }}>

                                        {/* IMAGE */}
                                        <div
                                            className="spl-new-image"
                                            style={{ order: sponsor.imgFirst ? 0 : 2 }}
                                        >
                                            <img src={sponsor.image} alt={sponsor.name} />
                                        </div>

                                        {/* TEXT */}
                                        <div className="spl-new-text" style={{ order: 1 }}>

                                            <div className="spl-label">{sponsor.label}</div>

                                            <div
                                                className="spl-tier-badge"
                                                style={{ borderColor: tierColor, color: tierColor }}
                                            >
                                                <span className="spl-tier-dot" style={{ background: tierColor }} />
                                                {sponsor.tier} Sponsor
                                            </div>

                                            <h2>{sponsor.name}</h2>

                                            <div className="spl-tagline">{sponsor.tagline}</div>

                                            <p className="spl-description">{sponsor.description}</p>

                                            <a
                                                href="#"
                                                className="spl-cta-link"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                Visit Website →
                                            </a>
                                        </div>
                                    </div>

                                    {/* GHOST NUMBER */}
                                    <div
                                        className="spl-ghost-num"
                                        style={{ color: sponsor.color }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </div>

                                </div>{/* /spl-reveal-layer */}

                            </div>
                        </section>
                    );
                })}


                {/* ── FINAL CTA ── */}
                <section className="spl-final">
                    <div className="spl-final-eyebrow">Get Involved</div>
                    <h2>
                        Become a<br />
                        <em style={{ fontStyle: "italic" }}>Partner.</em>
                    </h2>
                    <p>
                        Support student aerospace engineering and put your brand
                        on the side of a rocket going 10,000 feet up.
                    </p>
                    <div className="spl-final-actions">
                        <a href="/contact-us" className="spl-btn-primary">
                            Get In Touch →
                        </a>
                        <a href="/projects" className="spl-btn-secondary">
                            View Our Work
                        </a>
                    </div>
                    <div className="spl-final-footer">
                        BMSCE Rocketry · Est. 2019 · Flying Higher Every Year
                    </div>
                </section>

            </div>
        </>
    );
}
