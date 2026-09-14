import Input from "@/shared/ui/textField/Input";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { WithMediaVariant } from "./customAccordionSchema";

export default function AccordionSideLabel({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    formState: { errors },
    register,
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<WithMediaVariant>
    | undefined;

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-2 lg:gap-5">
      <Input
        name={`sections.${index}.content.side_label_en`}
        label={t("pages.custom_accordion.side_label_en")}
        error={sectionErrors?.side_label_en?.message}
        register={register(`sections.${index}.content.side_label_en`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.side_label_ar`}
        label={t("pages.custom_accordion.side_label_ar")}
        error={sectionErrors?.side_label_ar?.message}
        register={register(`sections.${index}.content.side_label_ar`)}
        disabled={disabled}
      />
    </div>
  );
}
