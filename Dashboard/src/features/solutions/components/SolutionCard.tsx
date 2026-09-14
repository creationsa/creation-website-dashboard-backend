import { useLanguage } from "@/shared/hooks/useLanguage";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SolutionCardProps } from "../types";
import DeleteSolutionButton from "./DeleteSolutionButton";

export default function SolutionCard({ solution }: SolutionCardProps) {
  const { id, title, slug, base_image, description } = solution;
  const { t } = useTranslation();
  const currentLanguage = useLanguage();

  return (
    <div className="group border-border-800 dark:border-border-900 bg-white-200 dark:bg-black-800 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="bg-white-300 dark:bg-black-700 flex h-32 w-full items-center justify-center">
        <img
          src={base_image?.media}
          alt={`${base_image?.[currentLanguage]?.alt}`}
          loading="lazy"
          className="size-12 object-contain sm:size-14"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h2 className="font-display font-fancy line-clamp-2 text-lg font-semibold">
            {title}
          </h2>
          <p className="mt-1 truncate text-xs text-gray-500">/{slug}</p>
          <p className="mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-500">
            {description}
          </p>
        </div>

        <div className="mt-auto flex gap-2 border-t pt-4">
          <Button
            href={`/solutions/${id}/update`}
            variation="secondary"
            size="small"
          >
            {t("general.update")}
          </Button>
          <DeleteSolutionButton solution={solution} />
        </div>
      </div>
    </div>
  );
}
