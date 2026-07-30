import { routes } from "@/app/navigation/routes";
import Spinner from "@/shared/ui/spinner/Spinner";
import { Navigate, useParams } from "react-router-dom";
import PagesBuilderForm from "../components/pagesBuilderForm";
import { usePage } from "../hooks/usePage";

export default function UpdatePageBuilder() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { page, isPageLoading } = usePage(numericId);

  if (isPageLoading) return <Spinner size="lg" />;

  if (!id || isNaN(numericId) || !page)
    return <Navigate to={routes.pagesBuilder} replace />;

  return <PagesBuilderForm dataToEdit={page} />;
}
