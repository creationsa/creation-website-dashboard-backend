import { authStorage } from "@/shared/storage/authStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/logout";
import { routes } from "@/app/navigation/routes";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: submitLogout, isPending: isLogoutLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      authStorage.removeToken();
      queryClient.clear();
      navigate(routes.login, { replace: true });
    },
    onError: () => {
      authStorage.removeToken();
      queryClient.clear();
      navigate(routes.login, { replace: true });
    },
  });

  return { submitLogout, isLogoutLoading };
}
