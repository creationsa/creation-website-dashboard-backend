import { createAccordionSchema } from "@/shared/components/dynamicAccordionFields/accordionSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const CUSTOM_ACCORDION_TYPES = {
  WITH_BUTTON: "with_button",
  WITH_MEDIA: "with_media",
} as const;

export type CustomAccordionType =
  (typeof CUSTOM_ACCORDION_TYPES)[keyof typeof CUSTOM_ACCORDION_TYPES];

const createWithButtonVariant = (t: TFunction) =>
  z.object({
    layout_type: z.literal(CUSTOM_ACCORDION_TYPES.WITH_BUTTON),
    action_button_text_en: englishField(t, 2, 50),
    action_button_text_ar: normalField(t, 2, 50),
    action_button_slug: englishField(t, 2, 150),
  });

const createWithMediaVariant = (t: TFunction) =>
  z.object({
    layout_type: z.literal(CUSTOM_ACCORDION_TYPES.WITH_MEDIA),
    banner_media: createMediaSchema(t),
  });

export const createCustomAccordionSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const accordion = createAccordionSchema(t);

  const layoutVariant = z.discriminatedUnion("layout_type", [
    createWithButtonVariant(t),
    createWithMediaVariant(t),
  ]);

  return headerSchema.merge(accordion).and(layoutVariant);
};

export type CustomAccordionFormValues = z.infer<
  ReturnType<typeof createCustomAccordionSchema>
>;

export type WithButtonVariant = z.infer<
  ReturnType<typeof createWithButtonVariant>
>;
export type WithMediaVariant = z.infer<
  ReturnType<typeof createWithMediaVariant>
>;
