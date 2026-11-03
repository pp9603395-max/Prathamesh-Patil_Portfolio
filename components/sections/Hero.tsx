import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Hero3D } from "@/components/ui/hero-3d.tsx";
import { ArrowDown, Mail, Code2, MapPin, GraduationCap } from "lucide-react";
import gsap from "gsap";
import { portfolioData } from "@/content/portfolio.ts";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const [displayText, setDisplayText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  // Typing effect on the title line
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) {
      setDisplayText(portfolioData.personal.titles.join(" · "));
      return;
    }

    const titles = portfolioData.personal.titles;
    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeLoop = () => {
      const currentTitle = titles[titleIdx];

      if (isDeleting) {
        setDisplayText(currentTitle.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setDisplayText(currentTitle.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 45 : 90;

      if (!isDeleting && charIdx === currentTitle.length) {
        speed = 2000; // Pause at completed text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        speed = 400; // Pause before typing next title
      }

      timeoutId = setTimeout(typeLoop, speed);
    };

    typeLoop();

    return () => clearTimeout(timeoutId);
  }, []);

  // GSAP Intro Timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const nameLetters = nameRef.current?.querySelectorAll(".letter");
      if (nameLetters && nameLetters.length > 0) {
        tl.fromTo(
          nameLetters,
          { opacity: 0, y: 28, rotateX: -40 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03 }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
      }

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.3"
        );
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const name = portfolioData.personal.name;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Mobile 3D element placed above the name */}
          <div className="lg:hidden w-full flex justify-center py-2">
            <div className="w-full max-w-[280px] h-[240px]">
              <Hero3D className="h-full w-full" />
            </div>
          </div>

          {/* Left Column: Typographic Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Typing Effect Title Line */}
            <div
              ref={titleRef}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-[#4A9EFF] mb-4 min-h-[1.5rem]"
            >
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span className="font-mono">
                {displayText}
                {!reducedMotion && (
                  <span className="animate-pulse inline-block ml-0.5 text-[#4A9EFF]">
                    |
                  </span>
                )}
              </span>
            </div>

            {/* Main Headline Name */}
            <h1
              ref={nameRef}
              aria-label={name}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-5"
            >
              {name.split("").map((char, index) => (
                <span
                  key={index}
                  className="letter inline-block transition-transform duration-200 hover:text-[#4A9EFF]"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* Tagline from portfolio data */}
            <p
              ref={taglineRef}
              className="text-lg sm:text-xl text-white/70 max-w-2xl font-normal leading-relaxed mb-8 text-balance"
            >
              {portfolioData.personal.tagline}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto shadow-lg shadow-[#4A9EFF]/20"
              >
                <a href="#projects">
                  View Projects
                  <ArrowDown className="ml-1.5 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/20 hover:border-[#4A9EFF]/60 hover:bg-[#4A9EFF]/10"
              >
                <a href={`mailto:${portfolioData.personal.email}?subject=Inquiry%20from%20Portfolio`}>
                  <Mail className="mr-1.5 h-4 w-4 text-[#4A9EFF]" />
                  Contact
                </a>
              </Button>
            </div>

            {/* Location & Institution markers (neutral confirmed labels) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#4A9EFF]" />
                {portfolioData.personal.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-[#4A9EFF]" />
                {portfolioData.personal.institution}
              </span>
            </div>
          </div>

          {/* Desktop Right Column: Three.js 3D Wireframe Scene */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative">
            <div className="w-full aspect-square max-w-[440px] relative">
              <Hero3D className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* Full-width strip below hero split */}
        <div
          ref={statsRef}
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
              {portfolioData.stats.degree}
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-1">
              {portfolioData.stats.degreeSub}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-[#4A9EFF] tabular-nums">
              {portfolioData.stats.projectCount}
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-1">
              {portfolioData.stats.projectLabel}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
              {portfolioData.stats.certCount}
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-1">
              {portfolioData.stats.certLabel}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
              {portfolioData.stats.hackathonCount}
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-1">
              {portfolioData.stats.hackathonLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
