import BlogsCategories from "@/components/common/blogsCategories";
import AppButton from "@/components/ui/AppButton";
import Header from "@/components/ui/Header";
import { BlogsProps } from "./types";

export default function Blogs({ all_blogs, blogs, locale }: BlogsProps) {
  return (
    <section className="container">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Header
          title={blogs.header_title}
          description={blogs.header_description}
          hasContainer={false}
          lang={locale}
        />

        <AppButton
          label={blogs.view_all}
          href={`/${locale}/blogs`}
          className="sm:self-end"
        />
      </div>

      {/* Blogs Grid */}
      <BlogsCategories
        blogsTranslation={blogs}
        numbersToDisplay={2}
        locale={locale}
        allBlogsData={all_blogs}
      />
    </section>
  );
}
