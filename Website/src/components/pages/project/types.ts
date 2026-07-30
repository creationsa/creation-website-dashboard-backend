import { ProjectTranslations } from "@/dictionaries/types";
import { LanguageType } from "@/i18n.config";
import { StaticImageData } from "next/image";
import { ProjectTab } from "./tabs";

type RealProjectTab = Exclude<ProjectTab, "all">;

export interface ProjectItem {
  type: RealProjectTab | RealProjectTab[];
  toolkit_header: keyof ProjectTranslations | (keyof ProjectTranslations)[];
  toolkit_title: keyof ProjectTranslations;
  href: string;
  img: StaticImageData;
}

export interface ProjectTabsItem {
  key: ProjectTab;
  label: string;
}

export interface AllProjectsProps {
  project: ProjectTranslations;
  locale: LanguageType;
}

export interface ProjectTabsProps {
  activeTab: ProjectTab;
  onChange: (tab: ProjectTab) => void;
  labels: ProjectTranslations;
}

export interface ProjectsGridProps {
  projects: ProjectItem[];
  project: ProjectTranslations;
}

export interface ProjectCardProps {
  item: ProjectItem;
  project: ProjectTranslations;
  directionIndex: number;
}
