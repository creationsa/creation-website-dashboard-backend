import Link from "next/link";
import { CopyrightItemsListProps } from "./types";

export default function CopyrightItemsList({
  items,
  locale,
  className = "text-sm text-gray-600 dark:text-gray-500",
  onItemClick,
}: CopyrightItemsListProps) {
  return (
    <span className={className}>
      {items.map(({ key, href, label }, index) => (
        <span key={key}>
          {index > 0 && (locale === "en" ? ", " : "، ")}
          <Link
            href={`/${locale}/${href}`}
            aria-label={label}
            onClick={onItemClick}
            className="hover:text-tiffany-600 hover:dark:text-tiffany-100 text-sm text-gray-600 capitalize dark:text-gray-500"
          >
            {label}
          </Link>
        </span>
      ))}
    </span>
  );
}
