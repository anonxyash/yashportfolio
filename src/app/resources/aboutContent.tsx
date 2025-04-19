import { ReactNode } from "react";

interface Experience {
  company: string;
  timeframe: string;
  role: string;
  achievements: ReactNode[];
  images: Array<{ src: string; alt: string; width: number; height: number }>;
}

export const about = {
  label: "About",
  title: "About me",
  description: `Meet Yash Dev, AI Expert & Creative Director from Yash/Dev`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm Yash, a design innovator passionate about turning complex challenges into simple, elegant solutions. My work bridges digital interfaces, interactive experiences, and the intersection of design and technology.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Axiom",
        timeframe: "2025 - present",
        role: "ceo and co founder",
        achievements: [
          <>
            Redesigned the UI/UX for the axiom agency, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "content creator",
        timeframe: "2023- present",
        role: "website designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "GVP CBSE",
        description: <>currently on high school</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + framer + Supabase etc.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Figma",
        description: <>Able to prototype in Figma with spline with unnatural speed.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};
