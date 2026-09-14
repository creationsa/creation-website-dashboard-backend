import type { TFunction } from "i18next";
import { z } from "zod";

export const SOLUTION_SOURCE_TYPES = {
  CUSTOM: "custom",
  SOLUTION: "solution",
} as const;

export type SolutionSourceType =
  (typeof SOLUTION_SOURCE_TYPES)[keyof typeof SOLUTION_SOURCE_TYPES];

// The "pick an existing solution" branch of a discriminated union — merge
// this with `z.object({ source: z.literal(SOLUTION_SOURCE_TYPES.SOLUTION) })`
// plus any fields that stay present regardless of source in the consuming
// schema (e.g. a button's label text).
export const createSolutionModeSchema = (t: TFunction) =>
  z.object({
    source: z.literal(SOLUTION_SOURCE_TYPES.SOLUTION),
    solution_id: z.number({ message: t("solutionPicker.solution_required") }),
  });

export type SolutionModeFormValues = z.infer<
  ReturnType<typeof createSolutionModeSchema>
>;
