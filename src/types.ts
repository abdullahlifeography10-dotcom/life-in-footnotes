export type PhotoCategory =
  | 'All Frames'
  | 'Nature'
  | 'Landscape'
  | 'Street'
  | 'Travel'
  | 'Everyday Life'
  | 'Architecture'
  | 'Portraits'
  | string;

export interface PhotoFrame {
  id: string;
  title: string;
  category: PhotoCategory;
  imageUrl: string;
  caption: string;
  location?: string;
  date?: string;
  cameraInfo?: string; // e.g. "35mm f/2 · ISO 200 · 1/500s"
  aspect?: 'landscape' | 'portrait' | 'square' | 'panoramic';
  featuredOnHome?: boolean;
}

export interface TravelDestination {
  id: string;
  title: string;
  location: string;
  country: string;
  coordinates: { lat: number; lng: number };
  travelDate: string;
  coverImage: string;
  summary: string;
  personalExperience: string[];
  photoGallery: {
    url: string;
    caption: string;
  }[];
  travelNotes: string[];
  closingThought: string;
  status: 'Visited' | 'Upcoming' | 'Wishlist';
  featuredOnHome?: boolean;
}

export type DiaryCategory =
  | 'Life Notes'
  | 'Reflections'
  | 'Memories'
  | 'Random Thoughts'
  | 'Letters to Time'
  | 'Everyday Stories'
  | string;

export interface DiaryEntry {
  id: string;
  slug: string;
  title: string;
  category: DiaryCategory;
  date: string;
  readTime: string;
  coverImage?: string;
  excerpt: string;
  paragraphs: string[];
  closingQuote?: string;
  featuredOnHome?: boolean;
}

export interface BrandProfile {
  name: string;
  tagline: string;
  creator: string;
  location: string;
  instagram: string;
  facebook: string;
  email: string;
  phone: string;
  description: string;
  quote: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroSupportingText: string;
  aboutBio: string[];
  creativePhilosophy: string[];
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
}

export interface SiteContent {
  profile: BrandProfile;
  photos: PhotoFrame[];
  categories: string[];
  destinations: TravelDestination[];
  diaryEntries: DiaryEntry[];
}
