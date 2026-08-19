"use client";

import PagePreloader from "@/components/PagePreloader";
import SponsorsCinematicScroll from "@/components/SponsorsCinematicScroll";
import Navbar from "@/components/Navbar";
import Stars from "@/components/Stars";

export default function SponsorsPage() {
    return (
        <main>
            <PagePreloader title="Sponsors" />
            <Stars />
            <Navbar />
            <SponsorsCinematicScroll />
        </main>
    );
}
