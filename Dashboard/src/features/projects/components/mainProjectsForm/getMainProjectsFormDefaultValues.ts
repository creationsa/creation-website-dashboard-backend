import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE } from "@/shared/components/pageTitleSettingsSection/getPageTitleSettingsSectionDefaultValues";
import type { ProjectsFormValues } from "./mainProjectsFormSchema";
import type { ProjectsMainDataProps } from "../../types";

export const PROJECTS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  overview_description_en: "",
  overview_description_ar: "",
  ...PAGE_TITLE_SETTINGS_SECTION_INITIAL_STATE,
};

export default function getProjectsDefaultValues(
  projectMainDataToEdit?: ProjectsMainDataProps,
): ProjectsFormValues {
  if (!projectMainDataToEdit) return PROJECTS_INITIAL_STATE;

  return {
    first_title_en: projectMainDataToEdit.first_title_en || "",
    first_title_ar: projectMainDataToEdit.first_title_ar || "",

    second_title_en: projectMainDataToEdit.second_title_en || "",
    second_title_ar: projectMainDataToEdit.second_title_ar || "",

    third_title_en: projectMainDataToEdit.third_title_en || "",
    third_title_ar: projectMainDataToEdit.third_title_ar || "",

    overview_description_en:
      projectMainDataToEdit.overview_description_en || "",
    overview_description_ar:
      projectMainDataToEdit.overview_description_ar || "",

    nav_title_en: projectMainDataToEdit.nav_title_en || "",
    nav_title_ar: projectMainDataToEdit.nav_title_ar || "",
    slug_en: projectMainDataToEdit.slug_en || "",
  };
}
