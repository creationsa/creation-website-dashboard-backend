import TextArea from "@/shared/ui/textField/TextArea";
import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { DescriptionVariant } from "./mediaContentSchema";

export default function Descriptions({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  const descriptionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<DescriptionVariant>
    | undefined;

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
      <TextArea
        name={`sections.${index}.content.description_en`}
        label={t("pages.media_content_section.description_en")}
        error={descriptionErrors?.description_en?.message}
        register={register(`sections.${index}.content.description_en`)}
        disabled={disabled}
      />
      <TextArea
        name={`sections.${index}.content.description_ar`}
        label={t("pages.media_content_section.description_ar")}
        error={descriptionErrors?.description_ar?.message}
        register={register(`sections.${index}.content.description_ar`)}
        disabled={disabled}
      />
    </div>
  );
}
