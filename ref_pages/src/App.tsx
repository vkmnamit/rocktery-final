import { useEffect, useRef, useState } from "react";

/* ─── Easing ─────────────────────────────────────────── */
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/* ─── Types ─────────────────────────────────────────── */
interface TransitionSection {
  id: string;
  from: string;
  to: string;
  textColor: string;
  label: string;
  heading: string;
  subheading?: string;
  description: string;
  items: { name: string; detail: string }[];
  imgSrc: string;
  imgAlt: string;
  imgFirst?: boolean;
}

/* ─── Data ───────────────────────────────────────────── */
const SECTIONS: TransitionSection[] = [
  {
    id: "projects",
    from: "#f0ece3",
    to: "#181818",
    textColor: "#f0ece3",
    label: "What We Build",
    heading: "Pushing\nThe Sky.",
    description:
      "From solid-fuel experimental motors to telemetry-linked avionics, our projects span the full arc of amateur rocketry — each one designed, built, and launched by students.",
    items: [
      { name: "Apogee Mk.IV — L3 Certification Vehicle", detail: "2024" },
      { name: "Phoenix Avionics Suite", detail: "In flight" },
      { name: "Hybrid Propulsion Research", detail: "Active" },
    ],
    imgSrc:
      "https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=1200&h=900&fit=crop&auto=format",
    imgAlt: "Rocket launch at dusk with a bright plume of fire",
  },
  {
    id: "sponsors",
    from: "#181818",
    to: "#f0ece3",
    textColor: "#181818",
    label: "Who Believes In Us",
    heading: "Fueled\nBy Partners.",
    description:
      "Our work wouldn't leave the ground without the engineers, companies, and institutions who back us with hardware, funding, and mentorship.",
    items: [
      { name: "Aerospace Materials Corp — Title Sponsor", detail: "Gold" },
      { name: "Orbital Dynamics Institute", detail: "Silver" },
      { name: "National Science Foundation Grant", detail: "Research" },
    ],
    imgSrc:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=900&fit=crop&auto=format",
    imgAlt: "Engineers collaborating over technical blueprints",
    imgFirst: false,
  },
  {
    id: "team",
    from: "#f0ece3",
    to: "#181818",
    textColor: "#f0ece3",
    label: "The People",
    heading: "Built By\nHumans.",
    description:
      "Twenty-three students across propulsion, structures, avionics, and recovery. One shared obsession: getting something into the sky and safely back down.",
    items: [
      { name: "Propulsion & Combustion Division", detail: "7 members" },
      { name: "Avionics & Software Team", detail: "8 members" },
      { name: "Airframe & Recovery Systems", detail: "8 members" },
    ],
    imgSrc:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=900&fit=crop&auto=format",
    imgAlt: "Students working on a rocket airframe in a workshop",
  },
];

