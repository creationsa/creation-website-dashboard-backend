import { emailField } from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createProfileSchema = (t: TFunction) =>
  z.object({
    full_name: z.string().min(1, t("errors.fieldRequired")),
    email: emailField(t),
    phone_code: z.string().min(1, t("errors.fieldRequired")),
    phone: z.string().min(1, t("errors.fieldRequired")),
    gender: z.enum(["male", "female"] as const, {
      error: t("errors.fieldRequired"),
    }),
  });

export type ProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;
