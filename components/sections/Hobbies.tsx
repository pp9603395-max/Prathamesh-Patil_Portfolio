import React, { useRef, useEffect } from "react";
import { Gamepad2, Trophy, Target, Shield, Zap, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

export const Hobbies: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll(".hobby-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hobbies = portfolioData.hobbies;

  return (
    <section
      ref={sectionRef}
      id="hobbies"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
            Beyond Engineering
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Personal Hobbies & Interests
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl">
            Cultivating teamwork, mental endurance, spatial awareness, and quick decision-making outside the code editor.
          </p>
        </div>

        {/* Hobbies Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          {hobbies.map((hobby, idx) => {
            const isCricket = hobby.iconName === "Trophy";
            return (
              <div
                key={idx}
                className="hobby-card group relative rounded-2xl border border-white/10 bg-[#161618]/70 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#4A9EFF]/60 hover:bg-[#19191f] hover:shadow-xl hover:shadow-[#4A9EFF]/5 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4A9EFF]/15 border border-[#4A9EFF]/30 text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-white transition-all duration-300">
                      {isCricket ? (
                        <Trophy className="h-6 w-6" />
                      ) : (
                        <Gamepad2 className="h-6 w-6" />
                      )}
                    </div>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-white/50">
                      {hobby.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#4A9EFF] transition-colors mb-3">
                    {hobby.title}
                  </h3>

                  <p className="text-base text-white/70 leading-relaxed mb-6">
                    {hobby.description}
                  </p>

                  <div className="space-y-2.5">
                    {hobby.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 text-sm text-white/80"
                      >
                        {isCricket ? (
                          hIdx === 0 ? (
                            <Target className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                          ) : hIdx === 1 ? (
                            <Shield className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                          ) : (
                            <Zap className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                          )
                        ) : hIdx === 0 ? (
                          <Sparkles className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                        ) : hIdx === 1 ? (
                          <Target className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                        ) : (
                          <Shield className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                        )}
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-xs text-white/40">
                  {hobby.title} Enthusiast
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
