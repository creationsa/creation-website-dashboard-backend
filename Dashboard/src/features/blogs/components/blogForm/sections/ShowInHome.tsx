import Switch from "@/shared/ui/Switch";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../../types";

export default function ShowInHome({ form, disabled }: SectionProps) {
  const {
    formState: { errors },
    control,
  } = form;

  const { t } = useTranslation();

  return (
    <Controller
      control={control}
      name="show_in_home"
      render={({ field }) => (
        <Switch
          name={field.name}
          label={t("blogs.show_in_home")}
          checked={field.value}
          onChange={field.onChange}
          error={errors.show_in_home?.message}
          disabled={disabled}
          containerStyles="w-full md:w-1/3 md:ms-auto"
          checkedText={t("blogs.visible_on_home")}
          uncheckedText={t("blogs.hidden_from_home")}
        />
      )}
    />
  );
}
