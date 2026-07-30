import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import type { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SlugSectionFormValues } from "./SlugSectionSchema";
import type { SlugSectionProps } from "./types";

export default function SlugSection<
  T extends FieldValues & SlugSectionFormValues,
>({ form, disabled }: SlugSectionProps<T>) {
  const {
    register,
    formState: { errors },
  } = form;

  const SlugError = errors?.slug_en?.message as string | undefined;

  const { t } = useTranslation();

  return (
    <Box
      title={t("blogs.slug")}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <Input
        name="slug_en"
        label={t("blogs.slug_en")}
        error={SlugError}
        register={register("slug_en" as Path<T>)}
        disabled={disabled}
      />
    </Box>
  );
}
