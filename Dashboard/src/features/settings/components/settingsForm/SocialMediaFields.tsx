import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import type { FieldErrors, Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SettingsFormValues } from "./settingsSchema";

interface SocialMediaFieldsProps {
  form: UseFormReturn<SettingsFormValues>;
  disabled?: boolean;
  prefix: "instagram" | "facebook" | "behance" | "linkedin";
}

export default function SocialMediaFields({
  form,
  disabled,
  prefix,
}: SocialMediaFieldsProps) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = form;

  const fieldErrors = errors as FieldErrors<SettingsFormValues>;

  return (
    <Box
      title={t(`settings.${prefix}`)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name={`${prefix}_title_en` as Path<SettingsFormValues>}
        label={t("general.title_en")}
        error={fieldErrors?.[`${prefix}_title_en`]?.message}
        register={register(`${prefix}_title_en` as Path<SettingsFormValues>)}
        disabled={disabled}
      />

      <Input
        name={`${prefix}_title_ar` as Path<SettingsFormValues>}
        label={t("general.title_ar")}
        error={fieldErrors?.[`${prefix}_title_ar`]?.message}
        register={register(`${prefix}_title_ar` as Path<SettingsFormValues>)}
        disabled={disabled}
      />

      <div className="md:col-span-2">
        <Input
          name={`${prefix}_link` as Path<SettingsFormValues>}
          label={t("general.link")}
          error={fieldErrors?.[`${prefix}_link`]?.message}
          register={register(`${prefix}_link` as Path<SettingsFormValues>)}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
