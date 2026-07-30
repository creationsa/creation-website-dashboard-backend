import { routes } from "@/app/navigation/routes";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { PagesCardProps } from "../../types";
import DeletePageButton from "../DeletePageButton";
import { UpdateIcon } from "@/shared/icons";

export default function PagesCard({ page }: PagesCardProps) {
  const { id, title } = page;
  const { t } = useTranslation();

  return (
    <div className="dark:bg-black-700 bg-white-300 overflow-hidden rounded-xl shadow-md drop-shadow-sm">
      <div className="flex items-center justify-between gap-4 p-4">
        <h2 className="font-display font-fancy text-lg font-semibold uppercase">
          {title}
        </h2>

        <div className="flex gap-2 border-s ps-4">
          <Button
            href={`${routes.pagesBuilder}/${id}/update`}
            variation="secondary"
            size="small"
            aria-label={t("general.update")}
            title={t("general.update")}
          >
            <UpdateIcon />
          </Button>
          <DeletePageButton page={page} />
        </div>
      </div>
    </div>
  );
}
