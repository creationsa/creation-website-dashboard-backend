import { createAccordionSchema } from "@/shared/components/dynamicAccordionFields/accordionSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_BUTTON_TEXT_LENGTH,
  MAX_SHORT_TEXT_LENGTH,
  MIN_BUTTON_TEXT_LENGTH,
  MIN_SHORT_TEXT_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const CUSTOM_ACCORDION_TYPES = {
  WITH_BUTTON: "with_button",
  HEADING_ONLY: "heading_only",
  WITH_MEDIA: "with_media",
} as const;

export type CustomAccordionType =
  (typeof CUSTOM_ACCORDION_TYPES)[keyof typeof CUSTOM_ACCORDION_TYPES];

const createWithButtonVariant = (t: TFunction) =>
  z.object({
    layout_type: z.literal(CUSTOM_ACCORDION_TYPES.WITH_BUTTON),
    action_button_text_en: englishField(
      t,
      MIN_BUTTON_TEXT_LENGTH,
      MAX_BUTTON_TEXT_LENGTH,
    ),
    action_button_text_ar: normalField(
      t,
      MIN_BUTTON_TEXT_LENGTH,
      MAX_BUTTON_TEXT_LENGTH,
    ),
    action_button_slug: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ),
  });

const createHeadingOnlyVariant = () =>
  z.object({
    layout_type: z.literal(CUSTOM_ACCORDION_TYPES.HEADING_ONLY),
  });

const createWithMediaVariant = (t: TFunction) =>
  z.object({
    layout_type: z.literal(CUSTOM_ACCORDION_TYPES.WITH_MEDIA),
    banner_media: createMediaSchema(t),
    side_label_en: englishField(t, MIN_BUTTON_TEXT_LENGTH, MAX_BUTTON_TEXT_LENGTH),
    side_label_ar: normalField(t, MIN_BUTTON_TEXT_LENGTH, MAX_BUTTON_TEXT_LENGTH),
  });

export const createCustomAccordionSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const accordion = createAccordionSchema(t);

  const layoutVariant = z.discriminatedUnion("layout_type", [
    createWithButtonVariant(t),
    createHeadingOnlyVariant(),
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
export type HeadingOnlyVariant = z.infer<
  ReturnType<typeof createHeadingOnlyVariant>
>;
export type WithMediaVariant = z.infer<
  ReturnType<typeof createWithMediaVariant>
>;
