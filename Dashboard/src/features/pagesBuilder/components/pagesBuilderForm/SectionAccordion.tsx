import { ChevronDownIcon, MinusIcon, PlusIcon } from "@/shared/icons";
import Button from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import type { SectionAccordionProps } from "../../types";
import DeleteSectionButton from "./DeleteSectionButton";

export default function SectionAccordion({
  title,
  isCollapsed,
  onToggleCollapse,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  onRemove,
  disabled,
  children,
}: SectionAccordionProps) {
  const { t } = useTranslation();

  return (
    <section className="dark:bg-black-800 bg-white-100 rounded-xl border shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <div className="flex items-center justify-center gap-3">
          <Button
            type="button"
            variation="secondary"
            size="small"
            onClick={onMoveUp}
            disabled={disabled || !canMoveUp}
            aria-label={t("pages.move_section_up")}
            title={t("pages.move_section_up")}
            className="w-fit!"
          >
            <ChevronDownIcon className="size-4 rotate-180 sm:size-6" />
          </Button>

          <Button
            type="button"
            variation="secondary"
            size="small"
            onClick={onMoveDown}
            disabled={disabled || !canMoveDown}
            aria-label={t("pages.move_section_down")}
            title={t("pages.move_section_down")}
            className="w-fit!"
          >
            <ChevronDownIcon />
          </Button>
          <span className="font-display font-fancy text-lg font-semibold uppercase">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DeleteSectionButton onRemove={onRemove} disabled={disabled} />

          <Button
            type="button"
            size="small"
            onClick={onToggleCollapse}
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
            className="w-fit!"
          >
            {isCollapsed ? <PlusIcon /> : <MinusIcon />}
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col gap-3 p-4 lg:gap-5">{children}</div>
      )}
    </section>
  );
}
