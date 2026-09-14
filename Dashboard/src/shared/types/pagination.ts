export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export type SortDirection = "asc" | "desc";

export interface ListQueryParams {
  page: number;
  per_page: number;
  keyword?: string;
  sort: SortDirection;
}
