import PageTitleSettingsSection from "@/shared/components/pageTitleSettingsSection";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SolutionsFormMainDataProps } from "../../types";
import SolutionsCapabilitiesSection from "./sections/SolutionsCapabilitiesSection";
import SolutionsHeaderSection from "./sections/SolutionsHeaderSection";
import SolutionsNewsSection from "./sections/SolutionsNewsSection";
import SolutionsServicesSection from "./sections/SolutionsServicesSection";
import useSolutionsForm from "./useSolutionsForm";

export default function MainSolutionsForm({
  solutionMainDataToEdit,
}: SolutionsFormMainDataProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditSolutionsData } =
    useSolutionsForm(solutionMainDataToEdit);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  return (
    <form
      onSubmit={form.handleSubmit(handleAddEditSolutionsData)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      <PageTitleSettingsSection form={form} disabled={isLoading} />

      <SolutionsHeaderSection form={form} disabled={isLoading} />

      <SolutionsServicesSection form={form} disabled={isLoading} />

      <SolutionsNewsSection form={form} disabled={isLoading} />

      <SolutionsCapabilitiesSection form={form} disabled={isLoading} />

      <Button
        type="submit"
        className="ms-auto block w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {isEditingSession ? t("general.update") : t("general.add")}
      </Button>
    </form>
  );
}
