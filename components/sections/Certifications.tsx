import React, { useState } from "react";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
  ContainerStagger,
  ContainerAnimated,
} from "@/components/ui/animated-gallery.tsx";
import { Award, CheckCircle, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { portfolioData, CertificationItem } from "@/content/portfolio.ts";

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  const certs = portfolioData.certifications;

  return (
    <section
      id="certifications"
      className="relative py-8 sm:py-16 px-3 sm:px-6 lg:px-8 border-t border-white/5"
    >
      <ContainerScroll>
        <ContainerSticky>
          {/* Section Heading using ContainerStagger and ContainerAnimated */}
          <ContainerStagger className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <ContainerAnimated>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4A9EFF]/30 bg-[#4A9EFF]/10 px-3.5 py-1 text-xs font-medium text-[#4A9EFF] mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Qualifications</span>
              </div>
            </ContainerAnimated>

            <ContainerAnimated>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
                Certifications
              </h2>
            </ContainerAnimated>

            <ContainerAnimated>
              <p className="text-sm sm:text-base text-white/60 px-4">
                Structured technical certifications spanning object-oriented Java systems, modern React UI, semiconductor fundamentals, and data analytics.
              </p>
            </ContainerAnimated>
          </ContainerStagger>

          {/* Animated Gallery with responsive grid: grid-cols-2 md:grid-cols-3 */}
          <GalleryContainer className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {/* Column 1: Item 1 (Java) and Item 3 (Semiconductors) on mobile / Item 1 on desktop */}
            <GalleryCol offset={-0.6} className="gap-3 sm:gap-6">
              <CertCard
                cert={certs[0]}
                onOpen={() => setSelectedCert(certs[0])}
              />
              <div className="md:hidden">
                <CertCard
                  cert={certs[2]}
                  onOpen={() => setSelectedCert(certs[2])}
                />
              </div>
            </GalleryCol>

            {/* Column 2: Item 2 (React JS) and Item 4 (Data Analytics) */}
            <GalleryCol offset={0} className="gap-3 sm:gap-6">
              <CertCard
                cert={certs[1]}
                onOpen={() => setSelectedCert(certs[1])}
              />
              <CertCard
                cert={certs[3]}
                onOpen={() => setSelectedCert(certs[3])}
              />
            </GalleryCol>

            {/* Column 3: Item 3 (Semiconductors) on desktop */}
            <GalleryCol offset={0.6} className="hidden md:flex gap-3 sm:gap-6">
              <CertCard
                cert={certs[2]}
                onOpen={() => setSelectedCert(certs[2])}
              />
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>

      {/* Modal / Dialog for certificate inspection */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-[#161618] p-6 sm:p-8 shadow-2xl text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-[#4A9EFF]">
                0{selectedCert.order} / 04
              </span>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="h-8 w-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-[#4A9EFF]" />
              <span className="text-xs uppercase font-medium text-white/50">
                {selectedCert.issuer}
              </span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              {selectedCert.title}
            </h3>

            <div className="text-xs text-[#4A9EFF] font-medium mb-4">
              {selectedCert.category}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
              <div className="text-xs font-semibold text-white/80 mb-2">
                Core Competencies Covered:
              </div>
              <ul className="space-y-1.5 text-xs text-white/70">
                {selectedCert.skillsCovered.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-[#4A9EFF] shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-3">
              {/* Show Verify button only when verifyUrl exists */}
              {Boolean(selectedCert.verifyUrl) && (
                <Button asChild size="sm">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Verify
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

interface CertCardProps {
  cert: CertificationItem;
  onOpen: () => void;
}

const CertCard: React.FC<CertCardProps> = ({ cert, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1c22] to-[#161618] p-4 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-[#4A9EFF]/60 hover:shadow-xl hover:shadow-[#4A9EFF]/10 text-left flex flex-col justify-between min-h-[170px] sm:min-h-[210px]"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#4A9EFF]/15 border border-[#4A9EFF]/30 text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-white transition-colors duration-300">
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-white/40">
            0{cert.order}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-display text-sm sm:text-lg font-bold text-white group-hover:text-[#4A9EFF] transition-colors leading-snug mb-1.5 sm:mb-2 line-clamp-3">
          {cert.title}
        </h4>

        {/* Category */}
        <div className="text-[11px] sm:text-xs text-[#4A9EFF]/80 font-medium mb-3 line-clamp-1">
          {cert.category}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 sm:pt-3 border-t border-white/5 flex items-center justify-between text-[11px] sm:text-xs text-white/50">
        <span className="flex items-center gap-1 text-white/60">
          <Sparkles className="h-3 w-3 text-[#4A9EFF]" />
          <span>{cert.issuer}</span>
        </span>
        <span className="text-[#4A9EFF] group-hover:underline flex items-center gap-0.5 font-medium">
          Details
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
};

export default Certifications;
