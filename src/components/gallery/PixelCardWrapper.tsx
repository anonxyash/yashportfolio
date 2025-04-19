"use client";

import { useEffect, useState, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import { Flex } from "@/once-ui/components";
import Image from "next/image";

// Dynamic import with no SSR to prevent hydration issues
const PixelCard = dynamic(
  () => import("@/blocks/Components/PixelCard/PixelCard"),
  { ssr: false }
);

const projectItems = [
  {
    title: "AI Solutions",
    description: "Advanced artificial intelligence services",
    image: "/images/projects/project-01/cover-01.jpg",
  },
  {
    title: "Web Design",
    description: "Creating beautiful digital experiences",
    image: "/images/projects/project-01/cover-02.jpg",
  },
  {
    title: "Development",
    description: "Cutting-edge software development",
    image: "/images/projects/project-01/cover-03.jpg",
  },
  {
    title: "UI/UX Design",
    description: "User-centered interface design",
    image: "/images/projects/project-01/cover-04.jpg",
  },
  {
    title: "Creative Direction",
    description: "Visionary strategy for brands",
    image: "/images/avatar.jpg",
  },
];

// Memoized card component to prevent unnecessary re-renders
const ProjectCard = memo(({ 
  project, 
  isActive, 
  onClick 
}: { 
  project: typeof projectItems[0],
  isActive: boolean,
  onClick: () => void
}) => {
  return (
    <div onClick={onClick}>
      <PixelCard 
        variant={isActive ? "pink" : "default"}
        className={`cursor-pointer transform transition-all duration-500 ${
          isActive ? "scale-110 z-10" : "scale-90 opacity-70"
        }`}
        // Performance optimizations
        speed={isActive ? 40 : 10} // Lower speed for inactive cards
        gap={isActive ? 5 : 10}    // Larger gap = fewer pixels to animate for inactive cards
        noFocus={!isActive}        // Only enable focus effects on active card
      >
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
          <p className="text-sm opacity-80">{project.description}</p>
        </div>
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-[1]"
        />
        {/* Use next/image for better performance */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority={isActive}
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover opacity-40"
            loading={isActive ? "eager" : "lazy"}
          />
        </div>
      </PixelCard>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const PixelCardWrapper = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Separate effect for autoplay to avoid unnecessary re-renders
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlay(false); // Stop autoplay when user interacts
    
    // Resume autoplay after 15 seconds of inactivity
    const timer = setTimeout(() => setIsAutoPlay(true), 15000);
    return () => clearTimeout(timer);
  };

  // Limit number of visible cards for better performance
  const visibleProjects = useMemo(() => {
    if (!isClient) return [];
    
    // Show all on larger screens, only active and adjacent on smaller screens
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return projectItems;
    
    // On mobile, only show active card and one card before/after
    return projectItems.filter((_, idx) => {
      const diff = Math.abs(idx - activeIndex);
      return diff === 0 || diff === 1 || (activeIndex === 0 && idx === projectItems.length - 1) || (activeIndex === projectItems.length - 1 && idx === 0);
    });
  }, [isClient, activeIndex]);

  if (!isClient) return null;

  return (
    <Flex 
      fillWidth 
      fillHeight 
      horizontal="center" 
      vertical="center" 
      style={{ 
        padding: "24px", 
        overflowX: "hidden", // Prevent horizontal scrolling
        background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.1))" // Add subtle gradient background
      }}
    >
      <Flex 
        horizontal="center" 
        vertical="center" 
        style={{ 
          width: "100%", 
          maxWidth: "1200px", 
          height: "100%", 
          gap: "30px", 
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {visibleProjects.map((project, idx) => {
          const originalIndex = projectItems.findIndex(p => p.title === project.title);
          return (
            <ProjectCard
              key={project.title}
              project={project}
              isActive={originalIndex === activeIndex}
              onClick={() => handleCardClick(originalIndex)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PixelCardWrapper; 