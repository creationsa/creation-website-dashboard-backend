import Box from "@/shared/ui/Box";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../components/SectionPreview";
import AddNewBlock from "../../components/pagesBuilderForm/AddNewBlock";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import type { SectionProps } from "../../types";
import Header from "../header";
import RowBlockForm from "./RowBlockForm";
import displayInfo from "./assets/display-information.png";
import { CARD_INITIAL_STATE } from "./getInfoDefaultValues";

export default function DisplayInformationSection({
  form,
  index,
  disabled,
  onRemove,
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
    <Box
      title={`( ${index + 1} ) ${t("pages.display_info_section.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview
        src={displayInfo}
        alt={t("pages.display_info_section.display_info_preview")}
      />

      <Header form={form} index={index} disabled={disabled} />

      <AddNewBlock
        count={blocks.length}
        onAdd={() => appendBlock(CARD_INITIAL_STATE)}
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

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
