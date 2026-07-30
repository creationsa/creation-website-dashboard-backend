import SelectField from "@/shared/ui/selectField";
import { Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import {
  MEDIA_CONTENT_TYPES,
  type MediaContentFormValues,
} from "./mediaContentSchema";

export default function ContentType({
  form,
  disabled,
  index,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<MediaContentFormValues>
    | undefined;

  const contentTypeOptions = [
    {
      value: MEDIA_CONTENT_TYPES.DESCRIPTION,
      label: t("pages.media_content_section.type_description"),
    },
    {
      value: MEDIA_CONTENT_TYPES.ACCORDION,
      label: t("pages.media_content_section.type_accordion"),
    },
    {
      value: MEDIA_CONTENT_TYPES.LIST,
      label: t("pages.media_content_section.type_list"),
    },
  ];
  return (
    <Controller
      control={control}
      name={`sections.${index}.content.content_type`}
      render={({ field: { value, onChange } }) => (
        <SelectField
          name={`sections.${index}.content.content_type`}
          label={t("pages.media_content_section.content_type_label")}
          options={contentTypeOptions}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={sectionErrors?.content_type?.message}
        />
      )}
    />
  );
}
