import type { PaginationMeta } from "@/shared/types/pagination";

export interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}
