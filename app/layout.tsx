import type { Metadata } from "next";
import { Archivo_Black, Climate_Crisis } from "next/font/google";
import "./globals.css";

/* Self-hosted display fonts. next/font downloads them at build time, serves
   them from the same origin with preloaded <link>s and generates a
   size-adjusted fallback, so headings render identically on every visit and
   every device — no flash of a different font while the file downloads. */
const climateCrisis = Climate_Crisis({
    subsets: ["latin"],
    variable: "--font-climate",
    display: "swap",
});

const archivoBlack = Archivo_Black({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-archivo",
    display: "swap",
});
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
        <html
    lang="en"
    className={`${climateCrisis.variable} ${archivoBlack.variable}`}
>
            <body>
                <Navbar />
                <PageTransition>{children}</PageTransition>
                <SiteFooter />
                <div className="page-bottom-blur" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            </body>
        </html>
    );
}
