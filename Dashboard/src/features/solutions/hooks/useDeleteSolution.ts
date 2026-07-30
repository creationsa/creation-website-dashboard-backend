import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { deleteSolution as deleteSolutionApi } from "../api/deleteSolution";

export function useDeleteSolution() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isPending: isSolutionDeleting, mutate: deleteSolution } = useMutation(
    {
      mutationFn: deleteSolutionApi,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.solutions,
        });
        toast.success(t("general.deleted_done"));
      },
      onError: () => {
        toast.error(t("general.something_went_wrong"));
      },
    },
  );

  return { deleteSolution, isSolutionDeleting };
}