/* ─── TransitionBlock ─────────────────────────────────── */
function TransitionBlock({ section }: { section: TransitionSection }) {
  const wrapperRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current;
      const circle = circleRef.current;
      const img = imageRef.current;
      const txt = textRef.current;
      if (!el || !circle || !img || !txt) return;

      const rect = el.getBoundingClientRect();
      const scrollDist = el.offsetHeight - window.innerHeight;
      let p = Math.max(0, Math.min(1, -rect.top / scrollDist));

      // Phase 1: color expand 0→58%
      const cp = easeInOutCubic(Math.max(0, Math.min(1, p / 0.58)));
      circle.style.transform = `translateX(-50%) scale(${0.015 + cp * 1.08})`;

      // Phase 2: image 58→78%
      const ip = easeInOutCubic(Math.max(0, Math.min(1, (p - 0.58) / 0.2)));
      img.style.opacity = String(ip);
      img.style.transform = `translateY(${100 - ip * 100}px) scale(${0.88 + ip * 0.12})`;

      // Phase 3: text 74→100%
      const tp = easeInOutCubic(Math.max(0, Math.min(1, (p - 0.74) / 0.26)));
      txt.style.opacity = String(tp);
      txt.style.transform = `translateY(${70 - tp * 70}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const headingLines = section.heading.split("\n");

  return (
    <section
      ref={wrapperRef}
      id={section.id}
      style={{ height: "320vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Old background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: section.from,
          }}
        />

        {/* Expanding circle */}
        <div
          ref={circleRef}
          style={{
            position: "absolute",
            width: "260vmax",
            height: "260vmax",
            left: "50%",
            bottom: "-130vmax",
            borderRadius: "50%",
            background: section.to,
            transform: "translateX(-50%) scale(0.015)",
            transformOrigin: "center",
            zIndex: 2,
            willChange: "transform",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            color: section.textColor,
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "8vw",
            padding: "100px 8vw",
          }}
          className="transition-content"
        >
          {/* Image */}
          <div
            ref={imageRef}
            style={{
              width: "100%",
              height: "min(65vh, 560px)",
              borderRadius: "35px",
              overflow: "hidden",
              opacity: 0,
              transform: "translateY(100px) scale(0.88)",
              willChange: "transform, opacity",
              order: section.imgFirst === false ? 2 : 0,
            }}
          >
            <img
              src={section.imgSrc}
              alt={section.imgAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div
            ref={textRef}
            style={{
              opacity: 0,
              transform: "translateY(70px)",
              willChange: "opacity, transform",
              order: section.imgFirst === false ? 1 : 0,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                letterSpacing: ".2em",
                marginBottom: "28px",
                textTransform: "uppercase",
                opacity: 0.55,
              }}
            >
              {section.label}
            </div>

            <h2
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(52px, 7vw, 120px)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                marginBottom: "35px",
                fontWeight: 400,
              }}
            >
              {headingLines.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                maxWidth: "520px",
                opacity: 0.7,
                marginBottom: "40px",
              }}
            >
              {section.description}
            </p>

            <div style={{ borderTop: "1px solid currentColor" }}>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(128,128,128,.35)",
                    fontSize: "16px",
                  }}
                >
                  {item.name}
                  <span style={{ fontSize: "12px", opacity: 0.5 }}>
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero Lines ─────────────────────────────────────── */
function HeroLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span
      style={{
        display: "block",
        opacity: 0,
        transform: "translateY(70px)",
        animation: `heroText 1s cubic-bezier(.22,1,.36,1) ${delay}s forwards`,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Floating Particle ──────────────────────────────── */
function Particle({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--black)",
        opacity: 0.07,
        animation: `float ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

/* ─── App ─────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const particles = [
    { x: 12, y: 25, size: 6, delay: 0 },
    { x: 88, y: 18, size: 10, delay: 0.8 },
    { x: 72, y: 72, size: 5, delay: 1.4 },
    { x: 30, y: 80, size: 8, delay: 0.3 },
    { x: 55, y: 45, size: 4, delay: 1.9 },
    { x: 91, y: 60, size: 7, delay: 0.6 },
  ];

  return (
    <>
      <style>{`
        @keyframes heroText {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroImage {
          to { opacity: 1; transform: translate(-50%, -50%) translateY(0) scale(1); }
        }
        @keyframes zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-18px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }
        .nav-link:hover { opacity: 0.6; }
        .cta-btn {
          display: inline-block;
          padding: 18px 36px;
          border-radius: 100px;
          background: var(--black);
          color: var(--cream);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: none;
          transition: transform 0.2s, opacity 0.2s;
        }
        .cta-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        .cta-btn-outline {
          display: inline-block;
          padding: 18px 36px;
          border-radius: 100px;
          background: transparent;
          color: var(--cream);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          border: 1px solid rgba(240,236,227,0.35);
          transition: border-color 0.2s, opacity 0.2s;
          margin-left: 16px;
        }
        .cta-btn-outline:hover { border-color: var(--cream); }
        .team-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
          opacity: 0;
        }
        .sponsor-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(24,24,24,0.12);
          border-radius: 16px;
          padding: 32px;
          font-family: "Instrument Serif", serif;
          font-size: 24px;
          letter-spacing: -0.04em;
          color: var(--black);
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards;
          aspect-ratio: 2/1;
        }
        @media (max-width: 860px) {
          .transition-content {
            grid-template-columns: 1fr !important;
            padding: 90px 28px 40px !important;
            gap: 32px !important;
          }
        }
      `}</style>

      {/* ─── NAV ─────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "88px",
          padding: "0 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000,
          mixBlendMode: "difference",
          color: "white",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "28px",
            letterSpacing: "-0.04em",
            color: "white",
            textDecoration: "none",
          }}
        >
          Apogee.
        </a>

        <div style={{ display: "flex", gap: "36px" }}>
          <a href="#projects" className="nav-link">
            Projects
          </a>
          <a href="#sponsors" className="nav-link">
            Sponsors
          </a>
          <a href="#team" className="nav-link">
            Team
          </a>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--cream)",
          overflow: "hidden",
        }}
      >
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Orbit ring */}
        <div
          style={{
            position: "absolute",
            width: "min(60vw, 560px)",
            height: "min(60vw, 560px)",
            border: "1px solid rgba(24,24,24,0.07)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateSlow 30s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "min(40vw, 380px)",
            height: "min(40vw, 380px)",
            border: "1px solid rgba(24,24,24,0.05)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotateSlow 20s linear infinite reverse",
          }}
        />

        <div style={{ width: "100%", position: "relative", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(64px, 10vw, 180px)",
              lineHeight: 0.84,
              letterSpacing: "-0.085em",
              fontWeight: 700,
            }}
          >
            <HeroLine delay={0.1}>Beyond</HeroLine>
            <HeroLine delay={0.3}>
              <em
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                Earth.
              </em>
            </HeroLine>
            <HeroLine delay={0.5}>Always.</HeroLine>
          </h1>

          {/* Hero image pill */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform:
                "translate(-50%, -50%) translateY(50px) scale(0.8)",
              width: "clamp(150px, 16vw, 260px)",
              height: "clamp(100px, 11vw, 170px)",
              borderRadius: "40px",
              overflow: "hidden",
              opacity: 0,
              animation:
                "heroImage 1s cubic-bezier(.22,1,.36,1) 1.1s forwards",
              zIndex: 3,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=800&h=600&fit=crop&auto=format"
              alt="Rocket launch"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: "zoom 8s ease-in-out infinite alternate",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "clamp(160px, 15vw, 240px)",
              opacity: 0,
              animation: "fadeUp 0.8s cubic-bezier(.22,1,.36,1) 1.6s forwards",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <a href="#projects" className="cta-btn">
              See Our Work
            </a>
            <div
              style={{
                fontSize: "13px",
                opacity: 0.45,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Est. 2019 · University Rocketry Club
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "35px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            letterSpacing: ".15em",
            textTransform: "uppercase",
            opacity: 0.4,
            animation: "pulse 2.5s ease-in-out 2s infinite",
          }}
        >
          Scroll to explore
        </div>
      </section>

      {/* ─── PROJECTS TRANSITION ──────────────────────── */}
      <TransitionBlock section={SECTIONS[0]} />

      {/* ─── PROJECTS DETAIL ──────────────────────────── */}
      <section
        style={{
          background: "#181818",
          color: "#f0ece3",
          padding: "120px 8vw",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: "60px",
            }}
          >
            Recent Launches
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2px",
            }}
          >
            {[
              {
                name: "Apogee Mk.IV",
                year: "2024",
                alt: "21,000 ft AGL",
                status: "Successful",
                img: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=600&h=700&fit=crop&auto=format",
              },
              {
                name: "Phoenix II",
                year: "2023",
                alt: "14,500 ft AGL",
                status: "Successful",
                img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=700&fit=crop&auto=format",
              },
              {
                name: "Cerberus Test",
                year: "2023",
                alt: "Static fire",
                status: "Nominal",
                img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&h=700&fit=crop&auto=format",
              },
            ].map((proj, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: i === 0 ? "24px 0 0 24px" : i === 2 ? "0 24px 24px 0" : 0,
                  aspectRatio: "3/4",
                  cursor: "pointer",
                }}
                className="project-card"
              >
                <img
                  src={proj.img}
                  alt={proj.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.55)",
                    transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLImageElement).style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLImageElement).style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      opacity: 0.5,
                      marginBottom: "8px",
                    }}
                  >
                    {proj.year} · {proj.alt}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontSize: "clamp(24px, 3vw, 40px)",
                      letterSpacing: "-0.03em",
                      marginBottom: "10px",
                    }}
                  >
                    {proj.name}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      border: "1px solid rgba(240,236,227,0.3)",
                      fontSize: "11px",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {proj.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSORS TRANSITION ──────────────────────── */}
      <TransitionBlock section={SECTIONS[1]} />

      {/* ─── SPONSORS DETAIL ──────────────────────────── */}
      <section
        style={{
          background: "#f0ece3",
          padding: "120px 8vw",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: "60px",
            }}
          >
            Our Sponsors — 2024 Season
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "80px",
            }}
          >
            {[
              { name: "Orbital\nDynamics", tier: "Title" },
              { name: "AeroMat\nCorp", tier: "Gold" },
              { name: "Propellant\nSystems Inc", tier: "Gold" },
              { name: "NSF\nGrant", tier: "Research" },
              { name: "Avionics\nPartners", tier: "Silver" },
              { name: "Campus\nInnovation", tier: "Silver" },
            ].map((s, i) => (
              <div
                key={i}
                className="sponsor-logo"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ whiteSpace: "pre-line", lineHeight: 1.1 }}>
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: '"DM Sans", sans-serif',
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      opacity: 0.4,
                      marginTop: "8px",
                    }}
                  >
                    {s.tier}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Become a sponsor CTA */}
          <div
            style={{
              borderTop: "1px solid rgba(24,24,24,0.12)",
              paddingTop: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: "clamp(32px, 5vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  marginBottom: "16px",
                }}
              >
                Become a<br />
                <em style={{ fontStyle: "italic" }}>Partner.</em>
              </div>
              <p style={{ fontSize: "16px", opacity: 0.6, maxWidth: "420px", lineHeight: 1.6 }}>
                Support student aerospace engineering and put your brand on the side of a rocket going 20,000 feet up.
              </p>
            </div>
            <button
              className="cta-btn"
              style={{ background: "var(--black)", color: "var(--cream)", flexShrink: 0 }}
            >
              Get In Touch →
            </button>
          </div>
        </div>
      </section>

      {/* ─── TEAM TRANSITION ──────────────────────────── */}
      <TransitionBlock section={SECTIONS[2]} />

      {/* ─── TEAM DETAIL ──────────────────────────────── */}
      <section
        style={{
          background: "#181818",
          color: "#f0ece3",
          padding: "120px 8vw",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "12px",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              opacity: 0.45,
              marginBottom: "60px",
            }}
          >
            Core Team — 2024–25
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                name: "Maya Chen",
                role: "Team Lead & Propulsion",
                img: "https://images.unsplash.com/photo-1494790108755-2616b332c3eb?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
              {
                name: "Arjun Patel",
                role: "Chief Avionics Officer",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
              {
                name: "Sofia Okafor",
                role: "Structures Lead",
                img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
              {
                name: "Luca Reinholt",
                role: "Recovery Systems",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
              {
                name: "Priya Sundaram",
                role: "Simulation & CFD",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
              {
                name: "Elias Novak",
                role: "Software & Telemetry",
                img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop&auto=format&facepad=2&faces=1",
              },
            ].map((member, i) => (
              <div
                key={i}
                className="team-card"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#2a2a2a",
                  }}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "grayscale(20%) brightness(0.9)",
                      transition: "transform 0.5s cubic-bezier(.22,1,.36,1), filter 0.5s",
                    }}
                    onMouseEnter={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.transform = "scale(1.04)";
                      img.style.filter = "grayscale(0%) brightness(1)";
                    }}
                    onMouseLeave={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.transform = "scale(1)";
                      img.style.filter = "grayscale(20%) brightness(0.9)";
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "17px", fontWeight: 600, marginBottom: "4px" }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: "13px", opacity: 0.45, letterSpacing: "0.04em" }}>
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "80px",
              paddingTop: "60px",
              borderTop: "1px solid rgba(240,236,227,0.12)",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "40px",
              textAlign: "center",
            }}
          >
            {[
              { stat: "23", label: "Active Members" },
              { stat: "6", label: "Rockets Launched" },
              { stat: "21k ft", label: "Peak Altitude" },
            ].map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontSize: "clamp(48px, 6vw, 96px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {s.stat}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          background: "var(--cream)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 5vw",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            opacity: 0.4,
            marginBottom: "40px",
          }}
        >
          Join Us
        </div>
        <h2
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(72px, 12vw, 200px)",
            lineHeight: 0.84,
            letterSpacing: "-0.085em",
            marginBottom: "40px",
            fontWeight: 400,
          }}
        >
          Launch<br />
          <em style={{ fontStyle: "italic" }}>Something.</em>
        </h2>
        <p
          style={{
            fontSize: "19px",
            opacity: 0.6,
            maxWidth: "480px",
            lineHeight: 1.65,
            marginBottom: "48px",
          }}
        >
          Whether you solder circuits, run simulations, or write firmware at 2am — there's a seat on this team for you.
        </p>
        <div style={{ display: "flex", gap: "0", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="cta-btn">Apply to Join →</button>
          <button
            className="cta-btn-outline"
            style={{ color: "var(--black)", borderColor: "rgba(24,24,24,0.25)" }}
          >
            Contact Us
          </button>
        </div>

        <div
          style={{
            marginTop: "100px",
            fontSize: "13px",
            opacity: 0.3,
            letterSpacing: ".1em",
          }}
        >
          Apogee Rocketry · Est. 2019 · Flying Higher Every Year
        </div>
      </section>
    </>
  );
}
