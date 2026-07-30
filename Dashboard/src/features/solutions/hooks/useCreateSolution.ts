import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createSolution } from "../api/createSolution";

export function useCreateSolution() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: addSolution,
    isPending: addSolutionLoading,
    error,
  } = useMutation({
    mutationFn: createSolution,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.solutions,
      });
      toast.success(t("general.created_done"));
      navigate(routes.solutions);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addSolution,
    addSolutionLoading,
    error,
  };
}
