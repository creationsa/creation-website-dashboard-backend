import {
  ProjectDetailsTranslations,
  SolutionsTranslations,
} from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";
import { OUR_SOLUTIONS } from "./solutionsData";

export type Solution = (typeof OUR_SOLUTIONS)[number];

export interface SolutionsProps {
  solutions: SolutionsTranslations;
  project_details: ProjectDetailsTranslations;
  locale: LanguageType;
}

export interface SolutionItemProps {
  solution: Solution;
  index: number;
  total: number;
  locale: LanguageType;
  solutions: SolutionsTranslations;
  projectDetails: ProjectDetailsTranslations;
}

export interface SolutionInfoProps {
  current: string;
  total: string;
  title: string;
  description: string;
  link: string;
  exploreLabel: string;
}

export interface SolutionNumberProps {
  current: string;
  total: string;
}

export interface ProjectCardProps {
  slug: string;
  locale: LanguageType;
  firstImage: StaticImageData;
  title: string;
  description: string;
}
