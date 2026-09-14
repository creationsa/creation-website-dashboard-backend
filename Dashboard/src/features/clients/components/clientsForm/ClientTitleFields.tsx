import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import type { ClientTitleFieldsProps } from "../../types";

export default function ClientTitleFields({
  form,
  disabled,
}: ClientTitleFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("clients.title_section")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      <Input
        name="title_en"
        label={t("clients.title_en_label")}
        error={errors.title_en?.message}
        register={register("title_en")}
        disabled={disabled}
      />
      <Input
        name="title_ar"
        label={t("clients.title_ar_label")}
        error={errors.title_ar?.message}
        register={register("title_ar")}
        disabled={disabled}
      />
    </Box>
  );
}
