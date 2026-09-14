import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";

export interface ProjectDetailsProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectNavItem {
  slug: string;
  title: string;
  image: SmartMediaContent | null;
}

export interface ProjectSeo {
  title: string;
  description: string;
  image: string | null;
  image_alt: string | null;
  image_type: string | null;
  keywords: string | null;
}

export interface SingleProjectBySlugProps {
  title: string;
  slug: string;
  first_title: string;
  second_title: string;
  third_title: string;
  overview_description: string;
  main_image: SmartMediaContent | null;
  about_image: SmartMediaContent | null;
  gallery: SmartMediaContent[];
  stats_title: string;
  stats: ProjectStat[];
  ticker_items: string[];
  seo: ProjectSeo;
  prev: ProjectNavItem | null;
  next: ProjectNavItem | null;
}

export interface ProjectSlug {
  slug_en: string;
  slug_ar: string;
  updated_at: string;
}

export interface AboutTheProjectProps {
  locale: LanguageType;
  data: SingleProjectBySlugProps;
  certainImage: SmartMediaContent | null;
}

export interface ResultsProps {
  data: SingleProjectBySlugProps;
}

export interface ImagesProps {
  images: SmartMediaContent[];
  title: string;
}

export interface TwoGridProps {
  images: SmartMediaContent[];
  startIndex?: number;
  title: string;
}

export interface ImageItemProps {
  src: SmartMediaContent;
  full?: boolean;
  index?: number;
  title: string;
}

export interface ProjectNavigationProps {
  locale: LanguageType;
  previousLabel: string;
  nextLabel: string;
  prevItem: ProjectNavItem;
  nextItem: ProjectNavItem;
}
