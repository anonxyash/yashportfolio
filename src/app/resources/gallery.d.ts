export interface GalleryImage {
  src: string;
  alt: string;
  orientation: 'horizontal' | 'vertical';
}

export interface Gallery {
  label: string;
  title: string;
  description: string;
  images: GalleryImage[];
}
