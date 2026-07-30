import SelectField from "@/shared/ui/selectField";
import Input from "@/shared/ui/textField/Input";
import { Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import {
  FEATURED_LAYOUT_TYPES,
  type ContainedVariant,
  type FeaturedWorksFormValues,
} from "./featuredWorksSchema";

export default function FeaturedLayoutConfigFields({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  const layoutType = watch(`sections.${index}.content.layout_type`);
  const isContained = layoutType === FEATURED_LAYOUT_TYPES.CONTAINED;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<FeaturedWorksFormValues>
    | undefined;

  const containedErrors = sectionErrors as
    | FieldErrors<ContainedVariant>
    | undefined;

  const layoutOptions = [
    {
      label: t("pages.featured_works.layout_contained"),
      value: FEATURED_LAYOUT_TYPES.CONTAINED,
    },
    {
      label: t("pages.featured_works.layout_full_width"),
      value: FEATURED_LAYOUT_TYPES.FULL_WIDTH,
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <Controller
        control={control}
        name={`sections.${index}.content.layout_type`}
        render={({ field }) => (
          <SelectField
            name={field.name}
            label={t("pages.featured_works.layout_type_label")}
            options={layoutOptions}
            value={field.value}
            onChange={(val) => field.onChange(val)}
            disabled={disabled}
            error={sectionErrors?.layout_type?.message as string | undefined}
            placeholder={t("pages.featured_works.layout_type_placeholder")}
          />
        )}
      />

      {isContained && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:gap-5">
          <Input
            name={`sections.${index}.content.action_button_text_en`}
            label={t("pages.featured_works.btn_text_en")}
            error={containedErrors?.action_button_text_en?.message}
            register={register(
              `sections.${index}.content.action_button_text_en`,
            )}
            disabled={disabled}
          />
          <Input
            name={`sections.${index}.content.action_button_text_ar`}
            label={t("pages.featured_works.btn_text_ar")}
            error={containedErrors?.action_button_text_ar?.message}
            register={register(
              `sections.${index}.content.action_button_text_ar`,
            )}
            disabled={disabled}
          />
          <Input
            name={`sections.${index}.content.action_button_slug`}
            label={t("pages.featured_works.btn_slug")}
            error={containedErrors?.action_button_slug?.message}
            register={register(`sections.${index}.content.action_button_slug`)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
