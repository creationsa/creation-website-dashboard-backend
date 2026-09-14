import LogoHint from "@/shared/components/LogoHint";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

export default function FooterCreationSection({
  form,
  disabled,
}: SectionProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  return (
    <Box
      title={t("footer.creation_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <LogoHint />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name="description_en"
          label={t("general.desc_en")}
          error={errors?.description_en?.message}
          register={register("description_en")}
          disabled={disabled}
        />
        <TextArea
          name="description_ar"
          label={t("general.desc_ar")}
          error={errors?.description_ar?.message}
          register={register("description_ar")}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="tagline_en"
          label={t("footer.tagline_en")}
          error={errors?.tagline_en?.message}
          register={register("tagline_en")}
          disabled={disabled}
        />
        <Input
          name="tagline_ar"
          label={t("footer.tagline_ar")}
          error={errors?.tagline_ar?.message}
          register={register("tagline_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
