import BlogContent from "@/components/common/blogContent";
import { StrategiesProps } from "@/components/pages/blogsDetails/types";
import Header from "@/components/ui/Header";

export default function Strategies({
  blogData,
  thinking,
  locale,
}: StrategiesProps) {
  return (
    <section className="container">
      <Header
        description={blogData.second_sub_title}
        lang={locale}
        hasContainer={false}
        styles="w-full xl:w-[50%] ms-auto"
      />

      <BlogContent title={thinking.the_insight}>
        <ul className="list-outside list-disc space-y-4 ps-6">
          {blogData.items.map((strategy) => (
            <li key={strategy.id}>
              <p>{strategy.desc}</p>
            </li>
          ))}
        </ul>
      </BlogContent>
    </section>
  );
}
