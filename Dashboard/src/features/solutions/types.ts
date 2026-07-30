import type { AccordionFormValues } from "@/shared/components/dynamicAccordionFields/accordionSchema";
import type {
  DynamicFeaturedItemsFormValues,
  DynamicMediaItemsFormValues,
} from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import type { DynamicItemsFormValues } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import type { HeaderFormValues } from "@/shared/components/headerFields/headerSchema";
import type { SlugSectionFormValues } from "@/shared/components/slugSection/SlugSectionSchema";
import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { TitleSectionFormValues } from "@/shared/components/titleSection/titleSectionSchema";
import type { UseFormReturn } from "react-hook-form";
import type {
  ExecutionFormValues,
  SolutionFormValues,
} from "./components/solutionForm/solutionSchema";

export interface SolutionsMainDataProps
  extends
    HeaderFormValues,
    DynamicFeaturedItemsFormValues,
    AccordionFormValues {
  core_desc_en: string;
  core_desc_ar: string;
  items_header: HeaderFormValues;
  ticker_items: DynamicItemsFormValues;
  accordion_items_header: HeaderFormValues;
  accordion_media: MediaFieldValues;
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

export interface SolutionSectionsProps {
  form: UseFormReturn<SolutionFormValues>;
  disabled: boolean;
}

export interface SingleSolution
  extends
    TitleSectionFormValues,
    SlugSectionFormValues,
    HeaderFormValues,
    DynamicMediaItemsFormValues {
  id: number;

  proposition_title_en: string;
  proposition_title_ar: string;
  proposition_desc_en: string;
  proposition_desc_ar: string;
  execution_title_en: string;
  execution_title_ar: string;
  execution_keys: ExecutionFormValues;
  ticker_items: DynamicItemsFormValues;
}

export interface SolutionFormProps {
  solutionToEdit?: SingleSolution;
}
