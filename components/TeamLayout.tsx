"use client";

import { useEffect, useState } from "react";
import { initials, ORG, RAW, TEAMS } from "./teamData";
import type { Member, OrgNodeData, Team } from "./teamData";
import "./TeamLayout.css";
import "./TeamTree.css";

function OrgChartNode({ node, expanded, toggle, desktop, openPreview, setPreview }: { node: OrgNodeData; expanded: Set<string>; toggle: (id: string) => void; desktop: boolean; openPreview: string | null; setPreview: (id: string | null) => void }) {
    const hasChildren = Boolean(node.children?.length);
    const isOpen = expanded.has(node.id);
    const team = node.teamId ? TEAMS.find(item => item.id === node.teamId) : null;
    const canSelect = hasChildren || Boolean(team);
    const showChildren = desktop || isOpen;
    return <div className="on">
        <button type="button" className={["on-box", "on-box--toggle", node.highlight ? "on-box--hl" : "", node.vacant ? "on-box--vacant" : "", isOpen ? "on-box--open" : ""].filter(Boolean).join(" ")}
            onMouseEnter={() => desktop && team && setPreview(node.teamId!)}
            onClick={() => { if (team) setPreview(openPreview === node.teamId ? null : node.teamId!); if (!desktop && hasChildren) toggle(node.id); }}
            aria-expanded={hasChildren ? showChildren : undefined}
            aria-label={canSelect ? `${showChildren ? "Collapse" : "Expand"} ${node.title}` : node.title} disabled={!canSelect}>
            <span className="on-title">{node.title}</span>
            {node.name && <span className="on-name">{node.name}</span>}
            {hasChildren && !desktop && <span className="on-toggle-mark">{isOpen ? "−" : "+"}</span>}
        </button>
        {hasChildren && showChildren && <div className="on-branch"><div className="on-vline" /><div className="on-children">
            {node.children!.map(child => <div key={child.id} className="on-child-slot"><OrgChartNode node={child} expanded={expanded} toggle={toggle} desktop={desktop} openPreview={openPreview} setPreview={setPreview} /></div>)}
        </div></div>}
    </div>;
}

function OrgTeamPanel({ team, onClose }: { team: Team; onClose: () => void }) {
    return <div className="org-team-panel" role="region" aria-label={`${team.name} members`}>
        <div className="org-team-panel-head"><div><span>Subsystem team</span><h3>{team.name}</h3></div><button type="button" onClick={onClose} aria-label="Close team profiles">×</button></div>
        <div className="org-member-cards">{team.members.map(member => <article className="org-member-card" key={member.name}>
            <img src={member.photo} alt={member.name} />
            <div><span>{member.role}</span><h4>{member.name}</h4><p>{member.description || "Profile details will be added here."}</p>
                <nav><a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>✉ <b>Email</b></a><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><strong>in</strong><b>LinkedIn</b></a></nav>
            </div>
        </article>)}</div>
    </div>;
}

