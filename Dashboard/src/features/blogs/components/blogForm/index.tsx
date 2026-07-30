import SeoSection from "@/shared/components/seoSection";
import TitleSection from "@/shared/components/titleSection";
import Button from "@/shared/ui/Button";
import PageTitle from "@/shared/ui/PageTitle";
import { useTranslation } from "react-i18next";
import type { BlogFormProps } from "../../types";
import FirstSubtitleSection from "./sections/FirstSubtitleSection";
import ImagesSection from "./sections/ImagesSection";
import ItemsSection from "./sections/ItemsSection";
import ShowInHome from "./sections/ShowInHome";
import useBlogForm from "./useBlogForm";
import SlugSection from "@/shared/components/slugSection";

export default function BlogForm({ blogToEdit }: BlogFormProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditBlog } =
    useBlogForm(blogToEdit);

  const {
    formState: { isDirty, isValid },
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

      {/* SHOW IN HOME */}
      <ShowInHome form={form} disabled={isLoading} />

      {/* BLOG TITLE */}
      <TitleSection form={form} disabled={isLoading} />

      {/* SLUG */}
      <SlugSection form={form} disabled={isLoading} />

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
