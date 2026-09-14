import DynamicFeaturedItemsFields from "@/shared/components/dynamicFeaturedItemsFields";
import { ITEMS_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import contained from "./assets/contained.png";
import fullWidth from "./assets/full-width.png";
import FeaturedLayoutConfigFields from "./FeaturedLayoutConfigFields";
import {
  FEATURED_LAYOUT_TYPES,
  type FeaturedLayoutType,
} from "./featuredWorksSchema";

const PREVIEW_IMAGES: Record<FeaturedLayoutType, string> = {
  [FEATURED_LAYOUT_TYPES.CONTAINED]: contained,
  [FEATURED_LAYOUT_TYPES.FULL_WIDTH]: fullWidth,
};

export default function FeaturedWorksSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();

  const { watch } = form;

  const layoutType = watch(
    `sections.${index}.content.layout_type`,
  ) as FeaturedLayoutType;

  const activePreview =
    PREVIEW_IMAGES[layoutType] ||
    PREVIEW_IMAGES[FEATURED_LAYOUT_TYPES.CONTAINED];

  return (
    <>
      <FeaturedLayoutConfigFields
        form={form}
        index={index}
        disabled={disabled}
      />

      <SectionPreview
        src={activePreview}
        alt={t("pages.featured_works.feature_preview")}
      />

      <Header form={form} index={index} disabled={disabled} />

      {/* FEATURED ITEMS MANAGEMENT */}
      <DynamicFeaturedItemsFields
        form={form}
        name={`sections.${index}.content.items`}
        itemInitialState={ITEMS_INITIAL_STATE}
        disabled={disabled}
        allowProjectPicker
        managementLabel={t("pages.featured_work_management")}
        addLabel={t("pages.add_new_featured_work")}
        rowLabelKey="pages.featured_work_row"
      />
    </>
  );
}
