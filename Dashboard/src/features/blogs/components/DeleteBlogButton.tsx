import Button from "@/shared/ui/Button";
import ConfirmMessage from "@/shared/ui/ConfirmMessage";
import Modal from "@/shared/ui/Modal";
import { useTranslation } from "react-i18next";
import { useDeleteBlog } from "../hooks/useDeleteBlog";
import type { DeleteBlogProps } from "../types";

export default function DeleteBlogButton({ blog }: DeleteBlogProps) {
  const { id: blogId, title } = blog;
  const { t } = useTranslation();

  const { deleteBlog, isBlogDeleting } = useDeleteBlog();

  const action = () => {
    deleteBlog(blogId);
  };

  return (
    <Modal>
      <Modal.Open opens="deleteBlog">
        <Button variation="delete" size="small">
          {t("general.delete")}
        </Button>
      </Modal.Open>

      <Modal.Window name="deleteBlog">
        <ConfirmMessage
          disabled={isBlogDeleting}
          message={`${t("general.confirmDelete", { title: title })}`}
          onConfirm={() => action()}
        />
      </Modal.Window>
    </Modal>
  );
}
