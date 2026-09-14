import {
  ACCORDION_CONTENT_BLOCK_INITIAL_STATE,
  ACCORDION_ITEM_INITIAL_STATE,
  ACCORDION_ITEMS_INITIAL_STATE,
} from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import { ITEMS_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import { DYNAMIC_ITEM_INITIAL_STATE } from "@/shared/components/dynamicItemsFields/getDynamicItemsFieldsDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE } from "@/shared/components/pageTitleSettingsSection/getPageTitleSettingsSectionDefaultValues";
import type { SolutionsMainDataProps } from "../../types";
import type { SolutionsFormValues } from "./mainSolutionsFormSchema";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";

export const SOLUTIONS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  items: [ITEMS_INITIAL_STATE],
  core_desc_en: "",
  core_desc_ar: "",
  core_sub_desc_en: "",
  core_sub_desc_ar: "",
  items_header: { ...HEADER_INITIAL_STATE },
  ticker_items: [DYNAMIC_ITEM_INITIAL_STATE],
  ...ACCORDION_ITEMS_INITIAL_STATE,
  accordion_items_header: { ...HEADER_INITIAL_STATE },
  accordion_media: MEDIA_INITIAL_STATE,
  ...PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE,
};

export default function getMainSolutionsFormDefaultValues(
  solutionMainDataToEdit?: SolutionsMainDataProps,
): SolutionsFormValues {
  if (!solutionMainDataToEdit) return SOLUTIONS_INITIAL_STATE;

  return {
    first_title_en: solutionMainDataToEdit.first_title_en || "",
    first_title_ar: solutionMainDataToEdit.first_title_ar || "",
    second_title_en: solutionMainDataToEdit.second_title_en || "",
    second_title_ar: solutionMainDataToEdit.second_title_ar || "",
    third_title_en: solutionMainDataToEdit.third_title_en || "",
    third_title_ar: solutionMainDataToEdit.third_title_ar || "",

    items_header: solutionMainDataToEdit.items_header
      ? solutionMainDataToEdit.items_header
      : { ...HEADER_INITIAL_STATE },
    items: solutionMainDataToEdit.items?.length
      ? solutionMainDataToEdit.items
      : [ITEMS_INITIAL_STATE],

    core_desc_en: solutionMainDataToEdit.core_desc_en || "",
    core_desc_ar: solutionMainDataToEdit.core_desc_ar || "",
    core_sub_desc_en: solutionMainDataToEdit.core_sub_desc_en || "",
    core_sub_desc_ar: solutionMainDataToEdit.core_sub_desc_ar || "",
    ticker_items: solutionMainDataToEdit.ticker_items?.length
      ? solutionMainDataToEdit.ticker_items
      : [DYNAMIC_ITEM_INITIAL_STATE],

    accordion_items: solutionMainDataToEdit.accordion_items?.length
      ? solutionMainDataToEdit.accordion_items.map((item) => ({
          ...item,
          content_blocks: item.content_blocks?.length
            ? item.content_blocks
            : [ACCORDION_CONTENT_BLOCK_INITIAL_STATE],
        }))
      : [ACCORDION_ITEM_INITIAL_STATE],
    accordion_items_header: solutionMainDataToEdit.accordion_items_header
      ? solutionMainDataToEdit.accordion_items_header
      : { ...HEADER_INITIAL_STATE },
    accordion_media: solutionMainDataToEdit.accordion_media
      ? solutionMainDataToEdit.accordion_media
      : MEDIA_INITIAL_STATE,

    nav_title_en: solutionMainDataToEdit.nav_title_en || "",
    nav_title_ar: solutionMainDataToEdit.nav_title_ar || "",
    slug_en: solutionMainDataToEdit.slug_en || "",
  };
}
