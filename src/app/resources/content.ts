import { Gallery, GalleryImage } from "./gallery";

export interface Person {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  displayLocation: string;
  languages: string[];
}

export const person: Person = {
  firstName: "Yash",
  lastName: "Dev",
  name: "Yash Dev",
  role: "AI Expert & Creative Director",
  avatar: "/images/avatar.jpg",
  location: "Asia/Kolkata",
  displayLocation: "Yash/Dev",
  languages: ["English", "hindi"],
};

export const newsletter = {
  display: true,
  title: "Subscribe to Yash's Newsletter",
  description: "I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.",
};

export const social = [
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/918319712700",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:neoanonymous0101@gmail.com",
  },
];

export const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: "Innovative Design & Build Engineer",
  subline: "I'm Yash, an AI Expert & Creative Director, transforming brands through intelligent design and visionary strategy.",
};


export const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.displayLocation}`,
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
    description: "I'm Yash, a design innovator passionate about turning complex challenges into simple, elegant solutions. My work bridges digital interfaces, interactive experiences, and the intersection of design and technology.",
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
          "Redesigned the UI/UX for the axiom agency, resulting in a 20% increase in user engagement and 30% faster load times.",
          "Spearheaded the integration of AI tools into design workflows, enabling designers to iterate 50% faster."
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
          "Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.",
          "Led a cross-functional team to launch a new product line, contributing to a 15% increase in overall company revenue."
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
        description: "currently on high school",
      },
      {
        name: "Build the Future",
        description: "Studied online marketing and personal branding.",
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Next.js",
        description: "Building next gen apps with Next.js + framer + Supabase etc.",
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
        description: "Able to prototype in Figma with spline with unnatural speed.",
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

export const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

export const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
};

export const gallery: Gallery = {
  label: "Gallery",
  title: "Interactive Gallery",
  description: `Experience ${person.name}'s projects with an interactive gradient background` ,
  images: [
    {
      src: "/images/gallery/sample-horizontal.jpg",
      alt: "Sample Horizontal Image",
      orientation: "horizontal"
    },
    {
      src: "/images/gallery/sample-vertical.jpg",
      alt: "Sample Vertical Image",
      orientation: "vertical"
    }
  ]
};
