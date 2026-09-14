import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import MainProjectsForm from "../components/mainProjectsForm";
import { useProjectsMainData } from "../hooks/useProjectsMainData";

export default function ProjectsMainPage() {
  const { t } = useTranslation();
  const { projectsData, isProjectsDataLoading } = useProjectsMainData();

  if (isProjectsDataLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("projects.projects_main_page")} />

      <MainProjectsForm projectMainDataToEdit={projectsData} />
    </>
  );
}
