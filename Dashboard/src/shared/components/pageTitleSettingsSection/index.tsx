import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { PageTitleSettingsSectionFormValues } from "./PageTitleSettingsSectionSchema";
import type { PageTitleSettingsSectionProps } from "./types";

export default function PageTitleSettingsSection<
  T extends FieldValues & PageTitleSettingsSectionFormValues,
>({ form, disabled }: PageTitleSettingsSectionProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  const SlugError = errors?.slug_en?.message as string | undefined;
  const NavTitleEnError = errors?.nav_title_en?.message as string | undefined;
  const NavTitleArError = errors?.nav_title_ar?.message as string | undefined;

  const { t } = useTranslation();

  return (
    <Box
      title={t("general.page_title_settings")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      <Input
        name="nav_title_en"
        label={t("projects.nav_title_en")}
        error={NavTitleEnError}
        register={register("nav_title_en" as Path<T>)}
        disabled={disabled}
      />
      <Input
        name="nav_title_ar"
        label={t("projects.nav_title_ar")}
        error={NavTitleArError}
        register={register("nav_title_ar" as Path<T>)}
        disabled={disabled}
      />

      <p className="text-xs text-gray-500 md:col-span-2">
        {t("general.nav_title_hint")}
      </p>

      <Input
        name="slug_en"
        label={t("blogs.slug_en")}
        error={SlugError}
        register={register("slug_en" as Path<T>)}
        disabled={disabled}
      />
    </Box>
  );
}
