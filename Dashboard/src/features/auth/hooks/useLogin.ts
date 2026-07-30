import { routes } from "@/app/navigation/routes";
import { authStorage } from "@/shared/storage/authStorage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: submitLogin, isPending: isLoginLoading } = useMutation({
    mutationFn: login,
    onSuccess: ({ token }) => {
      authStorage.setToken(token);
      navigate(routes.statistics, { replace: true });
    },
  });

  return { submitLogin, isLoginLoading };
}
