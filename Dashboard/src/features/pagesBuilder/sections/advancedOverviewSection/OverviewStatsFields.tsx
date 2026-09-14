import Input from "@/shared/ui/textField/Input";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { SubSectionProps } from "../../types";
import type { AdvancedOverviewFormValues } from "./advancedOverviewSchema";

export default function OverviewStatsFields({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<AdvancedOverviewFormValues>
    | undefined;

  const statIndexes = [1, 2, 3, 4] as const;

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <SubHeadTitle
        title={t("pages.advanced_overview_section.stats_section_title")}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {statIndexes.map((num) => (
          <div
            key={num}
            className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
          >
            <Input
              name={`stat${num}_number_en`}
              label={t(`pages.advanced_overview_section.stat_number_en`, {
                num,
              })}
              error={sectionErrors?.[`stat${num}_number_en`]?.message}
              register={register(
                `sections.${index}.content.stat${num}_number_en`,
              )}
              disabled={disabled}
            />
            <Input
              name={`stat${num}_number_ar`}
              label={t(`pages.advanced_overview_section.stat_number_ar`, {
                num,
              })}
              error={sectionErrors?.[`stat${num}_number_ar`]?.message}
              register={register(
                `sections.${index}.content.stat${num}_number_ar`,
              )}
              disabled={disabled}
            />
            <Input
              name={`stat${num}_label_en`}
              label={t(`pages.advanced_overview_section.stat_label_en`, {
                num,
              })}
              error={sectionErrors?.[`stat${num}_label_en`]?.message}
              register={register(
                `sections.${index}.content.stat${num}_label_en`,
              )}
              disabled={disabled}
            />
            <Input
              name={`stat${num}_label_ar`}
              label={t(`pages.advanced_overview_section.stat_label_ar`, {
                num,
              })}
              error={sectionErrors?.[`stat${num}_label_ar`]?.message}
              register={register(
                `sections.${index}.content.stat${num}_label_ar`,
              )}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
