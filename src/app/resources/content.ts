import { Gallery, GalleryImage } from "./gallery";

export const gallery: Gallery = {
  label: "Gallery",
  title: "Interactive Gallery",
  description: "Experience Yash's projects with an interactive gradient background",
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

// Export other objects as needed, or migrate them from content.js
