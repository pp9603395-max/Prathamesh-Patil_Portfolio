import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Menu, X, FileDown, Mail } from "lucide-react";
import { portfolioData } from "@/content/portfolio.ts";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Education", href: "#education", id: "education" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Certifications", href: "#certifications", id: "certifications" },
    { label: "Hackathons", href: "#hackathons", id: "hackathons" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll progress percentage
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for active section highlight
    const sectionIds = ["hero", "about", "education", "skills", "projects", "certifications", "hackathons", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar: thin #4A9EFF fixed at top of viewport */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-[#4A9EFF] transition-[width] duration-150 ease-out shadow-[0_0_8px_#4A9EFF]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#161618]/90 backdrop-blur-md shadow-lg shadow-black/20"
            : "border-b border-white/5 bg-[#161618]/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-white hover:text-[#4A9EFF] transition-colors whitespace-nowrap shrink-0 group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4A9EFF]/15 border border-[#4A9EFF]/30 text-[#4A9EFF] font-bold text-sm tracking-widest group-hover:bg-[#4A9EFF] group-hover:text-white transition-all">
              PP
            </span>
            <span className="hidden sm:inline">{portfolioData.personal.name}</span>
          </a>

          {/* Zone 2: Navigation Links with Active Highlight */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A9EFF] rounded-full shadow-[0_0_6px_#4A9EFF]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/15 hover:border-[#4A9EFF]/50 hover:bg-[#4A9EFF]/10"
            >
              <a
                href={portfolioData.personal.resumeUrl}
                download="Prathamesh_Patil_Resume.pdf"
              >
                <FileDown className="mr-1.5 h-3.5 w-3.5 text-[#4A9EFF]" />
                Resume
              </a>
            </Button>

            <Button asChild size="sm">
              <a href="#contact">
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Contact
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden xs:inline-flex h-8 px-2.5 text-xs border-white/15"
            >
              <a
                href={portfolioData.personal.resumeUrl}
                download="Prathamesh_Patil_Resume.pdf"
              >
                <FileDown className="mr-1 h-3 w-3 text-[#4A9EFF]" />
                Resume
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9EFF]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-white/10 bg-[#161618]/95 backdrop-blur-xl px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-[#4A9EFF]/10 text-white font-semibold border-l-2 border-[#4A9EFF]"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-[#4A9EFF]" />
                    )}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={portfolioData.personal.resumeUrl}
                  download="Prathamesh_Patil_Resume.pdf"
                  className="flex items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  <FileDown className="h-4 w-4 text-[#4A9EFF]" />
                  Download Resume PDF
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#4A9EFF] py-2.5 text-sm font-medium text-white hover:bg-[#3b82f6]"
                >
                  <Mail className="h-4 w-4" />
                  Contact Prathamesh
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
