import type { SolutionCardIconSectionProps } from "@/features/solutions/types";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function SolutionCardIconSection({
  form,
  disabled,
}: SolutionCardIconSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <CollapsibleBox title={t("solutions.card_icon")}>
      <Controller
        control={control}
        name="card_icon.file"
        render={({ field }) => (
          <FileUpload
            name={field.name}
            label={t("solutions.card_icon_label")}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            accept="image/svg+xml"
            error={errors.card_icon?.file?.message}
            disabled={disabled}
          />
        )}
      />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="card_icon.alt_en"
          label={t("general.image_alt_en")}
          error={errors.card_icon?.alt_en?.message}
          register={register("card_icon.alt_en")}
          disabled={disabled}
        />
        <Input
          name="card_icon.alt_ar"
          label={t("general.image_alt_ar")}
          error={errors.card_icon?.alt_ar?.message}
          register={register("card_icon.alt_ar")}
          disabled={disabled}
        />
      </div>
    </CollapsibleBox>
  );
}
