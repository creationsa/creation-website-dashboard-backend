import type { SortDirection } from "@/shared/types/pagination";

export interface SearchInputProps {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export interface SortToggleProps {
  sort: SortDirection;
  onChange: (sort: SortDirection) => void;
}

export interface ListToolbarProps {
  keyword: string;
  onSearch: (value: string) => void;
  searchPlaceholder: string;
  sort: SortDirection;
  onSortChange: (sort: SortDirection) => void;
}
