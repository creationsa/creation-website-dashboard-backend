import type { FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BlockHeader from "../../components/pagesBuilderForm/BlockHeader";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { DisplayInfoFormValues } from "./displayInfoSchema";
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
  const {
    formState: { errors },
  } = form;
  const contentErrors = errors?.sections?.[sectionIndex]?.content as
    | FieldErrors<DisplayInfoFormValues>
    | undefined;

  const blockErrors = contentErrors?.blocks?.[blockIndex] as
    | FieldErrors<DisplayInfoFormValues["blocks"][number]>
    | undefined;

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        index={blockIndex}
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
            errors={blockErrors}
          />

          <RightCardForm
            form={form}
            sectionIndex={sectionIndex}
            blockIndex={blockIndex}
            disabled={disabled}
            prefix="second_right"
            errors={blockErrors}
          />
        </div>
      </div>
    </div>
  );
}
