import { createMenuItemsFieldSchema } from "@/shared/components/menuItemsField/menuItemsFieldSchema";
import { z } from "zod";

export const createHeaderSchema = () =>
  z
    .object({
      show_language_switch: z.boolean(),
      show_theme_switch: z.boolean(),
    })
    .merge(createMenuItemsFieldSchema());

export type HeaderFormValues = z.infer<ReturnType<typeof createHeaderSchema>>;
