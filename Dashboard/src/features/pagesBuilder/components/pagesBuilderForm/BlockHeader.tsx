import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { BlockHeaderProps } from "../../types";

export default function BlockHeader({
  index,
  onRemove,
  isDeleteDisabled,
}: BlockHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between border-b pb-2">
      <span className="rounded-xl border px-3 py-1 text-sm font-semibold">
        {t("pages.item_row", {
          index: index + 1,
        })}
      </span>

      <Button
        type="button"
        variation="danger"
        onClick={onRemove}
        disabled={isDeleteDisabled}
        className="w-fit!"
      >
        {t("pages.delete_the_block")}
      </Button>
    </div>
  );
}
