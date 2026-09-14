import type { SectionProps } from "@/features/projects/types";
import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import CoverToggle from "../CoverToggle";

const STATS_KEYS = ["one", "two", "three"] as const;

export default function StatsSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Box
      title={t("projects.stats_section")}
      className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
    >
      <div className="rounded-xl border p-4">
        <SmartMediaField
          form={form}
          name="second_cover_media"
          label={t("projects.second_cover_media")}
          disabled={disabled}
        />
        <CoverToggle
          form={form}
          fieldName="second_cover_media"
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-3 lg:gap-5">
        <div className="flex flex-col gap-3 rounded-xl border p-4 md:flex-row lg:gap-5">
          <Input
            name="stats_title_en"
            label={t("projects.stats_title_en")}
            error={errors?.stats_title_en?.message}
            register={register("stats_title_en")}
            disabled={disabled}
          />
          <Input
            name="stats_title_ar"
            label={t("projects.stats_title_ar")}
            error={errors?.stats_title_ar?.message}
            register={register("stats_title_ar")}
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-5">
          {STATS_KEYS.map((key) => {
            const valueName = `stat_${key}_value` as const;
            const labelEnName = `stat_${key}_label_en` as const;
            const labelArName = `stat_${key}_label_ar` as const;

            return (
              <div
                key={key}
                className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
              >
                <Input
                  name={valueName}
                  label={t(`projects.${valueName}`)}
                  error={errors?.[valueName]?.message}
                  register={register(valueName)}
                  disabled={disabled}
                />
                <Input
                  name={labelEnName}
                  label={t(`projects.${labelEnName}`)}
                  error={errors?.[labelEnName]?.message}
                  register={register(labelEnName)}
                  disabled={disabled}
                />
                <Input
                  name={labelArName}
                  label={t(`projects.${labelArName}`)}
                  error={errors?.[labelArName]?.message}
                  register={register(labelArName)}
                  disabled={disabled}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
}
