import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { AccordionContentBlockFieldsProps } from "./types";

export default function AccordionContentBlockFields<
  TFieldValues extends FieldValues,
>({
  form,
  basePath,
  rowLabel,
  isDeleteDisabled,
  onRemove,
  disabled,
}: AccordionContentBlockFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="relative flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <BlockHeader
        rowLabel={rowLabel}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          name={`${basePath}.subtitle_en`}
          label={t("pages.accordion.block_subtitle_en")}
          register={register(`${basePath}.subtitle_en` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.subtitle_en`)}
          disabled={disabled}
        />
        <Input
          name={`${basePath}.subtitle_ar`}
          label={t("pages.accordion.block_subtitle_ar")}
          register={register(`${basePath}.subtitle_ar` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.subtitle_ar`)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name={`${basePath}.description_en`}
          label={t("pages.accordion.block_description_en")}
          register={register(`${basePath}.description_en` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.description_en`)}
          disabled={disabled}
        />
        <TextArea
          name={`${basePath}.description_ar`}
          label={t("pages.accordion.block_description_ar")}
          register={register(`${basePath}.description_ar` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.description_ar`)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
