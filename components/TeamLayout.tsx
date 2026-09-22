"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { ADVISORS, ADVISORY_COMMITTEE, initials, ORG, RAW, TEAMS, toMember } from "./teamData";
import type { OrgNodeData } from "./teamData";
import "./TeamLayout.css";

/* ══════════════════════════════════════════════════════════════════════════
   Page component — all member info lives in ./teamData
══════════════════════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════════════════════
   Org-chart node (recursive)
══════════════════════════════════════════════════════════════════════════ */

function OrgChartNode({ node, openTeam, setOpenTeam, onHoverTeam }: { node: OrgNodeData, openTeam: string | null, setOpenTeam: (id: string | null) => void, onHoverTeam: (id: string | null) => void }) {
    const hasChildren = !!node.children?.length;
    const isInteractive = !!node.teamId;
    const isOpen = isInteractive && openTeam === node.teamId;
    
    // Find the team members if this node corresponds to a team
    const teamData = isInteractive ? TEAMS.find(t => t.id === node.teamId) : null;
    /* All teams' member cards sit below their box even with the mouse away;
       hovering (or click-pinning) a box pops that team's cards up as active. */
    const hasMembers = !!teamData && teamData.members.length > 0;

    return (
        <div
            className="on"
            /* Hovering anywhere outside this node's own subtree (box + popped-up
               member cards) removes the hover popup, unless it was pinned by a click. */
            onMouseLeave={isInteractive ? () => onHoverTeam(null) : undefined}
        >
            {isInteractive ? (
                <button
                    className={[
                        "on-box",
                        node.highlight ? "on-box--hl" : "",
                        node.vacant ? "on-box--vacant" : "",
                        isOpen ? "on-box--active" : ""
                    ].filter(Boolean).join(" ")}
                    /* Hover OR click both pop the member cards up. Click pins
                       them open (stays after the mouse leaves); hover alone
                       clears as soon as the mouse moves away. */
                    onMouseEnter={() => onHoverTeam(node.teamId!)}
                    onClick={() => setOpenTeam(isOpen ? null : node.teamId!)}
                    style={{
                        cursor: "pointer",
                        border: isOpen ? "1px solid var(--cream)" : undefined,
                        background: isOpen ? "var(--cream)" : undefined,
                        color: isOpen ? "var(--ink)" : undefined,
                        transition: "all 0.3s ease"
                    }}
                >
                    <span className="on-title" style={{ color: isOpen ? "rgba(17,17,17,.6)" : undefined }}>{node.title}</span>
                    {node.name && <span className="on-name" style={{ color: isOpen ? "var(--ink)" : undefined }}>{node.name}</span>}
                </button>
            ) : (
                <div className={[
                    "on-box",
                    node.highlight ? "on-box--hl" : "",
                    node.vacant ? "on-box--vacant" : "",
                ].filter(Boolean).join(" ")}>
                    <span className="on-title">{node.title}</span>
                    {node.name && <span className="on-name">{node.name}</span>}
                </div>
            )}

            {/* All teams' members stay below their box even with the mouse away;
                the hovered (or click-pinned) box's cards pop up as active. */}
            {hasMembers && (
                <div className="tree-members">
                    <div className="on-vline" />
                    <div className="on-children" style={{ gap: "20px" }}>
                        {teamData!.members.map((member) => (
                            <div key={member.name} className="on-child-slot">
                                <article className={`member-card${isOpen ? " member-card--active" : ""}`}>
                                    <div className="member-card-photo">
                                        {member.photo ? (
                                            <img src={member.photo} alt={member.name} />
                                        ) : (
                                            <div className="member-card-initials"><b>{initials(member.name)}</b></div>
                                        )}
                                    </div>
                                    <h4 className="member-card-name">{member.name}</h4>
                                    <p className="member-card-role">{member.role}</p>
                                    <div className="member-card-contact">
                                        <a className="member-card-mail" href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                        </a>
                                        <a className="member-card-linkedin" href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}>in</a>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Render traditional children below members (or instead of members if not open) */}
            {hasChildren && (
                <>
                    <div className="on-vline" />
                    <div className="on-children">
                        {node.children!.map(child => (
                            <div key={child.id} className="on-child-slot">
                                <OrgChartNode node={child} openTeam={openTeam} setOpenTeam={setOpenTeam} onHoverTeam={onHoverTeam} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════════════════════ */

export default function TeamLayout() {
    /* Click pins a team's member cards open (survives the mouse leaving);
       hover pops them up temporarily and wins while the cursor is on a box. */
    const [pinnedTeam, setPinnedTeam] = useState<string | null>(null);
    const [hoverTeam,  setHoverTeam]  = useState<string | null>(null);
    const openTeam = hoverTeam ?? pinnedTeam;
    /* Directory (below the tree): one member per row; hovering or clicking a
       row reveals their profile card, like the original team page. */
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [profileTop,  setProfileTop]  = useState(74);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const active = activeIndex === null ? null : toMember(RAW[activeIndex]);

    /* Preload all portraits */
    useEffect(() => {
        RAW.forEach(row => { const img = new Image(); img.src = row[4]; });
    }, []);

    const clearHoverTimer = () => {
        if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
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

    const cancelHover = () => { clearHoverTimer(); setActiveIndex(null); };

    /* Click: pin (or unpin) a team's member cards. Clears the hover state so the
       pinned selection is what stays visible after the mouse moves away. */
    const setOpenTeam = (id: string | null) => { setPinnedTeam(id); setHoverTeam(null); };

    /* Hover: temporarily pop the member cards up; removed when the mouse leaves. */
    const onHoverTeam = (id: string | null) => setHoverTeam(id);

    return (
        <main className="team-page" onMouseLeave={cancelHover}>

            {/* ── 01 Hero ─────────────────────────────────────────── */}
            <section className="team-hero">
                <span className="sticky-head">01 / People behind the mission</span>
                <div>
                    <h1>Meet<br />the<br />Team.</h1>
                    <p>A multidisciplinary team of engineers, designers and builders taking ambitious ideas from concept to flight.</p>
                </div>
            </section>

            {/* ── 02 Org Chart ────────────────────────────────────── */}
            <section className="org-section" id="org">
                <div className="org-section-header sticky-head">
                    <span>02 / Organization</span>
                    <div>
                        <h2>Org<br />Structure.</h2>
                        <p>A mission-critical hierarchy of sub-teams unified under a single leadership layer.</p>
                    </div>
                </div>

                <div className="org-chart-wrap sticky-fold">
                    <div className="org-chart-inner">

                        {/* Main tree */}
                        {/* Main tree: Advisory Committee at the top, then the rest below */}
                        <div className="org-tree-center">
                            {/* Advisory Committee — at the very top of the org chart, above Mission Captain.
                                Renders the same way as the rest of the tree: a parent box with its children
                                connected by org-chart lines. The three advisor types are drawn with their
                                individual advisor names below them (built from ADVISORY_COMMITTEE). */}
                            <OrgChartNode node={ADVISORY_COMMITTEE} openTeam={openTeam} setOpenTeam={setOpenTeam} onHoverTeam={onHoverTeam} />
                            {/* Horizontal connector from advisors down to the rest of the tree */}
                            <div className="on-vh-connector" aria-hidden="true" />
                            <OrgChartNode node={ORG} openTeam={openTeam} setOpenTeam={setOpenTeam} onHoverTeam={onHoverTeam} />
                        </div>

                        {/* Side panels */}
                        <div className="org-side-panels">
                            <div className="org-side-panel">
                                <div className="org-side-label">Pipeline</div>
                                <div className="org-pipeline">
                                    <div className="on-box"><span className="on-title">Associate Engineer / Officer</span></div>
                                    <div className="on-vline" />
                                    <div className="on-box"><span className="on-title">Junior Engineer / Officer</span></div>
                                    <div className="on-vline" />
                                    <div className="on-box"><span className="on-title">Trainee</span></div>
                                </div>
                            </div>
                            <div className="org-side-panel">
                                <div className="org-side-label">Hierarchy</div>
                                <div className="org-pipeline">
                                    <div className="on-box"><span className="on-title">Advisory Committee</span></div>
                                    <div className="on-vline" />
                                    <div className="on-box"><span className="on-title">Executive Committee</span></div>
                                    <div className="on-vline" />
                                    <div className="on-box"><span className="on-title">Subsystem Leads</span></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 03 Directory — one member per row, hover/click reveals profile ── */}
            <section className="team-directory-section" id="team">
                <div className="team-heading sticky-head">
                    <h2>
                        Our
                        <br />
                        People.
                    </h2>
                    <p>Move over a member to reveal their profile. Each image slot is ready for an individual portrait.</p>
                </div>

                <div
                    className={`directory sticky-fold${active ? " has-hover" : ""}`}
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

                    {RAW.map((row, index) => {
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

            {/* ── CTA ─────────────────────────────────────────────── */}
            <section className="team-cta">
                <h2>Build<br />With Us.</h2>
                <div>
                    <p>Want to help build the next flight system?</p>
                    <a href="mailto:rocketry@bmsce.ac.in">Get in touch &rarr;</a>
                </div>
            </section>
        </main>
    );
}
