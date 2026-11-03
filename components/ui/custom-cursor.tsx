import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), never on touch screens
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const shouldEnable = mediaQuery.matches && !isTouch;
    setIsPointerFine(shouldEnable);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches && !isTouch);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    if (!shouldEnable) return;

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target or any ancestor is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .project-card, .clickable, [data-cursor="hover"]'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth lerp loop for outer ring
    const render = () => {
      const ease = 0.22;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isPointerFine) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer morphing ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out ${
          isHovered
            ? "h-12 w-12 border border-[#4A9EFF] bg-[#4A9EFF]/15 backdrop-blur-[1px]"
            : "h-6 w-6 border border-[#4A9EFF]/40 bg-transparent"
        }`}
      />

      {/* Center pinpoint */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 rounded-full bg-[#4A9EFF] transition-transform duration-100 ${
          isHovered ? "h-1 w-1 opacity-60" : "h-2 w-2 opacity-90 shadow-[0_0_8px_#4A9EFF]"
        }`}
      />
    </div>
  );
};

export default CustomCursor;
