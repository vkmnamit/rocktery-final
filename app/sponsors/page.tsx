import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

const SPONSOR_IMAGES = [
    { src: "/imgs/1.png", alt: "Sponsor 1" },
    { src: "/imgs/2.png", alt: "Sponsor 2" },
    { src: "/imgs/3.png", alt: "Sponsor 3" },
    { src: "/imgs/4.png", alt: "Sponsor 4" },
    { src: "/imgs/5 (1).png", alt: "Sponsor 5" },
    { src: "/imgs/6.png", alt: "Sponsor 6" },
    { src: "/imgs/7.png", alt: "Sponsor 7" },
    { src: "/imgs/8.png", alt: "Sponsor 8" },
];

export default function SponsorsPage() {
    return (
        <>
            <Navbar />
            <Stars />
            <main
                className="modern-layout"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "100px 5vw",
                }}
            >
                <h1 style={{ fontSize: "4rem", fontWeight: 700, marginBottom: "60px" }}>SPONSORS</h1>

                <div className="sponsors-grid">
                    {SPONSOR_IMAGES.map((img, index) => (
                        <div key={index} className="sponsor-card">
                            <img src={img.src} alt={img.alt} />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
