import Box from "@/shared/ui/Box";
import FileUpload from "@/shared/ui/fileUpload";
import Input from "@/shared/ui/textField/Input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

const BADGE_INDEXES = [0, 1] as const;

export default function FooterBadgesSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("footer.badges_section")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      {BADGE_INDEXES.map((index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
        >
          <Controller
            control={control}
            name={`badges.${index}.image`}
            render={({ field }) => (
              <FileUpload
                name={field.name}
                label={t("footer.badge_image", { index: index + 1 })}
                value={field.value}
                onChange={field.onChange}
                error={errors.badges?.[index]?.image?.message}
                disabled={disabled}
              />
            )}
          />

          <Input
            name={`badges.${index}.label_en`}
            label={t("footer.badge_label_en")}
            error={errors.badges?.[index]?.label_en?.message}
            register={register(`badges.${index}.label_en`)}
            disabled={disabled}
          />
          <Input
            name={`badges.${index}.label_ar`}
            label={t("footer.badge_label_ar")}
            error={errors.badges?.[index]?.label_ar?.message}
            register={register(`badges.${index}.label_ar`)}
            disabled={disabled}
          />
          <Input
            name={`badges.${index}.link`}
            label={t("footer.badge_link")}
            error={errors.badges?.[index]?.link?.message}
            register={register(`badges.${index}.link`)}
            disabled={disabled}
          />
        </div>
      ))}
    </Box>
  );
}
