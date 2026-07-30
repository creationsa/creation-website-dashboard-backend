import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import tickerWithBorder from "./assets/ticker-with-border.png";
import tickerWithoutBorder from "./assets/ticker-without-border.png";
import TickerLayoutSettings from "./TickerLayoutSettings";

export default function NewsTickerSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();
  const { watch } = form;

  const hasBorder = watch(`sections.${index}.content.has_border`);

  const activePreviewImage = hasBorder ? tickerWithBorder : tickerWithoutBorder;

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.news_ticker.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <TickerLayoutSettings form={form} index={index} disabled={disabled} />

      <SectionPreview
        src={activePreviewImage}
        alt={t("pages.news_ticker.new_ticker_preview")}
      />

      <div className="rounded-xl border p-4">
        <DynamicItemsFields
          form={form}
          disabled={disabled}
          name={`sections.${index}.content.items`}
        />
      </div>

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
