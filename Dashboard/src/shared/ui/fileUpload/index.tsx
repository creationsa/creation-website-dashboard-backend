import { ALLOWED_IMAGE_ACCEPT } from "@/shared/constants/constants";
import { FieldError } from "@/shared/ui/textField/FieldError";
import Label from "@/shared/ui/textField/Label";
import FileUploadDropzone from "./FileUploadDropzone";
import type { FileUploadProps } from "./types";
import { useFilePreview } from "./useFilePreview";

export default function FileUpload({
  name,
  value,
  onChange,
  onBlur,
  accept = ALLOWED_IMAGE_ACCEPT,
  label,
  error,
  disabled,
  imageShape = "square",
}: FileUploadProps) {
  const isVideo = accept.startsWith("video/");
  const preview = useFilePreview(value);

  const handleSelectFile = (file: File | null) => {
    onChange(file);
    onBlur?.();
  };

  return (
    <div>
      <Label name={name} label={label} error={error} />

      <FileUploadDropzone
        name={name}
        value={value}
        preview={preview}
        isVideo={isVideo}
        accept={accept}
        error={error}
        disabled={disabled}
        imageShape={imageShape}
        onSelectFile={handleSelectFile}
      />

      {error && <FieldError message={error} />}
    </div>
  );
}
