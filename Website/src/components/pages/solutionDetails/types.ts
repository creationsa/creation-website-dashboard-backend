import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";

export interface SolutionDetailsProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export interface SolutionExecutionKey {
  label: string;
  value: string;
}

export interface SolutionSeo {
  title: string;
  description: string;
  image: string | null;
  image_alt: string | null;
  image_type: string | null;
  keywords: string | null;
}

export interface SolutionNavItem {
  slug: string;
  title: string;
}

export interface SingleSolutionBySlugProps {
  title: string;
  slug: string;
  first_title: string;
  second_title: string;
  third_title: string;
  proposition_title: string;
  proposition_desc: string;
  small_description: string;
  execution_title: string;
  execution_keys: SolutionExecutionKey[];
  gallery: SmartMediaContent[];
  ticker_items: string[];
  seo: SolutionSeo;
  prev: SolutionNavItem | null;
  next: SolutionNavItem | null;
}

export interface SolutionSlug {
  slug_en: string;
  slug_ar: string;
  updated_at: string;
}

export interface MainSectionProps {
  locale: LanguageType;
  data: SingleSolutionBySlugProps;
}

export interface DeepDetailsProps {
  data: SingleSolutionBySlugProps;
}

export interface ImageSliderProps {
  images: SmartMediaContent[];
  solutionTitle: string;
}

export interface ImageSlideItemProps {
  src: SmartMediaContent;
  solutionTitle: string;
  index: number;
}

export interface SolutionNavigationProps {
  locale: LanguageType;
  previousLabel: string;
  nextLabel: string;
  prevItem: SolutionNavItem;
  nextItem: SolutionNavItem;
}
