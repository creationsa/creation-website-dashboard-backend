export const ACCORDION_CONTENT_BLOCK_INITIAL_STATE = {
  subtitle_en: "",
  subtitle_ar: "",
  description_en: "",
  description_ar: "",
};

export const ACCORDION_ITEM_INITIAL_STATE = {
  title_en: "",
  title_ar: "",
  content_blocks: [ACCORDION_CONTENT_BLOCK_INITIAL_STATE],
};

export const ACCORDION_ITEMS_INITIAL_STATE = {
  accordion_items: [ACCORDION_ITEM_INITIAL_STATE],
};
