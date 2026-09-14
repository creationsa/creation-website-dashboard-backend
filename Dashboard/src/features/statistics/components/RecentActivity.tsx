import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { RecentActivityProps } from "../types";
import { TYPE_CONFIG } from "../data/typeConfig";

export default function RecentActivity({ items }: RecentActivityProps) {
  const { t, i18n } = useTranslation();

  const dateFormatter = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Box title={t("statistics.recent_activity")}>
      {items.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-500">
          {t("statistics.no_recent_activity")}
        </p>
      ) : (
        <ul className="divide-border-800 dark:divide-border-900 flex flex-col divide-y">
          {items.map((item) => {
            const config = TYPE_CONFIG[item.type];
            const Icon = config.icon;

            return (
              <li key={`${item.type}-${item.id}`}>
                <Link
                  to={config.href(item.id)}
                  className="hover:text-tiffany-600 dark:hover:text-tiffany-100 flex items-center gap-4 py-3"
                >
                  <Icon className="size-5 shrink-0" />

                  <span className="flex-1 truncate">{item.title}</span>

                  <span className="shrink-0 text-xs text-gray-600 uppercase dark:text-gray-500">
                    {t(config.labelKey)}
                  </span>

                  <span className="shrink-0 text-xs text-gray-600 dark:text-gray-500">
                    {t("statistics.updated")}{" "}
                    {dateFormatter.format(new Date(item.updated_at))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
}
