import type { SolutionValuePropositionSectionProps } from "@/features/solutions/types";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";

export default function SolutionValuePropositionSection({
  form,
  disabled,
}: SolutionValuePropositionSectionProps) {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <CollapsibleBox title={t("solutions.proposition_section")}>
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <TextArea
          name="small_description_en"
          label={t("solutions.small_description_en")}
          error={errors?.small_description_en?.message}
          register={register("small_description_en")}
          disabled={disabled}
        />
        <TextArea
          name="small_description_ar"
          label={t("solutions.small_description_ar")}
          error={errors?.small_description_ar?.message}
          register={register("small_description_ar")}
          disabled={disabled}
        />
      </div>
    </CollapsibleBox>
  );
}
