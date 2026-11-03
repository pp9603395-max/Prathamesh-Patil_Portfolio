import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appears after one viewport height of scrolling
      setVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#4A9EFF]/40 bg-[#161618]/90 text-[#4A9EFF] shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#4A9EFF] hover:bg-[#4A9EFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9EFF] cursor-pointer"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTop;
