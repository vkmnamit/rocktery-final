import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

export default function ProjectsPage() {
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
                }}
            >
                <h1 style={{ fontSize: "4rem", fontWeight: 700 }}>PROJECTS</h1>
            </main>
        </>
    );
}