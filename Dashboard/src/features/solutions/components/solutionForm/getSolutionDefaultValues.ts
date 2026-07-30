import { MEDIA_ONLY_ITEM_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import { DYNAMIC_ITEM_INITIAL_STATE } from "@/shared/components/dynamicItemsFields/getDynamicItemsFieldsDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { SLUG_SECTION_INITIAL_STATE } from "@/shared/components/slugSection/getSlugSectionDefaultValues";
import { TITLE_SECTION_INITIAL_STATE } from "@/shared/components/titleSection/getTitleSectionDefaultValues";
import type { SingleSolution } from "../../types";
import type { SolutionFormValues } from "./solutionSchema";

export const EXECUTION_INITIAL_STATE = {
  label_en: "",
  label_ar: "",
  value_en: "",
  value_ar: "",
};

export const SOLUTION_INITIAL_STATE = {
  ...TITLE_SECTION_INITIAL_STATE,
  ...SLUG_SECTION_INITIAL_STATE,
  ...HEADER_INITIAL_STATE,

  proposition_title_en: "",
  proposition_title_ar: "",
  proposition_desc_en: "",
  proposition_desc_ar: "",

  execution_title_en: "",
  execution_title_ar: "",

  execution_keys: Array.from({ length: 5 }, () => EXECUTION_INITIAL_STATE),
  items: [MEDIA_ONLY_ITEM_INITIAL_STATE],
  ticker_items: [DYNAMIC_ITEM_INITIAL_STATE],
};

export default function getSolutionDefaultValues(
  solutionToEdit?: SingleSolution,
): SolutionFormValues {
  if (!solutionToEdit) return SOLUTION_INITIAL_STATE;

  return {
    title_en: solutionToEdit.title_en || "",
    title_ar: solutionToEdit.title_ar || "",
    slug_en: solutionToEdit.slug_en || "",

    first_title_en: solutionToEdit.first_title_en || "",
    first_title_ar: solutionToEdit.first_title_ar || "",
    second_title_en: solutionToEdit.second_title_en || "",
    second_title_ar: solutionToEdit.second_title_ar || "",
    third_title_en: solutionToEdit.third_title_en || "",
    third_title_ar: solutionToEdit.third_title_ar || "",

    proposition_title_en: solutionToEdit.proposition_title_en || "",
    proposition_title_ar: solutionToEdit.proposition_title_ar || "",
    proposition_desc_en: solutionToEdit.proposition_desc_en || "",
    proposition_desc_ar: solutionToEdit.proposition_desc_ar || "",

    items: solutionToEdit.items?.length
      ? solutionToEdit.items
      : [MEDIA_ONLY_ITEM_INITIAL_STATE],

    execution_title_en: solutionToEdit.execution_title_en || "",
    execution_title_ar: solutionToEdit.execution_title_ar || "",

    execution_keys: solutionToEdit.execution_keys?.length
      ? solutionToEdit.execution_keys
      : [EXECUTION_INITIAL_STATE],

    ticker_items: solutionToEdit.ticker_items?.length
      ? solutionToEdit.ticker_items
      : [DYNAMIC_ITEM_INITIAL_STATE],
  };
}
