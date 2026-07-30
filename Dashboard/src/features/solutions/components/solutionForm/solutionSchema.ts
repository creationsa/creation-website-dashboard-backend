import { createDynamicMediaItemsSchema } from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import { createDynamicItemsSchema } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createSlugSectionSchema } from "@/shared/components/slugSection/SlugSectionSchema";
import { createTitleSectionSchema } from "@/shared/components/titleSection/titleSectionSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createExecutionSchema = (t: TFunction) =>
  z
    .array(
      z.object({
        label_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
        label_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
        value_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
        value_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
      }),
    )
    .length(5);

export const createSolutionSchema = (t: TFunction) => {
  const titleSchema = createTitleSectionSchema(t);
  const slugSchema = createSlugSectionSchema(t);
  const headerSchema = createHeaderSchema(t);
  const itemsSchema = createDynamicMediaItemsSchema(t);

  const baseSolutionSchema = z.object({
    proposition_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    proposition_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    proposition_desc_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    proposition_desc_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),

    execution_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    execution_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    execution_keys: createExecutionSchema(t),
    ticker_items: createDynamicItemsSchema(t),
  });

  return titleSchema
    .merge(baseSolutionSchema)
    .merge(slugSchema)
    .merge(headerSchema)
    .merge(itemsSchema);
};

export type SolutionFormValues = z.infer<
  ReturnType<typeof createSolutionSchema>
>;

export type ExecutionFormValues = z.infer<
  ReturnType<typeof createExecutionSchema>
>;
