import DynamicAccordionFields from "@/shared/components/dynamicAccordionFields";
import { ACCORDION_ITEM_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import SmartMediaField from "@/shared/components/smartMediaField";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import AccordionSideLabel from "./AccordionSideLabel";
import AccordionWithButton from "./AccordionWithButton";
import withButton from "./assets/with-button.png";
import withoutButton from "./assets/without-button.png";
import withMedia from "./assets/with-media.png";
import {
  CUSTOM_ACCORDION_TYPES,
  type CustomAccordionType,
} from "./customAccordionSchema";
import LayoutType from "./LayoutType";

const PREVIEW_IMAGES: Record<CustomAccordionType, string> = {
  [CUSTOM_ACCORDION_TYPES.WITH_BUTTON]: withButton,
  [CUSTOM_ACCORDION_TYPES.HEADING_ONLY]: withoutButton,
  [CUSTOM_ACCORDION_TYPES.WITH_MEDIA]: withMedia,
};

export default function CustomAccordionSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();
  const { watch } = form;

  const layoutType = watch(
    `sections.${index}.content.layout_type`,
  ) as CustomAccordionType;

  const activePreview =
    PREVIEW_IMAGES[layoutType] ||
    PREVIEW_IMAGES[CUSTOM_ACCORDION_TYPES.WITH_BUTTON];

  return (
    <>
      <div className="gap3 flex flex-col rounded-xl border p-4 lg:gap-5">
        <LayoutType form={form} disabled={disabled} index={index} />

        {layoutType === CUSTOM_ACCORDION_TYPES.WITH_BUTTON && (
          <AccordionWithButton form={form} disabled={disabled} index={index} />
        )}

        {layoutType === CUSTOM_ACCORDION_TYPES.WITH_MEDIA && (
          <div className="rounded-xl border p-4">
            <SmartMediaField
              form={form}
              name={`sections.${index}.content.banner_media`}
              label={t("pages.custom_accordion.banner_media_label")}
              disabled={disabled}
            />
          </div>
        )}

        {layoutType === CUSTOM_ACCORDION_TYPES.WITH_MEDIA && (
          <AccordionSideLabel form={form} disabled={disabled} index={index} />
        )}
      </div>

      <SectionPreview
        src={activePreview}
        alt={t("pages.custom_accordion.custom_accordion_preview")}
      />
      <Header form={form} index={index} disabled={disabled} />

      <DynamicAccordionFields
        form={form}
        name={`sections.${index}.content.accordion_items`}
        itemInitialState={ACCORDION_ITEM_INITIAL_STATE}
        disabled={disabled}
        managementLabel={t("blockControls.accordion_item_management")}
        addLabel={t("blockControls.add_new_accordion_item")}
        rowLabelKey="blockControls.accordion_item_row"
      />
    </>
  );
}
