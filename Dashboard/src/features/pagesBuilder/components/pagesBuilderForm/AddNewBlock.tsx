import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { AddNewBlockProps } from "../../types";

export default function AddNewBlock({ count, onAdd }: AddNewBlockProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">
        {t("pages.items_management")} ({count})
      </h3>

      <Button
        type="button"
        variation="secondary"
        onClick={onAdd}
        className="w-fit!"
      >
        {t("pages.add_item")}
      </Button>
    </div>
  );
}
