import { ArchitectureTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";

export interface ArchitectureProps {
  architecture: ArchitectureTranslations;
  locale: LanguageType;
}

export interface ArchitectureBackgroundProps {
  alt: string;
}

export interface ArchitectureCornerLabelsProps {
  architecture: ArchitectureTranslations;
}

export interface ArchitectureCenterContentProps {
  headline: string;
  description: string;
  locale: LanguageType;
}
