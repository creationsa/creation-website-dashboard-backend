import { createDynamicFeaturedItemsSchema } from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const FEATURED_LAYOUT_TYPES = {
  FULL_WIDTH: "full_width",
  CONTAINED: "contained",
} as const;

export type FeaturedLayoutType =
  (typeof FEATURED_LAYOUT_TYPES)[keyof typeof FEATURED_LAYOUT_TYPES];

const createFullWidthVariant = () =>
  z.object({
    layout_type: z.literal(FEATURED_LAYOUT_TYPES.FULL_WIDTH),
  });

const createContainedVariant = (t: TFunction) =>
  z.object({
    layout_type: z.literal(FEATURED_LAYOUT_TYPES.CONTAINED),
    action_button_text_en: englishField(t, 2, 50),
    action_button_text_ar: normalField(t, 2, 50),
    action_button_slug: englishField(t, 2, 150),
  });

export const createFeaturedWorksSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);
  const itemsSchema = createDynamicFeaturedItemsSchema(t);

  const layoutVariant = z.discriminatedUnion("layout_type", [
    createFullWidthVariant(),
    createContainedVariant(t),
  ]);

  return headerSchema.merge(itemsSchema).and(layoutVariant);
};

export type FeaturedWorksFormValues = z.infer<
  ReturnType<typeof createFeaturedWorksSchema>
>;

export type ContainedVariant = z.infer<
  ReturnType<typeof createContainedVariant>
>;
