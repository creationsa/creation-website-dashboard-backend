import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SeoSectionProps } from "./types";
import type { FieldValues, Path } from "react-hook-form";
import type { SeoSectionFormValues } from "./SeoSectionSchema";

export default function SeoSection<
  T extends FieldValues & SeoSectionFormValues,
>({ form, disabled }: SeoSectionProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  const { t } = useTranslation();

  const SeoEnError = errors?.seo_desc_en?.message as string | undefined;
  const SeoArError = errors?.seo_desc_ar?.message as string | undefined;

  return (
    <Box
      title={t("blogs.seo")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <TextArea
        name="seo_desc_en"
        label={t("general.desc_en")}
        error={SeoEnError}
        register={register("seo_desc_en" as Path<T>)}
        rows={5}
        disabled={disabled}
      />
      <TextArea
        name="seo_desc_ar"
        label={t("general.desc_ar")}
        error={SeoArError}
        register={register("seo_desc_ar" as Path<T>)}
        rows={5}
        disabled={disabled}
      />
    </Box>
  );
}
