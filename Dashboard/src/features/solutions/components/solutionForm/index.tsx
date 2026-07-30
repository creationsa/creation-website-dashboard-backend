import DynamicFeaturedItemsFields from "@/shared/components/dynamicFeaturedItemsFields";
import { MEDIA_ONLY_ITEM_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import HeaderFields from "@/shared/components/headerFields";
import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import SlugSection from "@/shared/components/slugSection";
import TitleSection from "@/shared/components/titleSection";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SolutionFormProps } from "../../types";
import ExecutionFrameworkSection from "./sections/ExecutionFrameworkSection";
import ValueProposition from "./sections/ValueProposition";
import useSolutionForm from "./useSolutionForm";

export default function SolutionForm({ solutionToEdit }: SolutionFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditSolution } =
    useSolutionForm(solutionToEdit);

  const { seoData, isSeoLoading } = useGetSeoDataByModal("pages");
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
      {/* HEADER */}
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

          <SlugSection form={form} disabled={isLoading} />

          <Box className="flex flex-col gap-3 lg:gap-5">
            <HeaderFields form={form} disabled={isLoading} />
          </Box>

          <ValueProposition form={form} disabled={isLoading} />

          <ExecutionFrameworkSection form={form} disabled={isLoading} />

          <Box className="flex flex-col gap-3 lg:gap-5">
            <DynamicFeaturedItemsFields
              form={form}
              name="items"
              itemInitialState={MEDIA_ONLY_ITEM_INITIAL_STATE}
              disabled={isLoading}
              hasTitleAndSlug={false}
            />
          </Box>

          <Box title={t("solutions.news_section")}>
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

      {activeTab === "seo" && <SeoForm seoData={seoData} forType="solution" />}
    </>
  );
}
