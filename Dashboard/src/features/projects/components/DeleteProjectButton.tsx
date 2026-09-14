import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import type { DeleteProjectProps } from "../types";
import { useDeleteProject } from "../hooks/useDeleteProject";

export default function DeleteProjectButton({ project }: DeleteProjectProps) {
  const { id: projectId, title } = project;
  const { t } = useTranslation();

  const { deleteProject, isProjectDeleting } = useDeleteProject();

  const action = () => {
    deleteProject(projectId);
  };

  return (
    <Modal>
      <Modal.Open opens="deleteProject">
        <Button variation="delete" size="small">
          {t("general.delete")}
        </Button>
      </Modal.Open>

      <Modal.Window name="deleteProject">
        <ConfirmMessage
          disabled={isProjectDeleting}
          message={`${t("general.confirmDelete", { title: title })}`}
          onConfirm={() => action()}
        />
      </Modal.Window>
    </Modal>
  );
}
