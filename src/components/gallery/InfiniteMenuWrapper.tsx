"use client";

import { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@/once-ui/components";
import dynamic from "next/dynamic";

// Dynamic import with no SSR to prevent hydration issues
const InfiniteMenu = dynamic(
  () => import("@/blocks/Components/InfiniteMenu/InfiniteMenu"),
  { ssr: false }
);

// Define sample menu items for the infinite menu
const menuItems = [
  {
    image: "/images/projects/project-01/cover-01.jpg",
    link: "#",
    title: "AI Solutions",
    description: "Advanced artificial intelligence services",
  },
  {
    image: "/images/projects/project-01/cover-02.jpg",
    link: "#",
    title: "Web Design",
    description: "Creating beautiful digital experiences",
  },
  {
    image: "/images/projects/project-01/cover-03.jpg",
    link: "#",
    title: "Development",
    description: "Cutting-edge software development",
  },
  {
    image: "/images/projects/project-01/cover-04.jpg",
    link: "#",
    title: "UI/UX Design",
    description: "User-centered interface design",
  },
  {
    image: "/images/avatar.jpg",
    link: "#",
    title: "Consulting",
    description: "Expert advice for your business",
  },
];

const InfiniteMenuWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Flex
      ref={containerRef}
      fillWidth
      fillHeight
      style={{ 
        height: "100vh", 
        position: "relative",
      }}
    >
      {isClient && (
        <>
          <InfiniteMenu items={menuItems} />
          <Flex
            position="absolute"
            bottom="24"
            left="0"
            right="0"
            horizontal="center"
            padding="16"
            radius="l"
            background="surface"
            border="neutral-medium"
          >
            <Text variant="body-default-s" onBackground="neutral-weak">
              Interact with the sphere by dragging to explore different menu items
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default InfiniteMenuWrapper; 