import { routes } from "@/app/navigation/routes";
import Spinner from "@/shared/ui/spinner/Spinner";
import { Navigate, useParams } from "react-router-dom";
import ProjectForm from "../components/projectForm";
import { useProject } from "../hooks/useProject";

export default function UpdateProjectPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { project, isProjectLoading } = useProject(numericId);

  if (isProjectLoading) return <Spinner size="lg" />;

  if (!id || isNaN(numericId) || !project)
    return <Navigate to={routes.projects} replace />;

  return <ProjectForm projectToEdit={project} />;
}
