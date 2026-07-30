import { routes } from "@/app/navigation/routes";
import Spinner from "@/shared/ui/spinner/Spinner";
import { Navigate, useParams } from "react-router-dom";
import SolutionForm from "../components/solutionForm";
import { useSolution } from "../hooks/useSolution";

export default function UpdateSolutionPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { solution, isSolutionLoading } = useSolution(numericId);

  if (isSolutionLoading) return <Spinner size="lg" />;

  if (!id || isNaN(numericId) || !solution)
    return <Navigate to={routes.solutions} replace />;

  return <SolutionForm solutionToEdit={solution} />;
}
