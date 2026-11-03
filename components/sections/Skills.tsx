import React, { useRef, useEffect } from "react";
import { BlinkingDots } from "@/components/ui/blinking-dots.tsx";
import {
  Code2,
  Globe,
  Database,
  Wrench,
  Cpu,
  Users,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  Database,
  Wrench,
  Cpu,
  Users,
};

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
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

  const skillGroups = portfolioData.skills;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Blinking Dots accent background layer behind Skills only */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-50 pointer-events-none">
        <BlinkingDots
          dotColor="#4A9EFF"
          density="medium"
        />
        {/* Subtle radial mask to keep edges seamlessly blended */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#161618] via-transparent to-[#161618]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
            Technical Arsenal
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl">
            A comprehensive overview of programming languages, modern web technologies, databases, core CS fundamentals, and collaborative toolkits.
          </p>
        </div>

        {/* Skill Groups Grid with subtle hover lift and #4A9EFF border glow */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {skillGroups.map((group, idx) => {
            const Icon = iconMap[group.iconName] || Code2;
            return (
              <div
                key={idx}
                tabIndex={0}
                className="skill-card group relative flex flex-col justify-between rounded-xl border border-white/10 bg-[#161618]/70 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#4A9EFF] hover:shadow-[0_0_24px_rgba(74,158,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9EFF] focus-visible:border-[#4A9EFF] focus-visible:shadow-[0_0_24px_rgba(74,158,255,0.22)]"
              >
                <div>
                  {/* Category Header with Lucide Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A9EFF]/10 border border-[#4A9EFF]/25 text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-[#4A9EFF] transition-colors">
                        {group.category}
                      </h3>
                      <p className="text-xs text-white/40 leading-tight">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="mt-5 space-y-2.5">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center justify-between text-sm py-1.5 px-2.5 rounded-lg bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        <span className="flex items-center gap-2 font-medium text-white/90">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#4A9EFF]/70 shrink-0" />
                          {skill.name}
                        </span>
                        {skill.proficiency && (
                          <span className="text-xs text-white/40 font-mono">
                            {skill.proficiency}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer indicator line */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  <span>{group.skills.length} competencies</span>
                  <span className="group-hover:text-[#4A9EFF] transition-colors">
                    Proficient
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
