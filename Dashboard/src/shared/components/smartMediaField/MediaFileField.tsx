import FileUpload from "@/shared/ui/fileUpload";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { memo } from "react";
import { Controller, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { MediaFileFieldProps } from "./types";

function MediaFileField<T extends FieldValues>({
  form,
  name,
  mediaType,
  disabled,
}: MediaFileFieldProps<T>) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      control={control}
      name={`${name}.file` as Path<T>}
      render={({ field }) => (
        <FileUpload
          name={field.name}
          label={
            mediaType === "video"
              ? t("general.upload_video")
              : t("general.upload_image")
          }
          accept={mediaType === "video" ? "video/*" : "image/*"}
          value={field.value}
          onChange={field.onChange}
          error={getFieldErrorMessage(errors, `${name}.file`)}
          disabled={disabled}
        />
      )}
    />
  );
}

export default memo(MediaFileField) as typeof MediaFileField;
