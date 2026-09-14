import { memo } from "react";
import { useWatch, type FieldValues, type Path } from "react-hook-form";
import MediaFileField from "./MediaFileField";
import MediaImageAltFields from "./MediaImageAltFields";
import MediaPosterField from "./MediaPosterField";
import MediaTypeToggle from "./MediaTypeToggle";
import type { MediaFieldProps } from "./types";

function SmartMediaField<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: MediaFieldProps<T>) {
  const { control } = form;

  const mediaType = useWatch({
    control,
    name: `${name}.type` as Path<T>,
  });

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <MediaTypeToggle form={form} name={name} label={label} disabled={disabled} />

      <MediaFileField
        form={form}
        name={name}
        mediaType={mediaType}
        disabled={disabled}
      />

      {mediaType === "image" && (
        <MediaImageAltFields form={form} name={name} disabled={disabled} />
      )}

      {mediaType === "video" && (
        <MediaPosterField form={form} name={name} disabled={disabled} />
      )}
    </div>
  );
}

export default memo(SmartMediaField) as typeof SmartMediaField;
