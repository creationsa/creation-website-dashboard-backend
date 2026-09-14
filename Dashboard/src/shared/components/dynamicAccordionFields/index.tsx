import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import AccordionItemFields from "./AccordionItemFields";
import type { DynamicAccordionFieldsProps } from "./types";

export default function DynamicAccordionFields<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
>({
  form,
  name,
  itemInitialState,
  disabled,
  managementLabel,
  addLabel,
  rowLabelKey,
}: DynamicAccordionFieldsProps<TFieldValues, TName>) {
  const { t } = useTranslation();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control as Control<TFieldValues>,
    name,
  });

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() => append(itemInitialState as never)}
        managementLabel={managementLabel}
        addLabel={addLabel}
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, itemIndex) => (
          <AccordionItemFields
            key={field.id}
            form={form}
            basePath={`${name}.${itemIndex}`}
            isDeleteDisabled={fields.length === 1}
            onRemove={() => remove(itemIndex)}
            disabled={disabled}
            rowLabel={t(rowLabelKey, { index: itemIndex + 1 })}
          />
        ))}
      </div>
    </div>
  );
}
