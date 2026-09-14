import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import { ACCORDION_CONTENT_BLOCK_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import {
  useFieldArray,
  type ArrayPath,
  type Control,
  type FieldValues,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import AccordionContentBlockFields from "./AccordionContentBlockFields";
import type { AccordionContentBlocksProps } from "./types";

export default function AccordionContentBlocks<
  TFieldValues extends FieldValues,
>({ form, basePath, disabled }: AccordionContentBlocksProps<TFieldValues>) {
  const { t } = useTranslation();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control as Control<TFieldValues>,
    name: `${basePath}.content_blocks` as ArrayPath<TFieldValues>,
  });

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() => append(ACCORDION_CONTENT_BLOCK_INITIAL_STATE as never)}
        managementLabel={t("pages.accordion.content_block_management")}
        addLabel={t("pages.accordion.add_content_block")}
      />

      <div className="flex flex-col gap-4">
        {fields.map((field, blockIndex) => (
          <AccordionContentBlockFields
            key={field.id}
            form={form}
            basePath={`${basePath}.content_blocks.${blockIndex}`}
            rowLabel={t("pages.accordion.content_block_row", {
              index: blockIndex + 1,
            })}
            isDeleteDisabled={fields.length === 1}
            onRemove={() => remove(blockIndex)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
