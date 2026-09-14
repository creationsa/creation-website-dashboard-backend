import { MinusIcon, PlusIcon } from "@/shared/icons";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface CollapsibleBoxProps {
  title: string;
  children: ReactNode;
  defaultCollapsed?: boolean;
}

export default function CollapsibleBox({
  title,
  children,
  defaultCollapsed = false,
}: CollapsibleBoxProps) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <section className="dark:bg-black-800 bg-white-100 rounded-xl border shadow-md">
      <div
        className={`relative flex items-center justify-between gap-3 p-4 ${isCollapsed ? "" : "border-b"}`}
      >
        <span className="font-display font-fancy bg-white-200 dark:bg-black-800 absolute inset-s-6 -top-5 px-2 py-1 text-2xl font-semibold uppercase">
          {title}
        </span>

        <Button
          type="button"
          size="small"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={
            isCollapsed
              ? t("pages.expand_section")
              : t("pages.collapse_section")
          }
          title={
            isCollapsed
              ? t("pages.expand_section")
              : t("pages.collapse_section")
          }
          className="ms-auto! w-fit!"
        >
          {isCollapsed ? <PlusIcon /> : <MinusIcon />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col gap-3 p-4 lg:gap-5">{children}</div>
      )}
    </section>
  );
}
