import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import type { SectionProps } from "../../types";
import Header from "../header";
import RowBlockForm from "./RowBlockForm";
import displayInfo from "./assets/display-information.png";
import type { DisplayInfoFormValues } from "./displayInfoSchema";
import { CARD_INITIAL_STATE } from "./getInfoDefaultValues";

export default function DisplayInformationSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();

  const { control } = form;

  const {
    fields: blocks,
    append: appendBlock,
    remove: removeBlock,
  } = useFieldArray({
    control,
    name: `sections.${index}.content.blocks`,
  });
  return (
    <>
      <SectionPreview
        src={displayInfo}
        alt={t("pages.display_info_section.display_info_preview")}
      />

      <Header form={form} index={index} disabled={disabled} />

      <AddNewBlock
        count={blocks.length}
        onAdd={() =>
          appendBlock(
            CARD_INITIAL_STATE as unknown as DisplayInfoFormValues["blocks"][number],
          )
        }
        managementLabel={t("pages.display_row_management")}
        addLabel={t("pages.add_new_display_row")}
      />

      <div className="flex flex-col gap-8 rounded-xl border p-4">
        {blocks.map((block, blockIndex) => (
          <RowBlockForm
            key={block.id}
            form={form}
            sectionIndex={index}
            blockIndex={blockIndex}
            disabled={disabled}
            isDeleteDisabled={blocks.length === 1}
            onRemove={() => removeBlock(blockIndex)}
          />
        ))}
      </div>
    </>
  );
}
