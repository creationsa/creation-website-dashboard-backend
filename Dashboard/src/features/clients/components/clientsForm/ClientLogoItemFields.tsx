import BlockHeader from "@/shared/components/blockControls/BlockHeader";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ClientLogoItemFieldsProps } from "../../types";
import Box from "@/shared/ui/Box";

export default function ClientLogoItemFields({
  form,
  logoIndex,
  disabled,
  isDeleteDisabled,
  onRemove,
}: ClientLogoItemFieldsProps) {
  const { t } = useTranslation();
  const {
    control,
    register,
    formState: { errors },
  } = form;

  const itemErrors = errors.logos?.[logoIndex];

  return (
    <Box className="flex flex-col gap-3 lg:gap-5">
      <BlockHeader
        rowLabel={t("clients.logo_row", { index: logoIndex + 1 })}
        onRemove={onRemove}
        isDeleteDisabled={isDeleteDisabled}
      />

      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name={`logos.${logoIndex}.logo_image`}
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("clients.logo_image_label")}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              accept="image/svg+xml"
              error={itemErrors?.logo_image?.message}
              disabled={disabled}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <Input
            name={`logos.${logoIndex}.alt_en`}
            label={t("general.image_alt_en")}
            error={itemErrors?.alt_en?.message}
            register={register(`logos.${logoIndex}.alt_en`)}
            disabled={disabled}
          />

          <Input
            name={`logos.${logoIndex}.alt_ar`}
            label={t("general.image_alt_ar")}
            error={itemErrors?.alt_ar?.message}
            register={register(`logos.${logoIndex}.alt_ar`)}
            disabled={disabled}
          />
        </div>
      </div>
    </Box>
  );
}
