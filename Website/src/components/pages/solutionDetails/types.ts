import {
  NewsTranslations,
  SolutionDetailsContent,
  SolutionDetailsTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface SolutionDetailsProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export type SolutionSlug =
  | "branding"
  | "digital-marketing"
  | "web-design"
  | "production";

export interface SolutionDetailsItem {
  slug: SolutionSlug;
  translationKey:
    | "branding_advertising"
    | "digital_marketing"
    | "web_design"
    | "production_services";
  images: StaticImageData[];
}

export interface MainSectionProps {
  locale: LanguageType;
  solutionData: SolutionDetailsContent;
  solution_details: SolutionDetailsTranslations;
}

export interface DeepDetailsProps {
  solutionData: SolutionDetailsContent;
  solution_details: SolutionDetailsTranslations;
}

export interface ImageSliderProps {
  images: StaticImageData[];
  solutionTitle: string;
}

export interface ImageSlideItemProps {
  src: StaticImageData;
  solutionTitle: string;
  index: number;
}

export interface SolutionsTickerProps {
  news: NewsTranslations;
}

export interface SolutionNavigationProps {
  slug: string;
  locale: LanguageType;
  solution_details: SolutionDetailsTranslations;
  previousLabel: string;
  nextLabel: string;
}
