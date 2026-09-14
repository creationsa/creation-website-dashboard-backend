import { PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE } from "@/shared/components/pageTitleSettingsSection/getPageTitleSettingsSectionDefaultValues";
import type { BlogsMainDataProps } from "../../types";
import type { BlogsMainDataFormValues } from "./blogsMainDataSchema";

export const BLOGS_MAIN_DATA_INITIAL_STATE: BlogsMainDataFormValues = {
  ...PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE,
};

export default function getBlogsMainDataDefaultValues(
  blogsMainDataToEdit?: BlogsMainDataProps,
): BlogsMainDataFormValues {
  if (!blogsMainDataToEdit) return BLOGS_MAIN_DATA_INITIAL_STATE;

  return {
    nav_title_en: blogsMainDataToEdit.nav_title_en || "",
    nav_title_ar: blogsMainDataToEdit.nav_title_ar || "",
    slug_en: blogsMainDataToEdit.slug_en || "",
  };
}
