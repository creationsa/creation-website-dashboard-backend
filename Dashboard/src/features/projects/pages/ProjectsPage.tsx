import AddNewButton from "@/shared/components/addNewEntityButton";
import { resources } from "@/shared/components/addNewEntityButton/resources";
import { useLanguage } from "@/shared/hooks/useLanguage";
import NoDataMessage from "@/shared/ui/NoDataMessage";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import MainProjectsForm from "../components/mainProjectsForm";
import ProjectsGrid from "../components/ProjectsGrid";
import { useProjects } from "../hooks/useProjects";

const projects = [
  {
    id: 1,
    title: "test one",
    slug: "test-one",
    base_image: {
      id: 1,
      media: "https://www.creation.sa/images/home/creation-seo-en-cover.jpg",
      alt: "string",
      en: {
        alt: "ImageLocalization",
      },
      ar: {
        alt: "ImageLocalization",
      },
    },
  },
  {
    id: 2,
    title: "test two",
    slug: "test-two",
    base_image: {
      id: 1,
      media: "https://www.creation.sa/images/home/creation-seo-en-cover.jpg",
      alt: "string",
      en: {
        alt: "ImageLocalization",
      },
      ar: {
        alt: "ImageLocalization",
      },
    },
  },
];

export default function ProjectsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const {
    // projects,
    isProjectsLoading,
  } = useProjects(currentLanguage);

  if (isProjectsLoading) return <Spinner size="lg" />;

  return (
    <>
      <PageTitle title={t("projects.title")} />
      {!projects?.length ? (
        <NoDataMessage
          title={t("projects.no_project_title")}
          desc={t("projects.no_project_desc")}
        >
          <AddNewButton resource={resources.projects} />
        </NoDataMessage>
      ) : (
        <div>
          <AddNewButton resource={resources.projects} position="end" />

          <ProjectsGrid projects={projects} />
        </div>
      )}
      <MainProjectsForm />
    </>
  );
}
