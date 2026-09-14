import Input from "@/shared/ui/textField/Input";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import { memo } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { MediaImageAltFieldsProps } from "./types";

function MediaImageAltFields<T extends FieldValues>({
  form,
  name,
  disabled,
}: MediaImageAltFieldsProps<T>) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 gap-3 lg:gap-5 2xl:grid-cols-2">
      <Input
        name={`${name}.alt_en` as Path<T>}
        label={t("general.image_alt_en")}
        register={register(`${name}.alt_en` as Path<T>)}
        error={getFieldErrorMessage(errors, `${name}.alt_en`)}
        disabled={disabled}
      />

      <Input
        name={`${name}.alt_ar` as Path<T>}
        label={t("general.image_alt_ar")}
        register={register(`${name}.alt_ar` as Path<T>)}
        error={getFieldErrorMessage(errors, `${name}.alt_ar`)}
        disabled={disabled}
      />
    </div>
  );
}

export default memo(MediaImageAltFields) as typeof MediaImageAltFields;