function MemberProfile({ member, onClose }: { member: Member; onClose: () => void }) {
    return <article className="member-profile-inline member-profile-popover" role="dialog" aria-label={`${member.name} profile`}>
        <button type="button" className="member-profile-close" onClick={onClose} aria-label="Close profile">×</button>
        <div className="member-profile-image">{member.photo ? <img src={member.photo} alt={member.name} /> : <b>{initials(member.name)}</b>}</div>
        <div className="member-profile-copy"><span>Mission profile</span><h4>{member.name}</h4>
            <p>{member.description || "Profile details will be added here."}</p><div><a href={`mailto:${member.email}`}>Email</a><a href={member.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
    </article>;
}

export default function TeamLayout() {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => new Set());
    const [openTeam, setOpenTeam] = useState<string | null>(null);
    const [openMember, setOpenMember] = useState<string | null>(null);
    const [desktop, setDesktop] = useState(false);
    useEffect(() => { RAW.forEach(row => { const image = new Image(); image.src = row[4]; }); }, []);
    useEffect(() => { const media = window.matchMedia("(min-width: 701px)"); const update = () => setDesktop(media.matches); update(); media.addEventListener("change", update); return () => media.removeEventListener("change", update); }, []);
    const toggleNode = (id: string) => setExpandedNodes(current => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
    const toggleTeam = (id: string) => { setOpenTeam(current => current === id ? null : id); setOpenMember(null); };

    return <main className="team-page">
        <section className="team-hero"><span>01 / People behind the mission</span><div><h1>Meet<br />the<br />Team.</h1><p>A multidisciplinary team of engineers, designers and builders taking ambitious ideas from concept to flight.</p></div></section>
        <section className="org-section" id="org" onMouseLeave={() => setOpenTeam(null)}><div className="org-section-header"><span>02 / Organization</span><div><h2>Org<br />Structure.</h2><p>Start at the mission root, then open only the leadership branch you want to explore.</p></div></div>
            <div className="org-chart-wrap"><div className="org-chart-inner"><div className="org-tree-center"><OrgChartNode node={ORG} expanded={expandedNodes} toggle={toggleNode} desktop={desktop} openPreview={openTeam} setPreview={setOpenTeam} /></div></div></div>
            {openTeam && <OrgTeamPanel team={TEAMS.find(team => team.id === openTeam)!} onClose={() => setOpenTeam(null)} />}
            <div className="mobile-org-nav">
                <div className="mobile-org-nav-head"><span>← Teams</span><p>Choose a subsystem to see its members.</p></div>
                {TEAMS.map(team => {
                    const active = openTeam === team.id;
                    return <div className={`mobile-org-team${active ? " mobile-org-team--open" : ""}`} key={team.id}>
                        <button type="button" className="mobile-org-team-button" onClick={() => { setOpenTeam(active ? null : team.id); setOpenMember(null); }}><span>👥</span><div><b>{team.name}</b><small>{team.members.length} team {team.members.length === 1 ? "member" : "members"}</small></div><i>{active ? "−" : "›"}</i></button>
                        {active && <div className="mobile-org-members">{team.members.map(member => <div key={member.name}><button type="button" onClick={() => setOpenMember(member.name)}><span>👤</span><b>{member.name}</b><i>›</i></button>{openMember === member.name && <MemberProfile member={member} onClose={() => setOpenMember(null)} />}</div>)}</div>}
                    </div>;
                })}
            </div>
        </section>
        <section className="team-directory-section" id="team"><div className="team-heading"><h2>Our<br />People.</h2><p>Choose a subsystem, then select a teammate to open their profile and portrait.</p></div>
            <div className="team-groups">{TEAMS.map((team, index) => { const teamIsOpen = openTeam === team.id; return <section className={`team-group${teamIsOpen ? " team-group--open" : ""}`} key={team.id} onMouseLeave={() => setOpenMember(null)}>
                <button type="button" className="team-group-header" onClick={() => toggleTeam(team.id)} aria-expanded={teamIsOpen}><div><span className="team-group-label">{String(index + 1).padStart(2, "0")} / Subsystem</span><span className="team-group-name">{team.name}</span></div><div className="team-group-right"><p className="team-group-desc">{team.description}</p><span className="team-group-count">{team.members.length} people</span><span className="team-group-toggle">{teamIsOpen ? "−" : "+"}</span></div></button>
                {teamIsOpen && <div className="team-members-list">{team.members.map((member, memberIndex) => { const memberIsOpen = openMember === member.name; return <div className={`team-member${memberIsOpen ? " team-member--open" : ""}`} key={member.name}><button type="button" className="member-row" onMouseEnter={() => setOpenMember(member.name)} onClick={() => setOpenMember(memberIsOpen ? null : member.name)} aria-expanded={memberIsOpen}><span className="member-name"><i>{String(memberIndex + 1).padStart(2, "0")}</i>{member.name}</span><span className="member-role">{member.role}</span><span className="member-plus">{memberIsOpen ? "×" : "+"}</span></button>{memberIsOpen && <MemberProfile member={member} onClose={() => setOpenMember(null)} />}</div>; })}</div>}
            </section>; })}</div>
            <div className="team-note"><p>Every successful launch is the sum of many disciplines moving in the same direction.</p><span>Rocketry BMSCE · Team Directory</span></div>
        </section>
        <section className="team-cta"><h2>Build<br />With Us.</h2><div><p>Want to help build the next flight system?</p><a href="mailto:rocketry@bmsce.ac.in">Get in touch →</a></div></section>
    </main>;
}
