import MainTitle from "@/components/ui/MainTitle";
import Link from "next/link";
import { ProjectMenusProps } from "./types";

export default function ProjectMenus({
  mainFooterTitle,
  locale,
  menuItems,
}: ProjectMenusProps) {
  return (
    <div>
      <MainTitle title={mainFooterTitle} />

      <ul className="flex min-h-[25px] flex-wrap gap-2 sm:min-h-0 sm:gap-3">
        {menuItems?.map(({ key, href, label }) => (
          <li key={key}>
            <Link
              href={`/${locale}/${href}`}
              aria-label={label}
              className="group hover:text-tiffany-600 dark:hover:text-tiffany-100 text-xs text-gray-600 capitalize transition-all duration-200 sm:text-base dark:text-gray-500"
            >
              <span className="relative">
                {label}

                {/* subtle underline animation */}
                <span className="absolute start-0 bottom-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
