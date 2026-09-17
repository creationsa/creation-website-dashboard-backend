import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import PageTabs from "@/shared/components/pageTabs";
import SeoForm from "@/shared/components/seoForm";
import TitleSection from "@/shared/components/titleSection";
import { useGetSeoDataById } from "@/shared/hooks/useGetSeoDataById";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import Input from "@/shared/ui/textField/Input";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PROJECT_MEDIA_FIELDS, type ProjectFormProps } from "../../types";
import MediaSection from "./sections/MediaSection";
import OverviewSection from "./sections/OverviewSection";
import StatsSection from "./sections/StatsSection";
import useProjectForm from "./useProjectForm";

export default function ProjectForm({ projectToEdit }: ProjectFormProps) {
  const { t } = useTranslation();

  const { form, isLoading, isEditingSession, handleAddEditProject } =
    useProjectForm(projectToEdit);
  const { seoData, isSeoLoading } = useGetSeoDataById(
    projectToEdit?.metadata_id ?? undefined,
  );
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");

  // Lets the SEO tab offer "pick one of this project's own images"
  // instead of only uploading a brand new file.
  const mediaOptions = useMemo(
    () =>
      PROJECT_MEDIA_FIELDS.map((field) => {
        const media = projectToEdit?.[field];
        const isVideo = media?.type === "video";

        return {
          label: t(`projects.${field}`),
          url: isVideo ? media?.poster : media?.file,
          type: isVideo ? ("video" as const) : ("image" as const),
          altEn: media?.alt_en,
          altAr: media?.alt_ar,
        };
      }).filter(
        (
          option,
        ): option is {
          label: string;
          url: string;
          type: "image" | "video";
          altEn: string | undefined;
          altAr: string | undefined;
        } => typeof option.url === "string" && option.url.length > 0,
      ),
    [projectToEdit, t],
  );

  const isEditMode = !!projectToEdit;

  const {
    register,
    formState: { isDirty, isValid, errors },
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

          <Box
            title={t("blogs.slug")}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
          >
            <Input
              name="slug_en"
              label={t("blogs.slug_en")}
              error={errors?.slug_en?.message}
              register={register("slug_en")}
              disabled={isLoading}
            />
          </Box>

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

      {activeTab === "seo" && (
        <SeoForm
          seoData={seoData}
          metadataId={projectToEdit?.id}
          metadataableType="project"
          mediaOptions={mediaOptions}
        />
      )}
    </>
  );
}
