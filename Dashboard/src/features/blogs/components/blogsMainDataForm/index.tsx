import PageTitleSettingsSection from "@/shared/components/pageTitleSettingsSection";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { BlogsMainDataFormProps } from "../../types";
import useBlogsMainDataForm from "./useBlogsMainDataForm";

export default function BlogsMainDataForm({
  blogsMainDataToEdit,
}: BlogsMainDataFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, handleUpdateBlogsMainData } =
    useBlogsMainDataForm(blogsMainDataToEdit);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateBlogsMainData)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      <PageTitleSettingsSection form={form} disabled={isLoading} />

      <Button
        type="submit"
        className="ms-auto block w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {t("general.update")}
      </Button>
    </form>
  );
}
