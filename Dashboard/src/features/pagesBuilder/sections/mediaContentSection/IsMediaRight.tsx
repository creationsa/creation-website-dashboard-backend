import Switch from "@/shared/ui/Switch";
import { Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { MediaContentFormValues } from "./mediaContentSchema";

export default function IsMediaRight({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<MediaContentFormValues>
    | undefined;

  return (
    <Controller
      control={control}
      name={`sections.${index}.content.is_media_right`}
      render={({ field: { value, onChange } }) => (
        <Switch
          name={`sections.${index}.content.is_media_right`}
          label={t("pages.media_content_section.direction_label")}
          checked={value}
          onChange={onChange}
          disabled={disabled}
          error={sectionErrors?.is_media_right?.message as string}
          checkedText={t("pages.media_content_section.dir_media_right")}
          uncheckedText={t("pages.media_content_section.dir_media_left")}
        />
      )}
    />
  );
}
