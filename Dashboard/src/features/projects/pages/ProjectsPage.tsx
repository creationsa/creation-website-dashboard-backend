import AddNewButton from "@/shared/components/addNewEntityButton";
import { resources } from "@/shared/components/addNewEntityButton/resources";
import ListToolbar from "@/shared/components/listControls/ListToolbar";
import Pagination from "@/shared/components/pagination";
import { useLanguage } from "@/shared/hooks/useLanguage";
import { useListQueryParams } from "@/shared/hooks/useListQueryParams";
import { usePaginationGuard } from "@/shared/hooks/usePaginationGuard";
import NoDataMessage from "@/shared/ui/NoDataMessage";
import PageTitle from "@/shared/ui/PageTitle";
import Spinner from "@/shared/ui/spinner/Spinner";
import { useTranslation } from "react-i18next";
import ProjectsGrid from "../components/ProjectsGrid";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { page, keyword, sort, perPage, setPage, setKeyword, setSort } =
    useListQueryParams();
  const { projects, meta, isProjectsLoading } = useProjects(currentLanguage, {
    page,
    per_page: perPage,
    keyword: keyword || undefined,
    sort,
  });

  const isOutOfRange = Boolean(meta && meta.total > 0 && page > meta.last_page);
  usePaginationGuard(meta, page, setPage);

  if (isProjectsLoading || isOutOfRange) return <Spinner size="lg" />;

  const hasKeyword = Boolean(keyword);

  return (
    <>
      <PageTitle title={t("projects.title")} />

      <ListToolbar
        keyword={keyword}
        onSearch={setKeyword}
        searchPlaceholder={t("general.search_placeholder", {
          title: t("projects.title"),
        })}
        sort={sort}
        onSortChange={setSort}
      />

      {!projects?.length ? (
        <NoDataMessage
          title={
            hasKeyword
              ? t("general.no_results_title")
              : t("projects.no_project_title")
          }
          desc={
            hasKeyword
              ? t("general.no_results_desc")
              : t("projects.no_project_desc")
          }
        >
          {!hasKeyword && <AddNewButton resource={resources.projects} />}
        </NoDataMessage>
      ) : (
        <>
          <div>
            <AddNewButton resource={resources.projects} position="end" />

            <ProjectsGrid projects={projects} />
          </div>
          {meta && <Pagination meta={meta} onPageChange={setPage} />}
        </>
      )}
    </>
  );
}
