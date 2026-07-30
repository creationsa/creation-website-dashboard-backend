import type { TFunction } from "i18next";
import { z } from "zod";
import { ARABIC_REGEX, ENGLISH_REGEX } from "../constants/constants";

export const normalField = (t: TFunction, min = 3, max = 100) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }));

export const arabicField = (t: TFunction, min = 3, max = 100) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }))
    .refine((val) => ARABIC_REGEX.test(val), {
      message: t("errors.OnlyArabicCharactersAreAllowed"),
    });

export const englishField = (t: TFunction, min = 3, max = 100) =>
  z
    .string()
    .trim()
    .min(1, t("errors.fieldRequired"))
    .min(min, t("errors.minLength", { count: min }))
    .max(max, t("errors.maxLength", { count: max }))
    .refine((val) => ENGLISH_REGEX.test(val), {
      message: t("errors.OnlyEnglishCharactersAreAllowed"),
    });

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

export const emailField = (t: TFunction) =>
  z
    .string()
    .min(1, t("errors.fieldRequired"))
    .email(t("errors.InvalidEmailFormat"));
