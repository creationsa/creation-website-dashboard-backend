import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { DeleteSectionButtonProps } from "../../types";

export default function DeleteSectionButton({
  onRemove,
}: DeleteSectionButtonProps) {
  const { t } = useTranslation();
  return (
    <div className="flex md:justify-end">
      <Button
        type="button"
        variation="delete"
        onClick={onRemove}
        className="ms-auto w-full md:w-32!"
      >
        {t("general.delete")}
      </Button>
    </div>
  );
}
