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
import SolutionsGrid from "../components/SolutionsGrid";
import { useSolutions } from "../hooks/useSolutions";

export default function SolutionsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { page, keyword, sort, perPage, setPage, setKeyword, setSort } =
    useListQueryParams();
  const { solutions, meta, isSolutionsLoading } = useSolutions(
    currentLanguage,
    {
      page,
      per_page: perPage,
      keyword: keyword || undefined,
      sort,
    },
  );

  const isOutOfRange = Boolean(meta && meta.total > 0 && page > meta.last_page);
  usePaginationGuard(meta, page, setPage);

  if (isSolutionsLoading || isOutOfRange) return <Spinner size="lg" />;

  const hasKeyword = Boolean(keyword);

  return (
    <>
      <PageTitle title={t("solutions.title")} />
      <ListToolbar
        keyword={keyword}
        onSearch={setKeyword}
        searchPlaceholder={t("general.search_placeholder", {
          title: t("solutions.title"),
        })}
        sort={sort}
        onSortChange={setSort}
      />
      {!solutions?.length ? (
        <NoDataMessage
          title={
            hasKeyword
              ? t("general.no_results_title")
              : t("solutions.no_solution_title")
          }
          desc={
            hasKeyword
              ? t("general.no_results_desc")
              : t("solutions.no_solution_desc")
          }
        >
          {!hasKeyword && <AddNewButton resource={resources.solutions} />}
        </NoDataMessage>
      ) : (
        <>
          <div>
            <AddNewButton resource={resources.solutions} position="end" />

            <SolutionsGrid solutions={solutions} />
          </div>
          {meta && <Pagination meta={meta} onPageChange={setPage} />}
        </>
      )}
    </>
  );
}
