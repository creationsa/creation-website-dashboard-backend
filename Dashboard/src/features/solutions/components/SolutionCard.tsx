import { useLanguage } from "@/shared/hooks/useLanguage";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SolutionCardProps } from "../types";
import DeleteSolutionButton from "./DeleteSolutionButton";

export default function SolutionCard({ solution }: SolutionCardProps) {
  const { id, title, base_image, description } = solution;
  const { t } = useTranslation();
  const currentLanguage = useLanguage();

  return (
    <div className="dark:bg-black-700 bg-white-300 overflow-hidden rounded-xl shadow-md drop-shadow-sm">
      <img
        src={base_image?.media}
        alt={`${base_image?.[currentLanguage]?.alt}`}
        loading="lazy"
        className="aspect-square w-full object-cover"
      />

      <div className="p-4">
        <h2 className="font-display font-fancy text-lg font-semibold">
          {title}
        </h2>

        <p className="min-h-15 text-xs">{description}</p>

        <div className="mt-4 border-t pt-4">
          <div className="ms-auto flex w-full gap-2">
            <Button href={`/solutions/${id}/update`} variation="secondary">
              {t("general.update")}
            </Button>
            <DeleteSolutionButton solution={solution} />
          </div>
        </div>
      </div>
    </div>
  );
}
