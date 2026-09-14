import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import { useGetSeoDataById } from "@/shared/hooks/useGetSeoDataById";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { PageFormProps } from "../../types";
import PageMetaFields from "./PageMetaFields";
import SectionSelector from "./SectionSelector";
import SectionsList from "./SectionsList";
import { usePageForm } from "./usePageForm";

export default function PagesBuilderForm({
  dataToEdit,
  id,
  metadataId,
}: PageFormProps) {
  const { t } = useTranslation();
  const { seoData, isSeoLoading } = useGetSeoDataById(metadataId ?? undefined);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  const {
    form,
    fields,
    appendSection,
    remove,
    move,
    onSubmit,
    isLoading,
    isEditingSession,
  } = usePageForm(dataToEdit, id);
  const isEditMode = !!dataToEdit;

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
                title: t("pages.update_page"),
              })
            : t("general.add_title", {
                title: t("pages.new_page"),
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <PageMetaFields form={form} disabled={isLoading} />

          <SectionSelector onSelect={appendSection} disabled={isLoading} />

          <SectionsList
            fields={fields}
            form={form}
            onRemove={remove}
            onMove={move}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="ms-auto mt-6 w-full sm:w-44"
            loading={isLoading}
            disabled={isSubmitDisabled}
          >
            {isEditMode ? t("general.update") : t("general.add")}
          </Button>
        </form>
      )}

      {activeTab === "seo" && (
        <SeoForm seoData={seoData} metadataId={id} metadataableType="page" />
      )}
    </>
  );
}
