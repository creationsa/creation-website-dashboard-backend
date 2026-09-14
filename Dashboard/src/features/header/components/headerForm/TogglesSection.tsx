import Box from "@/shared/ui/Box";
import Switch from "@/shared/ui/Switch";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../types";

export default function TogglesSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();
  const { control } = form;

  return (
    <Box
      title={t("header.toggles_section")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      <Controller
        control={control}
        name="show_language_switch"
        render={({ field }) => (
          <Switch
            name={field.name}
            label={t("header.language_switch")}
            checked={field.value}
            onChange={field.onChange}
            disabled={disabled}
            checkedText={t("header.visible")}
            uncheckedText={t("header.hidden")}
          />
        )}
      />

      <Controller
        control={control}
        name="show_theme_switch"
        render={({ field }) => (
          <Switch
            name={field.name}
            label={t("header.theme_switch")}
            checked={field.value}
            onChange={field.onChange}
            disabled={disabled}
            checkedText={t("header.visible")}
            uncheckedText={t("header.hidden")}
          />
        )}
      />
    </Box>
  );
}
