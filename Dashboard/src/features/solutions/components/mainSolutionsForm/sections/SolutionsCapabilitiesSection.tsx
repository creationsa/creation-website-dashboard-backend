import type { SolutionsCapabilitiesSectionProps } from "@/features/solutions/types";
import DynamicAccordionFields from "@/shared/components/dynamicAccordionFields";
import { ACCORDION_ITEM_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import HeaderFields from "@/shared/components/headerFields";
import SectionPreview from "@/shared/components/sectionPreview";
import SmartMediaField from "@/shared/components/smartMediaField";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";
import dnaPreview from "../../../assets/dna.png";

export default function SolutionsCapabilitiesSection({
  form,
  disabled,
}: SolutionsCapabilitiesSectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.capabilities_section")}>
      <SectionPreview
        src={dnaPreview}
        alt={t("projects.main_project_page_preview")}
      />
      <HeaderFields
        prefix="accordion_items_header"
        form={form}
        disabled={disabled}
      />
      <SmartMediaField
        form={form}
        name="accordion_media"
        label={t("pages.media_content_section.media_file")}
        disabled={disabled}
      />
      <DynamicAccordionFields
        form={form}
        name="accordion_items"
        itemInitialState={ACCORDION_ITEM_INITIAL_STATE}
        disabled={disabled}
        managementLabel={t("solutions.capability_management")}
        addLabel={t("solutions.add_new_capability")}
        rowLabelKey="solutions.capability_row"
      />
    </CollapsibleBox>
  );
}
