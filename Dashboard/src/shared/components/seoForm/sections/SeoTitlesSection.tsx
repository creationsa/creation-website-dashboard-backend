import type { SeoSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function SeoTitlesSection({ form, disabled }: SeoSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("seo.title")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="title_en"
        label={t("general.title_en")}
        error={errors?.title_en?.message}
        register={register("title_en")}
        disabled={disabled}
      />
      <Input
        name="title_ar"
        label={t("general.title_ar")}
        error={errors?.title_ar?.message}
        register={register("title_ar")}
        disabled={disabled}
      />
    </Box>
  );
}

export default memo(SeoTitlesSection);
