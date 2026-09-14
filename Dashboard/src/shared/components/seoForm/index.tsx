import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import SeoDescriptionsSection from "./sections/SeoDescriptionsSection";
import SeoImagesSection from "./sections/SeoImagesSection";
import SeoKeywordsSection from "./sections/SeoKeywordsSection";
import SeoSiteNameSection from "./sections/SeoSiteNameSection";
import SeoTitlesSection from "./sections/SeoTitlesSection";
import type { SeoFormProps } from "./types";
import useSeoForm from "./useSeoForm";

export default function SeoForm({
  seoData,
  forType,
  metadataId,
  metadataableType,
  mediaOptions,
}: SeoFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, handleSubmitSeo, isEditMode } = useSeoForm(
    seoData,
    forType,
    metadataId,
    metadataableType,
  );

  const isLinkedRecord = Boolean(metadataableType);
  const isHomeForm = forType === "home";

  const {
    formState: { isDirty, isValid },
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitSeo)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      <SeoTitlesSection form={form} disabled={isLoading} />

      <SeoDescriptionsSection form={form} disabled={isLoading} />

      <SeoImagesSection
        form={form}
        disabled={isLoading}
        isLinkedRecord={isLinkedRecord}
        mediaOptions={mediaOptions}
      />

      {isHomeForm && <SeoSiteNameSection form={form} disabled={isLoading} />}

      <SeoKeywordsSection
        form={form}
        disabled={isLoading}
        isLinkedRecord={isLinkedRecord}
      />

      <Button
        type="submit"
        className="ms-auto mt-4 block w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {isEditMode ? t("general.update") : t("general.add")}
      </Button>
    </form>
  );
}
