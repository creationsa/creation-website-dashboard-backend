import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../hooks/useLogin";
import { createLoginSchema, type LoginFormValues } from "./loginSchema";

export function useLoginForm() {
  const { t } = useTranslation();
  const { submitLogin, isLoginLoading } = useLogin();

  const schema = useMemo(() => createLoginSchema(t), [t]);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    submitLogin(formData);
  };

  return {
    form,
    onSubmit,
    isLoginLoading,
  };
}
