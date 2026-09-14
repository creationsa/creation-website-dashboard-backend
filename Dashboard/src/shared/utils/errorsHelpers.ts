import type { TFunction } from "i18next";
import { z } from "zod";
import {
  ARABIC_REGEX,
  ENGLISH_REGEX,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
} from "../constants/constants";

/*
 * accept any type of data
 */
export const normalField = (
  t: TFunction,
  min = MIN_TITLE_LENGTH,
  max = MAX_TITLE_LENGTH,
) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }));

/*
 * accept arabic characters only
 */

export const arabicField = (
  t: TFunction,
  min = MIN_TITLE_LENGTH,
  max = MAX_TITLE_LENGTH,
) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }))
    .refine((val) => ARABIC_REGEX.test(val), {
      message: t("errors.OnlyArabicCharactersAreAllowed"),
    });

/*
 * accept english characters only
 */
export const englishField = (
  t: TFunction,
  min = MIN_TITLE_LENGTH,
  max = MAX_TITLE_LENGTH,
) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }))
    .refine((val) => ENGLISH_REGEX.test(val), {
      message: t("errors.OnlyEnglishCharactersAreAllowed"),
    });

/*
 * accept image file or a string (url) and validate that the string is not empty if it's a string
 */
export const imageField = (t: TFunction) =>
  z
    .union([z.instanceof(File), z.string()])
    .refine(
      (value) =>
        value instanceof File ||
        (typeof value === "string" && value.trim().length > 0),
      {
        message: t("errors.fieldRequired"),
      },
    );

/*
 * accept image file or a string (url) and validate that the string is not empty if it's a string and that the file is an svg file
 */
export const svgImageField = (t: TFunction) =>
  imageField(t).refine(
    (value) => {
      const name = value instanceof File ? value.name : value;
      return name.toLowerCase().endsWith(".svg");
    },
    { message: t("errors.svgFileRequired") },
  );

/*
 * accept email and validate that it's a valid email format
 */
export const emailField = (t: TFunction) =>
  z
    .string()
    .min(1, t("errors.fieldRequired"))
    .email(t("errors.InvalidEmailFormat"));
