import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AccordionContentBlocks from "./AccordionContentBlocks";
import type { AccordionItemFieldsProps } from "./types";

export default function AccordionItemFields<TFieldValues extends FieldValues>({
  form,
  basePath,
  rowLabel,
  isDeleteDisabled,
  onRemove,
  disabled,
}: AccordionItemFieldsProps<TFieldValues>) {
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
          name={`${basePath}.title_en`}
          label={t("pages.accordion.acc_title_en")}
          register={register(`${basePath}.title_en` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.title_en`)}
          disabled={disabled}
        />
        <Input
          name={`${basePath}.title_ar`}
          label={t("pages.accordion.acc_title_ar")}
          register={register(`${basePath}.title_ar` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.title_ar`)}
          disabled={disabled}
        />
      </div>

      <AccordionContentBlocks
        form={form}
        basePath={basePath}
        disabled={disabled}
      />
    </div>
  );
}
