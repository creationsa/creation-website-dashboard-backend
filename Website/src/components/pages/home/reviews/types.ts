import { ReviewsTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface ReviewsProps {
  reviews: ReviewsTranslations;
  locale: LanguageType;
}

export interface AllTrustedWebsitesProps {
  reviews: ReviewsTranslations;
}

export interface TrustedWebsiteProps {
  title: string;
  description: string;
  link: string;
  reviews: ReviewsTranslations;
  img: StaticImageData;
}
