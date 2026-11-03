import React, { useRef, useEffect, useState } from "react";
import { FolderGit2, ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData, ProjectItem } from "@/content/portfolio.ts";

gsap.registerPlugin(ScrollTrigger);

type FilterCategory = "All" | "Web" | "AI" | "Tools";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("All");

  const filterTabs: FilterCategory[] = ["All", "Web", "AI", "Tools"];

  // Filter projects by category. If project matches category or tag, or "All"
  const filteredProjects = portfolioData.projects.filter((p) => {
    if (selectedFilter === "All") return true;
    const cat = `${p.category || ""} ${p.categoryTag || ""}`.toLowerCase();
    return cat.includes(selectedFilter.toLowerCase());
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth + 120);
      };

      const scrollDistance = getScrollDistance();
      if (scrollDistance <= 0) return;

      const anim = gsap.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top 12%",
          end: () => `+=${scrollDistance + 240}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        anim.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [selectedFilter]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 border-t border-white/5 overflow-hidden"
    >
      {/* Header Container aligned with page gutter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
              Featured Work
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Projects
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/60 max-w-2xl">
              Software engineering and applied computing projects developed by {portfolioData.personal.name}.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-white/50 bg-white/5 border border-white/10 rounded-full px-4 py-2 shrink-0">
            <span>Scroll vertically to view all projects</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#4A9EFF]" />
          </div>
        </div>

        {/* Filter Chips: All, Web, AI, Tools */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? "bg-[#4A9EFF] text-white shadow-sm shadow-[#4A9EFF]/30 font-semibold"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Horizontal Track / Mobile Stacked Grid */}
      <div className="w-full">
        {filteredProjects.length === 0 ? (
          <div className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-white/50">
            No projects currently categorized under &ldquo;{selectedFilter}&rdquo;. Switch to &ldquo;All&rdquo; to view all projects.
          </div>
        ) : (
          <div
            ref={trackRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-6 lg:flex lg:flex-row lg:gap-8 lg:px-0 lg:pl-8 xl:pl-16 lg:pr-32 lg:w-max"
          >
            {filteredProjects.map((project, idx) => {
              const hasGithub =
                Boolean(project.githubUrl) &&
                project.githubUrl !== "#" &&
                project.githubUrl !== "";
              const hasLive =
                Boolean(project.liveUrl) &&
                project.liveUrl !== "#" &&
                project.liveUrl !== "";
              const hasCategory = Boolean(project.categoryTag || project.category);
              const hasSummary = Boolean(project.summary);
              const hasDescription = Boolean(project.description);
              const hasStack = Boolean(project.stack && project.stack.length > 0);

              const orderStr = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={project.id}
                  className="project-card group relative w-full lg:w-[440px] shrink-0 rounded-2xl border border-white/10 bg-[#161618]/90 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-[#4A9EFF]/60 hover:bg-[#191922] hover:shadow-2xl hover:shadow-[#4A9EFF]/10 flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Top Bar with Order and Folder Icon */}
                    <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                      <span className="font-mono text-[#4A9EFF] font-semibold text-sm">
                        {orderStr}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/70 group-hover:bg-[#4A9EFF] group-hover:text-white transition-colors duration-300">
                        <FolderGit2 className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Category Tag (Hidden if empty) */}
                    {hasCategory && (
                      <div className="inline-block text-[11px] font-mono text-[#4A9EFF] bg-[#4A9EFF]/10 border border-[#4A9EFF]/25 rounded-md px-2.5 py-0.5 mb-2.5">
                        {project.categoryTag || project.category}
                      </div>
                    )}

                    {/* Project Title */}
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#4A9EFF] transition-colors leading-tight mb-2">
                      {project.title}
                    </h3>

                    {/* One-Line Summary (Hidden if empty) */}
                    {hasSummary && (
                      <p className="text-sm font-medium text-white/90 leading-snug mb-3">
                        {project.summary}
                      </p>
                    )}

                    {/* Short Description (Hidden if empty) */}
                    {hasDescription && (
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    )}

                    {/* Tech Stack Tags (Hidden if empty) */}
                    {hasStack && (
                      <div className="flex flex-wrap gap-1.5 pt-1 mb-2">
                        {project.stack!.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-xs font-mono text-white/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Code / Live Demo Buttons (Only shown if real URL exists) */}
                  {(hasGithub || hasLive) && (
                    <div className="pt-5 border-t border-white/10 flex items-center gap-3 mt-5">
                      {hasGithub && (
                        <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-1.5 h-3.5 w-3.5" />
                            View Code
                          </a>
                        </Button>
                      )}
                      {hasLive && (
                        <Button asChild size="sm" className="h-8 text-xs">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
