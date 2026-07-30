import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { LOGOS_INITIAL_STATE } from "@/shared/components/logosFields/getLogosFieldsDefaultValues";
import type { ProjectsFormValues } from "./mainProjectsFormSchema";
import type { ProjectsMainDataProps } from "../../types";

export const PROJECTS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  overview_description_en: "",
  overview_description_ar: "",
  logos_section: { ...LOGOS_INITIAL_STATE },
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

    logos_section: projectMainDataToEdit.logos_section,
  };
}
