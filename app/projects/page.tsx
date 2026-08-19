"use client";

import PagePreloader from "@/components/PagePreloader";
import CinematicScroll from "@/components/CinematicScroll";
import Navbar from "@/components/Navbar";

export default function ProjectsPage() {
    return (
        <main>
            <PagePreloader title="Projects" />
            <Navbar />
            <CinematicScroll />
        </main>
    );
}
