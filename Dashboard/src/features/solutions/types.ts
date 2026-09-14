import type { AccordionFormValues } from "@/shared/components/dynamicAccordionFields/accordionSchema";
import type {
  DynamicFeaturedItemsFormValues,
  DynamicMediaItemsFormValues,
} from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import type { DynamicItemsFormValues } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import type { HeaderFormValues } from "@/shared/components/headerFields/headerSchema";
import type { PageTitleSettingsSectionFormValues } from "@/shared/components/pageTitleSettingsSection/PageTitleSettingsSectionSchema";
import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { TitleSectionFormValues } from "@/shared/components/titleSection/titleSectionSchema";
import type { UseFormReturn } from "react-hook-form";
import type { SolutionsFormValues } from "./components/mainSolutionsForm/mainSolutionsFormSchema";
import type {
  ExecutionFormValues,
  SolutionFormValues,
} from "./components/solutionForm/solutionSchema";

export interface SolutionsMainDataProps
  extends
    HeaderFormValues,
    DynamicFeaturedItemsFormValues,
    AccordionFormValues,
    PageTitleSettingsSectionFormValues {
  core_desc_en: string;
  core_desc_ar: string;
  core_sub_desc_en: string;
  core_sub_desc_ar: string;
  items_header: HeaderFormValues;
  ticker_items: DynamicItemsFormValues;
  accordion_items_header: HeaderFormValues;
  accordion_media: MediaFieldValues;
  nav_title_en: string;
  nav_title_ar: string;
}

export interface SolutionsFormMainDataProps {
  solutionMainDataToEdit?: SolutionsMainDataProps;
}

export interface ImageLocalization {
  alt: string;
}

export interface SolutionImageObject {
  id: number;
  media: string;
  alt: string;
  en: ImageLocalization;
  ar: ImageLocalization;
}

export interface SingleSolutionProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  base_image: SolutionImageObject;
}

export interface SolutionGridProps {
  solutions: SingleSolutionProps[];
}

export interface SolutionCardProps {
  solution: SingleSolutionProps;
}

export interface DeleteSolutionProps {
  solution: SingleSolutionProps;
}

export interface SolutionSlugSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionCardIconSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionHeaderSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionValuePropositionSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionExecutionFrameworkSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionGallerySectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionNewsSectionProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SolutionsHeaderSectionProps {
  form: UseFormReturn<SolutionsFormValues>;
  disabled: boolean;
}

export interface SolutionsServicesSectionProps {
  form: UseFormReturn<SolutionsFormValues>;
  disabled: boolean;
}

export interface SolutionsNewsSectionProps {
  form: UseFormReturn<SolutionsFormValues>;
  disabled: boolean;
}

export interface SolutionsCapabilitiesSectionProps {
  form: UseFormReturn<SolutionsFormValues>;
  disabled: boolean;
}

export interface CardIconValue {
  file: string | File;
  alt_en: string;
  alt_ar: string;
}

export interface SingleSolution
  extends
    TitleSectionFormValues,
    HeaderFormValues,
    DynamicMediaItemsFormValues {
  id: number;
  metadata_id: number | null;
  slug_en: string;

  proposition_title_en: string;
  proposition_title_ar: string;
  proposition_desc_en: string;
  proposition_desc_ar: string;
  small_description_en: string;
  small_description_ar: string;
  execution_title_en: string;
  execution_title_ar: string;
  execution_keys: ExecutionFormValues;
  ticker_items: DynamicItemsFormValues;
  card_icon: CardIconValue;
}

export interface SolutionFormProps {
  solutionToEdit?: SingleSolution;
}
