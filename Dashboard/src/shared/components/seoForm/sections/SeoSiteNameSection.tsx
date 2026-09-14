import type { SeoSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function SeoSiteNameSection({ form, disabled }: SeoSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("seo.site_name")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="site_name_en"
        label={t("seo.site_name_en")}
        error={errors?.site_name_en?.message}
        register={register("site_name_en")}
        disabled={disabled}
      />
      <Input
        name="site_name_ar"
        label={t("seo.site_name_ar")}
        error={errors?.site_name_ar?.message}
        register={register("site_name_ar")}
        disabled={disabled}
      />
    </Box>
  );
}

export default memo(SeoSiteNameSection);
