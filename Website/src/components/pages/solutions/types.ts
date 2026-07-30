import {
  NewsTranslations,
  ProjectDetailsTranslations,
  SolutionsTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";
import { ElementType } from "react";

type TranslationKey = Exclude<keyof SolutionsTranslations, "capabilities">;

export interface WhatWeOfferProps {
  solutions: SolutionsTranslations;
  project_details: ProjectDetailsTranslations;
  locale: LanguageType;
}

export interface SolutionsCoreProps {
  solutions: SolutionsTranslations;
  locale: LanguageType;
}

export interface Solution {
  icon: ElementType;
  link: string;
  title: TranslationKey;
  description: TranslationKey;
}

export interface SolutionCardProps {
  solution: Solution;
  translations: SolutionsTranslations;
  locale: LanguageType;
}

export interface ProjectDataProps {
  image: StaticImageData;
  translationKey:
    | "mouj"
    | "boulevard_world"
    | "maybach_boutique"
    | "errva"
    | "tasier"
    | "nozomi"
    | "cupic"
    | "phase"
    | "darf"
    | "btic_group";
  href: string;
}

export interface ProjectSlideItemProps {
  image: StaticImageData;
  translationKey:
    | "mouj"
    | "boulevard_world"
    | "maybach_boutique"
    | "errva"
    | "tasier"
    | "nozomi"
    | "cupic"
    | "phase"
    | "darf"
    | "btic_group";
  href: string;
  locale: LanguageType;
  project_details: ProjectDetailsTranslations;
}

export interface AllSolutionsProps {
  solutions: SolutionsTranslations;
  locale: LanguageType;
  news: NewsTranslations;
}

export interface ProjectSliderProps {
  locale: LanguageType;
  project_details: ProjectDetailsTranslations;
}
