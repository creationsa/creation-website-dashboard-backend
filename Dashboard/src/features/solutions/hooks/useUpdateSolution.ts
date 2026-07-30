import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { updateSolution as updateSolutionApi } from "../api/updateSolution";

export function useUpdateSolution() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: updateSolution,
    isPending: updateSolutionLoading,
    error,
  } = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateSolutionApi(id, formData),

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.solutions,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.solution(variables.id),
      });

      toast.success(t("general.updated_done"));
      navigate(routes.solutions);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    updateSolution,
    updateSolutionLoading,
    error,
  };
}
