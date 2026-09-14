import type { SolutionsServicesSectionProps } from "@/features/solutions/types";
import DynamicFeaturedItemsFields from "@/shared/components/dynamicFeaturedItemsFields";
import { ITEMS_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import HeaderFields from "@/shared/components/headerFields";
import SectionPreview from "@/shared/components/sectionPreview";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";
import whatWeOfferPreview from "../../../assets/what_we_offer.png";

export default function SolutionsServicesSection({
  form,
  disabled,
}: SolutionsServicesSectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.services_section")}>
      <SectionPreview
        src={whatWeOfferPreview}
        alt={t("projects.main_project_page_preview")}
      />
      <HeaderFields prefix="items_header" form={form} disabled={disabled} />
      <DynamicFeaturedItemsFields
        form={form}
        name="items"
        itemInitialState={ITEMS_INITIAL_STATE}
        disabled={disabled}
        allowProjectPicker
        managementLabel={t("solutions.service_management")}
        addLabel={t("solutions.add_new_service")}
        rowLabelKey="solutions.service_row"
      />
    </CollapsibleBox>
  );
}
