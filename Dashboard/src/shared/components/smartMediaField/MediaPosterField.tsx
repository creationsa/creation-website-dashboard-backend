import FileUpload from "@/shared/ui/fileUpload";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { memo } from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { MediaPosterFieldProps } from "./types";

function MediaPosterField<T extends FieldValues>({
  form,
  name,
  disabled,
}: MediaPosterFieldProps<T>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      control={control}
      name={`${name}.poster` as Path<T>}
      render={({ field }) => (
        <FileUpload
          name={field.name}
          label={t("general.upload_poster")}
          value={field.value}
          onChange={field.onChange}
          error={getFieldErrorMessage(errors, `${name}.poster`)}
          disabled={disabled}
        />
      )}
    />
  );
}

export default memo(MediaPosterField) as typeof MediaPosterField;
