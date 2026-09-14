import { DeleteIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import type { DeleteSectionButtonProps } from "../../types";

export default function DeleteSectionButton({
  onRemove,
  disabled,
}: DeleteSectionButtonProps) {
  const { t } = useTranslation();

  return (
    <Modal>
      <Modal.Open opens="deleteSection">
        <Button
          type="button"
          variation="delete"
          size="small"
          disabled={disabled}
          aria-label={t("general.delete")}
          title={t("general.delete")}
          className="w-fit!"
        >
          <DeleteIcon />
        </Button>
      </Modal.Open>

      <Modal.Window name="deleteSection">
        <ConfirmMessage
          message={t("pages.confirm_delete_section")}
          onConfirm={onRemove}
        />
      </Modal.Window>
    </Modal>
  );
}
