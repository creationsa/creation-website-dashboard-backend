import {
  PROJECT_SOURCE_TYPES,
  createProjectModeSchema,
} from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_LONG_TITLE_LENGTH,
  MIN_LONG_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

const createCustomFeaturedItemSchema = (t: TFunction) =>
  z.object({
    source: z.literal(PROJECT_SOURCE_TYPES.CUSTOM),
    feature_media: createMediaSchema(t),
    item_title_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
    item_title_ar: normalField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
    item_slug_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
  });

const createProjectFeaturedItemSchema = (t: TFunction) => {
  const projectMode = createProjectModeSchema(t);

  return z.object({
    source: projectMode.shape.source,
    project_id: projectMode.shape.project_id,
    project_media_field: projectMode.shape.project_media_field,
  });
};

// Featured Works items can either be entered manually (image/title/slug) or
// linked to an existing project — see `RightCardForm`'s sibling design in
// the Display Info section for the same pattern.
export const createFeaturedItemSchema = (t: TFunction) =>
  z.discriminatedUnion("source", [
    createCustomFeaturedItemSchema(t),
    createProjectFeaturedItemSchema(t),
  ]);

export const createMediaOnlyItemSchema = (t: TFunction) =>
  z.object({
    feature_media: createMediaSchema(t),
  });

const createCustomMediaOnlyItemSchema = (t: TFunction) =>
  z.object({
    source: z.literal(PROJECT_SOURCE_TYPES.CUSTOM),
    feature_media: createMediaSchema(t),
  });

// Same custom/project choice as Featured Works, minus the title/slug —
// used where an item is purely a gallery photo (e.g. a solution's own
// items), not a titled/linked card.
export const createMediaOnlyFeaturedItemSchema = (t: TFunction) =>
  z.discriminatedUnion("source", [
    createCustomMediaOnlyItemSchema(t),
    createProjectFeaturedItemSchema(t),
  ]);

// Shared by both item flavors above: a project can only be picked once
// across the whole array.
function withProjectDuplicateCheck<
  T extends { source: string; project_id?: number | null },
>(schema: z.ZodType<T>, t: TFunction) {
  return z.array(schema).superRefine((items, ctx) => {
    const seenAt = new Map<number, number>();

    items.forEach((item, index) => {
      if (item.source !== PROJECT_SOURCE_TYPES.PROJECT || !item.project_id) {
        return;
      }

      if (seenAt.has(item.project_id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [index, "project_id"],
          message: t("pages.featured_works.duplicate_project"),
        });
      } else {
        seenAt.set(item.project_id, index);
      }
    });
  });
}

export const createDynamicFeaturedItemsSchema = (t: TFunction) =>
  z.object({
    items: withProjectDuplicateCheck(createFeaturedItemSchema(t), t),
  });

export const createDynamicMediaItemsSchema = (t: TFunction) =>
  z.object({
    items: withProjectDuplicateCheck(createMediaOnlyFeaturedItemSchema(t), t),
  });

export type FeaturedItem = z.infer<ReturnType<typeof createFeaturedItemSchema>>;

export type FeaturedMedia = z.infer<
  ReturnType<typeof createMediaOnlyItemSchema>
>;

export type MediaOnlyFeaturedItem = z.infer<
  ReturnType<typeof createMediaOnlyFeaturedItemSchema>
>;

export type DynamicFeaturedItemsFormValues = z.infer<
  ReturnType<typeof createDynamicFeaturedItemsSchema>
>;

export type DynamicMediaItemsFormValues = z.infer<
  ReturnType<typeof createDynamicMediaItemsSchema>
>;
