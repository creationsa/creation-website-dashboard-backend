import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { FileUploadPreviewProps } from "./types";

export default function FileUploadPreview({
  preview,
  isVideo,
  imageShape,
  disabled,
  onRemove,
}: FileUploadPreviewProps) {
  const { t } = useTranslation();

  const mediaClassName = `h-40 w-full rounded-xl object-contain ${imageShape === "square" ? "aspect-square" : "aspect-video"} ${disabled ? "grayscale-75" : ""}`;

  return (
    <div className="space-y-4">
      {isVideo ? (
        <video src={preview} controls className={mediaClassName} />
      ) : (
        <img src={preview} alt="preview" className={mediaClassName} />
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
          onRemove();
        }}
        className="mx-auto! w-fit!"
      >
        {t("general.remove")}
      </Button>
    </div>
  );
}
