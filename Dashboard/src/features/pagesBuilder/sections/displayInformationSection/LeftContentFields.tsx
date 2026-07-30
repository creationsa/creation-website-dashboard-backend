import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { LeftTextFieldsProps } from "./types";

const LEFT_FIELDS = [
  "left_title_en",
  "left_title_ar",
  "left_desc_en",
  "left_desc_ar",
  "left_btn_en",
  "left_btn_ar",
] as const;

export default function LeftContentFields({
  form,
  sectionIndex,
  blockIndex,
  disabled,
  errors,
}: LeftTextFieldsProps) {
  const { t } = useTranslation();
  const { register } = form;

  return (
    <div className="flex flex-col gap-3 border-e pe-3 lg:gap-5 lg:pe-5">
      <SubHeadTitle title={t("pages.display_info_section.left_side_texts")} />
      <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2 2xl:gap-5">
        {LEFT_FIELDS.map((field) => (
          <Input
            name={`sections.${sectionIndex}.content.blocks.${blockIndex}.${field}`}
            key={field}
            label={t(`pages.display_info_section.${field}`)}
            error={errors?.[field]?.message}
            register={register(
              `sections.${sectionIndex}.content.blocks.${blockIndex}.${field}`,
            )}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
