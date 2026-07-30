import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createFeaturedItemSchema = (t: TFunction) =>
  z.object({
    feature_media: createMediaSchema(t),
    item_title_en: englishField(t, 3, 150),
    item_title_ar: normalField(t, 3, 150),
    item_slug_en: englishField(t, 3, 150),
  });

export const createMediaOnlyItemSchema = (t: TFunction) =>
  z.object({
    feature_media: createMediaSchema(t),
  });

export const createDynamicFeaturedItemsSchema = (t: TFunction) =>
  z.object({
    items: z.array(createFeaturedItemSchema(t)),
  });

export const createDynamicMediaItemsSchema = (t: TFunction) =>
  z.object({
    items: z.array(createMediaOnlyItemSchema(t)),
  });

export type FeaturedItem = z.infer<ReturnType<typeof createFeaturedItemSchema>>;

export type FeaturedMedia = z.infer<
  ReturnType<typeof createMediaOnlyItemSchema>
>;

export type DynamicFeaturedItemsFormValues = z.infer<
  ReturnType<typeof createDynamicFeaturedItemsSchema>
>;

export type DynamicMediaItemsFormValues = z.infer<
  ReturnType<typeof createDynamicMediaItemsSchema>
>;
