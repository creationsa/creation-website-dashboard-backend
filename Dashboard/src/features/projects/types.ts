import type { DynamicItemsFormValues } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import type { HeaderFormValues } from "@/shared/components/headerFields/headerSchema";
import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { TitleSectionFormValues } from "@/shared/components/titleSection/titleSectionSchema";
import type { UseFormReturn } from "react-hook-form";
import type { ProjectFormValues } from "./components/projectForm/projectSchema";
import type { ProjectsFormValues } from "./components/mainProjectsForm/mainProjectsFormSchema";

export const PROJECT_MEDIA_FIELDS = [
  "first_cover_media",
  "second_cover_media",
  "first_media",
  "second_media",
  "third_media",
  "fourth_media",
  "fifth_media",
  "sixth_media",
  "seventh_media",
  "eighth_media",
] as const;

export type ProjectMediaField = (typeof PROJECT_MEDIA_FIELDS)[number];

export interface ImageLocalization {
  alt: string;
}

export interface ProjectImageObject {
  id: number;
  media: string;
  type: "image" | "video";
  poster: string;
  alt: string;
  en: ImageLocalization;
  ar: ImageLocalization;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  base_image: ProjectImageObject;
}

export interface ProjectsGridProps {
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
}

export interface DeleteProjectProps {
  project: Project;
}

export interface SingleProject
  extends TitleSectionFormValues, HeaderFormValues {
  id: number;
  metadata_id: number | null;
  slug_en: string;

  cover_media_field: ProjectMediaField | null;
  feature_media_field: ProjectMediaField | null;

  first_cover_media: MediaFieldValues;
  overview_description_en: string;
  overview_description_ar: string;

  second_cover_media: MediaFieldValues;
  stats_title_en: string;
  stats_title_ar: string;
  stat_one_value: string;
  stat_one_label_en: string;
  stat_one_label_ar: string;
  stat_two_value: string;
  stat_two_label_en: string;
  stat_two_label_ar: string;
  stat_three_value: string;
  stat_three_label_en: string;
  stat_three_label_ar: string;

  first_media: MediaFieldValues;
  second_media: MediaFieldValues;
  third_media: MediaFieldValues;
  fourth_media: MediaFieldValues;
  fifth_media: MediaFieldValues;
  sixth_media: MediaFieldValues;
  seventh_media: MediaFieldValues;
  eighth_media: MediaFieldValues;

  ticker_items: DynamicItemsFormValues;
}

export interface ProjectFormProps {
  projectToEdit?: SingleProject;
}

export interface SectionProps {
  form: UseFormReturn<ProjectFormValues>;
  disabled: boolean;
}

export interface ProjectsMainDataProps extends HeaderFormValues {
  overview_description_en: string;
  overview_description_ar: string;
  nav_title_en: string;
  nav_title_ar: string;
  slug_en: string;
}

export interface ProjectsFormMainDataProps {
  projectMainDataToEdit?: ProjectsMainDataProps;
}

export interface CoverToggleProps {
  form: UseFormReturn<ProjectFormValues>;
  fieldName: ProjectMediaField;
  disabled?: boolean;
}

export interface ProjectsHeaderOverviewFieldsProps {
  form: UseFormReturn<ProjectsFormValues>;
  disabled: boolean;
}
