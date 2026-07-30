import type { DynamicItemsFormValues } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import type { HeaderFormValues } from "@/shared/components/headerFields/headerSchema";
import type { SeoSectionFormValues } from "@/shared/components/seoSection/SeoSectionSchema";
import type { SlugSectionFormValues } from "@/shared/components/slugSection/SlugSectionSchema";
import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { TitleSectionFormValues } from "@/shared/components/titleSection/titleSectionSchema";
import type { UseFormReturn } from "react-hook-form";
import type { ProjectFormValues } from "./components/projectForm/projectSchema";
import type { LogosFormValues } from "@/shared/components/logosFields/logosSectionSchema";

export interface ImageLocalization {
  alt: string;
}

export interface ProjectImageObject {
  id: number;
  media: string;
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
  extends
    TitleSectionFormValues,
    SeoSectionFormValues,
    SlugSectionFormValues,
    HeaderFormValues {
  id: number;

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

  logos_section: LogosFormValues;
}

export interface ProjectsFormMainDataProps {
  projectMainDataToEdit?: ProjectsMainDataProps;
}
