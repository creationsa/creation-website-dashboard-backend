import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE_SIZE } from "@/shared/constants/constants";
import type { SortDirection } from "@/shared/types/pagination";

export function useListQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const keyword = searchParams.get("keyword") ?? "";
  const sort: SortDirection = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const setPage = useCallback(
    (nextPage: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(nextPage));
        return next;
      });
    },
    [setSearchParams],
  );

  const setKeyword = useCallback(
    (nextKeyword: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (nextKeyword) next.set("keyword", nextKeyword);
        else next.delete("keyword");
        next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (nextSort: SortDirection) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("sort", nextSort);
        next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  return useMemo(
    () => ({
      page,
      keyword,
      sort,
      perPage: DEFAULT_PAGE_SIZE,
      setPage,
      setKeyword,
      setSort,
    }),
    [page, keyword, sort, setPage, setKeyword, setSort],
  );
}
