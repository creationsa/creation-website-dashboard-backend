import type { SolutionSlugSectionProps } from "@/features/solutions/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";

export default function SolutionSlugSection({
  form,
  disabled,
}: SolutionSlugSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("blogs.slug")}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5"
    >
      <Input
        name="slug_en"
        label={t("blogs.slug_en")}
        error={errors?.slug_en?.message}
        register={register("slug_en")}
        disabled={disabled}
      />
    </Box>
  );
}
