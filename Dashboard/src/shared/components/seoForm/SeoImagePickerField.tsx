import type { SeoImagePickerFieldProps } from "@/shared/components/seoForm/types";
import { PlayIcon } from "@/shared/icons";
import FileUpload from "@/shared/ui/fileUpload";
import Switch from "@/shared/ui/Switch";
import { FieldError } from "@/shared/ui/textField/FieldError";
import Label from "@/shared/ui/textField/Label";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SeoImagePickerField({
  name,
  label,
  value,
  onChange,
  error,
  disabled,
  mediaOptions,
}: SeoImagePickerFieldProps) {
  const { t } = useTranslation();

  // A brand-new upload (a File, or a string that isn't one of this
  // record's own images) starts in upload mode; anything else — empty,
  // or already matching one of the record's images — starts in pick
  // mode, since that's the more common choice for SEO images.
  const isOwnImage =
    typeof value === "string" && mediaOptions.some((o) => o.url === value);
  const [isPickMode, setIsPickMode] = useState(
    !(value instanceof File) && (!value || isOwnImage),
  );

  return (
    <div className="flex flex-col gap-2">
      <Switch
        name={`${name}_mode`}
        label={label}
        checked={isPickMode}
        onChange={(checked) => {
          setIsPickMode(checked);
          onChange("");
        }}
        checkedText={t("seo.pick_from_project_images")}
        uncheckedText={t("seo.upload_custom_image")}
        disabled={disabled}
      />

      {isPickMode ? (
        <div>
          <Label
            name={name}
            label={t("seo.choose_project_image")}
            error={error}
          />

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {mediaOptions.map((option) => {
              const isSelected = value === option.url;

              return (
                <button
                  key={option.url}
                  type="button"
                  title={option.label}
                  disabled={disabled}
                  onClick={() => onChange(option.url)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                    isSelected
                      ? "border-tiffany-600 dark:border-tiffany-100"
                      : "border-transparent hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <img
                    src={option.url}
                    alt={option.label}
                    className="h-full w-full object-cover"
                  />

                  {option.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayIcon className="size-6 text-white drop-shadow" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <FieldError message={error} />
        </div>
      ) : (
        <FileUpload
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          error={error}
          disabled={disabled}
        />
      )}
    </div>
  );
}
