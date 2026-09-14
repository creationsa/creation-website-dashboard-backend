import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CARDS } from "../data/cards";
import type { OverviewCardsProps } from "../types";

export default function OverviewCards({ counts }: OverviewCardsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {CARDS.map(({ key, label, href, icon: Icon }) => (
        <Link
          key={key}
          to={href}
          className="border-border-800 dark:border-border-900 hover:border-tiffany-600 dark:hover:border-tiffany-100 dark:hover:bg-black-700 hover:bg-white-300 flex flex-col gap-3 rounded-xl border p-5 shadow-md drop-shadow-sm transition-colors duration-300"
        >
          <Icon className="text-tiffany-600 dark:text-tiffany-100 size-7" />

          <span className="text-3xl font-semibold">{counts[key]}</span>

          <span className="text-sm text-gray-600 uppercase dark:text-gray-500">
            {t(label)}
          </span>
        </Link>
      ))}
    </div>
  );
}
