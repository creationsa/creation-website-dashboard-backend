import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../../types";

export default function SeoSection({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  return (
    <Box title={t("blogs.seo")} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <TextArea
        name="seo_desc_en"
        label={t("general.desc_en")}
        error={errors?.seo_desc_en?.message}
        register={register("seo_desc_en")}
        rows={5}
        disabled={disabled}
      />
      <TextArea
        name="seo_desc_ar"
        label={t("general.desc_ar")}
        error={errors?.seo_desc_ar?.message}
        register={register("seo_desc_ar")}
        rows={5}
        disabled={disabled}
      />
    </Box>
  );
}
