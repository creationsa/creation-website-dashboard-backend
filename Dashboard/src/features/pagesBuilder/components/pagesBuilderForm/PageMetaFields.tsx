import Switch from "@/shared/ui/Switch";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { PageMetaFieldsProps } from "../../types";
import Box from "@/shared/ui/Box";

const HOME_SLUG = "home";

export default function PageMetaFields({
  form,
  disabled = false,
}: PageMetaFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const isHome = watch("is_home");

  return (
    <Box
      title={t("pages.new_dynamic_page")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="page_title_en"
        label={t("pages.page_title_en")}
        register={register("page_title_en")}
        error={errors.page_title_en?.message}
        disabled={disabled}
      />
      <Input
        name="page_title_ar"
        label={t("pages.page_title_ar")}
        register={register("page_title_ar")}
        error={errors.page_title_ar?.message}
        disabled={disabled}
      />

      <div>
        <Input
          name="page_slug_en"
          label={t("pages.page_slug_en")}
          register={register("page_slug_en")}
          error={errors.page_slug_en?.message}
          disabled={disabled || isHome}
        />
        {isHome && (
          <p className="mt-2 text-xs text-gray-500">
            {t("pages.is_home_slug_hint")}
          </p>
        )}
      </div>

      <Controller
        control={control}
        name="is_home"
        render={({ field }) => (
          <Switch
            name={field.name}
            label={t("pages.is_home_label")}
            checked={field.value}
            onChange={(checked) => {
              field.onChange(checked);
              // The slug becomes meaningless once this page is the
              // homepage — replace it with a fixed, reserved value so
              // the admin never has to think about it again.
              if (checked) {
                setValue("page_slug_en", HOME_SLUG, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }
            }}
            // Once a page is the homepage, it can only be replaced by
            // marking a *different* page as home (which flips this one
            // off automatically on the backend) — never turned off
            // directly here, so there's never a moment with no homepage
            // set.
            disabled={disabled || field.value}
            checkedText={t("pages.is_home_on")}
            uncheckedText={t("pages.is_home_off")}
          />
        )}
      />
    </Box>
  );
}
