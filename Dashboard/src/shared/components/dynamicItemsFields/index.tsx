import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import Input from "@/shared/ui/textField/Input";
import {
  get,
  useFieldArray,
  type ArrayPath,
  type FieldArray,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DYNAMIC_ITEM_INITIAL_STATE } from "./getDynamicItemsFieldsDefaultValues";
import type { DynamicItemsFieldsProps } from "./types";

export default function DynamicItemsFields<T extends FieldValues>({
  form,
  disabled,
  name,
}: DynamicItemsFieldsProps<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const itemErrors = get(errors, name) as
    | FieldErrors<{
        text_en: string;
        text_ar: string;
      }>[]
    | undefined;

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() =>
          append(DYNAMIC_ITEM_INITIAL_STATE as FieldArray<T, ArrayPath<T>>)
        }
        managementLabel={t("blockControls.ticker_item_management")}
        addLabel={t("blockControls.add_new_ticker_item")}
      />

      <div className="flex flex-col gap-4 overflow-y-auto pr-1">
        {fields.map((field, itemIndex) => (
          <div
            key={field.id}
            className="relative flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
          >
            <BlockHeader
              rowLabel={t("blockControls.ticker_item_row", {
                index: itemIndex + 1,
              })}
              onRemove={() => remove(itemIndex)}
              isDeleteDisabled={fields.length === 1}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
              <Input
                name={`${name}.${itemIndex}.text_en`}
                label={`${t("pages.news_ticker.text_en")} (${itemIndex + 1})`}
                error={itemErrors?.[itemIndex]?.text_en?.message}
                register={register(`${name}.${itemIndex}.text_en` as Path<T>)}
                disabled={disabled}
              />

              <Input
                name={`${name}.${itemIndex}.text_ar`}
                label={`${t("pages.news_ticker.text_ar")} (${itemIndex + 1})`}
                error={itemErrors?.[itemIndex]?.text_ar?.message}
                register={register(`${name}.${itemIndex}.text_ar` as Path<T>)}
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
