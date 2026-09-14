import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import BlogPickerField from "@/shared/components/blogPickerField";
import { BLOG_SOURCE_TYPES } from "@/shared/components/blogPickerField/blogPickerFieldSchema";
import SmartMediaField from "@/shared/components/smartMediaField";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useWatch, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UseFormReturn } from "react-hook-form";

interface BlogsTeaserItemFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  basePath: string;
  itemIndex: number;
  isDeleteDisabled: boolean;
  onRemove: () => void;
  disabled?: boolean;
}

export default function BlogsTeaserItemFields<
  TFieldValues extends FieldValues,
>({
  form,
  basePath,
  itemIndex,
  isDeleteDisabled,
  onRemove,
  disabled,
}: BlogsTeaserItemFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const source = useWatch({
    control,
    name: `${basePath}.source` as Path<TFieldValues>,
  });
  const isBlogMode = source === BLOG_SOURCE_TYPES.BLOG;

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        rowLabel={t("pages.blog_item_row", { index: itemIndex + 1 })}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <BlogPickerField
        form={form}
        sourcePath={`${basePath}.source` as Path<TFieldValues>}
        blogIdPath={`${basePath}.blog_id` as Path<TFieldValues>}
        label={t("pages.blogs_teaser.pick_blog_label")}
        disabled={disabled}
      />

      {!isBlogMode && (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <SmartMediaField
            form={form}
            name={`${basePath}.feature_media` as Path<TFieldValues>}
            label={t("pages.blogs_teaser.item_image")}
            disabled={disabled}
          />

          <div className="flex flex-col gap-3 lg:gap-5">
            <div className="grid grid-cols-1 gap-3 lg:gap-5 xl:grid-cols-2">
              <Input
                name={`${basePath}.item_title_en`}
                label={t("pages.blogs_teaser.item_title_en")}
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
                label={t("pages.blogs_teaser.item_title_ar")}
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

            <Input
              name={`${basePath}.item_slug_en`}
              label={t("pages.blogs_teaser.item_slug_en")}
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
  );
}
