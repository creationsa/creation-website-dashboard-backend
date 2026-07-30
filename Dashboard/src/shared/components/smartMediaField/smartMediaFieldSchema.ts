import {
  englishField,
  imageField,
  normalField,
} from "@/shared/utils/errorsHelpers";
import type { TFunction } from "i18next";
import { z } from "zod";

export const createMediaSchema = (t: TFunction) =>
  z
    .object({
      type: z.enum(["image", "video"]),
      file: imageField(t),
      alt_en: z.string().optional(),
      alt_ar: z.string().optional(),
      poster: z.any().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === "image") {
        const altEn = englishField(t, 3, 100).safeParse(data.alt_en);
        const altAr = normalField(t, 3, 100).safeParse(data.alt_ar);

        if (!altEn.success) {
          ctx.addIssue({
            code: "custom",
            path: ["alt_en"],
            message: altEn.error.issues[0].message,
          });
        }

        if (!altAr.success) {
          ctx.addIssue({
            code: "custom",
            path: ["alt_ar"],
            message: altAr.error.issues[0].message,
          });
        }
      }

      if (data.type === "video" && !data.poster) {
        ctx.addIssue({
          code: "custom",
          path: ["poster"],
          message: t("validation.required"),
        });
      }
    });

export type MediaFieldValues = z.infer<ReturnType<typeof createMediaSchema>>;
