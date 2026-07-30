import Input from "@/shared/ui/textField/Input";
import { useFieldArray, type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AddNewBlock from "../../components/pagesBuilderForm/AddNewBlock";
import BlockHeader from "../../components/pagesBuilderForm/BlockHeader";
import type { SubSectionProps } from "../../types";
import { LIST_ITEM_INITIAL_STATE } from "./getMediaContentDefaultValues";
import type { ListVariant } from "./mediaContentSchema";

export default function ListItemsFields({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${index}.content.list_items`,
  });
  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<ListVariant>
    | undefined;

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() => append(LIST_ITEM_INITIAL_STATE)}
      />
      <div className="flex flex-col gap-3 lg:gap-5">
        {fields.map((field, itemIndex) => (
          <div
            key={field.id}
            className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
          >
            <BlockHeader
              index={itemIndex}
              onRemove={() => remove(itemIndex)}
              isDeleteDisabled={fields.length === 1}
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input
                name={`sections.${index}.content.list_items.${itemIndex}.text_en`}
                label={`${t("general.title_en")} (${itemIndex + 1})`}
                register={register(
                  `sections.${index}.content.list_items.${itemIndex}.text_en`,
                )}
                error={sectionErrors?.list_items?.[itemIndex]?.text_en?.message}
                disabled={disabled}
              />
              <Input
                name={`sections.${index}.content.list_items.${itemIndex}.text_ar`}
                label={`${t("general.title_ar")} (${itemIndex + 1})`}
                register={register(
                  `sections.${index}.content.list_items.${itemIndex}.text_ar`,
                )}
                error={sectionErrors?.list_items?.[itemIndex]?.text_ar?.message}
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
