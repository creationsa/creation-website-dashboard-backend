import SelectField from "@/shared/ui/selectField";
import { Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import {
  CUSTOM_ACCORDION_TYPES,
  type CustomAccordionFormValues,
} from "./customAccordionSchema";

export default function LayoutType({ form, disabled, index }: SubSectionProps) {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<CustomAccordionFormValues>
    | undefined;

  const layoutOptions = [
    {
      value: CUSTOM_ACCORDION_TYPES.WITH_BUTTON,
      label: t("pages.custom_accordion.layout_with_button"),
    },
    {
      value: CUSTOM_ACCORDION_TYPES.HEADING_ONLY,
      label: t("pages.custom_accordion.layout_heading_only"),
    },
    {
      value: CUSTOM_ACCORDION_TYPES.WITH_MEDIA,
      label: t("pages.custom_accordion.layout_with_media"),
    },
  ];
  return (
    <Controller
      control={control}
      name={`sections.${index}.content.layout_type`}
      render={({ field: { value, onChange } }) => (
        <SelectField
          name={`sections.${index}.content.layout_type`}
          label={t("pages.custom_accordion.layout_type_label")}
          options={layoutOptions}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={sectionErrors?.layout_type?.message}
        />
      )}
    />
  );
}
