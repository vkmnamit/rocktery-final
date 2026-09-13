import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import SiteFooter from "@/components/SiteFooter";
import "@/components/HomeNavbar.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://bscerocketry.in"),
    title: "BSCE Rocketry | Advancing Aerospace Innovation",
    description:
        "BSCE Rocketry - Advancing Aerospace Innovation through Engineering Precision and Passion for Space.",
    keywords: [
        "BSCE Rocketry",
        "Rocketry Club",
        "Aerospace Engineering",
        "Rocket Launch",
        "Student Rocketry",
        "Solid Propulsion",
    ],
    authors: [{ name: "BSCE Rocketry Team" }],
    robots: "index, follow",
    openGraph: {
        type: "website",
        title: "BSCE Rocketry | Advancing Aerospace Innovation",
        description:
            "Official website of BMSCE Rocketry Club. Discover our projects, sponsors, and events.",
        url: "https://bscerocketry.in",
        siteName: "BSCE Rocketry",
    },
    twitter: {
        card: "summary_large_image",
        title: "BSCE Rocketry",
        description: "Explore the future of aerospace with BSCE Rocketry.",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <SiteFooter />
                <div className="page-bottom-blur" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </body>
        </html>
    );
}
