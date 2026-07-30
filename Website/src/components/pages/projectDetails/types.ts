import {
  ProjectDetailsContent,
  ProjectDetailsTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export type ProjectSlug =
  | "mouj"
  | "boulevard-world"
  | "maybach-boutique"
  | "errva"
  | "tasier"
  | "nozomi"
  | "cupic"
  | "phase"
  | "darf"
  | "btic-group"
  | "damons"
  | "shovel";

export interface ProjectDetailsProps {
  params: Promise<{
    locale: LanguageType;
    slug: string;
  }>;
}

export interface ImportantContentProps {
  translations: ProjectDetailsTranslations;
  project: ProjectDetailsContent;
}

export interface AboutTheProjectProps {
  locale: LanguageType;
  project: ProjectDetailsContent;
  title: string;
  certainImage: StaticImageData;
}

export interface ResultsProps {
  projectData: ProjectDetailsContent;
  translations: ProjectDetailsTranslations;
}

export interface ImagesProps {
  images: StaticImageData[];
  title: string;
  translations: ProjectDetailsTranslations;
}

export interface TwoGridProps {
  images: StaticImageData[];
  startIndex?: number;
  title: string;
  translations: ProjectDetailsTranslations;
}

export interface ImageItemProps {
  src: StaticImageData;
  full?: boolean;
  index?: number;
  title: string;
  translations: ProjectDetailsTranslations;
}

export interface ProjectNavigationProps {
  slug: string;
  locale: LanguageType;
  project_details: ProjectDetailsTranslations;
  previousLabel: string;
  nextLabel: string;
}
