import { MEDIA_INITIAL_STATE } from "../smartMediaField/smartMediaDefaultValues";

export const ITEMS_INITIAL_STATE = {
  feature_media: { ...MEDIA_INITIAL_STATE },
  item_title_en: "",
  item_title_ar: "",
  item_slug_en: "",
};

export const MEDIA_ONLY_ITEM_INITIAL_STATE = {
  feature_media: { ...MEDIA_INITIAL_STATE },
};
