import ClientsHint from "@/shared/components/clientsHint";
import PageTitleSettingsSection from "@/shared/components/pageTitleSettingsSection";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { ProjectsFormMainDataProps } from "../../types";
import ProjectsHeaderOverviewFields from "./ProjectsHeaderOverviewFields";
import useProjectsForm from "./useProjectsForm";

export default function MainProjectsForm({
  projectMainDataToEdit,
}: ProjectsFormMainDataProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditProject } =
    useProjectsForm(projectMainDataToEdit);

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  return (
    <form
      onSubmit={form.handleSubmit(handleAddEditProject)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      <PageTitleSettingsSection form={form} disabled={isLoading} />

      <ProjectsHeaderOverviewFields form={form} disabled={isLoading} />

      <ClientsHint />
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
