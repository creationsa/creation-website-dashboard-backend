import { useLanguage } from "@/shared/hooks/useLanguage";
import Button from "@/shared/ui/Button";
import { formatDate } from "@/shared/utils/helpers";
import { useTranslation } from "react-i18next";
import type { BlogCardProps } from "../types";
import DeleteBlogButton from "./DeleteBlogButton";

export default function BlogCard({ blog }: BlogCardProps) {
  const { id, title, slug, base_image, created_at } = blog;
  const { t } = useTranslation();
  const currentLanguage = useLanguage();

  return (
    <div className="group border-border-800 dark:border-border-900 bg-white-200 dark:bg-black-800 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={base_image?.media}
          alt={`${base_image?.[currentLanguage]?.alt}`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h2 className="font-display font-fancy line-clamp-2 text-lg font-semibold">
            {title}
          </h2>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="truncate text-xs text-gray-500">/{slug}</p>
            <span className="shrink-0 text-xs text-gray-500">
              {formatDate(created_at, currentLanguage)}
            </span>
          </div>
        </div>

        <div className="mt-auto flex gap-2 border-t pt-4">
          <Button
            href={`/blogs/${id}/update`}
            variation="secondary"
            size="small"
          >
            {t("general.update")}
          </Button>
          <DeleteBlogButton blog={blog} />
        </div>
      </div>
    </div>
  );
}
