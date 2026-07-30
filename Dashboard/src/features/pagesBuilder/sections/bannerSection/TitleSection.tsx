import Input from "@/shared/ui/textField/Input";
import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { BannerFormValues } from "./bannerSchema";

export default function TitleSection({
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
    | FieldErrors<BannerFormValues>
    | undefined;

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
      <Input
        name={`sections.${index}.content.first_title_en`}
        label={t("general.first_title_part_en")}
        error={sectionErrors?.first_title_en?.message}
        register={register(`sections.${index}.content.first_title_en`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.first_title_ar`}
        label={t("general.first_title_part_ar")}
        error={sectionErrors?.first_title_ar?.message}
        register={register(`sections.${index}.content.first_title_ar`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.second_title_en`}
        label={t("general.second_title_part_en")}
        error={sectionErrors?.second_title_en?.message}
        register={register(`sections.${index}.content.second_title_en`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.second_title_ar`}
        label={t("general.second_title_part_ar")}
        error={sectionErrors?.second_title_ar?.message}
        register={register(`sections.${index}.content.second_title_ar`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.third_title_en`}
        label={t("general.third_title_part_en")}
        error={sectionErrors?.third_title_en?.message}
        register={register(`sections.${index}.content.third_title_en`)}
        disabled={disabled}
      />
      <Input
        name={`sections.${index}.content.third_title_ar`}
        label={t("general.third_title_part_ar")}
        error={sectionErrors?.third_title_ar?.message}
        register={register(`sections.${index}.content.third_title_ar`)}
        disabled={disabled}
      />
    </div>
  );
}
