import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TitleSectionProps } from "./types";
import type { TitleSectionFormValues } from "./titleSectionSchema";

export default function TitleSection<
  T extends FieldValues & TitleSectionFormValues,
>({ form, disabled }: TitleSectionProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  const { t } = useTranslation();

  const titleEnError = errors.title_en?.message as string | undefined;
  const titleArError = errors.title_ar?.message as string | undefined;

  return (
    <Box
      title={t("general.title")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="title_en"
        label={t("general.title_en")}
        error={titleEnError}
        register={register("title_en" as Path<T>)}
        disabled={disabled}
      />
      <Input
        name="title_ar"
        label={t("general.title_ar")}
        error={titleArError}
        register={register("title_ar" as Path<T>)}
        disabled={disabled}
      />
    </Box>
  );
}
