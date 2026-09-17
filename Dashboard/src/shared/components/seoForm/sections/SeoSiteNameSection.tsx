import type { SeoSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { memo } from "react";
import { useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";

function SeoSiteNameSection({ form, disabled }: SeoSectionProps) {
  const { t } = useTranslation();
  const { register, control } = form;
  const { errors } = useFormState({
    control,
    name: ["site_name_en", "site_name_ar"],
  });

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
