import SeoSection from "./sections/SeoSection";
import TitleSection from "@/shared/components/titleSection";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import type { BlogFormProps } from "../../types";
import FirstSubtitleSection from "./sections/FirstSubtitleSection";
import ImagesSection from "./sections/ImagesSection";
import ItemsSection from "./sections/ItemsSection";
import useBlogForm from "./useBlogForm";

export default function BlogForm({ blogToEdit }: BlogFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditBlog } =
    useBlogForm(blogToEdit);

  const {
    register,
    formState: { isDirty, isValid, errors },
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  return (
    <form
      onSubmit={form.handleSubmit(handleAddEditBlog)}
      className="flex flex-col gap-6 lg:gap-10"
    >
      {/* HEADER */}
      <PageTitle
        title={
          isEditingSession
            ? t("general.update_title", {
                title: t("blogs.titleWithArticle"),
              })
            : t("general.add_title", {
                title: t("blogs.blog"),
              })
        }
      />

      {/* BLOG TITLE */}
      <TitleSection form={form} disabled={isLoading} />

      {/* SLUG */}
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

      {/* SEO DESCRIPTIONS */}
      <SeoSection form={form} disabled={isLoading} />

      {/* BLOG IMAGES */}
      <ImagesSection form={form} disabled={isLoading} />

      {/* FIRST SUBTITLE DATA */}
      <FirstSubtitleSection form={form} disabled={isLoading} />

      {/* SECOND SUBTITLE DATA */}
      <ItemsSection form={form} disabled={isLoading} />

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
