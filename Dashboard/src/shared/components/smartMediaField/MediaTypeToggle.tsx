import Switch from "@/shared/ui/Switch";
import { memo } from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { MediaTypeToggleProps } from "./types";

function MediaTypeToggle<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: MediaTypeToggleProps<T>) {
  const { t } = useTranslation();
  const { control } = form;

  return (
    <Controller
      control={control}
      name={`${name}.type` as Path<T>}
      render={({ field }) => (
        <Switch
          name={field.name}
          label={label}
          checked={field.value === "video"}
          onChange={(checked) => field.onChange(checked ? "video" : "image")}
          checkedText={t("general.video_mode")}
          uncheckedText={t("general.image_mode")}
          disabled={disabled}
        />
      )}
    />
  );
}

export default memo(MediaTypeToggle) as typeof MediaTypeToggle;
