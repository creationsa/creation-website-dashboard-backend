import type { SeoSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function SeoDescriptionsSection({ form, disabled }: SeoSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("seo.description")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
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

export default memo(SeoDescriptionsSection);
