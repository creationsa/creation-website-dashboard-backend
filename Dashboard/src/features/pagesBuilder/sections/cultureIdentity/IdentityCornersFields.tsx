import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { SubComponentProps } from "./types";

export default function IdentityCornersFields({
  form,
  index,
  disabled,
  sectionErrors,
}: SubComponentProps) {
  const { register } = form;
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <SubHeadTitle title={t("pages.culture_identity.top_left_corner")} />
        <Input
          name={`sections.${index}.content.top_left_text_en`}
          label={t("pages.culture_identity.text_en")}
          error={sectionErrors?.top_left_text_en?.message}
          register={register(`sections.${index}.content.top_left_text_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_left_text_ar`}
          label={t("pages.culture_identity.text_ar")}
          error={sectionErrors?.top_left_text_ar?.message}
          register={register(`sections.${index}.content.top_left_text_ar`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_left_second_text_en`}
          label={t("pages.culture_identity.second_text_en")}
          error={sectionErrors?.top_left_second_text_en?.message}
          register={register(
            `sections.${index}.content.top_left_second_text_en`,
          )}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_left_second_text_ar`}
          label={t("pages.culture_identity.second_text_ar")}
          error={sectionErrors?.top_left_second_text_ar?.message}
          register={register(
            `sections.${index}.content.top_left_second_text_ar`,
          )}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <SubHeadTitle title={t("pages.culture_identity.top_right_corner")} />
        <Input
          name={`sections.${index}.content.top_right_text_en`}
          label={t("pages.culture_identity.text_en")}
          error={sectionErrors?.top_right_text_en?.message}
          register={register(`sections.${index}.content.top_right_text_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_right_text_ar`}
          label={t("pages.culture_identity.text_ar")}
          error={sectionErrors?.top_right_text_ar?.message}
          register={register(`sections.${index}.content.top_right_text_ar`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_right_second_text_en`}
          label={t("pages.culture_identity.second_text_en")}
          error={sectionErrors?.top_right_second_text_en?.message}
          register={register(
            `sections.${index}.content.top_right_second_text_en`,
          )}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.top_right_second_text_ar`}
          label={t("pages.culture_identity.second_text_ar")}
          error={sectionErrors?.top_right_second_text_ar?.message}
          register={register(
            `sections.${index}.content.top_right_second_text_ar`,
          )}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
