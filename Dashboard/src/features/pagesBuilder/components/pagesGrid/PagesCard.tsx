import { routes } from "@/app/navigation/routes";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { PagesCardProps } from "../../types";
import DeletePageButton from "../DeletePageButton";

export default function PagesCard({ page }: PagesCardProps) {
  const { id, title, is_home } = page;
  const { t } = useTranslation();

  return (
    <div className="group border-border-800 dark:border-border-900 bg-white-200 dark:bg-black-800 flex flex-col gap-6 overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-display font-fancy line-clamp-2 text-lg font-semibold uppercase">
          {title}
        </h2>

        {is_home && (
          <span className="bg-tiffany-600/10 text-tiffany-600 dark:bg-tiffany-100/10 dark:text-tiffany-100 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">
            {t("pages.is_home_label")}
          </span>
        )}
      </div>

      <div className="mt-auto flex gap-2 border-t pt-4">
        <Button
          href={`${routes.pagesBuilder}/${id}/update`}
          variation="secondary"
          size="small"
        >
          {t("general.update")}
        </Button>
        <DeletePageButton page={page} />
      </div>
    </div>
  );
}
