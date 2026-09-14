import LogoHint from "@/shared/components/LogoHint";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { HeaderFormProps } from "../../types";
import MenuSection from "./MenuSection";
import TogglesSection from "./TogglesSection";
import useHeaderForm from "./useHeaderForm";

export default function HeaderForm({ headerData }: HeaderFormProps) {
  const { t } = useTranslation();

  const { form, isLoading, handleUpdateHeader } = useHeaderForm(headerData);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateHeader)}
      className="flex flex-col gap-6"
    >
      <LogoHint />

      <MenuSection form={form} disabled={isLoading} />

      <TogglesSection form={form} disabled={isLoading} />

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
