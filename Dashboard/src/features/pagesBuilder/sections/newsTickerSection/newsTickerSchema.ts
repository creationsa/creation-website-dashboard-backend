import { createDynamicItemsSchema } from "@/shared/components/dynamicItemsFields/dynamicItemsFieldsSchema";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createNewsTickerSchema = (t: TFunction) => {
  return z.object({
    has_border: z.boolean(),
    has_container: z.boolean(),
    items: createDynamicItemsSchema(t),
  });
};

export type NewsTickerFormValues = z.infer<
  ReturnType<typeof createNewsTickerSchema>
>;
