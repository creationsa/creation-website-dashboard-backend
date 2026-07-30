import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deletePage as deletePageApi } from "../api/deletePage";

export function useDeletePage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isPageDeleting, mutate: deletePage } = useMutation({
    mutationFn: deletePageApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pages,
      });
      toast.success(t("general.deleted_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return { deletePage, isPageDeleting };
}
