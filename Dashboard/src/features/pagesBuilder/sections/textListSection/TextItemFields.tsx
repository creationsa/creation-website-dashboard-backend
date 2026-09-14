import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import type { PageFormValues } from "@/features/pagesBuilder/components/pagesBuilderForm/pageSchema";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useFieldArray, type Path, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  DESCRIPTION_BLOCK_INITIAL_STATE,
  LIST_BLOCK_INITIAL_STATE,
} from "./getTextListDefaultValues";
import TextBlockFields from "./TextBlockFields";

interface TextItemFieldsProps {
  form: UseFormReturn<PageFormValues>;
  sectionIndex: number;
  itemIndex: number;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

export default function TextItemFields({
  form,
  sectionIndex,
  itemIndex,
  isDeleteDisabled,
  onRemove,
  disabled,
}: TextItemFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const basePath = `sections.${sectionIndex}.content.items.${itemIndex}`;

  const {
    fields: blocks,
    append: appendBlock,
    remove: removeBlock,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.content.items.${itemIndex}.blocks`,
  });

  return (
    <div className="relative flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <BlockHeader
        rowLabel={t("pages.text_block_row", { index: itemIndex + 1 })}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          name={`${basePath}.header_en`}
          label={t("pages.text_list_section.item_header_en")}
          error={getFieldErrorMessage(errors, `${basePath}.header_en`)}
          register={register(`${basePath}.header_en` as Path<PageFormValues>)}
          disabled={disabled}
        />
        <Input
          name={`${basePath}.header_ar`}
          label={t("pages.text_list_section.item_header_ar")}
          error={getFieldErrorMessage(errors, `${basePath}.header_ar`)}
          register={register(`${basePath}.header_ar` as Path<PageFormValues>)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-3">
        {blocks.map((block, blockIndex) => (
          <TextBlockFields
            key={block.id}
            form={form}
            basePath={`${basePath}.blocks.${blockIndex}`}
            blockType={block.block_type}
            isDeleteDisabled={blocks.length === 1}
            onRemove={() => removeBlock(blockIndex)}
            disabled={disabled}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variation="secondary"
          onClick={() => appendBlock({ ...DESCRIPTION_BLOCK_INITIAL_STATE })}
          disabled={disabled}
          className="w-fit!"
        >
          {t("pages.text_list_section.add_description_block")}
        </Button>
        <Button
          type="button"
          variation="secondary"
          onClick={() => appendBlock({ ...LIST_BLOCK_INITIAL_STATE })}
          disabled={disabled}
          className="w-fit!"
        >
          {t("pages.text_list_section.add_list_block")}
        </Button>
      </div>
    </div>
  );
}
