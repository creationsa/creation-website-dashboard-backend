import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateProjectData as updateProjectDataApi } from "../api/updateProjectsMainData";

export function useUpdateProjectsMainData() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutate: updateProjectData,
    isPending: updateProjectsLoading,
    error,
  } = useMutation({
    mutationFn: updateProjectDataApi,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.projectsMainData,
      });

      toast.success(t("general.updated_done"));
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateProjectData,
    updateProjectsLoading,
    error,
  };
}
