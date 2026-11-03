/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { KineticGrid } from "@/components/ui/kinetic-grid.tsx";
import { CustomCursor } from "@/components/ui/custom-cursor.tsx";
import { BackToTop } from "@/components/ui/back-to-top.tsx";
import { NotFoundPage } from "@/components/ui/not-found.tsx";
import { Navbar } from "@/components/sections/Navbar.tsx";
import { Hero } from "@/components/sections/Hero.tsx";
import { About } from "@/components/sections/About.tsx";
import { Education } from "@/components/sections/Education.tsx";
import { Skills } from "@/components/sections/Skills.tsx";
import { Projects } from "@/components/sections/Projects.tsx";
import { Certifications } from "@/components/sections/Certifications.tsx";
import { Hackathons } from "@/components/sections/Hackathons.tsx";
import { Hobbies } from "@/components/sections/Hobbies.tsx";
import { ContactFooter } from "@/components/sections/ContactFooter.tsx";

export default function App() {
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Check if user requested an unknown route
    const path = window.location.pathname;
    if (path && path !== "/" && path !== "/index.html" && path !== "") {
      setIs404(true);
    }
  }, []);

  if (is404) {
    return <NotFoundPage onGoHome={() => setIs404(false)} />;
  }

  return (
    <div className="animate-fade-in">
      <KineticGrid globalColor="default">
        {/* Morphing Custom Cursor for fine pointers (mouse/trackpad) */}
        <CustomCursor />

        {/* Sticky Navigation Bar with scroll progress bar & active highlight */}
        <Navbar />

        {/* Main Content Sections (all transparent so kinetic grid shows through) */}
        <main className="w-full">
          {/* 1. Hero with 3D wireframe icosahedron, GSAP intro, and typing title */}
          <Hero />

          {/* 2. About Me with profile photo and bio */}
          <About />

          {/* 3. Education Vertical Timeline with once-only scroll reveals */}
          <Education />

          {/* 4. Skills with subtle hover lift, #4A9EFF glow, and BlinkingDots */}
          <Skills />

          {/* 5. Projects with category filter chips and desktop horizontal pin */}
          <Projects />

          {/* 6. Certifications with Animated Gallery */}
          <Certifications />

          {/* 7. Hackathons & Competitions */}
          <Hackathons />

          {/* 8. Personal Hobbies & Interests */}
          <Hobbies />
        </main>

        {/* 9. Contact Section with copy-email, mailto composer, and footer */}
        <ContactFooter />

        {/* Back-to-Top Floating Action Button */}
        <BackToTop />
      </KineticGrid>
    </div>
  );
}
