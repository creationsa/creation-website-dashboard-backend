import { EmptyIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { ErrorFallbackProps } from "./types";

export default function ErrorFallback({ onReset }: ErrorFallbackProps) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <EmptyIcon className="size-14 opacity-30 sm:size-20" />

      <h1 className="text-2xl font-semibold">
        {t("general.something_went_wrong")}
      </h1>

      <p className="max-w-sm text-sm text-gray-600 dark:text-gray-500">
        {t("general.error_desc")}
      </p>

      <Button className="w-fit!" onClick={onReset}>
        {t("general.reload_page")}
      </Button>
    </div>
  );
}
