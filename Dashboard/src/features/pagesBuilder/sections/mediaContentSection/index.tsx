import DynamicAccordionFields from "@/shared/components/dynamicAccordionFields";
import { ACCORDION_ITEM_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import Header from "../header";
import accordion from "./assets/accordion.png";
import description from "./assets/description.png";
import list from "./assets/list.png";
import ContentType from "./ContentType";
import Descriptions from "./Descriptions";
import IsMediaRight from "./IsMediaRight";
import ListItemsFields from "./ListItemsFields";
import {
  MEDIA_CONTENT_TYPES,
  type MediaLayoutType,
} from "./mediaContentSchema";

const PREVIEW_IMAGES: Record<MediaLayoutType, string> = {
  [MEDIA_CONTENT_TYPES.DESCRIPTION]: description,
  [MEDIA_CONTENT_TYPES.ACCORDION]: accordion,
  [MEDIA_CONTENT_TYPES.LIST]: list,
};

export default function MediaContentSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();

  const { watch } = form;

  const contentType = watch(
    `sections.${index}.content.content_type`,
  ) as MediaLayoutType;

  const activePreview =
    PREVIEW_IMAGES[contentType] ||
    PREVIEW_IMAGES[MEDIA_CONTENT_TYPES.DESCRIPTION];

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.media_content_section.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <ContentType form={form} index={index} disabled={disabled} />

        {/* DESCRIPTION */}
        {contentType === "description" && (
          <Descriptions form={form} index={index} disabled={disabled} />
        )}

        {contentType === "accordion" && (
          <DynamicAccordionFields
            form={form}
            name={`sections.${index}.content.accordion_items`}
            itemInitialState={ACCORDION_ITEM_INITIAL_STATE}
            disabled={disabled}
          />
        )}

        {contentType === "list" && (
          <ListItemsFields form={form} index={index} disabled={disabled} />
        )}
      </div>

      <SectionPreview
        src={activePreview}
        alt={t("pages.media_content_section.media_preview")}
      />

      <Header form={form} index={index} disabled={disabled} />

      {/* MEDIA FIELDS */}
      <div className="gap3 flex flex-col rounded-xl border p-4 lg:gap-5">
        <IsMediaRight form={form} index={index} disabled={disabled} />
        <SmartMediaField
          form={form}
          name={`sections.${index}.content.media`}
          label={t("pages.media_content_section.media_file")}
          disabled={disabled}
        />
      </div>

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
