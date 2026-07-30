import { useLanguage } from "@/shared/hooks/useLanguage";
import Button from "@/shared/ui/Button";
import { formatDate } from "@/shared/utils/helpers";
import { useTranslation } from "react-i18next";
import type { BlogCardProps } from "../types";
import DeleteBlogButton from "./DeleteBlogButton";

export default function BlogCard({ blog }: BlogCardProps) {
  const { id, title, base_image, created_at } = blog;
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
        <h2 className="font-display font-fancy min-h-15 text-lg font-semibold">
          {title}
        </h2>

        <span className="ms-auto mt-2 block w-fit text-xs text-gray-600 dark:text-gray-500">
          {formatDate(created_at, currentLanguage)}
        </span>
        <div className="mt-4 border-t pt-4">
          <div className="ms-auto flex w-full gap-2">
            <Button href={`/blogs/${id}/update`} variation="secondary">
              {t("general.update")}
            </Button>
            <DeleteBlogButton blog={blog} />
          </div>
        </div>
      </div>
    </div>
  );
}
