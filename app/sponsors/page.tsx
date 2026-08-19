"use client";

import PagePreloader from "@/components/PagePreloader";
import SponsorsCinematicScroll from "@/components/SponsorsCinematicScroll";
import Navbar from "@/components/Navbar";

export default function SponsorsPage() {
    return (
        <main>
            <PagePreloader title="Sponsors" />
            <Navbar />
            <SponsorsCinematicScroll />
        </main>
    );
}
