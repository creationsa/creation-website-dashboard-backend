import BlockHeader from "@/features/pagesBuilder/components/pagesBuilderForm/BlockHeader";
import FileUpload from "@/shared/ui/FileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller, get, type FieldValues, type Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LogoItemFieldsProps } from "./types";

export default function LogoItemFields<TFieldValues extends FieldValues>({
  form,
  prefix,
  logoIndex,
  disabled,
  isDeleteDisabled,
  onRemove,
}: LogoItemFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const basePath = `${prefix}.logos.${logoIndex}`;
  const itemErrors = get(errors, basePath);

  // Type-safe dynamic paths
  const imagePath = `${basePath}.logo_image` as Path<TFieldValues>;
  const altEnPath = `${basePath}.alt_en` as Path<TFieldValues>;
  const altArPath = `${basePath}.alt_ar` as Path<TFieldValues>;

  return (
    <div className="relative flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        index={logoIndex}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name={imagePath}
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("pages.logos.logo_image_label")}
              value={field.value}
              onChange={field.onChange}
              error={itemErrors?.logo_image?.message}
              disabled={disabled}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-3 lg:gap-5 xl:grid-cols-2">
          <Input
            name={altEnPath}
            label={t("general.image_alt_en")}
            error={itemErrors?.alt_en?.message}
            register={register(altEnPath)}
            disabled={disabled}
          />

          <Input
            name={altArPath}
            label={t("general.image_alt_ar")}
            error={itemErrors?.alt_ar?.message}
            register={register(altArPath)}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
