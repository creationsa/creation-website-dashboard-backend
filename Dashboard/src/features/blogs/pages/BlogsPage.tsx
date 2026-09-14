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
import BlogsGrid from "../components/BlogsGrid";
import { useBlogs } from "../hooks/useBlogs";

export default function BlogsPage() {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { page, keyword, sort, perPage, setPage, setKeyword, setSort } =
    useListQueryParams();
  const { blogs, meta, isBlogsLoading } = useBlogs(currentLanguage, {
    page,
    per_page: perPage,
    keyword: keyword || undefined,
    sort,
  });

  const isOutOfRange = Boolean(meta && meta.total > 0 && page > meta.last_page);
  usePaginationGuard(meta, page, setPage);

  if (isBlogsLoading || isOutOfRange) return <Spinner size="lg" />;

  const hasKeyword = Boolean(keyword);

  return (
    <>
      <PageTitle title={t("blogs.title")} />
      <ListToolbar
        keyword={keyword}
        onSearch={setKeyword}
        searchPlaceholder={t("general.search_placeholder", {
          title: t("blogs.title"),
        })}
        sort={sort}
        onSortChange={setSort}
      />

      {!blogs?.length ? (
        <NoDataMessage
          title={
            hasKeyword
              ? t("general.no_results_title")
              : t("blogs.no_blog_title")
          }
          desc={
            hasKeyword ? t("general.no_results_desc") : t("blogs.no_blog_desc")
          }
        >
          {!hasKeyword && <AddNewButton resource={resources.blogs} />}
        </NoDataMessage>
      ) : (
        <>
          <div>
            <AddNewButton resource={resources.blogs} position="end" />

            <BlogsGrid blogs={blogs} />
          </div>
          {meta && <Pagination meta={meta} onPageChange={setPage} />}
        </>
      )}
    </>
  );
}
