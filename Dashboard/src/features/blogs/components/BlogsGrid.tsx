import type { BlogsGridProps } from "../types";
import BlogCard from "./BlogCard";

export default function BlogsGrid({ blogs }: BlogsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
