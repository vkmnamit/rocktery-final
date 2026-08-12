"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    radius: number;
}

const Stars = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let stars: Star[] = [];
        let animationId = 0;

        const setupStars = (): Star[] => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const density = 0.12;
            const starCount = Math.floor(canvas.width * density);

            return Array.from({ length: starCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * canvas.width,
                radius: Math.random() * 0.8 + 0.2,
            }));
        };

        const resetStar = (star: Star) => {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.z = canvas.width;
            star.radius = Math.random() * 0.8 + 0.2;
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                const dx = star.x - cx;
                const dy = star.y - cy;
                const perspective = canvas.width / (canvas.width + star.z);
                const x = cx + dx * perspective;
                const y = cy + dy * perspective;
                const radius = star.radius * perspective * 2;

                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.shadowBlur = 6;
                ctx.shadowColor = "white";
                ctx.fill();
            });
        };

        const updateStars = () => {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            stars.forEach((star) => {
                const dx = star.x - cx;
                const dy = star.y - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const speed = 5 + dist / 480;
                star.z -= speed;

                if (star.z <= 1) {
                    resetStar(star);
                }
            });
        };

        const resizeCanvas = () => {
            stars = setupStars();
        };

        const animate = () => {
            drawStars();
            updateStars();
            animationId = requestAnimationFrame(animate);
        };

        stars = setupStars();
        animate();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas id="stars" ref={canvasRef} />;
};

export default Stars;