import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { createProjectsData } from "../api/createProjectsMainData";

export function useCreateProjectsMainData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: addProjectsMainData,
    isPending: addProjectsLoading,
    error,
  } = useMutation({
    mutationFn: createProjectsData,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.projectsMainData,
      });
      toast.success(t("general.created_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addProjectsMainData,
    addProjectsLoading,
    error,
  };
}
