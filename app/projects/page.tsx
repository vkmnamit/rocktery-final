"use client";

import PagePreloader from "@/components/PagePreloader";
import ProjectsLayout from "@/components/ProjectsLayout";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";
import CinematicScroll from "@/components/CinematicScroll";

export default function ProjectsPage() {
    return (
        <>
            <PagePreloader title="Projects" />
            <Stars />
            <Navbar />
            <ProjectsLayout />
            <CinematicScroll />
        </>
    );
}
