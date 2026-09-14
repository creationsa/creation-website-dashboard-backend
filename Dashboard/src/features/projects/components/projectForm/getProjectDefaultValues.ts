import { DYNAMIC_ITEM_INITIAL_STATE } from "@/shared/components/dynamicItemsFields/getDynamicItemsFieldsDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";
import { TITLE_SECTION_INITIAL_STATE } from "@/shared/components/titleSection/getTitleSectionDefaultValues";
import type { SingleProject } from "../../types";
import type { ProjectFormValues } from "./projectSchema";

export const PROJECT_INITIAL_STATE: ProjectFormValues = {
  ...TITLE_SECTION_INITIAL_STATE,
  slug_en: "",

  first_cover_media: MEDIA_INITIAL_STATE,
  ...HEADER_INITIAL_STATE,
  overview_description_en: "",
  overview_description_ar: "",

  second_cover_media: MEDIA_INITIAL_STATE,
  stats_title_en: "",
  stats_title_ar: "",
  stat_one_value: "",
  stat_one_label_en: "",
  stat_one_label_ar: "",
  stat_two_value: "",
  stat_two_label_en: "",
  stat_two_label_ar: "",
  stat_three_value: "",
  stat_three_label_en: "",
  stat_three_label_ar: "",

  first_media: MEDIA_INITIAL_STATE,
  second_media: MEDIA_INITIAL_STATE,
  third_media: MEDIA_INITIAL_STATE,
  fourth_media: MEDIA_INITIAL_STATE,
  fifth_media: MEDIA_INITIAL_STATE,
  sixth_media: MEDIA_INITIAL_STATE,
  seventh_media: MEDIA_INITIAL_STATE,
  eighth_media: MEDIA_INITIAL_STATE,

  cover_media_field: "first_cover_media",
  feature_media_field: "first_cover_media",

  ticker_items: [DYNAMIC_ITEM_INITIAL_STATE],
};

export default function getProjectDefaultValues(
  projectToEdit?: SingleProject,
): ProjectFormValues {
  if (!projectToEdit) return PROJECT_INITIAL_STATE;

  return {
    title_en: projectToEdit.title_en || "",
    title_ar: projectToEdit.title_ar || "",
    slug_en: projectToEdit.slug_en || "",

    first_cover_media: projectToEdit.first_cover_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.first_cover_media }
      : MEDIA_INITIAL_STATE,
    first_title_en: projectToEdit.first_title_en || "",
    first_title_ar: projectToEdit.first_title_ar || "",
    second_title_en: projectToEdit.second_title_en || "",
    second_title_ar: projectToEdit.second_title_ar || "",
    third_title_en: projectToEdit.third_title_en || "",
    third_title_ar: projectToEdit.third_title_ar || "",
    overview_description_en: projectToEdit.overview_description_en || "",
    overview_description_ar: projectToEdit.overview_description_ar || "",
    second_cover_media: projectToEdit.second_cover_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.second_cover_media }
      : MEDIA_INITIAL_STATE,

    stats_title_en: projectToEdit.stats_title_en || "",
    stats_title_ar: projectToEdit.stats_title_ar || "",
    stat_one_value: projectToEdit.stat_one_value || "",
    stat_one_label_en: projectToEdit.stat_one_label_en || "",
    stat_one_label_ar: projectToEdit.stat_one_label_ar || "",
    stat_two_value: projectToEdit.stat_two_value || "",
    stat_two_label_en: projectToEdit.stat_two_label_en || "",
    stat_two_label_ar: projectToEdit.stat_two_label_ar || "",
    stat_three_value: projectToEdit.stat_three_value || "",
    stat_three_label_en: projectToEdit.stat_three_label_en || "",
    stat_three_label_ar: projectToEdit.stat_three_label_ar || "",

    first_media: projectToEdit.first_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.first_media }
      : MEDIA_INITIAL_STATE,
    second_media: projectToEdit.second_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.second_media }
      : MEDIA_INITIAL_STATE,
    third_media: projectToEdit.third_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.third_media }
      : MEDIA_INITIAL_STATE,
    fourth_media: projectToEdit.fourth_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.fourth_media }
      : MEDIA_INITIAL_STATE,
    fifth_media: projectToEdit.fifth_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.fifth_media }
      : MEDIA_INITIAL_STATE,
    sixth_media: projectToEdit.sixth_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.sixth_media }
      : MEDIA_INITIAL_STATE,
    seventh_media: projectToEdit.seventh_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.seventh_media }
      : MEDIA_INITIAL_STATE,
    eighth_media: projectToEdit.eighth_media
      ? { ...MEDIA_INITIAL_STATE, ...projectToEdit.eighth_media }
      : MEDIA_INITIAL_STATE,

    cover_media_field: projectToEdit.cover_media_field ?? "first_cover_media",
    feature_media_field:
      projectToEdit.feature_media_field ?? "first_cover_media",

    ticker_items: projectToEdit.ticker_items?.length
      ? projectToEdit.ticker_items
      : [DYNAMIC_ITEM_INITIAL_STATE],
  };
}
