import BlogCard from "./BlogCard";
import { BlogsProps } from "./types";

export default function BlogsCategories({
  blogsTranslation,
  bigBottomPadding = false,
  numbersToDisplay,
  locale,
  allBlogsData,
}: BlogsProps) {
  const displayCount = numbersToDisplay ?? allBlogsData?.length;

  return (
    <div className="mt-8 flex flex-col gap-4">
      {allBlogsData.slice(0, displayCount).map((blog) => (
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
