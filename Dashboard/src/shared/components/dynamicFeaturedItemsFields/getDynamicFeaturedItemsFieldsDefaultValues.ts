import { PROJECT_SOURCE_TYPES } from "../projectPickerField/projectPickerFieldSchema";
import { MEDIA_INITIAL_STATE } from "../smartMediaField/smartMediaDefaultValues";

export const ITEMS_INITIAL_STATE = {
  source: PROJECT_SOURCE_TYPES.CUSTOM,
  feature_media: { ...MEDIA_INITIAL_STATE },
  item_title_en: "",
  item_title_ar: "",
  item_slug_en: "",
  project_id: null,
  project_media_field: null,
};

export const MEDIA_ONLY_ITEM_INITIAL_STATE = {
  source: PROJECT_SOURCE_TYPES.CUSTOM,
  feature_media: { ...MEDIA_INITIAL_STATE },
  project_id: null,
  project_media_field: null,
};
