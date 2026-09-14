import { useLanguage } from "@/shared/hooks/useLanguage";
import SelectField from "@/shared/ui/selectField";
import { useMemo } from "react";
import { Controller, type FieldValues, type PathValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMenuOptions } from "./hooks/useMenuOptions";
import type { MenuItemFormValues } from "./menuItemsFieldSchema";
import type { MenuItemsFieldProps } from "./types";

function encode(item: MenuItemFormValues) {
  return item.type === "page" ? `page:${item.page_id}` : item.type;
}

function decode(raw: string): MenuItemFormValues {
  if (raw.startsWith("page:")) {
    return { type: "page", page_id: Number(raw.replace("page:", "")) };
  }
  return { type: raw as "solutions" | "projects" | "blogs", page_id: null };
}

export default function MenuItemsField<T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: MenuItemsFieldProps<T>) {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { menuOptions } = useMenuOptions(currentLanguage);

  const { control } = form;

  const options = useMemo(
    () =>
      menuOptions?.map((option) => ({
        label: option.title,
        value: option.type === "page" ? `page:${option.id}` : option.type,
      })) ?? [],
    [menuOptions],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <SelectField
          isMulti
          name={name}
          label={label}
          options={options}
          value={((field.value ?? []) as MenuItemFormValues[]).map(encode)}
          onChange={(selected) =>
            field.onChange(
              selected.map((raw) => decode(String(raw))) as PathValue<
                T,
                typeof name
              >,
            )
          }
          placeholder={t("general.choose_page_that_you_want_to_add")}
          disabled={disabled}
        />
      )}
    />
  );
}
