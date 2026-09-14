import { useEffect } from "react";
import type { PaginationMeta } from "@/shared/types/pagination";

export function usePaginationGuard(
  meta: PaginationMeta | undefined,
  page: number,
  setPage: (page: number) => void,
) {
  useEffect(() => {
    if (meta && meta.total > 0 && page > meta.last_page) {
      setPage(meta.last_page);
    }
  }, [meta, page, setPage]);
}
