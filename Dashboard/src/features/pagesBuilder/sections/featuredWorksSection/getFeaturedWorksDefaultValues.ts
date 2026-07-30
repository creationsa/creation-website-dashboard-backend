import { ITEMS_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import { HEADER_INITIAL_STATE } from "@/shared/components/headerFields/getHeaderDefaultValues";
import { FEATURED_LAYOUT_TYPES } from "./featuredWorksSchema";

export const FEATURED_WORKS_INITIAL_STATE = {
  ...HEADER_INITIAL_STATE,
  layout_type: FEATURED_LAYOUT_TYPES.CONTAINED,
  items: [ITEMS_INITIAL_STATE],
};
