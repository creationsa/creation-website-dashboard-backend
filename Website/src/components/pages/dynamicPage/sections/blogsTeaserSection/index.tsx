import BlogsCategories from "@/components/common/blogsCategories";
import AppButton from "@/components/ui/AppButton";
import Header from "@/components/ui/Header";
import getTrans from "@/lib/translation";
import { BlogsTeaserSectionProps } from "./types";

export default async function BlogsTeaserSection({
  content,
  locale,
}: BlogsTeaserSectionProps) {
  const blogsTranslation = await getTrans(locale, "blogs");

  return (
    <section className="container">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Header
          title={content.first_title || ""}
          description={content.second_title || ""}
          subDescription={content.third_title || ""}
          hasContainer={false}
          lang={locale}
        />

        {content.button_title && content.button_slug && (
          <AppButton
            label={content.button_title}
            href={`/${locale}/${content.button_slug}`}
            className="sm:self-end"
          />
        )}
      </div>

      <BlogsCategories
        blogsTranslation={blogsTranslation}
        bigBottomPadding
        locale={locale}
        allBlogsData={content.items}
      />
    </section>
  );
}
