import BlockHeader from "@/features/pagesBuilder/components/pagesBuilderForm/BlockHeader";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface AccordionItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  itemIndex: number;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

export default function AccordionItemFields<TFieldValues extends FieldValues>({
  form,
  basePath,
  itemIndex,
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
        index={itemIndex}
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name={`${basePath}.content_en`}
          label={t("pages.accordion.acc_content_en")}
          register={register(`${basePath}.content_en` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.content_en`)}
          disabled={disabled}
        />
        <TextArea
          name={`${basePath}.content_ar`}
          label={t("pages.accordion.acc_content_ar")}
          register={register(`${basePath}.content_ar` as Path<TFieldValues>)}
          error={getFieldErrorMessage(errors, `${basePath}.content_ar`)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
