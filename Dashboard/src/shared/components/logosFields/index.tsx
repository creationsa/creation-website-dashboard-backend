import AddNewBlock from "@/features/pagesBuilder/components/pagesBuilderForm/AddNewBlock";
import Input from "@/shared/ui/textField/Input";
import {
  get,
  useFieldArray,
  type ArrayPath,
  type FieldArray,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import LogoItemFields from "./LogoItemFields";
import { LOGO_ITEM_INITIAL_STATE } from "./getLogosFieldsDefaultValues";
import type { LogosFieldsProps } from "./types";

export default function LogosFields<TFieldValues extends FieldValues>({
  form,
  prefix,
  disabled,
}: LogosFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const fieldArrayName = `${prefix}.logos` as ArrayPath<TFieldValues>;
  const titleEnName = `${prefix}.title_en` as Path<TFieldValues>;
  const titleArName = `${prefix}.title_ar` as Path<TFieldValues>;

  const {
    fields: logosFields,
    append: appendLogo,
    remove: removeLogo,
  } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const prefixErrors = get(errors, prefix);

  return (
    <>
      {/* Title EN & AR */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
        <Input
          name={titleEnName}
          label={t("pages.logos.title_en_label")}
          error={prefixErrors?.title_en?.message}
          register={register(titleEnName)}
          disabled={disabled}
        />
        <Input
          name={titleArName}
          label={t("pages.logos.title_ar_label")}
          error={prefixErrors?.title_ar?.message}
          register={register(titleArName)}
          disabled={disabled}
        />
      </div>

      {/* Logos List */}
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <AddNewBlock
          count={logosFields.length}
          onAdd={() =>
            appendLogo(
              LOGO_ITEM_INITIAL_STATE as FieldArray<
                TFieldValues,
                ArrayPath<TFieldValues>
              >,
            )
          }
        />

        <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
          {logosFields.map((logo, logoIndex) => (
            <LogoItemFields
              key={logo.id}
              form={form}
              prefix={prefix}
              logoIndex={logoIndex}
              disabled={disabled}
              isDeleteDisabled={logosFields.length === 1}
              onRemove={() => removeLogo(logoIndex)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
