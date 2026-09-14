import ProjectPickerField from "@/shared/components/projectPickerField";
import { PROJECT_SOURCE_TYPES } from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import SmartMediaField from "@/shared/components/smartMediaField";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useEffect } from "react";
import { useWatch, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import type { RightImageCardFieldsProps } from "./types";

const IMAGE_TEXT_FIELDS = ["card_title_en", "card_title_ar"] as const;

export default function RightCardForm({
  form,
  sectionIndex,
  blockIndex,
  disabled,
  prefix,
  otherCardProjectId,
}: RightImageCardFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const basePath = `sections.${sectionIndex}.content.blocks.${blockIndex}`;
  const sourcePath = `${basePath}.${prefix}_source` as Path<PageFormValues>;
  const projectIdPath =
    `${basePath}.${prefix}_project_id` as Path<PageFormValues>;
  const mediaFieldPath =
    `${basePath}.${prefix}_project_media_field` as Path<PageFormValues>;
  const mediaPath = `${basePath}.${prefix}_media` as Path<PageFormValues>;

  const source = useWatch({ control, name: sourcePath });
  const isCustom = source === PROJECT_SOURCE_TYPES.CUSTOM;

  useEffect(() => {
    if (!isCustom) return;
    const media = getValues(mediaPath) as { type?: string } | null | undefined;
    if (!media?.type) {
      setValue(mediaPath, { ...MEDIA_INITIAL_STATE } as never, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [isCustom, mediaPath, getValues, setValue]);

  return (
    <>
      <SubHeadTitle title={t(`pages.display_info_section.${prefix}_media`)} />

      <ProjectPickerField
        form={form}
        sourcePath={sourcePath}
        projectIdPath={projectIdPath}
        mediaFieldPath={mediaFieldPath}
        label={t("pages.display_info_section.pick_project_label")}
        excludeProjectIds={
          otherCardProjectId ? [otherCardProjectId] : undefined
        }
        disabled={disabled}
      />

      {isCustom && (
        <>
          <SmartMediaField
            form={form}
            name={`${basePath}.${prefix}_media`}
            label={t("pages.display_info_section.upload_media")}
            disabled={disabled}
          />

          <div className="grid grid-cols-1 gap-3 lg:gap-5 2xl:grid-cols-2">
            {IMAGE_TEXT_FIELDS.map((field) => (
              <Input
                name={`${basePath}.${prefix}_${field}`}
                key={field}
                label={t(`pages.display_info_section.${prefix}_${field}`)}
                error={getFieldErrorMessage(
                  errors,
                  `${basePath}.${prefix}_${field}`,
                )}
                register={register(
                  `${basePath}.${prefix}_${field}` as Path<PageFormValues>,
                )}
                disabled={disabled}
              />
            ))}
          </div>

          <Input
            name={`${basePath}.${prefix}_slug`}
            label={t(`pages.display_info_section.${prefix}_slug`)}
            error={getFieldErrorMessage(errors, `${basePath}.${prefix}_slug`)}
            register={register(
              `${basePath}.${prefix}_slug` as Path<PageFormValues>,
            )}
            disabled={disabled}
          />
        </>
      )}

      <div className="flex flex-col gap-3 lg:gap-5">
        <TextArea
          name={`${basePath}.${prefix}_card_desc_en`}
          label={t(`pages.display_info_section.${prefix}_card_desc_en`)}
          error={getFieldErrorMessage(
            errors,
            `${basePath}.${prefix}_card_desc_en`,
          )}
          register={register(
            `${basePath}.${prefix}_card_desc_en` as Path<PageFormValues>,
          )}
          disabled={disabled}
        />
        <TextArea
          name={`${basePath}.${prefix}_card_desc_ar`}
          label={t(`pages.display_info_section.${prefix}_card_desc_ar`)}
          error={getFieldErrorMessage(
            errors,
            `${basePath}.${prefix}_card_desc_ar`,
          )}
          register={register(
            `${basePath}.${prefix}_card_desc_ar` as Path<PageFormValues>,
          )}
          disabled={disabled}
        />
      </div>
    </>
  );
}
