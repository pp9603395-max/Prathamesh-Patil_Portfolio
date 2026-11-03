import React, { useRef, useEffect } from "react";
import { MapPin, Mail, Award, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [cardRef.current, contentRef.current],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Photo Card */}
          <div ref={cardRef} className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#4A9EFF]/30 to-[#4A9EFF]/5 blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Clean Circular Portrait with no star or watermark */}
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#4A9EFF] transition-all duration-500 shadow-2xl bg-[#1d1d21]">
                <img
                  src={portfolioData.personal.avatarUrl}
                  alt={portfolioData.personal.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Location Pill (Strictly Sangli, Maharashtra) */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/70 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <MapPin className="h-4 w-4 text-[#4A9EFF]" />
              <span>Based in {portfolioData.personal.location}</span>
            </div>
          </div>

          {/* Bio & Details */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col text-left">
            <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
              Background & Vision
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Engineering Clean Code & Next-Generation Digital Solutions
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-white/70 leading-relaxed">
              {portfolioData.personal.bio.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Quick Details Grid */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2.5">
                <Compass className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                <span>
                  <strong className="text-white">Degree:</strong> B.Tech CSE (Pursuing)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                <span>
                  <strong className="text-white">College:</strong> {portfolioData.personal.institution}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="hover:text-[#4A9EFF] transition-colors truncate"
                >
                  {portfolioData.personal.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#4A9EFF] shrink-0" />
                <span>
                  <strong className="text-white">Location:</strong> {portfolioData.personal.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
