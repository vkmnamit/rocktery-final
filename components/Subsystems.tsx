"use client";

import { useRef, useState } from "react";

interface SubsystemData {
    title: string;
    desc: string;
}

const subsystemsData: Record<string, SubsystemData> = {
    AEROSTRUCTURE: {
        title: "AEROSTRUCTURE",
        desc: "The spine of flight. Precision-engineered airframes designed for aerodynamic stability and structural integrity under high-g loads.<br/><br/> Our airframes are constructed using aerospace-grade composite materials, including carbon fiber and fiberglass, to ensure a high strength-to-weight ratio. We utilize advanced CAD simulations and CFD analysis to optimize drag coefficients and stability margins.<br/><br/> Every component, from the nose cone to the fins, is meticulously crafted to withstand the immense dynamic pressures of supersonic flight.",
    },
    PROPULSION: {
        title: "PROPULSION",
        desc: "Ignition & Thrust. Custom solid motors delivering raw power to pierce the sky.<br/><br/> We design, simulate, and manufacture our own solid rocket motors. Our propulsion team specializes in grain geometry optimization to achieve precise thrust curves tailored to specific mission profiles.<br/><br/> Safety and performance are paramount. We conduct rigorous static fire tests to validate burn rates, casing integrity, and nozzle efficiency before any launch.",
    },
    AVIONICS: {
        title: "AVIONICS",
        desc: "The Nervous System. Advanced flight computers and telemetry for real-time data.<br/><br/> Our avionics suite features custom-designed PCBs, redundant flight computers, and long-range telemetry systems. We monitor altitude, acceleration, GPS coordinates, and orientation in real-time.<br/><br/> The system acts as the brain of the rocket, autonomously making critical decisions for parachute deployment and payload activation.",
    },
    "GROUND STATION": {
        title: "GROUND STATION",
        desc: "The Eye of the Storm. Advanced flight computers and telemetry for real-time data.<br/><br/> Our avionics suite features custom-designed PCBs, redundant flight computers, and long-range telemetry systems. We monitor altitude, acceleration, GPS coordinates, and orientation in real-time.<br/><br/> The system acts as the brain of the rocket, autonomously making critical decisions for parachute deployment and payload activation.",
    },
    RECOVERY: {
        title: "RECOVERY",
        desc: "Safe Returns. Dual-deployment parachute systems ensuring a gentle touchdown.<br/><br/> We employ a dual-deployment strategy using drogue and main parachutes to ensure a controlled descent. This prevents drift and protects the rocket from landing damage.<br/><br/> Our ejection systems utilize black powder charges triggered by the avionics bay at precise altitudes, guaranteeing 99.9% reliability.",
    },
    PAYLOAD: {
        title: "PAYLOAD",
        desc: "Mission Objective. Scientific experiments carried to the edge of the atmosphere.<br/><br/> From deploying can-sats to biological experiments, our payload module is versatile and modular. We enable scientific research in microgravity environments.<br/><br/> The payload bay is designed to protect sensitive instruments from vibration and thermal extremes during the ascent.",
    },
};

const cards = [
    { title: "AEROSTRUCTURE", desc: "The spine of flight." },
    { title: "PROPULSION", desc: "Ignition & Thrust." },
    { title: "AVIONICS", desc: "The Nervous System." },
    { title: "Ground Station", desc: "The Eye of the Storm." },
    { title: "RECOVERY", desc: "Safe Returns." },
    { title: "PAYLOAD", desc: "Mission Objective." },
];

const Subsystems = () => {
    const [active, setActive] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleCardClick = (title: string) => {
        const cardTitle = title.toUpperCase();
        const data = subsystemsData[cardTitle];

        if (data) {
            setActive(true);
            setSelectedCard(cardTitle);
            setIsDetailVisible(false);

            setTimeout(() => {
                setIsDetailVisible(true);
            }, 300);
        }
    };

    return (
        <section
            ref={containerRef}
            className={`subsystems-bento ${active ? "active" : ""}`}
        >
            <div className="bento-header">
                <h2 className="bento-title">ROCKET SUBSYSTEMS</h2>
                <p className="bento-subtitle">
                    The core technologies that power our ascent.
                </p>
            </div>

            <div className="subsystems-content-wrapper">
                <div
                    className="subsystems-detail-panel"
                    style={{
                        opacity: active ? 1 : 0,
                        pointerEvents: active ? "auto" : "none",
                        width: active ? "35%" : "0",
                        paddingRight: active ? "40px" : "0",
                    }}
                >
                    <h3 className="detail-title" style={{ opacity: isDetailVisible ? 1 : 0 }}>
                        {selectedCard ? subsystemsData[selectedCard]?.title : "SUBSYSTEMS"}
                    </h3>
                    <div
                        className="detail-desc"
                        style={{ opacity: isDetailVisible ? 1 : 0 }}
                        dangerouslySetInnerHTML={{
                            __html: selectedCard
                                ? subsystemsData[selectedCard]?.desc
                                : "<p>Subsystems are the components of a rocket that perform specific functions during flight.</p><br/><p>Each subsystem is designed to perform a specific function, such as propulsion, guidance, navigation, and control.</p>",
                        }}
                    />
                </div>

                <div className="bento-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`bento-card ${selectedCard === card.title.toUpperCase() ? "selected" : ""
                                }`}
                            onClick={() => handleCardClick(card.title)}
                        >
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-desc">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Subsystems;