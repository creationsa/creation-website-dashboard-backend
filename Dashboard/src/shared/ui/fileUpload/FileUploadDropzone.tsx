import { ALLOWED_IMAGE_MIME_TYPES } from "@/shared/constants/constants";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FileUploadPlaceholder from "./FileUploadPlaceholder";
import FileUploadPreview from "./FileUploadPreview";
import type { FileUploadDropzoneProps } from "./types";

export default function FileUploadDropzone({
  name,
  value,
  preview,
  isVideo,
  accept,
  error,
  disabled,
  imageShape,
  onSelectFile,
}: FileUploadDropzoneProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const Styles = error
    ? "border-red-400 dark:border-red-700"
    : "border-border-800 dark:border-border-900 hover:bg-white-300 dark:hover:bg-black-700 hover:border-tiffany-600 dark:hover:border-tiffany-100";

  return (
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
          e.target.value = "";

          if (!file) {
            onSelectFile(null);
            return;
          }

          if (!isVideo && !ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
            toast.error(t("general.invalid_image_type"));
            return;
          }

          onSelectFile(file);
        }}
        disabled={disabled}
      />

      {!value ? (
        <FileUploadPlaceholder disabled={disabled} />
      ) : (
        preview && (
          <FileUploadPreview
            preview={preview}
            isVideo={isVideo}
            imageShape={imageShape}
            disabled={disabled}
            onRemove={() => onSelectFile(null)}
          />
        )
      )}
    </div>
  );
}
