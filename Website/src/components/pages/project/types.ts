import { LanguageType } from "@/i18n.config";
import { SmartMediaContent } from "@/types/media";

export interface ProjectItem {
  title: string;
  slug: string;
  image: SmartMediaContent | null;
}

export interface ProjectsMainData {
  first_title: string;
  second_title: string;
  third_title: string;
  overview_description: string;
}

export interface AllProjectsProps {
  mainData: ProjectsMainData;
  locale: LanguageType;
  projects: ProjectItem[];
}

export interface ProjectsGridProps {
  projects: ProjectItem[];
}

export interface ProjectCardProps {
  item: ProjectItem;
  directionIndex: number;
}
