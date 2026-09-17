import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import {
  MAX_BUTTON_TEXT_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_BUTTON_TEXT_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import {
  englishField,
  normalField,
  optionalEnglishField,
  optionalNormalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const TEXT_BLOCK_TYPES = {
  DESCRIPTION: "description",
  LIST: "list",
} as const;

export type TextBlockType =
  (typeof TEXT_BLOCK_TYPES)[keyof typeof TEXT_BLOCK_TYPES];

const createPointSchema = (t: TFunction) =>
  z.object({
    label_en: optionalEnglishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    label_ar: optionalNormalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    description_en: englishField(t, 2, 300),
    description_ar: normalField(t, 2, 300),
  });

const createDescriptionBlockSchema = (t: TFunction) =>
  z.object({
    block_type: z.literal(TEXT_BLOCK_TYPES.DESCRIPTION),
    description_en: englishField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
    description_ar: normalField(
      t,
      MIN_DESCRIPTION_LENGTH,
      MAX_DESCRIPTION_LENGTH,
    ),
  });

const createListBlockSchema = (t: TFunction) =>
  z.object({
    block_type: z.literal(TEXT_BLOCK_TYPES.LIST),
    points: z.array(createPointSchema(t)).min(1),
  });

// A single item's body is a free-form, orderable sequence of blocks — the
// admin can add as many description/list blocks, in any mix, as they want.
const createTextBlockSchema = (t: TFunction) =>
  z.discriminatedUnion("block_type", [
    createDescriptionBlockSchema(t),
    createListBlockSchema(t),
  ]);

const createTextItemSchema = (t: TFunction) =>
  z.object({
    header_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    header_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    blocks: z.array(createTextBlockSchema(t)).min(1),
  });

export const createTextListSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseSchema = z.object({
    has_sticky_sidebar: z.boolean(),
    sections_label_en: z.string(),
    sections_label_ar: z.string(),
    sticky_description_en: z.string(),
    sticky_description_ar: z.string(),
    items: z.array(createTextItemSchema(t)).min(1),
  });

  return headerSchema.merge(baseSchema).superRefine((data, ctx) => {
    if (!data.has_sticky_sidebar) return;

    const labelEn = englishField(
      t,
      MIN_BUTTON_TEXT_LENGTH,
      MAX_BUTTON_TEXT_LENGTH,
    ).safeParse(data.sections_label_en);
    const labelAr = normalField(
      t,
      MIN_BUTTON_TEXT_LENGTH,
      MAX_BUTTON_TEXT_LENGTH,
    ).safeParse(data.sections_label_ar);

    if (!labelEn.success) {
      ctx.addIssue({
        code: "custom",
        path: ["sections_label_en"],
        message: labelEn.error.issues[0].message,
      });
    }

    if (!labelAr.success) {
      ctx.addIssue({
        code: "custom",
        path: ["sections_label_ar"],
        message: labelAr.error.issues[0].message,
      });
    }

    if (data.sticky_description_en) {
      const descriptionEn = englishField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ).safeParse(data.sticky_description_en);

      if (!descriptionEn.success) {
        ctx.addIssue({
          code: "custom",
          path: ["sticky_description_en"],
          message: descriptionEn.error.issues[0].message,
        });
      }
    }

    if (data.sticky_description_ar) {
      const descriptionAr = normalField(
        t,
        MIN_DESCRIPTION_LENGTH,
        MAX_DESCRIPTION_LENGTH,
      ).safeParse(data.sticky_description_ar);

      if (!descriptionAr.success) {
        ctx.addIssue({
          code: "custom",
          path: ["sticky_description_ar"],
          message: descriptionAr.error.issues[0].message,
        });
      }
    }
  });
};

export type TextListFormValues = z.infer<
  ReturnType<typeof createTextListSchema>
>;
export type TextItemFormValues = z.infer<
  ReturnType<typeof createTextItemSchema>
>;
export type TextBlockFormValues = z.infer<
  ReturnType<typeof createTextBlockSchema>
>;
