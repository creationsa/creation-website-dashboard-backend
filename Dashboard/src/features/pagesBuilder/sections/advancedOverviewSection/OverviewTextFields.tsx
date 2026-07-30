import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { SubSectionProps } from "../../types";
import type { AdvancedOverviewFormValues } from "./advancedOverviewSchema";

export default function OverviewTextFields({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<AdvancedOverviewFormValues>
    | undefined;

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        {/* UPPER DESCRIPTION */}
        <TextArea
          name={`sections.${index}.content.upper_description_en`}
          label={t("pages.advanced_overview_section.upper_description_en")}
          error={sectionErrors?.upper_description_en?.message}
          register={register(`sections.${index}.content.upper_description_en`)}
          disabled={disabled}
        />

        <TextArea
          name={`sections.${index}.content.upper_description_ar`}
          label={t("pages.advanced_overview_section.upper_description_ar")}
          error={sectionErrors?.upper_description_ar?.message}
          register={register(`sections.${index}.content.upper_description_ar`)}
          disabled={disabled}
        />

        {/* LOWER DESCRIPTION */}
        <TextArea
          name={`sections.${index}.content.lower_description_en`}
          label={t("pages.advanced_overview_section.lower_description_en")}
          error={sectionErrors?.lower_description_en?.message}
          register={register(`sections.${index}.content.lower_description_en`)}
          disabled={disabled}
        />

        <TextArea
          name={`sections.${index}.content.lower_description_ar`}
          label={t("pages.advanced_overview_section.lower_description_ar")}
          error={sectionErrors?.lower_description_ar?.message}
          register={register(`sections.${index}.content.lower_description_ar`)}
          disabled={disabled}
        />
      </div>
      {/* OVERLAY / FLOATING BADGE FIELDS */}
      <SubHeadTitle
        title={t("pages.advanced_overview_section.overlay_section_title")}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name={`sections.${index}.content.overlay_label_number`}
          label={t("pages.advanced_overview_section.overlay_label_number")}
          error={sectionErrors?.overlay_label_number?.message}
          register={register(`sections.${index}.content.overlay_label_number`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.overlay_label_title_en`}
          label={t("pages.advanced_overview_section.overlay_label_title_en")}
          error={sectionErrors?.overlay_label_title_en?.message}
          register={register(
            `sections.${index}.content.overlay_label_title_en`,
          )}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.overlay_label_title_ar`}
          label={t("pages.advanced_overview_section.overlay_label_title_ar")}
          error={sectionErrors?.overlay_label_title_ar?.message}
          register={register(
            `sections.${index}.content.overlay_label_title_ar`,
          )}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
