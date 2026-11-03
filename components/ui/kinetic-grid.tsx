import React, { useEffect, useRef } from "react";

interface KineticGridProps {
  children?: React.ReactNode;
  globalColor?: "default" | "blue" | "white";
  className?: string;
}

export const KineticGrid: React.FC<KineticGridProps> = ({
  children,
  globalColor = "default",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);

    // Completely turn off kinetic grid canvas on touch devices
    if (isTouchDevice) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Responsive grid configuration
    const isMobile = window.innerWidth < 768;
    const DOT_SPACING = isMobile ? 32 : 24;
    const BASE_RADIUS = isMobile ? 1.0 : 1.2;
    const WARP_RADIUS = isMobile ? 80 : 130;
    const WARP_STRENGTH = isMobile ? 0 : 28; // Skip warp on mobile for performance

    interface Point {
      x0: number;
      y0: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    let points: Point[] = [];

    // Track mouse
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = isMobile || isTouchDevice ? 1 : Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = Math.max(rect.height, window.innerHeight);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Rebuild points grid
      points = [];
      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING;
          const y = r * DOT_SPACING;
          points.push({
            x0: x,
            y0: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Color tokens
    const dotColor =
      globalColor === "default" || globalColor === "blue"
        ? { r: 74, g: 158, b: 255 } // #4A9EFF
        : { r: 255, g: 255, b: 255 };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background vignette
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.2,
        100,
        width / 2,
        height * 0.4,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, "rgba(74, 158, 255, 0.035)");
      gradient.addColorStop(1, "rgba(22, 22, 24, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const hasWarp = !isTouchDevice && !prefersReducedMotion && mouse.active;

      // Update and draw points
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        if (hasWarp) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < WARP_RADIUS && dist > 0) {
            const force = (1 - dist / WARP_RADIUS) * WARP_STRENGTH;
            const targetX = pt.x0 + (dx / dist) * force;
            const targetY = pt.y0 + (dy / dist) * force;

            // Spring towards target
            pt.vx += (targetX - pt.x) * 0.2;
            pt.vy += (targetY - pt.y) * 0.2;
          } else {
            // Return to rest
            pt.vx += (pt.x0 - pt.x) * 0.12;
            pt.vy += (pt.y0 - pt.y) * 0.12;
          }

          pt.vx *= 0.75;
          pt.vy *= 0.75;
          pt.x += pt.vx;
          pt.y += pt.vy;
        } else {
          // Keep at base positions
          pt.x = pt.x0;
          pt.y = pt.y0;
        }

        // Proximity highlight
        let alpha = 0.14;
        let radius = BASE_RADIUS;

        if (hasWarp) {
          const dx = pt.x - mouse.x;
          const dy = pt.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < WARP_RADIUS * 1.5) {
            const factor = Math.max(0, 1 - dist / (WARP_RADIUS * 1.5));
            alpha = 0.14 + factor * 0.45;
            radius = BASE_RADIUS + factor * 0.8;
          }
        }

        ctx.fillStyle = `rgba(${dotColor.r}, ${dotColor.g}, ${dotColor.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render();
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [globalColor]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen w-full bg-[#161618] text-white selection:bg-[#4A9EFF]/20 ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

export default KineticGrid;
