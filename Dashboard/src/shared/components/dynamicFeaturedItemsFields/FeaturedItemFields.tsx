import BlockHeader from "@/features/pagesBuilder/components/pagesBuilderForm/BlockHeader";
import SmartMediaField from "@/shared/components/smartMediaField";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { FeaturedItemFieldsProps } from "./types";

export default function FeaturedItemFields<TFieldValues extends FieldValues>({
  form,
  basePath,
  itemIndex,
  isDeleteDisabled,
  onRemove,
  disabled,
  hasTitleAndSlug = true,
}: FeaturedItemFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        index={itemIndex}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

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
    </div>
  );
}
