import type { SolutionSectionsProps } from "@/features/solutions/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";

export default function ValueProposition({
  form,
  disabled,
}: SolutionSectionsProps) {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Box
      title={t("solutions.proposition_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="proposition_title_en"
          label={t("solutions.proposition_title_en")}
          error={errors?.proposition_title_en?.message}
          register={register("proposition_title_en")}
          disabled={disabled}
        />
        <Input
          name="proposition_title_ar"
          label={t("solutions.proposition_title_ar")}
          error={errors?.proposition_title_ar?.message}
          register={register("proposition_title_ar")}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name="proposition_desc_en"
          label={t("solutions.proposition_desc_en")}
          error={errors?.proposition_desc_en?.message}
          register={register("proposition_desc_en")}
          disabled={disabled}
        />
        <TextArea
          name="proposition_desc_ar"
          label={t("solutions.proposition_desc_ar")}
          error={errors?.proposition_desc_ar?.message}
          register={register("proposition_desc_ar")}
          disabled={disabled}
        />
      </div>
    </Box>
  );
}
