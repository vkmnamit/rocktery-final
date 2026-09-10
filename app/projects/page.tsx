"use client";

import PagePreloader from "@/components/PagePreloader";
import ProjectsLayout from "@/components/ProjectsLayout";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

export default function ProjectsPage() {
    return (
        <main>
            <PagePreloader title="Projects" />
            <Stars />
            <Navbar />
            <ProjectsLayout />
        </main>
    );
}
