import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import { useDeletePage } from "../hooks/useDeletePage";
import type { DeletePageProps } from "../types";

export default function DeletePageButton({ page }: DeletePageProps) {
  const { id: pageId, title } = page;
  const { t } = useTranslation();

  const { deletePage, isPageDeleting } = useDeletePage();

  const action = () => {
    deletePage(pageId);
  };

  return (
    <Modal>
      <Modal.Open opens="deletePage">
        <Button variation="delete" size="small">
          {t("general.delete")}
        </Button>
      </Modal.Open>

      <Modal.Window name="deletePage">
        <ConfirmMessage
          disabled={isPageDeleting}
          message={`${t("general.confirmDelete", { title: title })}`}
          onConfirm={() => action()}
        />
      </Modal.Window>
    </Modal>
  );
}
