import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { PaginationProps } from "./types";

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { t } = useTranslation();
  const { current_page, last_page, from, to, total } = meta;

  if (last_page <= 1) return null;

  return (
    <div className="dark:bg-black-700 bg-white-300 flex flex-col items-center justify-between gap-3 rounded-xl p-4 shadow sm:flex-row">
      <p className="text-sm text-gray-600 dark:text-gray-500">
        {t("general.showing")}{" "}
        <span className="dark:text-white-100 text-black-100 text-base font-semibold">
          {from}
        </span>{" "}
        {t("general.to")}{" "}
        <span className="dark:text-white-100 text-black-100 text-base font-semibold">
          {to}
        </span>{" "}
        {t("general.of")}{" "}
        <span className="dark:text-white-100 text-black-100 text-base font-semibold">
          {total}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variation="secondary"
          size="small"
          disabled={current_page <= 1}
          onClick={() => onPageChange(current_page - 1)}
          className="w-32!"
        >
          {t("general.previous")}
        </Button>

        <Button
          type="button"
          variation="secondary"
          size="small"
          disabled={current_page >= last_page}
          onClick={() => onPageChange(current_page + 1)}
          className="w-32!"
        >
          {t("general.next")}
        </Button>
      </div>
    </div>
  );
}
