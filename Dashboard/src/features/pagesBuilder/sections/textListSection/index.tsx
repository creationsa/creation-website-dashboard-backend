import Switch from "@/shared/ui/Switch";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { Controller, useFieldArray, useWatch, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import type { PageFormValues } from "../../components/pagesBuilderForm/pageSchema";
import type { SectionProps } from "../../types";
import Header from "../header";
import { TEXT_ITEM_INITIAL_STATE } from "./getTextListDefaultValues";
import TextItemFields from "./TextItemFields";

export default function TextListSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const basePath = `sections.${index}.content`;
  const stickyTogglePath =
    `${basePath}.has_sticky_sidebar` as Path<PageFormValues>;

  const hasStickySidebar = useWatch({ control, name: stickyTogglePath });

  const {
    fields: items,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `sections.${index}.content.items`,
  });

  return (
    <>
      <Header form={form} index={index} disabled={disabled} />

      <Controller
        control={control}
        name={stickyTogglePath}
        render={({ field: { value, onChange } }) => (
          <Switch
            name={stickyTogglePath}
            label={t("pages.text_list_section.sticky_sidebar_toggle_label")}
            checked={Boolean(value)}
            onChange={onChange}
            disabled={disabled}
            checkedText={t("pages.text_list_section.sticky_sidebar_enabled")}
            uncheckedText={t(
              "pages.text_list_section.sticky_sidebar_disabled",
            )}
          />
        )}
      />

      {hasStickySidebar && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5">
            <Input
              name={`${basePath}.sections_label_en`}
              label={t("pages.text_list_section.sections_label_en")}
              error={getFieldErrorMessage(
                errors,
                `${basePath}.sections_label_en`,
              )}
              register={register(
                `${basePath}.sections_label_en` as Path<PageFormValues>,
              )}
              disabled={disabled}
            />
            <Input
              name={`${basePath}.sections_label_ar`}
              label={t("pages.text_list_section.sections_label_ar")}
              error={getFieldErrorMessage(
                errors,
                `${basePath}.sections_label_ar`,
              )}
              register={register(
                `${basePath}.sections_label_ar` as Path<PageFormValues>,
              )}
              disabled={disabled}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-5">
            <TextArea
              name={`${basePath}.sticky_description_en`}
              label={t("pages.text_list_section.sticky_description_en")}
              error={getFieldErrorMessage(
                errors,
                `${basePath}.sticky_description_en`,
              )}
              register={register(
                `${basePath}.sticky_description_en` as Path<PageFormValues>,
              )}
              disabled={disabled}
            />
            <TextArea
              name={`${basePath}.sticky_description_ar`}
              label={t("pages.text_list_section.sticky_description_ar")}
              error={getFieldErrorMessage(
                errors,
                `${basePath}.sticky_description_ar`,
              )}
              register={register(
                `${basePath}.sticky_description_ar` as Path<PageFormValues>,
              )}
              disabled={disabled}
            />
          </div>
        </>
      )}

      <AddNewBlock
        count={items.length}
        onAdd={() => appendItem({ ...TEXT_ITEM_INITIAL_STATE })}
        managementLabel={t("pages.text_block_management")}
        addLabel={t("pages.add_new_text_block")}
      />

      <div className="flex flex-col gap-4">
        {items.map((item, itemIndex) => (
          <TextItemFields
            key={item.id}
            form={form}
            sectionIndex={index}
            itemIndex={itemIndex}
            disabled={disabled}
            isDeleteDisabled={items.length === 1}
            onRemove={() => removeItem(itemIndex)}
          />
        ))}
      </div>
    </>
  );
}
