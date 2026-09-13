"use client";

import { useEffect, useState } from "react";
import "./MediaLayout.css";
import "./MediaLayoutOverrides.css";

const photos = [
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355124/DSC_2029_f0zbam.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355124/DSC_2043_fyv4tq.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355123/DSC_2034_qm66my.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355124/DSC_2029_1_fdrpvn.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355122/DSC_2007_r9vdpk.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355122/DSC_2003_qxpfgm.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355125/DSC_2083_pirrb1.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355123/DSC_2021_w9hyre.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355124/DSC_2040_k6ttmw.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355122/DSC_1933_r1sr9z.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355121/DSC_0086_rnrhch.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355121/Copy_of_DSC_0097_um5gjc.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355120/DSC_1917_f2ittg.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355120/DSC_1867_u7ukus.jpg",
    "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781351220/DSC_2029_ly8tka.jpg",
];

const heroPhoto = "https://res.cloudinary.com/dgrrdy6sk/image/upload/v1781355125/DSC_2121_d9tbu7.jpg";

export default function MediaLayout() {
    const loopPhotos = photos.slice(0, 6);
    const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; alt: string } | null>(null);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setSelectedPhoto(null);
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, []);

    return (
        <main className="media-page">
            <section className="media-hero">
                <img className="media-hero-image" src={heroPhoto} alt="BMSCE Rocketry team at an event" />
                <div className="media-hero-shade" />
                <div className="media-hero-top"><span>01 / Visual archive</span><span>BMSCE ROCKETRY — 2026</span></div>
                <div className="media-hero-content">
                    <h1>Media.</h1>
                </div>
            </section>

            <div className="media-marquee"><div><span>Launches ✦ Testing ✦ People ✦ Engineering ✦ Missions ✦ Behind the scenes ✦ </span><span>Launches ✦ Testing ✦ People ✦ Engineering ✦ Missions ✦ Behind the scenes ✦ </span></div></div>

            <section className="media-motion">
                <p className="media-kicker">02 / Moments in motion — hover to pause</p>
                <div className="media-track">
                    {[...loopPhotos, ...loopPhotos].map((photo, index) => { const alt = `Rocketry event moment ${index % loopPhotos.length + 1}`; return <article className={`media-card${index % 3 === 0 ? " media-card-wide" : ""}`} key={`${photo}-${index}`}><button type="button" onClick={() => setSelectedPhoto({ src: photo, alt })} aria-label={`View ${alt}`}><img src={photo} alt={alt} /><div><b>{["Launch day", "The makers", "Mission control", "Engineering", "In the field", "Together"][index % loopPhotos.length]}</b><span>Visual archive / 2026</span></div></button></article>; })}
                </div>
            </section>

            <section className="media-archive">
                <header><h2>Archive.</h2></header>
                <div className="media-grid">
                    {photos.map((photo, index) => { const alt = `BMSCE Rocketry archive photograph ${index + 1}`; return <article key={photo}><button type="button" onClick={() => setSelectedPhoto({ src: photo, alt })} aria-label={`View ${alt}`}><img src={photo} alt={alt} /></button></article>; })}
                </div>
            </section>

            {selectedPhoto && <div className="media-lightbox" role="dialog" aria-modal="true" aria-label="Expanded gallery image" onClick={() => setSelectedPhoto(null)}><button className="media-lightbox-close" type="button" onClick={() => setSelectedPhoto(null)} aria-label="Close image viewer">×</button><img src={selectedPhoto.src} alt={selectedPhoto.alt} onClick={(event) => event.stopPropagation()} /></div>}

        </main>
    );
}
