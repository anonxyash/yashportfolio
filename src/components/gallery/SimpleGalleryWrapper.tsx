"use client";

import { useEffect, useState } from "react";
import { Flex, Text } from "@/once-ui/components";

const projectItems = [
  {
    title: "AI Solutions",
    description: "Advanced artificial intelligence services",
  },
  {
    title: "Web Design",
    description: "Creating beautiful digital experiences",
  },
  {
    title: "Development",
    description: "Cutting-edge software development",
  },
  {
    title: "UI/UX Design",
    description: "User-centered interface design",
  },
  {
    title: "Creative Direction",
    description: "Visionary strategy for brands",
  },
];

const SimpleGalleryWrapper = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!isClient) return null;

  return (
    <Flex 
      fillWidth 
      fillHeight 
      horizontal="center" 
      vertical="center"
    >
      <Flex
        direction="column"
        gap="xl"
        padding="xl"
        style={{
          maxWidth: "800px",
          width: "100%"
        }}
      >
        <h1 
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
            color: "var(--color-neutral-strong)"
          }}
        >
          My Projects
        </h1>
        
        {projectItems.map((project, index) => (
          <Flex
            key={index}
            direction="column"
            gap="m"
            padding="xl"
            radius="m"
            border={index === activeIndex ? "brand-medium" : "neutral-medium"}
            background="surface"
            onClick={() => handleItemClick(index)}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: index === activeIndex ? "scale(1.02)" : "scale(1)",
            }}
          >
            <Text variant="body-strong-xl" onBackground="neutral-strong">
              {project.title}
            </Text>
            <Text variant="body-default-l" onBackground="neutral-medium">
              {project.description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SimpleGalleryWrapper; 