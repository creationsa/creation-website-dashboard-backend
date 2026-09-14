import BlogContent from "@/components/common/blogContent";
import { InsightsProps } from "@/components/pages/blogsDetails/types";
import Header from "@/components/ui/Header";

export default function Insights({
  thinking,
  blogData,
  locale,
}: InsightsProps) {
  return (
    <section className="container">
      <Header
        title={blogData.title}
        description={blogData.first_sub_title}
        lang={locale}
        hasContainer={false}
        styles="w-full xl:w-[50%]"
      />

      <BlogContent title={thinking.the_insight}>
        <p>{blogData.first_desc}</p>

        <p className="mt-20">{blogData.second_desc}</p>
      </BlogContent>
    </section>
  );
}
