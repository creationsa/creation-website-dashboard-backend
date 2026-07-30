import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api/createProject";

export function useCreateProject() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: addProject,
    isPending: addProjectLoading,
    error,
  } = useMutation({
    mutationFn: createProject,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.projects,
      });
      toast.success(t("general.created_done"));
      navigate(routes.projects);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addProject,
    addProjectLoading,
    error,
  };
}
