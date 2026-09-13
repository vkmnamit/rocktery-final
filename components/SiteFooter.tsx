import "./SiteFooter.css";
import "./SiteFooterLogo.css";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com", icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></> },
    { label: "Email", href: "mailto:rocketry@bmsce.ac.in", icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></> },
    { label: "LinkedIn", href: "https://www.linkedin.com", icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="1" /><circle cx="8" cy="9" r="1" /><path d="M7 11v6M11 17v-3.3c0-1.8 1-2.8 2.5-2.8S16 11.9 16 13.7V17M11 11v6" /></> },
];

export default function SiteFooter() {
    return <footer className="site-footer">
        <div className="site-footer-socials">
            {socialLinks.map(({ label, href, icon }) => <a key={label} href={href} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg><span>{label}</span></a>)}
        </div>
        <div className="site-footer-main">
            <div><p className="site-footer-label">Contact us.</p><p>General: <a href="mailto:rocketry@bmsce.ac.in">rocketry@bmsce.ac.in</a></p><p>BMS College of Engineering<br />Bengaluru, Karnataka, India</p></div>
            <div><p className="site-footer-label">Explore.</p><Link href="/members">Team</Link><Link href="/projects">Projects</Link><Link href="/media">Media archive</Link><Link href="/documentation">Documentation</Link><Link href="/sponsors">Sponsors</Link></div>
            <div className="site-footer-mark" aria-label="BMSCE Rocketry"><Image src="/imgs/rocketry-logo.png" alt="BMSCE Rocketry logo" width={120} height={120} /></div>
        </div>
        <div className="site-footer-bottom"><span>BMSCE Rocketry © 2026</span><span>Engineering Beyond Limits</span></div>
    </footer>;
}
