import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import type { PageMetaFieldsProps } from "../../types";
import Box from "@/shared/ui/Box";

export default function PageMetaFields({
  form,
  disabled = false,
}: PageMetaFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("pages.new_dynamic_page")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="page_title_en"
        label={t("pages.page_title_en")}
        register={register("page_title_en")}
        error={errors.page_title_en?.message}
        disabled={disabled}
      />
      <Input
        name="page_title_ar"
        label={t("pages.page_title_ar")}
        register={register("page_title_ar")}
        error={errors.page_title_ar?.message}
        disabled={disabled}
      />
      <Input
        name="page_slug_en"
        label={t("pages.page_slug_en")}
        register={register("page_slug_en")}
        error={errors.page_slug_en?.message}
        disabled={disabled}
      />
    </Box>
  );
}
