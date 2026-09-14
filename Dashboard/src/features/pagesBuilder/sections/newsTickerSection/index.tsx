import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import type { SectionProps } from "../../types";
import tickerWithBorder from "./assets/ticker-with-border.png";
import tickerWithoutBorder from "./assets/ticker-without-border.png";
import TickerLayoutSettings from "./TickerLayoutSettings";

export default function NewsTickerSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();
  const { watch } = form;

  const hasBorder = watch(`sections.${index}.content.has_border`);

  const activePreviewImage = hasBorder ? tickerWithBorder : tickerWithoutBorder;

  return (
    <>
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
    </>
  );
}
