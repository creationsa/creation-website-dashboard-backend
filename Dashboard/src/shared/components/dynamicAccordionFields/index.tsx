import AddNewBlock from "@/features/pagesBuilder/components/pagesBuilderForm/AddNewBlock";
import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import AccordionItemFields from "./AccordionItemFields";

export interface DynamicAccordionFieldsProps<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>;
  name: TName;
  itemInitialState: Record<string, unknown>;
  disabled?: boolean;
}

export default function DynamicAccordionFields<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
>({
  form,
  name,
  itemInitialState,
  disabled,
}: DynamicAccordionFieldsProps<TFieldValues, TName>) {
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
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, itemIndex) => (
          <AccordionItemFields
            key={field.id}
            form={form}
            basePath={`${name}.${itemIndex}`}
            itemIndex={itemIndex}
            isDeleteDisabled={fields.length === 1}
            onRemove={() => remove(itemIndex)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
