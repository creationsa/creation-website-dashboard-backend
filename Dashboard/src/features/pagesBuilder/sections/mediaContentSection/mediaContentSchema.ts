import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const MEDIA_CONTENT_TYPES = {
  DESCRIPTION: "description",
  ACCORDION: "accordion",
  LIST: "list",
} as const;

export type MediaLayoutType =
  (typeof MEDIA_CONTENT_TYPES)[keyof typeof MEDIA_CONTENT_TYPES];

const createDescriptionVariant = (t: TFunction) =>
  z.object({
    content_type: z.literal(MEDIA_CONTENT_TYPES.DESCRIPTION),
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

const createAccordionVariant = (t: TFunction) =>
  z.object({
    content_type: z.literal(MEDIA_CONTENT_TYPES.ACCORDION),
    accordion_items: z
      .array(
        z.object({
          title_en: englishField(t, 3, 150),
          title_ar: normalField(t, 3, 150),
          content_en: englishField(t, 3, 1000),
          content_ar: normalField(t, 3, 1000),
        }),
      )
      .min(1, t("errors.fieldRequired")),
  });

const createListVariant = (t: TFunction) =>
  z.object({
    content_type: z.literal(MEDIA_CONTENT_TYPES.LIST),
    list_items: z
      .array(
        z.object({
          text_en: englishField(t, 2, 250),
          text_ar: normalField(t, 2, 250),
        }),
      )
      .min(1, t("errors.fieldRequired")),
  });

export const createMediaContentSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const sharedFields = z.object({
    is_media_right: z.boolean(),
    media: createMediaSchema(t),
  });

  const contentVariant = z.discriminatedUnion("content_type", [
    createDescriptionVariant(t),
    createAccordionVariant(t),
    createListVariant(t),
  ]);

  return headerSchema.merge(sharedFields).and(contentVariant);
};

export type MediaContentFormValues = z.infer<
  ReturnType<typeof createMediaContentSchema>
>;

export type DescriptionVariant = z.infer<
  ReturnType<typeof createDescriptionVariant>
>;
export type AccordionVariant = z.infer<
  ReturnType<typeof createAccordionVariant>
>;
export type ListVariant = z.infer<ReturnType<typeof createListVariant>>;
