import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import SmartMediaField from "@/shared/components/smartMediaField";
import type { RightImageCardFieldsProps } from "./types";

const IMAGE_TEXT_FIELDS = ["card_title_en", "card_title_ar"] as const;

export default function RightCardForm({
  form,
  sectionIndex,
  blockIndex,
  disabled,
  prefix,
  errors,
}: RightImageCardFieldsProps) {
  const { t } = useTranslation();
  const { register } = form;

  return (
    <>
      <SmartMediaField
        form={form}
        name={`sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_media`}
        label={t(`pages.display_info_section.${prefix}_media`)}
        disabled={disabled}
      />

      <div className="grid grid-cols-1 gap-3 lg:gap-5 2xl:grid-cols-2">
        {IMAGE_TEXT_FIELDS.map((field) => (
          <Input
            name={`sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_${field}`}
            key={field}
            label={t(`pages.display_info_section.${prefix}_${field}`)}
            error={errors?.[`${prefix}_${field}`]?.message}
            register={register(
              `sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_${field}`,
            )}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 lg:gap-5">
        <TextArea
          name={`sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_card_desc_en`}
          label={t(`pages.display_info_section.${prefix}_card_desc_en`)}
          error={errors?.[`${prefix}_card_desc_en`]?.message}
          register={register(
            `sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_card_desc_en`,
          )}
          disabled={disabled}
        />
        <TextArea
          name={`sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_card_desc_ar`}
          label={t(`pages.display_info_section.${prefix}_card_desc_ar`)}
          error={errors?.[`${prefix}_card_desc_ar`]?.message}
          register={register(
            `sections.${sectionIndex}.content.blocks.${blockIndex}.${prefix}_card_desc_ar`,
          )}
          disabled={disabled}
        />
      </div>
    </>
  );
}
