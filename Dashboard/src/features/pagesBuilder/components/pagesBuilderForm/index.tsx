import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import { useGetSeoDataByModal } from "@/shared/hooks/useGetSeoDataByModal";
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

export default function PagesBuilderForm({ dataToEdit }: PageFormProps) {
  const { t } = useTranslation();
  const { seoData, isSeoLoading } = useGetSeoDataByModal("pages");
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  const { form, fields, appendSection, remove, onSubmit, isEditingSession } =
    usePageForm(dataToEdit);
  const isEditMode = !!dataToEdit;

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
          <PageMetaFields form={form} />

          <SectionSelector onSelect={appendSection} />

          <SectionsList fields={fields} form={form} onRemove={remove} />

          <Button type="submit" className="ms-auto mt-6 w-full sm:w-44">
            {isEditMode ? t("general.update") : t("general.add")}
          </Button>
        </form>
      )}

      {activeTab === "seo" && <SeoForm seoData={seoData} forType="page" />}
    </>
  );
}
