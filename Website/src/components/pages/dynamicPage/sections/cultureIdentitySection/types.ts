import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "../../types";

export interface CultureIdentityLogo {
  url: string | null;
  alt: string;
}

export interface CultureIdentityContent {
  culture_media: SmartMediaContent;
  top_left_text?: string;
  top_left_second_text?: string;
  top_right_text?: string;
  top_right_second_text?: string;
  center_title: string;
  center_description: string;
  logo: CultureIdentityLogo;
}

export interface ArchitectureBackgroundProps {
  media: SmartMediaContent;
  alt: string;
}

export interface ArchitectureCornerLabelsProps {
  topLeftText?: string;
  topLeftSecondText?: string;
  topRightText?: string;
  topRightSecondText?: string;
}

export interface ArchitectureCenterContentProps {
  headline: string;
  description: string;
  logo: CultureIdentityLogo;
  locale: LanguageType;
}
