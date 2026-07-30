import { createAccordionSchema } from "@/shared/components/dynamicAccordionFields/accordionSchema";
import { createDynamicFeaturedItemsSchema } from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import { createDynamicItemsSchema } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createSolutionsSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);
  const itemsSchema = createDynamicFeaturedItemsSchema(t);
  const accordionSchema = createAccordionSchema(t);

  const baseSolutionsSchema = z.object({
    core_desc_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    core_desc_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    items_header: createHeaderSchema(t),
    ticker_items: createDynamicItemsSchema(t),

    accordion_items_header: createHeaderSchema(t),
    accordion_media: createMediaSchema(t),
  });

  return headerSchema
    .merge(baseSolutionsSchema)
    .merge(itemsSchema)
    .merge(accordionSchema);
};

export type SolutionsFormValues = z.infer<
  ReturnType<typeof createSolutionsSchema>
>;
