import ContactHint from "@/shared/components/contactHint";
import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import TitleSection from "@/shared/components/titleSection";
import { useGetSeoDataById } from "@/shared/hooks/useGetSeoDataById";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SolutionFormProps } from "../../types";
import SolutionCardIconSection from "./sections/SolutionCardIconSection";
import SolutionExecutionFrameworkSection from "./sections/SolutionExecutionFrameworkSection";
import SolutionGallerySection from "./sections/SolutionGallerySection";
import SolutionHeaderSection from "./sections/SolutionHeaderSection";
import SolutionNewsSection from "./sections/SolutionNewsSection";
import SolutionSlugSection from "./sections/SolutionSlugSection";
import SolutionValuePropositionSection from "./sections/SolutionValuePropositionSection";
import useSolutionForm from "./useSolutionForm";

export default function SolutionForm({ solutionToEdit }: SolutionFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditSolution } =
    useSolutionForm(solutionToEdit);

  const { seoData, isSeoLoading } = useGetSeoDataById(
    solutionToEdit?.metadata_id ?? undefined,
  );
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  const isEditMode = !!solutionToEdit;

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  if (isSeoLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle
        title={
          isEditingSession
            ? t("general.update_title", {
                title: t("solutions.titleWithArticle"),
              })
            : t("general.add_title", {
                title: t("solutions.solution"),
              })
        }
      />

      <PageTabs
        activeTab={activeTab}
        isEditMode={isEditMode}
        onChange={setActiveTab}
      />

      {activeTab === "content" && (
        <form
          onSubmit={form.handleSubmit(handleAddEditSolution)}
          className="flex flex-col gap-6 lg:gap-10"
        >
          <TitleSection form={form} disabled={isLoading} />

          <SolutionSlugSection form={form} disabled={isLoading} />

          <SolutionCardIconSection form={form} disabled={isLoading} />

          <SolutionHeaderSection form={form} disabled={isLoading} />

          <SolutionValuePropositionSection form={form} disabled={isLoading} />

          <SolutionExecutionFrameworkSection form={form} disabled={isLoading} />

          <SolutionGallerySection form={form} disabled={isLoading} />

          <SolutionNewsSection form={form} disabled={isLoading} />

          <ContactHint />

          <Button
            type="submit"
            className="ms-auto block w-full sm:w-44"
            loading={isLoading}
            disabled={isSubmitDisabled}
          >
            {isEditingSession ? t("general.update") : t("general.add")}
          </Button>
        </form>
      )}

      {activeTab === "seo" && (
        <SeoForm
          seoData={seoData}
          metadataId={solutionToEdit?.id}
          metadataableType="solution"
        />
      )}
    </>
  );
}
