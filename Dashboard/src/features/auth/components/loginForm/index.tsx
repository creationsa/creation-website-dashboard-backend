import PageTitle from "@/shared/ui/PageTitle";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import { useLoginForm } from "./useLoginForm";

export default function LoginForm() {
  const { t } = useTranslation();
  const { form, onSubmit, isLoginLoading } = useLoginForm();

  const {
    register,
    formState: { isDirty, isValid, errors },
  } = form;

  const isSubmitDisabled = isLoginLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <PageTitle title={t("auth.login")} />

      <Input
        name="email"
        label={t("auth.email")}
        register={register("email")}
        error={errors?.email?.message}
        disabled={isLoginLoading}
        type="email"
      />

      <Input
        name="password"
        label={t("auth.password")}
        register={register("password")}
        error={errors?.password?.message}
        disabled={isLoginLoading}
        type="password"
      />

      <Button
        type="submit"
        loading={isLoginLoading}
        disabled={isSubmitDisabled}
        className="w-full"
      >
        {t("auth.login")}
      </Button>
    </form>
  );
}
