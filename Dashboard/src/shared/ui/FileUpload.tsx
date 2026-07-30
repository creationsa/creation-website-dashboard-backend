import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { UploadIcon } from "../icons";
import Button from "./Button";
import { FieldError } from "./textField/FieldError";
import Label from "./textField/Label";

interface FileUploadProps {
  name: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  label: string;
  error?: string;
  disabled?: boolean;
  imageShape?: "square" | "cover";
}

export default function FileUpload({
  name,
  value,
  onChange,
  accept = "image/*",
  label,
  error,
  disabled,
  imageShape = "square",
}: FileUploadProps) {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const preview = useMemo(() => {
    if (value instanceof File) return URL.createObjectURL(value);
    return value ?? null;
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview && value instanceof File) URL.revokeObjectURL(preview);
    };
  }, [preview, value]);

  const Styles = error
    ? "border-red-400 dark:border-red-700"
    : "border-border-800 dark:border-border-900 hover:bg-white-300 dark:hover:bg-black-700 hover:border-tiffany-600 dark:hover:border-tiffany-100";

  return (
    <div>
      <Label name={name} label={label} error={error} />

      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={`transition-color cursor-pointer rounded-xl border-4 border-dashed p-6 text-center duration-300 ${disabled ? "cursor-not-allowed! bg-gray-100! dark:bg-gray-900!" : Styles} `}
      >
        <input
          id={name}
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            onChange(file ?? null);
            e.target.value = "";
          }}
          disabled={disabled}
        />

        {!value ? (
          <div
            className={`${disabled ? "text-gray-900! dark:text-gray-100!" : "dark:text-white-100! text-black-100!"} flex flex-col items-center`}
          >
            <UploadIcon className="size-10 sm:size-12" />
            <div>
              <p className="text-lg font-semibold">
                {t("general.upload_file")}
              </p>
              <p className="mt-0.5 text-xs">{t("general.click_to_browse")}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {preview && (
              <img
                src={preview}
                alt="preview"
                className={`h-40 w-full rounded-xl object-contain ${imageShape === "square" ? "aspect-square" : "aspect-video"} ${disabled ? "grayscale-75" : ""}`}
              />
            )}

            <Button
              variation="delete"
              aria-label={t("general.remove")}
              size="small"
              type="button"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                if (disabled) return;
                onChange(null);
              }}
              className="mx-auto! w-fit!"
            >
              {t("general.remove")}
            </Button>
          </div>
        )}
      </div>

      {error && <FieldError message={error} />}
    </div>
  );
}
