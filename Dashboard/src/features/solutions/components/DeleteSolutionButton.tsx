import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import { useDeleteSolution } from "../hooks/useDeleteSolution";
import type { DeleteSolutionProps } from "../types";

export default function DeleteSolutionButton({
  solution,
}: DeleteSolutionProps) {
  const { id: solutionId, title } = solution;
  const { t } = useTranslation();

  const { deleteSolution, isSolutionDeleting } = useDeleteSolution();

  const action = () => {
    deleteSolution(solutionId);
  };

  return (
    <Modal>
      <Modal.Open opens="deleteSolution">
        <Button variation="delete">{t("general.delete")}</Button>
      </Modal.Open>

      <Modal.Window name="deleteSolution">
        <ConfirmMessage
          disabled={isSolutionDeleting}
          message={`${t("general.confirmDelete", { title: title })}`}
          onConfirm={() => action()}
        />
      </Modal.Window>
    </Modal>
  );
}
