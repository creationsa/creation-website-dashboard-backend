import Box from "@/shared/ui/Box";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { Controller, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";
import type { ReviewsFormValues } from "./reviewsSchema";

const REVIEW_ITEM_INDEXES = [0, 1] as const;

export default function ReviewItemsFields({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<ReviewsFormValues>
    | undefined;

  return (
    <Box
      title={t("pages.reviews.items_settings")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      {REVIEW_ITEM_INDEXES.map((itemIndex) => (
        <div
          key={itemIndex}
          className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
        >
          <span className="text-xs font-bold text-gray-400">
            {t("pages.item_row", { index: itemIndex + 1 })}
          </span>

          <Controller
            control={control}
            name={`sections.${index}.content.items.${itemIndex}.logo_image`}
            render={({ field }) => (
              <FileUpload
                name={field.name}
                label={t("pages.reviews.logo_image")}
                value={field.value}
                onChange={field.onChange}
                error={sectionErrors?.items?.[itemIndex]?.logo_image?.message}
                disabled={disabled}
              />
            )}
          />

          <Input
            name={`sections.${index}.content.items.${itemIndex}.title_en`}
            label={t("pages.reviews.item_title_en")}
            error={sectionErrors?.items?.[itemIndex]?.title_en?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.title_en`,
            )}
            disabled={disabled}
          />
          <Input
            name={`sections.${index}.content.items.${itemIndex}.title_ar`}
            label={t("pages.reviews.item_title_ar")}
            error={sectionErrors?.items?.[itemIndex]?.title_ar?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.title_ar`,
            )}
            disabled={disabled}
          />

          <TextArea
            name={`sections.${index}.content.items.${itemIndex}.description_en`}
            label={t("pages.reviews.item_description_en")}
            error={sectionErrors?.items?.[itemIndex]?.description_en?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.description_en`,
            )}
            disabled={disabled}
          />
          <TextArea
            name={`sections.${index}.content.items.${itemIndex}.description_ar`}
            label={t("pages.reviews.item_description_ar")}
            error={sectionErrors?.items?.[itemIndex]?.description_ar?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.description_ar`,
            )}
            disabled={disabled}
          />

          <Input
            name={`sections.${index}.content.items.${itemIndex}.link_text_en`}
            label={t("pages.reviews.link_text_en")}
            error={sectionErrors?.items?.[itemIndex]?.link_text_en?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.link_text_en`,
            )}
            disabled={disabled}
          />
          <Input
            name={`sections.${index}.content.items.${itemIndex}.link_text_ar`}
            label={t("pages.reviews.link_text_ar")}
            error={sectionErrors?.items?.[itemIndex]?.link_text_ar?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.link_text_ar`,
            )}
            disabled={disabled}
          />

          <Input
            name={`sections.${index}.content.items.${itemIndex}.link_url`}
            label={t("pages.reviews.link_url")}
            error={sectionErrors?.items?.[itemIndex]?.link_url?.message}
            register={register(
              `sections.${index}.content.items.${itemIndex}.link_url`,
            )}
            disabled={disabled}
          />
        </div>
      ))}
    </Box>
  );
}
