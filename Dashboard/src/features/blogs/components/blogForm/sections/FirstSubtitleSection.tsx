import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../../types";

export default function FirstSubtitleSection({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const { t } = useTranslation();
  return (
    <Box title={t("blogs.first_sub_title")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="first_sub_title_en"
          label={t("blogs.first_sub_title_en")}
          error={errors?.first_sub_title_en?.message}
          register={register("first_sub_title_en")}
          rows={5}
          disabled={disabled}
        />
        <TextArea
          name="first_sub_title_ar"
          label={t("blogs.first_sub_title_ar")}
          error={errors?.first_sub_title_ar?.message}
          register={register("first_sub_title_ar")}
          rows={5}
          disabled={disabled}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="first_desc_en"
          label={t("blogs.first_desc_en")}
          error={errors?.first_desc_en?.message}
          register={register("first_desc_en")}
          disabled={disabled}
        />
        <TextArea
          name="first_desc_ar"
          label={t("blogs.first_desc_ar")}
          error={errors?.first_desc_ar?.message}
          register={register("first_desc_ar")}
          disabled={disabled}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="second_desc_en"
          label={t("blogs.second_desc_en")}
          error={errors?.second_desc_en?.message}
          register={register("second_desc_en")}
          disabled={disabled}
        />
        <TextArea
          name="second_desc_ar"
          label={t("blogs.second_desc_ar")}
          error={errors?.second_desc_ar?.message}
          register={register("second_desc_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
