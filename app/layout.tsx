import type { Metadata } from "next";
import "./globals.css";

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
                {/* Full-site background video */}
                <video
                    className="bg-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/imgs/57904-486852810.mp4" type="video/mp4" />
                </video>
                <div className="bg-video-overlay" />
                {children}
            </body>
        </html>
    );
}