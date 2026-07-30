import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { PageTabsProps } from "./types";

export default function PageTabs({
  activeTab,
  isEditMode = true,
  onChange,
}: PageTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 border-b pb-4">
      <Button
        type="button"
        variation={activeTab === "content" ? "primary" : "secondary"}
        onClick={() => onChange("content")}
      >
        {t("pages.content")}
      </Button>

      <Button
        type="button"
        variation={activeTab === "seo" ? "primary" : "secondary"}
        onClick={() => onChange("seo")}
        disabled={!isEditMode}
      >
        {t("pages.seo")}
      </Button>
    </div>
  );
}
