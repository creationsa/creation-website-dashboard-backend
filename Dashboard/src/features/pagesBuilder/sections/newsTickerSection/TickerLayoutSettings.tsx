import Switch from "@/shared/ui/Switch";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";

export default function TickerLayoutSettings({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const { control } = form;

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
      <Controller
        control={control}
        name={`sections.${index}.content.has_container`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Switch
            name={`sections.${index}.content.has_container`}
            label={t("pages.news_ticker.container_toggle_label")}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            error={error?.message}
            checkedText={t("pages.news_ticker.container_enabled")}
            uncheckedText={t("pages.news_ticker.container_disabled")}
          />
        )}
      />

      <Controller
        control={control}
        name={`sections.${index}.content.has_border`}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Switch
            name={`sections.${index}.content.has_border`}
            label={t("pages.news_ticker.border_toggle_label")}
            checked={value}
            onChange={onChange}
            disabled={disabled}
            error={error?.message}
            checkedText={t("pages.news_ticker.border_enabled")}
            uncheckedText={t("pages.news_ticker.border_disabled")}
          />
        )}
      />
    </div>
  );
}
