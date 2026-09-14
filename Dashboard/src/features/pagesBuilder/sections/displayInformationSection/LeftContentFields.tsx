import SolutionPickerField from "@/shared/components/solutionPickerField";
import { SOLUTION_SOURCE_TYPES } from "@/shared/components/solutionPickerField/solutionPickerFieldSchema";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useWatch, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import type { LeftTextFieldsProps } from "./types";

export default function LeftContentFields({
  form,
  sectionIndex,
  blockIndex,
  disabled,
}: LeftTextFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const basePath = `sections.${sectionIndex}.content.blocks.${blockIndex}`;
  const sourcePath = `${basePath}.left_source` as Path<PageFormValues>;
  const solutionIdPath = `${basePath}.left_solution_id` as Path<PageFormValues>;

  const source = useWatch({ control, name: sourcePath });
  const isCustom = source === SOLUTION_SOURCE_TYPES.CUSTOM;

  return (
    <div className="flex flex-col gap-3 border-e pe-3 lg:gap-5 lg:pe-5">
      <SubHeadTitle title={t("pages.display_info_section.left_side_texts")} />

      <SolutionPickerField
        form={form}
        sourcePath={sourcePath}
        solutionIdPath={solutionIdPath}
        label={t("pages.display_info_section.pick_solution_label")}
        disabled={disabled}
      />

      {isCustom && (
        <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2 2xl:gap-5">
          <Input
            name={`${basePath}.left_title_en`}
            label={t("pages.display_info_section.left_title_en")}
            error={getFieldErrorMessage(errors, `${basePath}.left_title_en`)}
            register={register(
              `${basePath}.left_title_en` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
          <Input
            name={`${basePath}.left_title_ar`}
            label={t("pages.display_info_section.left_title_ar")}
            error={getFieldErrorMessage(errors, `${basePath}.left_title_ar`)}
            register={register(
              `${basePath}.left_title_ar` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
          <TextArea
            name={`${basePath}.left_desc_en`}
            label={t("pages.display_info_section.left_desc_en")}
            error={getFieldErrorMessage(errors, `${basePath}.left_desc_en`)}
            register={register(
              `${basePath}.left_desc_en` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
          <TextArea
            name={`${basePath}.left_desc_ar`}
            label={t("pages.display_info_section.left_desc_ar")}
            error={getFieldErrorMessage(errors, `${basePath}.left_desc_ar`)}
            register={register(
              `${basePath}.left_desc_ar` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
          <Input
            name={`${basePath}.left_btn_slug`}
            label={t("pages.display_info_section.left_btn_slug")}
            error={getFieldErrorMessage(errors, `${basePath}.left_btn_slug`)}
            register={register(
              `${basePath}.left_btn_slug` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 2xl:grid-cols-2 2xl:gap-5">
        <Input
          name={`${basePath}.left_btn_en`}
          label={t("pages.display_info_section.left_btn_en")}
          error={getFieldErrorMessage(errors, `${basePath}.left_btn_en`)}
          register={register(
            `${basePath}.left_btn_en` as Path<PageFormValues>,
          )}
          disabled={disabled}
        />
        <Input
          name={`${basePath}.left_btn_ar`}
          label={t("pages.display_info_section.left_btn_ar")}
          error={getFieldErrorMessage(errors, `${basePath}.left_btn_ar`)}
          register={register(
            `${basePath}.left_btn_ar` as Path<PageFormValues>,
          )}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
