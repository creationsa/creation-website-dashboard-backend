import Box from "@/shared/ui/Box";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

export default function FooterStatement({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
    control,
  } = form;
  const { t } = useTranslation();
  return (
    <Box title={t("footer.statement")} className="flex flex-col gap-3 lg:gap-5">
      <Controller
        control={control}
        name="statement_image"
        render={({ field }) => (
          <FileUpload
            name={field.name}
            label={t("footer.statement_image")}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            accept="image/svg+xml"
            error={errors.statement_image?.message}
            disabled={disabled}
          />
        )}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="statement_image_alt_en"
          label={t("general.image_alt_en")}
          error={errors?.statement_image_alt_en?.message}
          register={register("statement_image_alt_en")}
          disabled={disabled}
        />
        <Input
          name="statement_image_alt_ar"
          label={t("general.image_alt_ar")}
          error={errors?.statement_image_alt_ar?.message}
          register={register("statement_image_alt_ar")}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name="statement_desc_en"
          label={t("general.desc_en")}
          error={errors?.statement_desc_en?.message}
          register={register("statement_desc_en")}
          disabled={disabled}
        />
        <TextArea
          name="statement_desc_ar"
          label={t("general.desc_ar")}
          error={errors?.statement_desc_ar?.message}
          register={register("statement_desc_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
