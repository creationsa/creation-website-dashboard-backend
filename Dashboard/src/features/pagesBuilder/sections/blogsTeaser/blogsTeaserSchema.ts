import {
  BLOG_SOURCE_TYPES,
  createBlogModeSchema,
} from "@/shared/components/blogPickerField/blogPickerFieldSchema";
import { createHeaderSchema } from "@/shared/components/headerFields/headerSchema";
import { createMediaSchema } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import {
  MAX_LONG_TITLE_LENGTH,
  MAX_SHORT_TITLE_LENGTH,
  MAX_SLUG_LENGTH,
  MIN_LONG_TITLE_LENGTH,
  MIN_SHORT_TITLE_LENGTH,
  MIN_SLUG_LENGTH,
} from "@/shared/constants/constants";
import { englishField, normalField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

// `applied_at` is intentionally NOT part of this schema — the backend
// stamps it on its own the moment an item is first created and keeps it
// unchanged on every resave afterwards (matched via `id`, see below). The
// dashboard never reads or writes it.
//
// `id` is an opaque, backend-assigned identifier the dashboard just
// carries through untouched: the very first save of a brand-new item
// omits it, the backend assigns one at that point, and every later save
// echoes it back so the backend can tell "this item already existed"
// from "this is new" — the only way to do that given `sections` is a
// single generic JSON blob with no per-item table of its own.
const createCustomTeaserItemSchema = (t: TFunction) =>
  z.object({
    id: z.string().optional(),
    source: z.literal(BLOG_SOURCE_TYPES.CUSTOM),
    feature_media: createMediaSchema(t),
    item_title_en: englishField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
    item_title_ar: normalField(t, MIN_LONG_TITLE_LENGTH, MAX_LONG_TITLE_LENGTH),
    item_slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),
  });

const createBlogTeaserItemSchema = (t: TFunction) => {
  const blogMode = createBlogModeSchema(t);

  return z.object({
    id: z.string().optional(),
    source: blogMode.shape.source,
    blog_id: blogMode.shape.blog_id,
  });
};

// Each teaser item is either entered manually (image/title/slug) or linked
// to an existing blog post — same pattern as Featured Works' project
// picker (see dynamicFeaturedItemsFieldsSchema.ts).
export const createBlogsTeaserItemSchema = (t: TFunction) =>
  z.discriminatedUnion("source", [
    createCustomTeaserItemSchema(t),
    createBlogTeaserItemSchema(t),
  ]);

export const createBlogsTeaserSchema = (t: TFunction) => {
  const headerSchema = createHeaderSchema(t);

  const baseSchema = z.object({
    button_title_en: englishField(
      t,
      MIN_SHORT_TITLE_LENGTH,
      MAX_SHORT_TITLE_LENGTH,
    ),
    button_title_ar: normalField(
      t,
      MIN_SHORT_TITLE_LENGTH,
      MAX_SHORT_TITLE_LENGTH,
    ),
    button_slug_en: englishField(t, MIN_SLUG_LENGTH, MAX_SLUG_LENGTH),

    items: z.array(createBlogsTeaserItemSchema(t)).min(1),
  });

  return headerSchema.merge(baseSchema);
};

export type BlogsTeaserItemFormValues = z.infer<
  ReturnType<typeof createBlogsTeaserItemSchema>
>;

export type BlogsTeaserFormValues = z.infer<
  ReturnType<typeof createBlogsTeaserSchema>
>;
