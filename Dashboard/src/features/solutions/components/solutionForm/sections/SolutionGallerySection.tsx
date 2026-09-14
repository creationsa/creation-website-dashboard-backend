import type { SolutionGallerySectionProps } from "@/features/solutions/types";
import DynamicFeaturedItemsFields from "@/shared/components/dynamicFeaturedItemsFields";
import { MEDIA_ONLY_ITEM_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";

export default function SolutionGallerySection({
  form,
  disabled,
}: SolutionGallerySectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.gallery_section")}>
      <DynamicFeaturedItemsFields
        form={form}
        name="items"
        itemInitialState={MEDIA_ONLY_ITEM_INITIAL_STATE}
        disabled={disabled}
        hasTitleAndSlug={false}
        allowProjectPicker
        managementLabel={t("solutions.gallery_item_management")}
        addLabel={t("solutions.add_new_gallery_item")}
        rowLabelKey="solutions.gallery_item_row"
      />
    </CollapsibleBox>
  );
}
