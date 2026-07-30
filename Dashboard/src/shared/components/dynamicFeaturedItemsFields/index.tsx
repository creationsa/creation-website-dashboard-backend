import AddNewBlock from "@/features/pagesBuilder/components/pagesBuilderForm/AddNewBlock";
import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
} from "react-hook-form";
import FeaturedItemFields from "./FeaturedItemFields";
import type { DynamicFeaturedItemsFieldsProps } from "./types";

export default function DynamicFeaturedItemsFields<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
>({
  form,
  name,
  itemInitialState,
  disabled,
  hasTitleAndSlug = true,
}: DynamicFeaturedItemsFieldsProps<TFieldValues, TName>) {
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

      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        {fields.map((field, itemIndex) => (
          <FeaturedItemFields
            key={field.id}
            form={form}
            basePath={`${name}.${itemIndex}`}
            itemIndex={itemIndex}
            isDeleteDisabled={fields.length === 1}
            onRemove={() => remove(itemIndex)}
            disabled={disabled}
            hasTitleAndSlug={hasTitleAndSlug}
          />
        ))}
      </div>
    </div>
  );
}
