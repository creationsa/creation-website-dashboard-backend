import { useWatch, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import LeftContentFields from "./LeftContentFields";
import RightCardForm from "./RightCardForm";
import type { RowBlockProps } from "./types";

export default function RowBlockForm({
  form,
  sectionIndex,
  blockIndex,
  isDeleteDisabled,
  disabled,
  onRemove,
}: RowBlockProps) {
  const { t } = useTranslation();
  const { control } = form;

  const basePath = `sections.${sectionIndex}.content.blocks.${blockIndex}`;

  const firstRightProjectId = useWatch({
    control,
    name: `${basePath}.first_right_project_id` as Path<PageFormValues>,
  }) as number | null | undefined;
  const secondRightProjectId = useWatch({
    control,
    name: `${basePath}.second_right_project_id` as Path<PageFormValues>,
  }) as number | null | undefined;

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        rowLabel={t("pages.display_row", { index: blockIndex + 1 })}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
        <LeftContentFields
          form={form}
          disabled={disabled}
          sectionIndex={sectionIndex}
          blockIndex={blockIndex}
        />

        <div className="flex flex-col gap-3 lg:gap-5">
          <SubHeadTitle
            title={t("pages.display_info_section.right_side_images")}
          />
          <RightCardForm
            form={form}
            sectionIndex={sectionIndex}
            blockIndex={blockIndex}
            disabled={disabled}
            prefix="first_right"
            otherCardProjectId={secondRightProjectId}
          />

          <RightCardForm
            form={form}
            sectionIndex={sectionIndex}
            blockIndex={blockIndex}
            disabled={disabled}
            prefix="second_right"
            otherCardProjectId={firstRightProjectId}
          />
        </div>
      </div>
    </div>
  );
}
