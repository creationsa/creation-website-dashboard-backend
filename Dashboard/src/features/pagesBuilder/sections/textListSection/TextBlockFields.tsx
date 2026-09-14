import type { PageFormValues } from "@/features/pagesBuilder/components/pagesBuilderForm/pageSchema";
import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import type { Path, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PointsFields from "./PointsFields";
import { TEXT_BLOCK_TYPES, type TextBlockType } from "./textListSchema";

interface TextBlockFieldsProps {
  form: UseFormReturn<PageFormValues>;
  basePath: string;
  blockType: TextBlockType;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

export default function TextBlockFields({
  form,
  basePath,
  blockType,
  isDeleteDisabled,
  onRemove,
  disabled,
}: TextBlockFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  const isList = blockType === TEXT_BLOCK_TYPES.LIST;

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-3 lg:gap-5">
      <div className="flex items-center justify-between">
        <span className="rounded-xl border px-3 py-1 text-sm font-semibold">
          {isList
            ? t("pages.text_list_section.body_type_list")
            : t("pages.text_list_section.body_type_description")}
        </span>

        <Button
          type="button"
          variation="danger"
          onClick={onRemove}
          disabled={disabled || isDeleteDisabled}
          className="w-fit!"
        >
          {t("pages.text_list_section.remove_block")}
        </Button>
      </div>

      {isList ? (
        <PointsFields
          form={form}
          name={`${basePath}.points`}
          disabled={disabled}
        />
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <TextArea
            name={`${basePath}.description_en`}
            label={t("pages.text_list_section.description_en")}
            error={getFieldErrorMessage(errors, `${basePath}.description_en`)}
            register={register(
              `${basePath}.description_en` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
          <TextArea
            name={`${basePath}.description_ar`}
            label={t("pages.text_list_section.description_ar")}
            error={getFieldErrorMessage(errors, `${basePath}.description_ar`)}
            register={register(
              `${basePath}.description_ar` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}
