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
import PagesGrid from "../components/pagesGrid";
import { usePages } from "../hooks/usePages";

export default function AllPagesPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { page, keyword, sort, perPage, setPage, setKeyword, setSort } =
    useListQueryParams();
  const { pages, meta, isPagesLoading } = usePages(currentLanguage, {
    page,
    per_page: perPage,
    keyword: keyword || undefined,
    sort,
  });

  const isOutOfRange = Boolean(meta && meta.total > 0 && page > meta.last_page);
  usePaginationGuard(meta, page, setPage);

  if (isPagesLoading || isOutOfRange) return <Spinner size="lg" />;

  const hasKeyword = Boolean(keyword);

  return (
    <>
      <PageTitle title={t("pages.title")} />

      <ListToolbar
        keyword={keyword}
        onSearch={setKeyword}
        searchPlaceholder={t("general.search_placeholder", {
          title: t("pages.title"),
        })}
        sort={sort}
        onSortChange={setSort}
      />

      {!pages?.length ? (
        <NoDataMessage
          title={
            hasKeyword
              ? t("general.no_results_title")
              : t("pages.no_page_title")
          }
          desc={
            hasKeyword ? t("general.no_results_desc") : t("pages.no_page_desc")
          }
        >
          {!hasKeyword && <AddNewButton resource={resources.pages} />}
        </NoDataMessage>
      ) : (
        <>
          <div>
            <AddNewButton resource={resources.pages} position="end" />

            <PagesGrid pages={pages} />
          </div>

          {meta && <Pagination meta={meta} onPageChange={setPage} />}
        </>
      )}
    </>
  );
}
