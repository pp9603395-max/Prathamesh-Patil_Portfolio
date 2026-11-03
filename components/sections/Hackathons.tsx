import React, { useRef, useEffect } from "react";
import { Trophy, Users2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

export const Hackathons: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".hackathon-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
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

  const hackathons = portfolioData.hackathons;

  return (
    <section
      ref={sectionRef}
      id="hackathons"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
            Competitive Arena
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Hackathons & Competitions
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl">
            Putting engineering theories to the test in high-pressure team sprints, building prototypes, and testing algorithmic agility.
          </p>
        </div>

        {/* Hackathon Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {hackathons.map((h, idx) => (
            <div
              key={idx}
              className="hackathon-card group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#161618]/70 p-7 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#4A9EFF]/50 hover:bg-[#1a1a20] hover:shadow-xl hover:shadow-[#4A9EFF]/10 text-left"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#4A9EFF]/10 border border-[#4A9EFF]/25 text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-white transition-all duration-300">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-mono text-[#4A9EFF]">
                    {h.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#4A9EFF] transition-colors mb-1">
                  {h.title}
                </h3>
                <div className="text-xs sm:text-sm font-medium text-white/50 mb-4">
                  {h.subtitle}
                </div>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {h.description}
                </p>

                {/* Focus Areas */}
                {h.focusAreas && h.focusAreas.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    {h.focusAreas.map((area, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-center gap-2 text-xs text-white/80"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#4A9EFF] shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5 font-medium text-white/80">
                  <Users2 className="h-3.5 w-3.5 text-[#4A9EFF]" />
                  {h.role}
                </span>
                <span className="text-[#4A9EFF] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Participated
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
