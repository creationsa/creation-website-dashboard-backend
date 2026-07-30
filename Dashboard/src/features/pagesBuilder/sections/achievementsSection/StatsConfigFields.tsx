import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { AchievementsFormValues } from "./achievementsSchema";

export default function StatsConfigFields({
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
    | FieldErrors<AchievementsFormValues>
    | undefined;

  const statIndexes = [1, 2, 3, 4] as const;

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {statIndexes.map((num) => (
          <div
            key={num}
            className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
          >
            <span className="text-xs font-bold text-gray-400">
              {t("pages.item_row", { index: num })}
            </span>
            <Input
              name={`stat_${num}_number`}
              label={t("pages.achievements.stat_number")}
              error={sectionErrors?.[`stat_${num}_number`]?.message}
              register={register(
                `sections.${index}.content.stat_${num}_number`,
              )}
              disabled={disabled}
            />
            <Input
              name={`stat_${num}_label_en`}
              label={t("pages.achievements.stat_label_en")}
              error={sectionErrors?.[`stat_${num}_label_en`]?.message}
              register={register(
                `sections.${index}.content.stat_${num}_label_en`,
              )}
              disabled={disabled}
            />
            <Input
              name={`stat_${num}_label_ar`}
              label={t("pages.achievements.stat_label_ar")}
              error={sectionErrors?.[`stat_${num}_label_ar`]?.message}
              register={register(
                `sections.${index}.content.stat_${num}_label_ar`,
              )}
              disabled={disabled}
            />
          </div>
        ))}
      </div>

      {/* Vision Long Description */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name={`sections.${index}.content.description_en`}
          label={t("pages.achievements.description_en")}
          error={sectionErrors?.description_en?.message}
          register={register(`sections.${index}.content.description_en`)}
          disabled={disabled}
        />
        <TextArea
          name={`sections.${index}.content.description_ar`}
          label={t("pages.achievements.description_ar")}
          error={sectionErrors?.description_ar?.message}
          register={register(`sections.${index}.content.description_ar`)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
