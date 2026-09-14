import type { TFunction } from "i18next";
import { z } from "zod";

export const BLOG_SOURCE_TYPES = {
  CUSTOM: "custom",
  BLOG: "blog",
} as const;

export type BlogSourceType =
  (typeof BLOG_SOURCE_TYPES)[keyof typeof BLOG_SOURCE_TYPES];

// The "pick an existing blog" branch of a discriminated union — merge this
// with `z.object({ source: z.literal(BLOG_SOURCE_TYPES.BLOG) })` plus any
// fields that stay present regardless of source in the consuming schema
// (e.g. "applied at").
export const createBlogModeSchema = (t: TFunction) =>
  z.object({
    source: z.literal(BLOG_SOURCE_TYPES.BLOG),
    blog_id: z.number({ message: t("blogPicker.blog_required") }),
  });

export type BlogModeFormValues = z.infer<ReturnType<typeof createBlogModeSchema>>;
