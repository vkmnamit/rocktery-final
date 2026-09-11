"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import "./TeamLayout.css";

// [name, role, description, linkedin, photo, email]
const members = [
    ["Shreyas Vinod Kulkarni", "Chief Systems Engineer, Mission Operations", "", "https://www.linkedin.com/in/shreyas-kulkarni-8b4391222/", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159297/12_mu3thw.jpg", "shreyasvinod.se24@bmsce.ac.in"],
    ["Mohammed Zubair", "Head of Logistics", "Plans and coordinates procurement, inventory, workshop operations and launch logistics so each subsystem has the right resources at the right time.", "https://www.linkedin.com/in/mohammed-zubair-783412337", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159292/23_wrvzhh.jpg", "mohammed.zubair.f@gmail.com"],
    ["Arush Dwivedi", "FCS Lead", "Leads the design and testing of rocket avionics while training the flight-control systems team.", "https://www.linkedin.com/in/arushdwivedi11", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159284/19_yklbfg.jpg", "arushdwivedi.ec23@bmsce.ac.in"],
    ["Jatin Nagvekar", "Finance Head", "Handles procurement and detailed segregation of college funding.", "https://www.linkedin.com/in/jatin-nagvekar-136371291", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789161758/IMG-20260326-WA0016_-_Jatin_Nagvekar_bx1gzx.jpg", "jatinnagvekar@gmail.com"],
    ["Pranav Vasanth Kumar Rao", "Chief Propulsion Engineer", "Leads the engineering, testing and optimization of the team’s solid and advanced rocket propulsion systems.", "https://www.linkedin.com/in/pranav-vasanth-kumar-rao-27b561329/", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/14_e4uq62.png", "pranavvasanth.me23@bmsce.ac.in"],
    ["Jatin Oswal", "Mission Captain", "Works across airframe, structures, recovery, flight control systems, integration and administration.", "https://www.linkedin.com/in/jatin-oswal-79b417303", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/13_xaatcn.jpg", "jatinnitin.se23@bmsce.ac.in"],
    ["Sanjana Atreya GS", "Corporate Lead", "Leads sponsorship and public-relations work, focusing on partner acquisition and long-term relationships.", "https://www.linkedin.com/in/sanjana-atreya-41b601252", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789161917/Screenshot_20260613_162652_Gallery_-_Sanjana_Atreya_G_S_meu9lx.jpg", "sanjanaatreya.me24@bmsce.ac.in"],
    ["Chiranthan S", "Chief Flight Control Systems Engineer", "Oversees the design, testing and integration of avionics, microcontroller systems and telemetry components.", "https://www.linkedin.com/in/chiranthan-s", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159287/20_l7lvoa.jpg", "chiranthan46124@gmail.com"],
    ["Samruddhee H P", "Recovery Team Lead", "Leads the development of reliable recovery systems, including parachutes and deployment mechanisms.", "https://www.linkedin.com/in/samruddhee-h-p-018263330", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159289/17_w1oaxx.jpg", "samruddheehp.se24@bmsce.ac.in"],
    ["Sujith J Poojary", "Aero-Structures Lead", "Leads aerodynamic design, structural analysis and manufacturing from concept to a flight-ready airframe.", "https://www.linkedin.com/in/sujith-j-poojary-6684b7200", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159288/21_c5rrv2.png", "sujithj.se23@bmsce.ac.in"],
    ["Praneeth Mahantesh M", "Propulsion Lead", "Coordinates propulsion design, analysis, testing, reviews and integration across the mission lifecycle.", "https://www.linkedin.com/in/praneeth-mahantesh-m-b41260328", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/15_o844zc.jpg", "praneethmahantesh.se24@bmsce.ac.in"],
    ["Ananya Ulhas", "Associate Engineer · Recovery", "Contributes to reliable recovery mechanisms while supporting subsystem operations and mentoring junior engineers.", "https://www.linkedin.com/in/ananya-ulhas-a6754b33a", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159286/18_ucbxz5.jpg", "ananyaulhas.se24@bmsce.ac.in"],
    ["Prerana Joshi", "Propulsion Lead", "Designs, analyses, tests and integrates propulsion systems, from grain geometry through static-fire validation.", "https://www.linkedin.com/in/prerana-joshi-436694215", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159284/16_r8xsrn.jpg", "preranajoshi.se24@bmsce.ac.in"],
    ["Sushmitha K S", "Ground Station Officer", "", "https://www.linkedin.com/in/sushmitha-k-s", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789162137/Sushmitha_-_Sushmitha_K_S_mounst.jpg", "ks.sushmitha.24.10@gmail.com"],
] as const;

type Member = {
    name: string;
    role: string;
    description: string;
    linkedin: string;
    photo: string;
    email: string;
};

const toMember = (row: readonly [string, string, string, string, string, string]): Member => ({
    name: row[0],
    role: row[1],
    description: row[2],
    linkedin: row[3],
    photo: row[4],
    email: row[5],
});

const initials = (name: string) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");

export default function TeamLayout() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [profileTop, setProfileTop] = useState(74);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const active = activeIndex === null ? null : toMember(members[activeIndex]);
    // Preload all portraits once so the popup image appears instantly on hover.
    useEffect(() => {
        members.forEach((row) => {
            const src = row[4];
            if (src) {
                const img = new Image();
                img.src = src;
            }
        });
    }, []);
    const clearHoverTimer = () => {
        if (hoverTimer.current) {
            clearTimeout(hoverTimer.current);
            hoverTimer.current = null;
        }
    };
    const selectMember = (index: number, target: HTMLElement) => {
        // Small delay ignores accidental fly-by hovers and stops flicker between rows.
        clearHoverTimer();
        hoverTimer.current = setTimeout(() => {
            setActiveIndex(index);
            // Clamp so the floating card never slides past the directory bottom.
            const directory = target.closest(".directory") as HTMLElement | null;
            const rawTop = target.offsetTop;
            const maxTop = directory ? Math.max(74, directory.offsetHeight - 680) : rawTop;
            setProfileTop(Math.min(rawTop, maxTop));
        }, 70);
    };
    const cancelHover = () => {
        clearHoverTimer();
        setActiveIndex(null);
    };

    return (
        <main className="team-page" onMouseLeave={cancelHover}>
            <section className="team-hero">
                <span>01 / People behind the mission</span>
                <div>
                    <h1>
                        Meet
                        <br />
                        the
                        <br />
                        Team.
                    </h1>
                    <p>A multidisciplinary team of engineers, designers and builders taking ambitious ideas from concept to flight.</p>
                </div>
            </section>
            <section className="team-directory-section" id="team">
                <div className="team-heading">
                    <h2>
                        Our
                        <br />
                        People.
                    </h2>
                    <p>Move over a member to reveal their profile. Each image slot is ready for an individual portrait.</p>
                </div>
                <div
                    className={`directory${active ? " has-hover" : ""}`}
                    onMouseLeave={() => setActiveIndex(null)}
                    onMouseMove={(event) => {
                        const target = event.target as HTMLElement;
                        if (!target.closest(".member-row") && !target.closest(".profile-panel")) setActiveIndex(null);
                    }}
                >
                    <div className="directory-labels">
                        <span>Team member</span>
                        <span>Role / responsibility</span>
                    </div>
                    {members.map((row, index) => {
                        const member = toMember(row);
                        return (
                            <button
                                type="button"
                                className={`member-row${activeIndex === index ? " active" : ""}`}
                                key={member.name}
                                onMouseEnter={(event: MouseEvent<HTMLButtonElement>) => selectMember(index, event.currentTarget)}
                                onFocus={(event) => selectMember(index, event.currentTarget)}
                                onClick={(event) => {
                                    // Phones have no hover — the + button toggles the photo popup.
                                    clearHoverTimer();
                                    if (activeIndex === index) {
                                        setActiveIndex(null);
                                    } else {
                                        const target = event.currentTarget;
                                        setActiveIndex(index);
                                        const directory = target.closest(".directory") as HTMLElement | null;
                                        const rawTop = target.offsetTop;
                                        const maxTop = directory ? Math.max(74, directory.offsetHeight - 680) : rawTop;
                                        setProfileTop(Math.min(rawTop, maxTop));
                                    }
                                }}
                                aria-expanded={activeIndex === index}
                            >
                                <span className="member-name">
                                    <i>{String(index + 1).padStart(2, "0")}</i>
                                    {member.name}
                                </span>
                                <span className="member-role">{member.role}</span>
                                <span className="member-plus">{activeIndex === index ? "×" : "+"}</span>
                            </button>
                        );
                    })}
                    {active && (
                        <aside className="profile-panel" style={{ "--profile-top": `${profileTop}px` } as CSSProperties}>
                            <button className="profile-close" onClick={() => setActiveIndex(null)} aria-label="Close member profile">×</button>
                            <div className="profile-photo">
                                {active.photo ? (
                                    <img className="profile-photo-img" src={active.photo} alt={active.name} />
                                ) : (
                                    <div className="portrait-placeholder">
                                        <b>{initials(active.name)}</b>
                                        <span>Portrait pending</span>
                                    </div>
                                )}
                                <a className="profile-link" href={active.linkedin} target="_blank" rel="noreferrer" aria-label={`${active.name} on LinkedIn`}>
                                    in
                                </a>
                                <a className="profile-mail" href={`mailto:${active.email}`} aria-label={`Email ${active.name}`}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </a>
                                <div className="profile-description">
                                    <span>Mission profile</span>
                                    <p>{active.description || "Profile details will be added here."}</p>
                                </div>
                            </div>
                            <div className="profile-info">
                                <h3>{active.name}</h3>
                                <p>{active.role}</p>
                                <a className="profile-email" href={`mailto:${active.email}`}>
                                    {active.email}
                                </a>
                            </div>
                        </aside>
                    )}
                </div>
                <div className="team-note">
                    <p>Every successful launch is the sum of many disciplines moving in the same direction.</p>
                    <span>Rocketry BMSCE · Team Directory</span>
                </div>
            </section>
            <section className="team-cta">
                <h2>
                    Build
                    <br />
                    With Us.
                </h2>
                <div>
                    <p>Want to help build the next flight system?</p>
                    <a href="mailto:rocketry@bmsce.ac.in">Get in touch →</a>
                </div>
            </section>
        </main>
    );
}
