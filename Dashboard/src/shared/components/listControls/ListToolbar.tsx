import SearchInput from "./SearchInput";
import SortToggle from "./SortToggle";
import type { ListToolbarProps } from "./types";

export default function ListToolbar({
  keyword,
  onSearch,
  searchPlaceholder,
  sort,
  onSortChange,
}: ListToolbarProps) {
  return (
    <div className="dark:bg-black-700 bg-white-300 flex flex-col gap-3 rounded-xl p-4 shadow sm:flex-row sm:items-center sm:justify-between">
      <SearchInput
        value={keyword}
        onSearch={onSearch}
        placeholder={searchPlaceholder}
      />
      <SortToggle sort={sort} onChange={onSortChange} />
    </div>
  );
}
