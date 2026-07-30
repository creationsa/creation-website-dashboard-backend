import FileUpload from "@/shared/ui/FileUpload";
import Switch from "@/shared/ui/Switch";
import Input from "@/shared/ui/textField/Input";
import {
  Controller,
  useWatch,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { MediaFieldProps } from "./types";

export default function SmartMediaField<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: MediaFieldProps<T>) {
  const { t } = useTranslation();

  const {
    control,
    register,
    formState: { errors },
  } = form;

  const mediaType = useWatch({
    control,
    name: `${name}.type` as Path<T>,
  });

  const mediaErrors = name
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      errors,
    ) as {
    file?: { message?: string };
    alt_en?: { message?: string };
    alt_ar?: { message?: string };
    poster?: { message?: string };
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
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
            value={field.value}
            onChange={field.onChange}
            error={mediaErrors?.file?.message}
            disabled={disabled}
          />
        )}
      />

      {mediaType === "image" && (
        <div className="grid grid-cols-1 gap-3 lg:gap-5 2xl:grid-cols-2">
          <Input
            name={`${name}.alt_en` as Path<T>}
            label={t("general.image_alt_en")}
            register={register(`${name}.alt_en` as Path<T>)}
            error={mediaErrors?.alt_en?.message}
            disabled={disabled}
          />

          <Input
            name={`${name}.alt_ar` as Path<T>}
            label={t("general.image_alt_ar")}
            register={register(`${name}.alt_ar` as Path<T>)}
            error={mediaErrors?.alt_ar?.message}
            disabled={disabled}
          />
        </div>
      )}

      {mediaType === "video" && (
        <Controller
          control={control}
          name={`${name}.poster` as Path<T>}
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("general.upload_poster")}
              value={field.value}
              onChange={field.onChange}
              error={mediaErrors?.poster?.message}
              disabled={disabled}
            />
          )}
        />
      )}
    </div>
  );
}
