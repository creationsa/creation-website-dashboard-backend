import { UploadIcon } from "@/shared/icons";
import { useTranslation } from "react-i18next";
import type { FileUploadPlaceholderProps } from "./types";

export default function FileUploadPlaceholder({
  disabled,
}: FileUploadPlaceholderProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`${disabled ? "text-gray-900! dark:text-gray-100!" : "dark:text-white-100! text-black-100!"} flex flex-col items-center`}
    >
      <UploadIcon className="size-10 sm:size-12" />
      <div>
        <p className="text-lg font-semibold">{t("general.upload_file")}</p>
        <p className="mt-0.5 text-xs">{t("general.click_to_browse")}</p>
      </div>
    </div>
  );
}
