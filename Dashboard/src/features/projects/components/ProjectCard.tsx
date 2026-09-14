import { useLanguage } from "@/shared/hooks/useLanguage";
import { PlayIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { ProjectCardProps } from "../types";
import DeleteProjectButton from "./DeleteProjectButton";

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, slug, base_image } = project;
  const { t } = useTranslation();
  const currentLanguage = useLanguage();

  return (
    <div className="group border-border-800 dark:border-border-900 bg-white-200 dark:bg-black-800 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={
            base_image?.type === "video" ? base_image.poster : base_image?.media
          }
          alt={`${base_image?.[currentLanguage]?.alt}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {base_image?.type === "video" && (
          <span className="bg-black-800/70 absolute inset-e-3 top-3 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <PlayIcon className="size-3" />
            {t("projects.video_badge")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h2 className="font-display font-fancy line-clamp-2 text-lg font-semibold">
            {title}
          </h2>
          <p className="mt-1 truncate text-xs text-gray-500">/{slug}</p>
        </div>

        <div className="mt-auto flex gap-2 border-t pt-4">
          <Button
            href={`/projects/${id}/update`}
            variation="secondary"
            size="small"
          >
            {t("general.update")}
          </Button>
          <DeleteProjectButton project={project} />
        </div>
      </div>
    </div>
  );
}
