import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../types";
import Header from "../header";
import BlogsTeaserItemFields from "./BlogsTeaserItemFields";
import { TEASER_ITEM_INITIAL_STATE } from "./getBlogsTeaserDefaultValues";

export default function BlogsTeaserSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  const itemsName = `sections.${index}.content.items` as const;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: itemsName,
  });

  return (
    <>
      <Header form={form} index={index} disabled={disabled} />

      <Box
        title={t("pages.blogs_teaser.button_section")}
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
      >
        <Input
          name={`sections.${index}.content.button_title_en`}
          label={t("pages.blogs_teaser.button_title_en")}
          error={getFieldErrorMessage(
            errors,
            `sections.${index}.content.button_title_en`,
          )}
          register={register(`sections.${index}.content.button_title_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.button_title_ar`}
          label={t("pages.blogs_teaser.button_title_ar")}
          error={getFieldErrorMessage(
            errors,
            `sections.${index}.content.button_title_ar`,
          )}
          register={register(`sections.${index}.content.button_title_ar`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.button_slug_en`}
          label={t("pages.blogs_teaser.button_slug_en")}
          error={getFieldErrorMessage(
            errors,
            `sections.${index}.content.button_slug_en`,
          )}
          register={register(`sections.${index}.content.button_slug_en`)}
          disabled={disabled}
        />
      </Box>

      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <AddNewBlock
          count={fields.length}
          onAdd={() => append(TEASER_ITEM_INITIAL_STATE)}
          managementLabel={t("pages.blog_item_management")}
          addLabel={t("pages.add_new_blog_item")}
        />

        <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
          {fields.map((field, itemIndex) => (
            <BlogsTeaserItemFields
              key={field.id}
              form={form}
              basePath={`${itemsName}.${itemIndex}`}
              itemIndex={itemIndex}
              isDeleteDisabled={fields.length === 1}
              onRemove={() => remove(itemIndex)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </>
  );
}
