import type {
  SeoLocalizedImageFieldProps,
  SeoMediaOption,
} from "@/shared/components/seoForm/types";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import { memo } from "react";
import { Controller, useFormState } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SeoImagePickerField from "./SeoImagePickerField";

function SeoLocalizedImageField({
  form,
  disabled,
  locale,
  isLinkedRecord,
  mediaOptions,
}: SeoLocalizedImageFieldProps) {
  const { t } = useTranslation();
  const { register, control, setValue } = form;

  const imageFieldName = `image_${locale}` as const;
  const altFieldName = `image_alt_${locale}` as const;
  const label = t(`seo.image_${locale}`);

  const { errors } = useFormState({
    control,
    name: [imageFieldName, altFieldName],
  });

  const handleSelectMedia = (option: SeoMediaOption) => {
    const alt = locale === "en" ? option.altEn : option.altAr;

    setValue(altFieldName, alt ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <Controller
        control={control}
        name={imageFieldName}
        render={({ field }) =>
          mediaOptions?.length ? (
            <SeoImagePickerField
              name={field.name}
              label={label}
              value={field.value}
              onChange={field.onChange}
              onSelectMedia={handleSelectMedia}
              error={errors[imageFieldName]?.message}
              disabled={disabled}
              mediaOptions={mediaOptions}
            />
          ) : (
            <FileUpload
              name={field.name}
              label={label}
              value={field.value}
              onChange={field.onChange}
              error={errors[imageFieldName]?.message}
              disabled={disabled}
            />
          )
        }
      />
      {isLinkedRecord && (
        <p className="ps-1 text-xs text-gray-500">
          {t("seo.image_fallback_hint")}
        </p>
      )}

      <Input
        name={altFieldName}
        label={t(`seo.image_alt_${locale}`)}
        error={errors?.[altFieldName]?.message}
        register={register(altFieldName)}
        disabled={disabled}
      />
    </div>
  );
}

export default memo(SeoLocalizedImageField);
