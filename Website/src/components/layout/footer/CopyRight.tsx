import Link from "next/link";
import { CopyRightProps } from "./types";

export default function CopyRight({ locale, data }: CopyRightProps) {
  const text = (data?.copyright_text ?? "").replace(
    "{{year}}",
    new Date().getFullYear().toString(),
  );

  const items = data?.copyright_items ?? [];

  return (
    <div className="flex flex-col justify-between gap-3 py-[30px] sm:flex-row sm:gap-2">
      <span className="block text-sm sm:text-base">{text}</span>

      <span className="text-sm text-gray-600 dark:text-gray-500">
        {items.map(({ key, href, label }, index) => (
          <span key={key}>
            {index > 0 && ", "}
            <Link
              href={`/${locale}/${href}`}
              aria-label={label}
              className="hover:text-tiffany-600 hover:dark:text-tiffany-100 text-sm text-gray-600 capitalize dark:text-gray-500"
            >
              {label}
            </Link>
          </span>
        ))}
      </span>
    </div>
  );
}
