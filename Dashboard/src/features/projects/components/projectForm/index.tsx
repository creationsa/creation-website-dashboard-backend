import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import SeoSection from "@/shared/components/seoSection";
import SlugSection from "@/shared/components/slugSection";
import TitleSection from "@/shared/components/titleSection";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProjectFormProps } from "../../types";
import MediaSection from "./sections/MediaSection";
import OverviewSection from "./sections/OverviewSection";
import StatsSection from "./sections/StatsSection";
import useProjectForm from "./useProjectForm";

export default function ProjectForm({ projectToEdit }: ProjectFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditProject } =
    useProjectForm(projectToEdit);

  const { seoData, isSeoLoading } = useGetSeoDataByModal("pages");
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  const isEditMode = !!projectToEdit;

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  if (isSeoLoading) return <Spinner size="lg" />;

  return (
    <>
      {/* HEADER */}
      <PageTitle
        title={
          isEditingSession
            ? t("general.update_title", {
                title: t("projects.titleWithArticle"),
              })
            : t("general.add_title", {
                title: t("projects.project"),
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
          onSubmit={form.handleSubmit(handleAddEditProject)}
          className="flex flex-col gap-6 lg:gap-10"
        >
          <TitleSection form={form} disabled={isLoading} />

          <SlugSection form={form} disabled={isLoading} />

          <SeoSection form={form} disabled={isLoading} />

          <OverviewSection form={form} disabled={isLoading} />

          <StatsSection form={form} disabled={isLoading} />

          <MediaSection form={form} disabled={isLoading} />

          <Box
            title={t("projects.news_section")}
            className="rounded-xl border p-4"
          >
            <DynamicItemsFields
              form={form}
              disabled={isLoading}
              name="ticker_items"
            />
          </Box>

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

      {activeTab === "seo" && <SeoForm seoData={seoData} forType="project" />}
    </>
  );
}
