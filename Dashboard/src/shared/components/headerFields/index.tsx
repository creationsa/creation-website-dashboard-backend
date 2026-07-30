import Input from "@/shared/ui/textField/Input";
import { get, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { HeaderFieldsProps } from "./types";

export default function HeaderFields<T extends FieldValues>({
  form,
  disabled,
  prefix = "",
}: HeaderFieldsProps<T>) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
  } = form;

  const fieldName = <K extends string>(key: K) =>
    (prefix ? `${prefix}.${key}` : key) as Path<T>;

  const fieldError = (key: string) =>
    get(errors, prefix ? `${prefix}.${key}.message` : `${key}.message`);

  const fields = [
    {
      key: "first_title_en",
      label: t("general.first_title_part_en"),
    },
    {
      key: "first_title_ar",
      label: t("general.first_title_part_ar"),
    },
    {
      key: "second_title_en",
      label: t("general.second_title_part_en"),
    },
    {
      key: "second_title_ar",
      label: t("general.second_title_part_ar"),
    },
    {
      key: "third_title_en",
      label: t("general.third_title_part_en"),
    },
    {
      key: "third_title_ar",
      label: t("general.third_title_part_ar"),
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
      {fields.map(({ key, label }) => (
        <Input
          key={key}
          name={fieldName(key)}
          label={label}
          error={fieldError(key)}
          register={register(fieldName(key))}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
