import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import { PROJECT_SOURCE_TYPES } from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import {
  useFieldArray,
  useWatch,
  type ArrayPath,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import FeaturedItemFields from "./FeaturedItemFields";
import type { DynamicFeaturedItemsFieldsProps } from "./types";

interface WatchedItem {
  source?: string;
  project_id?: number | null;
}

export default function DynamicFeaturedItemsFields<
  TFieldValues extends FieldValues,
  TName extends ArrayPath<TFieldValues>,
>({
  form,
  name,
  itemInitialState,
  disabled,
  hasTitleAndSlug = true,
  allowProjectPicker = false,
  managementLabel,
  addLabel,
  rowLabelKey,
}: DynamicFeaturedItemsFieldsProps<TFieldValues, TName>) {
  const { t } = useTranslation();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control as Control<TFieldValues>,
    name,
  });

  const watchedItems = (useWatch({
    control,
    name: name as Path<TFieldValues>,
  }) ?? []) as WatchedItem[];

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() => append(itemInitialState as never)}
        managementLabel={managementLabel}
        addLabel={addLabel}
      />

      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        {fields.map((field, itemIndex) => {
          const excludeProjectIds = allowProjectPicker
            ? watchedItems
                .filter(
                  (item, otherIndex) =>
                    otherIndex !== itemIndex &&
                    item?.source === PROJECT_SOURCE_TYPES.PROJECT &&
                    typeof item.project_id === "number",
                )
                .map((item) => item.project_id as number)
            : undefined;

          return (
            <FeaturedItemFields
              key={field.id}
              form={form}
              basePath={`${name}.${itemIndex}`}
              rowLabel={t(rowLabelKey, { index: itemIndex + 1 })}
              isDeleteDisabled={fields.length === 1}
              onRemove={() => remove(itemIndex)}
              disabled={disabled}
              hasTitleAndSlug={hasTitleAndSlug}
              allowProjectPicker={allowProjectPicker}
              excludeProjectIds={excludeProjectIds}
            />
          );
        })}
      </div>
    </div>
  );
}
