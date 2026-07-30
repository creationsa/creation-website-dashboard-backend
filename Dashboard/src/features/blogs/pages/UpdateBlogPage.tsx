import { routes } from "@/app/navigation/routes";
import Spinner from "@/shared/ui/spinner/Spinner";
import { Navigate, useParams } from "react-router-dom";
import BlogForm from "../components/blogForm";
import { useBlog } from "../hooks/useBlog";

export default function UpdateBlogPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { blog, isBlogLoading } = useBlog(numericId);

  if (isBlogLoading) return <Spinner size="lg" />;

  if (!id || isNaN(numericId) || !blog)
    return <Navigate to={routes.blogs} replace />;

  return <BlogForm blogToEdit={blog} />;
}
