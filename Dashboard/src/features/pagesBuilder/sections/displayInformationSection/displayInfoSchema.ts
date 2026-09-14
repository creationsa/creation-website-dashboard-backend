import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  PROJECT_SOURCE_TYPES,
  createProjectModeSchema,
} from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import {
  SOLUTION_SOURCE_TYPES,
  createSolutionModeSchema,
} from "@/shared/components/solutionPickerField/solutionPickerFieldSchema";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_SHORT_TEXT_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_SHORT_TEXT_LENGTH,
  MIN_TITLE_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export type RightCardPrefix = "first_right" | "second_right";

const createCustomCardSchema = (t: TFunction, prefix: RightCardPrefix) =>
  z.object({
    [`${prefix}_source`]: z.literal(PROJECT_SOURCE_TYPES.CUSTOM),
    [`${prefix}_media`]: createMediaSchema(t),
    [`${prefix}_card_title_en`]: englishField(
      t,
      MIN_TITLE_LENGTH,
      MAX_TITLE_LENGTH,
    ),
    [`${prefix}_card_title_ar`]: normalField(
      t,
      MIN_TITLE_LENGTH,
      MAX_TITLE_LENGTH,
    ),
    [`${prefix}_slug`]: englishField(
      t,
      MIN_SHORT_TEXT_LENGTH,
      MAX_SHORT_TEXT_LENGTH,
    ),
  });

const createProjectCardSchema = (t: TFunction, prefix: RightCardPrefix) => {
  const projectMode = createProjectModeSchema(t);

  return z.object({
    [`${prefix}_source`]: projectMode.shape.source,
    [`${prefix}_project_id`]: projectMode.shape.project_id,
    [`${prefix}_project_media_field`]: projectMode.shape.project_media_field,
  });
};

const createRightCardSchema = (t: TFunction, prefix: RightCardPrefix) =>
  z.discriminatedUnion(`${prefix}_source`, [
    createCustomCardSchema(t, prefix),
    createProjectCardSchema(t, prefix),
  ]);

const createCustomLeftSideSchema = (t: TFunction) =>
  z.object({
    left_source: z.literal(SOLUTION_SOURCE_TYPES.CUSTOM),
    left_title_en: englishField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    left_title_ar: normalField(t, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH),
    left_desc_en: englishField(t, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH),
    left_desc_ar: normalField(t, MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH),
    left_btn_slug: englishField(t, MIN_SHORT_TEXT_LENGTH, MAX_SHORT_TEXT_LENGTH),
  });

const createSolutionLeftSideSchema = (t: TFunction) => {
  const solutionMode = createSolutionModeSchema(t);

  return z.object({
    left_source: solutionMode.shape.source,
    left_solution_id: solutionMode.shape.solution_id,
  });
};

const createLeftSideSchema = (t: TFunction) =>
  z
    .object({
      left_btn_en: englishField(t, 10, 70),
      left_btn_ar: normalField(t, 10, 70),
    })
    .and(
      z.discriminatedUnion("left_source", [
        createCustomLeftSideSchema(t),
        createSolutionLeftSideSchema(t),
      ]),
    );

export const createDisplayInfoSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseDisplayInfoSchema = z.object({
    blocks: z.array(
      z
        .object({
          first_right_card_desc_en: englishField(
            t,
            MIN_DESCRIPTION_LENGTH,
            MAX_DESCRIPTION_LENGTH,
          ),
          first_right_card_desc_ar: normalField(
            t,
            MIN_DESCRIPTION_LENGTH,
            MAX_DESCRIPTION_LENGTH,
          ),

          second_right_card_desc_en: englishField(
            t,
            MIN_DESCRIPTION_LENGTH,
            MAX_DESCRIPTION_LENGTH,
          ),
          second_right_card_desc_ar: normalField(
            t,
            MIN_DESCRIPTION_LENGTH,
            MAX_DESCRIPTION_LENGTH,
          ),
        })
        .and(createLeftSideSchema(t))
        .and(createRightCardSchema(t, "first_right"))
        .and(createRightCardSchema(t, "second_right"))
        .superRefine((values, ctx) => {
          if (
            values.first_right_source === PROJECT_SOURCE_TYPES.PROJECT &&
            values.second_right_source === PROJECT_SOURCE_TYPES.PROJECT &&
            values.first_right_project_id === values.second_right_project_id
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["second_right_project_id"],
              message: t("pages.display_info_section.duplicate_project"),
            });
          }
        }),
    ),
  });

  return headerSchema.merge(baseDisplayInfoSchema);
};

export type DisplayInfoFormValues = z.infer<
  ReturnType<typeof createDisplayInfoSchema>
>;
