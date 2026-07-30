import HeaderFields from "@/shared/components/headerFields";
import LogosFields from "@/shared/components/logosFields";
import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { ProjectsFormMainDataProps } from "../../types";
import useProjectsForm from "./useProjectsForm";

export default function MainProjectsForm({
  projectMainDataToEdit,
}: ProjectsFormMainDataProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditProject } =
    useProjectsForm(projectMainDataToEdit);

  const {
    formState: { isDirty, isValid, errors },
    register,
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  return (
    <form
      onSubmit={form.handleSubmit(handleAddEditProject)}
      className="flex flex-col gap-6 border-t pt-6 lg:gap-10 lg:pt-10"
    >
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <HeaderFields form={form} disabled={isLoading} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <TextArea
            name="overview_description_en"
            label={t("projects.overview_description_en")}
            error={errors?.overview_description_en?.message}
            register={register("overview_description_en")}
            disabled={isLoading}
          />
          <TextArea
            name="overview_description_ar"
            label={t("projects.overview_description_ar")}
            error={errors?.overview_description_ar?.message}
            register={register("overview_description_ar")}
            disabled={isLoading}
          />
        </div>
      </div>
      <LogosFields form={form} prefix="logos_section" disabled={isLoading} />
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
