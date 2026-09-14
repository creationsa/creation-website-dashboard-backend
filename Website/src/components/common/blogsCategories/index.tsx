import BlogCard from "./BlogCard";
import { BlogsProps } from "./types";

export default function BlogsCategories({
  blogsTranslation,
  bigBottomPadding = false,
  locale,
  allBlogsData,
}: BlogsProps) {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {allBlogsData.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          blogsTranslation={blogsTranslation}
          bigBottomPadding={bigBottomPadding}
          locale={locale}
        />
      ))}
    </div>
  );
}
