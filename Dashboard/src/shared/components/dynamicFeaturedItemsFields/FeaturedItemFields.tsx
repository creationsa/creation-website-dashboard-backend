import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import ProjectPickerField from "@/shared/components/projectPickerField";
import { PROJECT_SOURCE_TYPES } from "@/shared/components/projectPickerField/projectPickerFieldSchema";
import SmartMediaField from "@/shared/components/smartMediaField";
import { MEDIA_INITIAL_STATE } from "@/shared/components/smartMediaField/smartMediaDefaultValues";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useEffect } from "react";
import { useWatch, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FeaturedItemFieldsProps } from "./types";

export default function FeaturedItemFields<TFieldValues extends FieldValues>({
  form,
  basePath,
  rowLabel,
  isDeleteDisabled,
  onRemove,
  disabled,
  hasTitleAndSlug = true,
  allowProjectPicker = false,
  excludeProjectIds,
}: FeaturedItemFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const source = useWatch({
    control,
    name: `${basePath}.source` as Path<TFieldValues>,
  });
  const isProjectMode =
    allowProjectPicker && source === PROJECT_SOURCE_TYPES.PROJECT;

  const mediaPath = `${basePath}.feature_media` as Path<TFieldValues>;

  useEffect(() => {
    if (isProjectMode) return;
    const media = getValues(mediaPath) as { type?: string } | null | undefined;
    if (!media?.type) {
      setValue(mediaPath, { ...MEDIA_INITIAL_STATE } as never, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [isProjectMode, mediaPath, getValues, setValue]);

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        rowLabel={rowLabel}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      {allowProjectPicker && (
        <ProjectPickerField
          form={form}
          sourcePath={`${basePath}.source` as Path<TFieldValues>}
          projectIdPath={`${basePath}.project_id` as Path<TFieldValues>}
          mediaFieldPath={
            `${basePath}.project_media_field` as Path<TFieldValues>
          }
          label={t("pages.featured_works.pick_project_label")}
          excludeProjectIds={excludeProjectIds}
          disabled={disabled}
        />
      )}

      {!isProjectMode && (
        <div
          className={`grid grid-cols-1 gap-3 lg:gap-5 ${hasTitleAndSlug ? "lg:grid-cols-2" : ""}`}
        >
          {/* Left Column: Image Upload & Alts */}
          <SmartMediaField
            form={form}
            name={`${basePath}.feature_media` as Path<TFieldValues>}
            label={t("pages.featured_works.item_image")}
            disabled={disabled}
          />

          {/* Right Column: Titles & Slugs */}
          {hasTitleAndSlug && (
            <div className="flex flex-col gap-3 lg:gap-5">
              <div className="grid grid-cols-1 gap-3 lg:gap-5 xl:grid-cols-2">
                <Input
                  name={`${basePath}.item_title_en`}
                  label={t("pages.featured_works.item_title_en")}
                  error={getFieldErrorMessage(
                    errors,
                    `${basePath}.item_title_en`,
                  )}
                  register={register(
                    `${basePath}.item_title_en` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
                <Input
                  name={`${basePath}.item_title_ar`}
                  label={t("pages.featured_works.item_title_ar")}
                  error={getFieldErrorMessage(
                    errors,
                    `${basePath}.item_title_ar`,
                  )}
                  register={register(
                    `${basePath}.item_title_ar` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 lg:gap-5 xl:grid-cols-2">
                <Input
                  name={`${basePath}.item_slug_en`}
                  label={t("pages.featured_works.item_slug_en")}
                  error={getFieldErrorMessage(errors, `${basePath}.item_slug_en`)}
                  register={register(
                    `${basePath}.item_slug_en` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
