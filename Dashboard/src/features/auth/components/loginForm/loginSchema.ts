import { emailField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createLoginSchema = (t: TFunction) =>
  z.object({
    email: emailField(t),
    password: z.string().min(1, t("errors.fieldRequired")),
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
