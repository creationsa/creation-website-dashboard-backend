import Input from "@/shared/ui/textField/Input";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { WithButtonVariant } from "./customAccordionSchema";

export default function AccordionWithButton({
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
    | FieldErrors<WithButtonVariant>
    | undefined;
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-3 lg:gap-5">
      <Input
        name={`sections.${index}.content.action_button_text_en`}
        label={t("pages.custom_accordion.action_text_en")}
        error={sectionErrors?.action_button_text_en?.message}
        register={register(`sections.${index}.content.action_button_text_en`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.action_button_text_ar`}
        label={t("pages.custom_accordion.action_text_ar")}
        error={sectionErrors?.action_button_text_ar?.message}
        register={register(`sections.${index}.content.action_button_text_ar`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.action_button_slug`}
        label={t("pages.custom_accordion.action_slug")}
        error={sectionErrors?.action_button_slug?.message}
        register={register(`sections.${index}.content.action_button_slug`)}
        disabled={disabled}
      />
    </div>
  );
}
