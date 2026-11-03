import React, { useEffect, useRef } from "react";

export interface BlinkingDotsProps {
  className?: string;
  density?: "low" | "medium" | "high" | number;
  dotColor?: string;
}

export const BlinkingDots: React.FC<BlinkingDotsProps> = ({
  className = "",
  density = "medium",
  dotColor = "#4A9EFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Determine spacing based on density
    let spacing = 32;
    if (typeof density === "number") {
      spacing = Math.max(16, density);
    } else if (density === "low") {
      spacing = 44;
    } else if (density === "high") {
      spacing = 22;
    } else {
      spacing = 32;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    interface Dot {
      x: number;
      y: number;
      phase: number;
      speed: number;
      size: number;
    }

    let dots: Dot[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.random() - 0.5) * (spacing * 0.4);
          const jitterY = (Math.random() - 0.5) * (spacing * 0.4);
          dots.push({
            x: c * spacing + spacing / 2 + jitterX,
            y: r * spacing + spacing / 2 + jitterY,
            phase: Math.random() * Math.PI * 2,
            speed: 0.012 + Math.random() * 0.02,
            size: 1.1 + Math.random() * 0.7,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      // Pause loop if offscreen or reduced motion
      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animId = requestAnimationFrame(render);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.phase += dot.speed;

        // Smooth wave from 0.04 to 0.32 opacity (subtle, non-distracting)
        const sinVal = (Math.sin(dot.phase) + 1) / 2;
        const alpha = 0.04 + sinVal * 0.28;

        ctx.fillStyle = dotColor;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      // Static single draw
      ctx.clearRect(0, 0, width, height);
      dots.forEach((dot) => {
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density, dotColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default BlinkingDots;
