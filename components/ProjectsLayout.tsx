"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import FloatingParticles from "./FloatingParticles";
import "./ProjectsLayout.css";

const launchDate = new Date("2026-10-30T00:00:00+05:30").getTime();
const getLaunchTime = () => {
    const total = Math.max(0, launchDate - Date.now());
    return {
        days: Math.floor(total / 86_400_000),
        hours: Math.floor((total / 3_600_000) % 24),
        minutes: Math.floor((total / 60_000) % 60),
        seconds: Math.floor((total / 1_000) % 60),
    };
};

export default function Home() {
    const [launchTime, setLaunchTime] = useState(getLaunchTime);
    useEffect(() => {
        const wipes = Array.from(
            document.querySelectorAll<HTMLElement>(".wipe")
        );
        const revealSections = Array.from(
            document.querySelectorAll<HTMLElement>(".project-reveal")
        );

        const clamp = (v: number) => Math.max(0, Math.min(1, v));
        const ease = (v: number) => 1 - Math.pow(1 - v, 3);

        let raf = 0;

        function update() {
            raf = 0;
            const vh = window.innerHeight;

            wipes.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const p = clamp((vh - rect.top) / vh);
                const r = Math.round(1000 * (1 - ease(p)));

                el.style.borderTopLeftRadius = `${r}px`;
                el.style.borderTopRightRadius = `${r}px`;
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
        );
        revealSections.forEach((section) => observer.observe(section));

        function schedule() {
            if (!raf) raf = requestAnimationFrame(update);
        }

        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);

        update();

        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);

            if (raf) cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const interval = window.setInterval(() => setLaunchTime(getLaunchTime()), 1_000);
        return () => window.clearInterval(interval);
    }, []);

    const trackLaunchPointer = (event: React.PointerEvent<HTMLElement>) => {
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        target.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    };

    return (
        <>
            {/* HERO */}
            <section className="hero">
                <h1>
                    <span>We Build</span>
                    <span>Rockets.</span>
                </h1>

                <div className="hero-image">
                    <img
                        src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1787136697/1_1_zzxexj.png"
                        alt="Rocket"
                    />
                </div>

                <div className="scroll-hint">Scroll to explore ↓</div>
            </section>

            {/* PROJECT 01 — cream wipes over the black hero */}
            <div className="project-chapter">
            <section
                className="wipe"
                style={{ "--fill": "#f2ede4" } as CSSProperties}
            />

            <section
                className="mission-title project-reveal"
                style={{
                    "--bg": "#f2ede4",
                    "--ink": "#151515",
                } as CSSProperties}
            >
                <div className="intro-index">01 / 04 · NAF-2</div>
                <h2>
                    <span>Independent</span>
                    <span>Launch</span>
                    <span>NAF-2.</span>
                </h2>
            </section>
            <section
                className="details-page project-reveal"
                style={{
                    "--bg": "#f2ede4",
                    "--ink": "#151515",
                } as CSSProperties}
            >
                <div className="details-wrap">
                    <aside className="details-side">
                        <div className="details-number">01 / 04 · NAF-2 · Mission Archive</div>
                        <h3>
                            Independent
                            <br />
                            Flight.
                        </h3>
                        <div className="side-line"></div>
                        <div className="side-meta">
                            Deployment Date · December 14, 2025
                            <br />
                            <br />
                            Launch Site · Handigundi Betta, Ramanagara District, Karnataka, India
                        </div>


                        <div className="large-image">
                            <img
                                src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1787136697/1_1_zzxexj.png"
                                alt="Mission 1"
                            />
                        </div>
                    </aside>

                    <main className="details-main">
                        <p className="intro-copy">
                            A mission built to validate independent launch capability while proving
                            that redundant recovery systems could safely bring the vehicle back even
                            when flight conditions did not go as planned.
                        </p>

                        <div className="spec-block">
                            <div className="spec-label">Mission Statement</div>
                            <div className="spec-text">
                                To validate redundant recovery mechanisms & Independent launch operation capabilities.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Technical Architecture</div>
                            <div className="spec-text">
                                GFRP Airframe, Von Karmen Series Nose Cone, Custom Fins for extremely
                                stable flight. Inhouse manufactured avionics & telemetry systems
                                alongside Recovery hardware & Parachute.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Mission Conclusion</div>
                            <div className="spec-text">
                                Commercial Motor failure leading to sub nominal apogee but Safe &
                                successful recovery achieved. Independent Launch Operations Successfully
                                conducted end to end and praised by Industry Experts.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Launch Operations</div>
                            <div className="spec-text">
                                Securing a landmark position as the fifth student-led team nationwide
                                to successfully establish and execute end-to-end independent launch capabilities.
                            </div>
                        </div>

                    </main>
                </div>
            </section>
            </div>
            {/* PROJECT 02 — black wipes over the cream */}
            <div className="project-chapter">
            <section
                className="wipe"
                style={{ "--fill": "#151515" } as CSSProperties}
            />

            <section
                className="mission-title project-reveal"
                style={{
                    "--bg": "#151515",
                    "--ink": "#f2ede4",
                } as CSSProperties}
            >
                <div className="intro-index">02 / 04 · Vyomagni</div>
                <h2>
                    <span>Vyomagni</span>
                    <span>Model</span>
                    <span>Rocketry.</span>
                </h2>
            </section>

            <section
                className="details-page project-reveal"
                style={{
                    "--bg": "#151515",
                    "--ink": "#f2ede4",
                } as CSSProperties}
            >
                <div className="details-wrap">
                    <aside className="details-side">
                        <div className="details-number">02 / 04 · ISRO Model Rocketry</div>
                        <h3>
                            Vyomagni
                            <br />
                            Rocketry.
                        </h3>
                        <div className="side-line"></div>
                        <div className="side-meta">
                            InSPACE · ISRO Collaboration
                            <br />
                            <br />
                            Model Rocketry Development Programme
                        </div>


                        <div className="large-image">
                            <img
                                src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1787136701/2_1_yj8fwg.png"
                                alt="Mission 2"
                            />
                        </div>
                    </aside>

                    <main className="details-main">
                        <p className="intro-copy">
                            A competition flight focused on payload capacity, precision apogee and
                            achieving a stable vehicle configuration under demanding national
                            competition conditions.
                        </p>

                        <div className="spec-block">
                            <div className="spec-label">Mission Statement</div>
                            <div className="spec-text">
                                To validate payload capacities and precision apogee launch capabilities.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Technical Architecture</div>
                            <div className="spec-text">
                                6 inch diameter Rocket, integrated with 1 kg payload CanSat, Carbon
                                fiber 3D printed components for weight reduction with G10 fins &
                                GFRP Airframe.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Mission Conclusion</div>
                            <div className="spec-text">
                                Successfully qualified for national finals, most stable flight in the
                                competition with sub nominal recovery.
                            </div>
                        </div>

                    </main>
                </div>
            </section>
            </div>
            {/* PROJECT 03 — cream wipes over the black */}
            <div className="project-chapter">
            <section
                className="wipe"
                style={{ "--fill": "#f2ede4" } as CSSProperties}
            />

            <section
                className="mission-title project-reveal"
                style={{
                    "--bg": "#f2ede4",
                    "--ink": "#151515",
                } as CSSProperties}
            >
                <div className="intro-index">03 / 04 · Lumos S3P3</div>
                <h2>
                    <span>Motor</span>
                    <span>Development</span>
                    <span>Lumos S3P3.</span>
                </h2>
            </section>

            <section
                className="details-page project-reveal"
                style={{
                    "--bg": "#f2ede4",
                    "--ink": "#151515",
                } as CSSProperties}
            >
                <div className="details-wrap">
                    <aside className="details-side">
                        <div className="details-number">03 / 04 · Motor Development</div>
                        <h3>
                            Build
                            <br />
                            Thrust.
                        </h3>
                        <div className="side-line"></div>
                        <div className="side-meta">
                            Inhouse propulsion research
                            <br />
                            <br />
                            Structured testing programme
                        </div>


                        <div className="large-image">
                            <img
                                src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1787136867/4_1_mw6rw2.png"
                                alt="Mission 3"
                            />
                        </div>
                    </aside>

                    <main className="details-main">
                        <p className="intro-copy">
                            A structured research programme aimed at progressively developing inhouse
                            solid propulsion capability through controlled testing and increasing impulse.
                        </p>

                        <div className="spec-block">
                            <div className="spec-label">Mission Statement</div>
                            <div className="spec-text">
                                To develop inhouse I class solid propulsion motor collaborating with startups.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Technical Architecture</div>
                            <div className="spec-text">
                                System architecture of structured testing with increasing Impulse to
                                achieve the goal safely.
                            </div>
                        </div>

                    </main>
                </div>
            </section>
            </div>
            {/* PROJECT 04 — black wipes over the cream */}
            <div className="project-chapter">
            <section
                className="wipe"
                style={{ "--fill": "#151515" } as CSSProperties}
            />

            <section
                className="mission-title project-reveal"
                style={{
                    "--bg": "#151515",
                    "--ink": "#f2ede4",
                } as CSSProperties}
            >
                <div className="intro-index">04 / 04 · Phoenix</div>
                <h2>
                    <span>Upcoming</span>
                    <span>Mission</span>
                    <span>Phoenix.</span>
                </h2>
            </section>

            <section
                className="details-page project-reveal"
                style={{
                    "--bg": "#151515",
                    "--ink": "#f2ede4",
                } as CSSProperties}
            >
                <div className="details-wrap">
                    <aside className="details-side">
                        <div className="details-number">04 / 04 · Upcoming Mission</div>
                        <h3>
                            Higher.
                            <br />
                            Smarter.
                        </h3>
                        <div className="side-line"></div>
                        <div className="side-meta">
                            Advanced telemetry · Redundant avionics
                            <br />
                            <br />
                            Higher apogee programme
                        </div>


                        <div className="large-image">
                            <img
                                src="https://res.cloudinary.com/dgrrdy6sk/image/upload/v1787136899/3_1_wgqzip.png"
                                alt="Mission 4"
                            />
                        </div>
                    </aside>

                    <main className="details-main">
                        <p className="intro-copy">
                            An upcoming systems programme bringing precise telemetry, redundant
                            avionics and booster-section mechanisms together for future higher-apogee launches.
                        </p>

                        <div className="spec-block">
                            <div className="spec-label">Mission Statement</div>
                            <div className="spec-text">
                                To develop & validate extremely precise, sophisticated & redundant
                                Telemetry & Avionics systems with Booster section ejection, all combining
                                to develop mechanisms for upcoming higher apogee launches.
                            </div>
                        </div>

                        <div className="spec-block">
                            <div className="spec-label">Technical Architecture</div>
                            <div className="spec-text">Under development.</div>
                        </div>

                    </main>
                </div>
            </section>
            </div>

            {/* END */}
            <section
                className="end"
                onPointerMove={trackLaunchPointer}
            >
                <FloatingParticles
                    count={70}
                    size={2}
                    opacity={0.65}
                    glow={12}
                    speed={0.5}
                    influence={150}
                    color="#f2ede4"
                />
                <div>
                    <h2>
                        Next
                        <br />
                        Launch.
                    </h2>
                    <p>Built independently · Ready for what is next</p>
                    <div className="launch-countdown" aria-label="Countdown to 30 October 2026">
                        {Object.entries(launchTime).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
                    </div>
                    <small className="launch-date">Target launch · 30 Oct 2026</small>
                </div>
            </section>
        </>
    );
}
