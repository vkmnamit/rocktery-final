/* ══════════════════════════════════════════════════════════════════════════
   Team data — all member info, teams and the org-chart hierarchy live here,
   so the page component stays purely presentational.

   RAW rows are: [name, role, description, linkedin, photo, email]
══════════════════════════════════════════════════════════════════════════ */

export type Member = {
    name: string;
    role: string;
    description: string;
    linkedin: string;
    photo: string;
    email: string;
};

export type OrgNodeKind = "normal" | "advisory-committee" | "advisor-group";

export type OrgNodeData = {
    id: string;
    title: string;
    name?: string;
    vacant?: boolean;
    highlight?: boolean;
    kind?: OrgNodeKind;
    /* When set, the box is interactive: hover or click pops up its team's members. */
    teamId?: string;
    sub?: string;
    children?: OrgNodeData[];
};

export type Team = {
    id: string;
    name: string;
    description: string;
    members: Member[];
};

/* ══════════════════════════════════════════════════════════════════════════
   Raw member data
══════════════════════════════════════════════════════════════════════════ */

export const RAW = [
    /* 0 */ ["Jatin Oswal", "Mission Captain", "Works across airframe, structures, recovery, flight control systems, integration and administration.", "https://www.linkedin.com/in/jatin-oswal-79b417303", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/13_xaatcn.jpg", "jatinnitin.se23@bmsce.ac.in"],
    /* 1 */ ["Shreyas Vinod Kulkarni", "Chief Systems Engineer, Mission Operations", "", "https://www.linkedin.com/in/shreyas-kulkarni-8b4391222/", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159297/12_mu3thw.jpg", "shreyasvinod.se24@bmsce.ac.in"],
    /* 2 */ ["Mohammed Zubair", "Head of Logistics", "Plans and coordinates procurement, inventory, workshop operations and launch logistics so each subsystem has the right resources at the right time.", "https://www.linkedin.com/in/mohammed-zubair-783412337", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159292/23_wrvzhh.jpg", "mohammed.zubair.f@gmail.com"],
    /* 3 */ ["Arush Dwivedi", "FCS Lead", "Leads the design and testing of rocket avionics while training the flight-control systems team.", "https://www.linkedin.com/in/arushdwivedi11", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159284/19_yklbfg.jpg", "arushdwivedi.ec23@bmsce.ac.in"],
    /* 4 */ ["Jatin Nagvekar", "Finance Head", "Handles procurement and detailed segregation of college funding.", "https://www.linkedin.com/in/jatin-nagvekar-136371291", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789161758/IMG-20260326-WA0016_-_Jatin_Nagvekar_bx1gzx.jpg", "jatinnagvekar@gmail.com"],
    /* 5 */ ["Pranav Vasanth Kumar Rao", "Chief Propulsion Engineer", "Leads the engineering, testing and optimization of the team's solid and advanced rocket propulsion systems.", "https://www.linkedin.com/in/pranav-vasanth-kumar-rao-27b561329/", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/14_e4uq62.png", "pranavvasanth.me23@bmsce.ac.in"],
    /* 6 */ ["Sanjana Atreya GS", "Corporate Lead", "Leads sponsorship and public-relations work, focusing on partner acquisition and long-term relationships.", "https://www.linkedin.com/in/sanjana-atreya-41b601252", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789161917/Screenshot_20260613_162652_Gallery_-_Sanjana_Atreya_G_S_meu9lx.jpg", "sanjanaatreya.me24@bmsce.ac.in"],
    /* 7 */ ["Chiranthan S", "Chief Flight Control Systems Engineer", "Oversees the design, testing and integration of avionics, microcontroller systems and telemetry components.", "https://www.linkedin.com/in/chiranthan-s", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159287/20_l7lvoa.jpg", "chiranthan46124@gmail.com"],
    /* 8 */ ["Samruddhee H P", "Recovery Team Lead", "Leads the development of reliable recovery systems, including parachutes and deployment mechanisms.", "https://www.linkedin.com/in/samruddhee-h-p-018263330", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159289/17_w1oaxx.jpg", "samruddheehp.se24@bmsce.ac.in"],
    /* 9 */ ["Sujith J Poojary", "Aero-Structures Lead", "Leads aerodynamic design, structural analysis and manufacturing from concept to a flight-ready airframe.", "https://www.linkedin.com/in/sujith-j-poojary-6684b7200", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159288/21_c5rrv2.png", "sujithj.se23@bmsce.ac.in"],
    /* 10*/ ["Praneeth Mahantesh M", "Propulsion Lead", "Coordinates propulsion design, analysis, testing, reviews and integration across the mission lifecycle.", "https://www.linkedin.com/in/praneeth-mahantesh-m-b41260328", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159290/15_o844zc.jpg", "praneethmahantesh.se24@bmsce.ac.in"],
    /* 11*/ ["Ananya Ulhas", "Associate Engineer - Recovery", "Contributes to reliable recovery mechanisms while supporting subsystem operations and mentoring junior engineers.", "https://www.linkedin.com/in/ananya-ulhas-a6754b33a", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159286/18_ucbxz5.jpg", "ananyaulhas.se24@bmsce.ac.in"],
    /* 12*/ ["Prerana Joshi", "Propulsion Lead", "Designs, analyses, tests and integrates propulsion systems, from grain geometry through static-fire validation.", "https://www.linkedin.com/in/prerana-joshi-436694215", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789159284/16_r8xsrn.jpg", "preranajoshi.se24@bmsce.ac.in"],
    /* 13*/ ["Sushmitha K S", "Ground Station Officer", "", "https://www.linkedin.com/in/sushmitha-k-s", "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1789162137/Sushmitha_-_Sushmitha_K_S_mounst.jpg", "ks.sushmitha.24.10@gmail.com"],
] as const;

export const toMember = (row: (typeof RAW)[number]): Member => ({
    name: row[0], role: row[1], description: row[2],
    linkedin: row[3], photo: row[4], email: row[5],
});

export const initials = (name: string) =>
    name.split(" ").map(p => p[0]).slice(0, 2).join("");

/* ══════════════════════════════════════════════════════════════════════════
   Org-chart tree data  (mirrors the image hierarchy)
══════════════════════════════════════════════════════════════════════════ */

export const ORG: OrgNodeData = {
    id: "mission-director",
    title: "Mission Director",
    name: "Jatin Oswal",
    highlight: true,
    teamId: "leadership",
    children: [
        { id: "chief-integration", title: "Chief Integration Officer",   name: "(vacant)", vacant: true },
        { id: "range-safety",      title: "Range Safety Officer",         name: "Praneeth Vasugi Koner" },
        {
            id: "tech-director",
            title: "Tech Director",
            name: "Arith-Nilik Oswal",
            children: [
                { id: "chief-recovery",   title: "Chief Recovery Engineer",   name: "Samruddhee H P", teamId: "recovery" },
                { id: "chief-aero",       title: "Chief Aero-Structures Eng", name: "Sujith J Poojary", teamId: "aero-structures" },
                { id: "chief-propulsion", title: "Chief Propulsion Engineer",  name: "Pranav Vasanth Kumar Rao", teamId: "propulsion" },
                { id: "chief-app",        title: "Chief App Engineer",         name: "Arush Dwivedi", teamId: "fcs" },
            ],
        },
        {
            id: "chief-mission-ops",
            title: "Chief Mission Operations",
            name: "Shreyas Vinod Kulkarni",
            teamId: "mission-ops",
            children: [
                { id: "dep-mission-ops", title: "Deputy Mission Operations",   name: "Praneeth Mahantesh M" },
                { id: "dep-logistics",   title: "Deputy Logistics Operations", name: "(vacant)", vacant: true },
                { id: "dep-marketing",   title: "Deputy Marketing Officer",    name: "(vacant)", vacant: true },
                { id: "dep-finance",     title: "Deputy Financial Officer",    name: "Jatin Nagvekar" },
                { id: "dep-sponsorship", title: "Deputy Sponsorship Officer",  name: "Sanjana Atreya GS" },
            ],
        },
        { id: "chief-business", title: "Chief Business Officer", name: "Mohammed Zubair", teamId: "corporate" },
    ],
};

export const ADVISORS = [
    { id: "alumni",   title: "Mission Advisors", sub: "(Alumni)" },
    { id: "industry", title: "Industry Advisors" },
    { id: "faculty",  title: "Faculty Advisors" },
];

/* ══════════════════════════════════════════════════════════════════════════
   Advisory committee — sits at the top of the org chart, above Mission Captain.
   Each advisor type is a tree node with its own children, styled to match the
   rest of the org chart.
══════════════════════════════════════════════════════════════════════════ */

export const ADVISORY_COMMITTEE: OrgNodeData = {
    id: "advisory-committee",
    title: "Advisory Committee",
    kind: "advisory-committee",
    children: [
        {
            id: "mission-advisors",
            title: "Mission Advisors",
            sub: "(Alumni)",
            kind: "advisor-group",
            children: [
                { id: "alumni-advisor-1", title: "Alumni Advisor 1", vacant: true },
                { id: "alumni-advisor-2", title: "Alumni Advisor 2", vacant: true },
                { id: "alumni-advisor-3", title: "Alumni Advisor 3", vacant: true },
            ],
        },
        {
            id: "industry-advisors",
            title: "Industry Advisors",
            kind: "advisor-group",
            children: [
                { id: "industry-advisor-1", title: "Industry Advisor 1", vacant: true },
                { id: "industry-advisor-2", title: "Industry Advisor 2", vacant: true },
            ],
        },
        {
            id: "faculty-advisors",
            title: "Faculty Advisors",
            kind: "advisor-group",
            children: [
                { id: "faculty-advisor-1", title: "Faculty Advisor 1", vacant: true },
            ],
        },
    ],
};

/* ══════════════════════════════════════════════════════════════════════════
   Team sections (members grouped under each structure)
══════════════════════════════════════════════════════════════════════════ */

export const TEAMS: Team[] = [
    {
        id: "leadership",
        name: "Mission Direction",
        description: "Mission Captain overseeing all subsystems, administration and integration.",
        members: [toMember(RAW[0])],
    },
    {
        id: "mission-ops",
        name: "Mission Operations",
        description: "Systems engineering, integration co-ordination and ground-station oversight.",
        members: [toMember(RAW[1]), toMember(RAW[13])],
    },
    {
        id: "propulsion",
        name: "Propulsion",
        description: "Design, analysis, testing and integration of solid and advanced propulsion systems.",
        members: [toMember(RAW[5]), toMember(RAW[10]), toMember(RAW[12])],
    },
    {
        id: "fcs",
        name: "Flight Control Systems",
        description: "Avionics, microcontrollers, telemetry hardware and onboard flight software.",
        members: [toMember(RAW[7]), toMember(RAW[3])],
    },
    {
        id: "aero-structures",
        name: "Aero-Structures",
        description: "Aerodynamic design, structural analysis and manufacturing of the flight airframe.",
        members: [toMember(RAW[9])],
    },
    {
        id: "recovery",
        name: "Recovery",
        description: "Parachute systems, deployment mechanisms and post-flight retrieval operations.",
        members: [toMember(RAW[8]), toMember(RAW[11])],
    },
    {
        id: "corporate",
        name: "Corporate & Business",
        description: "Sponsorship, finance, logistics and external-relations management.",
        members: [toMember(RAW[2]), toMember(RAW[4]), toMember(RAW[6])],
    },
];