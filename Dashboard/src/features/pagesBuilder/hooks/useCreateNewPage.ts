import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createNewPage } from "../api/createNewPage";

export function useCreateNewPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: addNewPage,
    isPending: addNewPageLoading,
    error,
  } = useMutation({
    mutationFn: createNewPage,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.pages,
      });
      toast.success(t("general.created_done"));
      navigate(routes.pagesBuilder);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addNewPage,
    addNewPageLoading,
    error,
  };
}
