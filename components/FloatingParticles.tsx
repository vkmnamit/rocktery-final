"use client";

import { useEffect, useRef } from "react";

interface FloatingParticlesProps {
    count?: number;
    size?: number;
    opacity?: number;
    glow?: number;
    speed?: number;
    influence?: number;
    color?: string;
    background?: string;
}

/**
 * Floating dust particles background (port of Framer's
 * "FloatingParticlesBackground" component, dependency-free).
 * Canvas absolutely fills its parent; particles drift, gently
 * repel from the cursor and glow brighter when approached.
 */
export default function FloatingParticles({
    count = 70,
    size = 2,
    opacity = 0.65,
    glow = 12,
    speed = 0.5,
    influence = 150,
    color = "#f2ede4",
    background = "transparent",
}: FloatingParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion =
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let width = 0;
        let height = 0;
        let raf = 0;
        let observer: ResizeObserver | null = null;
        const mouse = { x: -9999, y: -9999 };

        type Particle = {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseOpacity: number;
            glow: number;
        };

        let particles: Particle[] = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            if (width < 1 || height < 1) return;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const spawn = () => {
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * Math.max(1, width),
                y: Math.random() * Math.max(1, height),
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                size: Math.random() * size + 0.6,
                baseOpacity: (Math.random() * 0.4 + 0.5) * opacity,
                glow: Math.random() * 0.5 + 0.6,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // soft wrap around the edges
                if (p.x < -12) p.x = width + 12;
                else if (p.x > width + 12) p.x = -12;
                if (p.y < -12) p.y = height + 12;
                else if (p.y > height + 12) p.y = -12;

                // mouse repulsion + glow boost
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.hypot(dx, dy);
                let glowMult = 1;

                if (dist < influence && dist > 0.01) {
                    const force = 1 - dist / influence;
                    const inv = 1 / dist;
                    p.x -= dx * inv * force * 0.7;
                    p.y -= dy * inv * force * 0.7;
                    glowMult = 1 + force * 1.6;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = Math.min(1, p.baseOpacity * glowMult);
                ctx.shadowBlur = glow * p.glow * glowMult;
                ctx.shadowColor = color;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        };

        const loop = () => {
            draw();
            raf = requestAnimationFrame(loop);
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        resize();
        spawn();
        if (reduceMotion) draw();
        else loop();

        if (typeof ResizeObserver !== "undefined") {
            observer = new ResizeObserver(() => {
                resize();
                spawn();
            });
            observer.observe(canvas);
        }

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(raf);
            observer?.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [count, size, opacity, glow, speed, influence, color]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                display: "block",
                background,
                pointerEvents: "none",
            }}
        />
    );
}