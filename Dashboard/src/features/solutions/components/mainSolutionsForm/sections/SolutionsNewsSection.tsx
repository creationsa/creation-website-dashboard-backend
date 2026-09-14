import type { SolutionsNewsSectionProps } from "@/features/solutions/types";
import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import SectionPreview from "@/shared/components/sectionPreview";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import newsPreview from "../../../assets/news.png";

export default function SolutionsNewsSection({
  form,
  disabled,
}: SolutionsNewsSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <CollapsibleBox title={t("solutions.news_section")}>
      <SectionPreview
        src={newsPreview}
        alt={t("projects.main_project_page_preview")}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="core_desc_en"
          label={t("general.desc_en")}
          error={errors?.core_desc_en?.message}
          register={register("core_desc_en")}
          rows={8}
          disabled={disabled}
        />
        <TextArea
          name="core_desc_ar"
          label={t("general.desc_ar")}
          error={errors?.core_desc_ar?.message}
          register={register("core_desc_ar")}
          rows={8}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="core_sub_desc_en"
          label={t("general.sub_desc_en")}
          error={errors?.core_sub_desc_en?.message}
          register={register("core_sub_desc_en")}
          rows={8}
          disabled={disabled}
        />
        <TextArea
          name="core_sub_desc_ar"
          label={t("general.sub_desc_ar")}
          error={errors?.core_sub_desc_ar?.message}
          register={register("core_sub_desc_ar")}
          rows={8}
          disabled={disabled}
        />
      </div>
      <DynamicItemsFields form={form} disabled={disabled} name="ticker_items" />
    </CollapsibleBox>
  );
}
