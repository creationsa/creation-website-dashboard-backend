import { routes } from "@/app/navigation/routes";
import { queryKeys } from "@/shared/api/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/createBlog";

export function useCreateBlog() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: addBlog,
    isPending: addBlogLoading,
    error,
  } = useMutation({
    mutationFn: createBlog,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.blogs,
      });
      toast.success(t("general.created_done"));
      navigate(routes.blogs);
    },
    onError: () => {
      toast.error(t("general.something_went_wrong"));
    },
  });

  return {
    addBlog,
    addBlogLoading,
    error,
  };
}
