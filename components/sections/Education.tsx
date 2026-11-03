import React, { useRef, useEffect } from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.25,
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

  const educationData = portfolioData.education;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
            Academic Milestones
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Education Timeline
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl">
            Formal engineering education, higher secondary foundations, and academic track record.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative pl-6 sm:pl-10">
          {/* Vertical Glowing Guideline */}
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#4A9EFF] via-[#4A9EFF]/40 to-white/10" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {educationData.map((item, idx) => (
              <div
                key={idx}
                className="timeline-item relative group text-left"
              >
                {/* Node Dot */}
                <div className="absolute -left-[30px] sm:-left-[43px] top-1.5 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-[#4A9EFF] bg-[#161618] shadow-md shadow-[#4A9EFF]/30 group-hover:scale-110 group-hover:bg-[#4A9EFF] transition-all duration-300">
                  <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#4A9EFF] group-hover:text-white transition-colors" />
                </div>

                {/* Card Surface */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#4A9EFF]/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/30">
                  {/* Top Bar: Degree & Period */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#4A9EFF] transition-colors">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/60 shrink-0">
                      <Calendar className="h-3.5 w-3.5 text-[#4A9EFF]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Institution & Location */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-white/80 mb-4">
                    <span className="flex items-center gap-1.5 text-[#4A9EFF]">
                      <BookOpen className="h-4 w-4" />
                      {item.institution}
                    </span>
                    <span aria-hidden="true" className="text-white/30 hidden sm:inline">·</span>
                    <span className="flex items-center gap-1.5 text-white/50">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                    {item.grade && (
                      <>
                        <span aria-hidden="true" className="text-white/30 hidden sm:inline">·</span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <Award className="h-3.5 w-3.5" />
                          {item.grade}
                        </span>
                      </>
                    )}
                    {item.status && (
                      <span className="rounded-md bg-[#4A9EFF]/15 border border-[#4A9EFF]/30 px-2 py-0.5 text-xs font-semibold text-[#4A9EFF]">
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-xs text-white/60 bg-white/5 border border-white/5 rounded-md px-2.5 py-1"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
