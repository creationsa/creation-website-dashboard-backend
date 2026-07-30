import {
  ProjectDetailsTranslations,
  ProjectTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";

export interface ProjectsProps {
  locale: LanguageType;
  project: ProjectTranslations;
  project_details: ProjectDetailsTranslations;
}

export interface ProjectData {
  image: StaticImageData;
  transitionKey:
    | "darf"
    | "btic_group"
    | "phase"
    | "maybach_boutique"
    | "nozomi"
    | "cupic"
    | "damons"
    | "shovel";
  href: string;
}

export interface ProjectSliderProps {
  project_details: ProjectDetailsTranslations;
  locale: LanguageType;
}

export interface ProjectSlideItemProps extends ProjectData {
  project_details: ProjectDetailsTranslations;
  locale: LanguageType;
}
