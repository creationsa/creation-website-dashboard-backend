import { z } from "zod";

export const createMenuItemSchema = () =>
  z.object({
    type: z.enum(["page", "solutions", "projects", "blogs"]),
    page_id: z.number().nullable(),
  });

export const createMenuItemsFieldSchema = () =>
  z.object({
    menu_items: z.array(createMenuItemSchema()),
  });

export type MenuItemFormValues = z.infer<ReturnType<typeof createMenuItemSchema>>;
export type MenuItemsFieldFormValues = z.infer<
  ReturnType<typeof createMenuItemsFieldSchema>
>;
