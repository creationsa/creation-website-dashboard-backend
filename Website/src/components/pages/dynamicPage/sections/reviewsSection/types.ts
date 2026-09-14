import { LanguageType } from "@/i18n.config";
import { HeaderContent } from "../../types";

export interface ReviewItem {
  title: string;
  description: string;
  link_text: string;
  link_url: string;
  logo_image: string;
}

export interface AllTrustedWebsitesProps {
  items: ReviewItem[];
}

export interface ReviewsContent extends HeaderContent {
  description: string;
  items: ReviewItem[];
}

export interface ReviewsSectionProps {
  content: ReviewsContent;
  locale: LanguageType;
}
