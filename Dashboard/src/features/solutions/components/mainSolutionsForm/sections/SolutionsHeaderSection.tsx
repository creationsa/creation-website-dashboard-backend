import type { SolutionsHeaderSectionProps } from "@/features/solutions/types";
import HeaderFields from "@/shared/components/headerFields";
import SectionPreview from "@/shared/components/sectionPreview";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";
import headerPreview from "../../../assets/header.png";

export default function SolutionsHeaderSection({
  form,
  disabled,
}: SolutionsHeaderSectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.header_section")}>
      <SectionPreview
        src={headerPreview}
        alt={t("projects.main_project_page_preview")}
      />
      <HeaderFields form={form} disabled={disabled} />
    </CollapsibleBox>
  );
}
