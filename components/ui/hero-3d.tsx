import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RotatingIcosahedron({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const innerRef = useRef<THREE.Mesh | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalized mouse coordinates from -1 to 1
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (!reducedMotion) {
      // Base continuous slow rotation
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;

      // Gentle interactive tilt towards cursor
      const targetRotX = mousePos.current.y * 0.35;
      const targetRotY = mousePos.current.x * 0.45;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        meshRef.current.rotation.x + targetRotX * 0.05,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        meshRef.current.rotation.y + targetRotY * 0.05,
        0.1
      );
    }

    if (innerRef.current && !reducedMotion) {
      innerRef.current.rotation.x -= delta * 0.4;
      innerRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#4A9EFF"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner subtle core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#3B82F6"
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Subtle particle glow nodes */}
      <points>
        <icosahedronGeometry args={[2.2, 1]} />
        <pointsMaterial
          color="#60A5FA"
          size={0.06}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

export const Hero3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Detect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    // Pause rendering when offscreen using IntersectionObserver
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);

    // Detect WebGL capability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ minHeight: "260px" }}
    >
      {hasWebGL && isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <RotatingIcosahedron reducedMotion={reducedMotion} />
        </Canvas>
      ) : (
        // High-fidelity CSS fallback if WebGL is disabled
        <div className="flex h-56 w-56 items-center justify-center rounded-full border border-[#4A9EFF]/20 bg-[#4A9EFF]/5 p-6 animate-pulse">
          <div className="h-40 w-40 rounded-full border border-dashed border-[#4A9EFF]/40 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border border-[#4A9EFF]/60 bg-[#4A9EFF]/10" />
          </div>
        </div>
      )}

      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-48 w-48 rounded-full bg-[#4A9EFF]/15 blur-3xl" />
      </div>
    </div>
  );
};

export default Hero3D;
