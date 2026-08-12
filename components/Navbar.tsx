"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Members", href: "/members" },
    { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePath, setActivePath] = useState("/");

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const handleLinkClick = (href: string) => {
        setActivePath(href);
        closeMenu();
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <Link href="/" onClick={() => handleLinkClick("/")}>
                        <Image
                            src="/imgs/rocketry-logo.png"
                            alt="BMS Rocketry Logo"
                            width={30}
                            height={30}
                            style={{ objectFit: "contain" }}
                        />
                    </Link>
                </div>
                <div className="nav-center nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={activePath === link.href ? "active" : ""}
                            onClick={() => handleLinkClick(link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            <div
                className={`overlay ${menuOpen ? "active" : ""}`}
                onClick={closeMenu}
            />

            <div className={`side-menu ${menuOpen ? "active" : ""}`}>
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </>
    );
}