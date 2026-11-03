import React from "react";
import { ArrowLeft, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export const NotFoundPage: React.FC<{ onGoHome?: () => void }> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen w-full bg-[#161618] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="h-24 w-24 rounded-2xl bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 flex items-center justify-center text-[#4A9EFF] shadow-xl shadow-[#4A9EFF]/10">
          <Compass className="h-12 w-12 animate-pulse" />
        </div>
      </div>

      <div className="font-mono text-sm uppercase tracking-widest text-[#4A9EFF] mb-2 font-semibold">
        Error 404
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        Page Not Found
      </h1>

      <p className="max-w-md text-base text-white/60 leading-relaxed mb-8">
        The destination you are looking for does not exist, has been relocated, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          asChild
          size="lg"
          onClick={onGoHome}
          className="shadow-lg shadow-[#4A9EFF]/20"
        >
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </a>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-white/15 hover:border-white/30"
        >
          <a href="#hero">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Top
          </a>
        </Button>
      </div>

      <div className="mt-16 text-xs text-white/40 font-mono">
        Prathamesh Patil · Portfolio 2026
      </div>
    </div>
  );
};

export default NotFoundPage;
