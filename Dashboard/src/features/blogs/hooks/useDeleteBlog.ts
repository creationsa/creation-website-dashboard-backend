import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteBlog as deleteBlogApi } from "../api/deleteBlog";

export function useDeleteBlog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isBlogDeleting, mutate: deleteBlog } = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.blogs,
      });
      toast.success(t("general.deleted_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return { deleteBlog, isBlogDeleting };
}
