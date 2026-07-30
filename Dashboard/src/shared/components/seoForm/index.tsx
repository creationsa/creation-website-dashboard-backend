import type { SeoFormProps } from "@/shared/types/seo";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import FileUpload from "@/shared/ui/FileUpload";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import KeywordsInput from "./KeywordsInput";
import useSeoForm from "./useSeoForm";

export default function SeoForm({ seoData, forType }: SeoFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, handleSubmitSeo, isEditMode } = useSeoForm(
    seoData,
    forType,
  );

  const {
    register,
    formState: { isDirty, isValid, errors },
    control,
  } = form;

  const isSubmitDisabled = isLoading || !isValid || !isDirty;

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmitSeo)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      {/* SEO TITLES */}
      <Box
        title={t("seo.title")}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <Input
          name="title_en"
          label={t("general.title_en")}
          error={errors?.title_en?.message}
          register={register("title_en")}
          disabled={isLoading}
        />
        <Input
          name="title_ar"
          label={t("general.title_ar")}
          error={errors?.title_ar?.message}
          register={register("title_ar")}
          disabled={isLoading}
        />
      </Box>
      {/* SEO DESCRIPTIONS */}
      <Box
        title={t("seo.description")}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <TextArea
          name="seo_desc_en"
          label={t("general.desc_en")}
          error={errors?.seo_desc_en?.message}
          register={register("seo_desc_en")}
          rows={5}
          disabled={isLoading}
        />
        <TextArea
          name="seo_desc_ar"
          label={t("general.desc_ar")}
          error={errors?.seo_desc_ar?.message}
          register={register("seo_desc_ar")}
          rows={5}
          disabled={isLoading}
        />
      </Box>
      {/* SEO IMAGES */}
      <Box
        title={t("general.images")}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <Controller
          control={control}
          name="image_en"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("seo.image_en")}
              value={field.value}
              onChange={field.onChange}
              error={errors.image_en?.message}
              disabled={isLoading}
            />
          )}
        />

        <Controller
          control={control}
          name="image_ar"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("seo.image_ar")}
              value={field.value}
              onChange={field.onChange}
              error={errors.image_ar?.message}
              disabled={isLoading}
            />
          )}
        />
      </Box>
      <Box title={t("seo.keywords")}>
        <Controller
          control={control}
          name="keywords"
          render={({ field }) => (
            <KeywordsInput value={field.value} onChange={field.onChange} />
          )}
        />
      </Box>
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
