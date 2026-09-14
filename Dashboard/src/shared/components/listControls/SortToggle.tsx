import SelectField from "@/shared/ui/selectField";
import type { SortDirection } from "@/shared/types/pagination";
import { useTranslation } from "react-i18next";
import type { SortToggleProps } from "./types";

export default function SortToggle({ sort, onChange }: SortToggleProps) {
  const { t } = useTranslation();

  const options = [
    { value: "desc", label: t("general.newest_first") },
    { value: "asc", label: t("general.oldest_first") },
  ];

  return (
    <div className="w-full sm:w-56">
      <SelectField
        name="sort"
        label=""
        options={options}
        value={sort}
        onChange={(value) => onChange((value as SortDirection) ?? "desc")}
      />
    </div>
  );
}
