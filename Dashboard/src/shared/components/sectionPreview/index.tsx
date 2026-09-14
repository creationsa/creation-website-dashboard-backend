import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../../features/pagesBuilder/components/pagesBuilderForm/SubHeadTitle";
import type { SectionPreviewProps } from "./types";

export default function SectionPreview({
  src,
  alt,
  className = "",
}: SectionPreviewProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-4 lg:gap-5 ${className}`}
    >
      <SubHeadTitle title={t("pages.layout_preview")} />

      <div className="relative flex min-h-30 items-center justify-center overflow-hidden">
        <img src={src} alt={alt} className="h-auto w-full object-contain" />
      </div>
    </div>
  );
}
