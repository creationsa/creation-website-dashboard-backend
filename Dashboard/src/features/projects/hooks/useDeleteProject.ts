import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteProject as deleteProjectApi } from "../api/deleteProject";

export function useDeleteProject() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isProjectDeleting, mutate: deleteProject } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.projects,
      });
      toast.success(t("general.deleted_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return { deleteProject, isProjectDeleting };
}
