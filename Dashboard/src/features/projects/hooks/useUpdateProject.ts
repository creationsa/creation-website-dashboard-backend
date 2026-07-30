import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { updateProject as updateProjectApi } from "../api/updateProject";

export function useUpdateProject() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: updateProject,
    isPending: updateProjectLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateProjectApi(id, formData),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.projects,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.project(variables.id),
      });

      toast.success(t("general.updated_done"));
      navigate(routes.projects);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateProject,
    updateProjectLoading,
    error,
  };
}
