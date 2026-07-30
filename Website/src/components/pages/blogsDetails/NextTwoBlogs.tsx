import BlogsCategories from "@/components/common/blogsCategories";
import Header from "@/components/ui/Header";
import { NextTwoBlogsProps } from "./types";

export default function NextTwoBlogs({
  thinking,
  locale,
  relatedBlogs,
}: NextTwoBlogsProps) {
  return (
    <section className="container border-t pt-4">
      <Header
        title={thinking.header_title}
        description={thinking.more_thinking}
        hasContainer={false}
        lang={locale}
      />

      <BlogsCategories
        blogsTranslation={thinking}
        locale={locale}
        allBlogsData={relatedBlogs}
      />
    </section>
  );
}
