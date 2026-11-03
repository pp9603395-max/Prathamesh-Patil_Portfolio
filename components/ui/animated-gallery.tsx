import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface ContainerScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const ContainerScroll: React.FC<ContainerScrollProps> = ({
  children,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[50vh] sm:min-h-[70vh] md:min-h-[110vh] w-full py-8 md:py-20 ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass down scroll progress if supported
          return React.cloneElement(child as React.ReactElement<{ scrollYProgress?: MotionValue<number> }>, {
            scrollYProgress,
          });
        }
        return child;
      })}
    </div>
  );
};

interface ContainerStickyProps {
  children: React.ReactNode;
  className?: string;
  scrollYProgress?: MotionValue<number>;
}

export const ContainerSticky: React.FC<ContainerStickyProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`sticky top-20 md:top-24 flex min-h-[500px] flex-col justify-center overflow-hidden py-4 ${className}`}
    >
      {children}
    </div>
  );
};

interface ContainerStaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ContainerStagger: React.FC<ContainerStaggerProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.12, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ContainerAnimatedProps {
  children: React.ReactNode;
  className?: string;
}

import type { Variants } from "motion/react";

export const ContainerAnimated: React.FC<ContainerAnimatedProps> = ({
  children,
  className = "",
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
};

interface GalleryContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const GalleryContainer: React.FC<GalleryContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 items-start w-full max-w-6xl mx-auto px-4 ${className}`}
    >
      {children}
    </div>
  );
};

interface GalleryColProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  scrollYProgress?: MotionValue<number>;
}

export const GalleryCol: React.FC<GalleryColProps> = ({
  children,
  className = "",
  offset = 0,
  scrollYProgress,
}) => {
  // Parallax translation based on column offset
  const defaultProgress = useScroll().scrollYProgress;
  const progress = scrollYProgress || defaultProgress;

  const yTransform = useTransform(
    progress,
    [0, 1],
    [offset * 40, -offset * 40]
  );

  return (
    <motion.div
      style={{ y: yTransform }}
      className={`flex flex-col gap-6 w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
