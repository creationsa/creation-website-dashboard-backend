import Switch from "@/shared/ui/Switch";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import type { CoverToggleProps } from "../../types";

export default function CoverToggle({
  form,
  fieldName,
  disabled,
}: CoverToggleProps) {
  const { t } = useTranslation();
  const { watch, setValue } = form;

  const hasFile = !!watch(fieldName)?.file;
  const isCover = watch("cover_media_field") === fieldName;
  const isFeature = watch("feature_media_field") === fieldName;

  return (
    <div className="mt-3 grid grid-cols-1 gap-3 border-t pt-3 md:grid-cols-2 lg:gap-5">
      <Switch
        name={`${fieldName}_cover`}
        label={t("projects.use_as_all_projects_cover")}
        checked={isCover}
        disabled={disabled || !hasFile}
        onChange={(checked) => {
          if (!checked) {
            toast(t("projects.cover_toggle_noop_hint"));
            return;
          }
          setValue("cover_media_field", fieldName, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        checkedText={t("projects.selected_as_cover")}
        uncheckedText={t("projects.not_selected_as_cover")}
      />

      <Switch
        name={`${fieldName}_feature`}
        label={t("projects.use_as_feature_image")}
        checked={isFeature}
        disabled={disabled || !hasFile}
        onChange={(checked) => {
          if (!checked) {
            toast(t("projects.feature_toggle_noop_hint"));
            return;
          }
          setValue("feature_media_field", fieldName, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        checkedText={t("projects.selected_as_cover")}
        uncheckedText={t("projects.not_selected_as_cover")}
      />
    </div>
  );
}
