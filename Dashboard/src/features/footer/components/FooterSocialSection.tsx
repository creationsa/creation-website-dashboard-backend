import { useGetSettings } from "@/features/settings/hooks/useGetSettings";
import { useLanguage } from "@/shared/hooks/useLanguage";
import Box from "@/shared/ui/Box";
import SelectField from "@/shared/ui/selectField";
import Input from "@/shared/ui/textField/Input";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

export default function FooterSocialSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { settings } = useGetSettings();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const options = useMemo(
    () =>
      settings?.socials
        ?.filter((social) => social.id !== undefined)
        .map((social) => ({
          label:
            currentLanguage === "ar" ? social.title_ar : social.title_en,
          value: social.id as number,
        })) ?? [],
    [settings, currentLanguage],
  );

  return (
    <Box
      title={t("footer.social_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="social_title_en"
          label={t("footer.social_title_en")}
          error={errors?.social_title_en?.message}
          register={register("social_title_en")}
          disabled={disabled}
        />
        <Input
          name="social_title_ar"
          label={t("footer.social_title_ar")}
          error={errors?.social_title_ar?.message}
          register={register("social_title_ar")}
          disabled={disabled}
        />
      </div>
      <Controller
        control={control}
        name="social_items"
        render={({ field }) => (
          <SelectField
            isMulti
            name="social_items"
            label={t("footer.social_items_label")}
            options={options}
            value={field.value.map((item) => item.setting_social_id)}
            onChange={(selected) =>
              field.onChange(
                selected.map((id) => ({ setting_social_id: Number(id) })),
              )
            }
            placeholder={t("footer.choose_socials")}
            disabled={disabled}
          />
        )}
      />
    </Box>
  );
}
