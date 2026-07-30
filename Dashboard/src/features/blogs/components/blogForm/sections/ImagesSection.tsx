import Box from "@/shared/ui/Box";
import FileUpload from "@/shared/ui/FileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../../types";

export default function ImagesSection({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
    control,
  } = form;
  const { t } = useTranslation();
  return (
    <Box
      title={t("general.images")}
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div className="col-span-1 flex flex-col gap-4 md:col-span-1">
        <Controller
          control={control}
          name="base_image"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("blogs.base_image")}
              value={field.value}
              onChange={field.onChange}
              error={errors.base_image?.message}
              disabled={disabled}
            />
          )}
        />
        <Input
          name="base_image_alt_en"
          label={t("blogs.base_image_alt_en")}
          error={errors?.base_image_alt_en?.message}
          register={register("base_image_alt_en")}
          disabled={disabled}
        />
        <Input
          name="base_image_alt_ar"
          label={t("blogs.base_image_alt_ar")}
          error={errors?.base_image_alt_ar?.message}
          register={register("base_image_alt_ar")}
          disabled={disabled}
        />
      </div>

      <div className="col-span-1 flex flex-col gap-4 md:col-span-2">
        <Controller
          control={control}
          name="cover_image"
          render={({ field }) => (
            <FileUpload
              name={field.name}
              label={t("blogs.cover_image")}
              value={field.value}
              onChange={field.onChange}
              error={errors.cover_image?.message}
              disabled={disabled}
            />
          )}
        />
        <Input
          name="cover_image_alt_en"
          label={t("blogs.cover_image_alt_en")}
          error={errors?.cover_image_alt_en?.message}
          register={register("cover_image_alt_en")}
          disabled={disabled}
        />
        <Input
          name="cover_image_alt_ar"
          label={t("blogs.cover_image_alt_ar")}
          error={errors?.cover_image_alt_ar?.message}
          register={register("cover_image_alt_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
