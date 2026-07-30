import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { FooterFormProps } from "../types";
import FooterStatement from "./FooterStatement";
import useFooterForm from "./useFooterForm";

export default function FooterForm({ footerData }: FooterFormProps) {
  const { t } = useTranslation();

  const { form, isLoading, handleUpdateFooter } = useFooterForm(footerData);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateFooter)}
      className="flex flex-col gap-6"
    >
      <FooterStatement form={form} disabled={isLoading} />

      <Button
        type="submit"
        className="ms-auto mt-6 w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {t("general.update")}
      </Button>
    </form>
  );
}
