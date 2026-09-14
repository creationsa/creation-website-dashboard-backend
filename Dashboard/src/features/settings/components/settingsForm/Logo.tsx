import Box from "@/shared/ui/Box";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../types";

export default function Logo({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
    control,
  } = form;
  const { t } = useTranslation();
  return (
    <Box
      title={t("general.images")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      <div className="flex flex-col gap-3 lg:gap-5">
        <Controller
          control={control}
          name="logo_en"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("settings.logo_en")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              accept="image/svg+xml"
              error={errors.logo_en?.message}
              disabled={disabled}
            />
          )}
        />
        <Input
          name="logo_en_alt_en"
          label={t("general.image_alt_en")}
          error={errors?.logo_en_alt_en?.message}
          register={register("logo_en_alt_en")}
          disabled={disabled}
        />
        <Input
          name="logo_en_alt_ar"
          label={t("general.image_alt_ar")}
          error={errors?.logo_en_alt_ar?.message}
          register={register("logo_en_alt_ar")}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-3 lg:gap-5">
        <Controller
          control={control}
          name="logo_ar"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("settings.logo_ar")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              accept="image/svg+xml"
              error={errors.logo_ar?.message}
              disabled={disabled}
            />
          )}
        />
        <Input
          name="logo_ar_alt_en"
          label={t("general.image_alt_en")}
          error={errors?.logo_ar_alt_en?.message}
          register={register("logo_ar_alt_en")}
          disabled={disabled}
        />
        <Input
          name="logo_ar_alt_ar"
          label={t("general.image_alt_ar")}
          error={errors?.logo_ar_alt_ar?.message}
          register={register("logo_ar_alt_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
