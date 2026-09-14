import type { TFunction } from "i18next";
import { z } from "zod";

export const PROJECT_SOURCE_TYPES = {
  CUSTOM: "custom",
  PROJECT: "project",
} as const;

export type ProjectSourceType =
  (typeof PROJECT_SOURCE_TYPES)[keyof typeof PROJECT_SOURCE_TYPES];

// The "pick an existing project" branch of a discriminated union — merge
// this with `z.object({ source: z.literal(PROJECT_SOURCE_TYPES.PROJECT) })`
// plus any fields that stay present regardless of source (e.g. a
// description) in the consuming schema.
export const createProjectModeSchema = (t: TFunction) =>
  z.object({
    source: z.literal(PROJECT_SOURCE_TYPES.PROJECT),
    project_id: z.number({ message: t("projectPicker.project_required") }),
    project_media_field: z.string().nullable(),
  });

export type ProjectModeFormValues = z.infer<
  ReturnType<typeof createProjectModeSchema>
>;
