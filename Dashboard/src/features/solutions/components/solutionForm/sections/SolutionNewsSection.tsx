import type { SolutionNewsSectionProps } from "@/features/solutions/types";
import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";

export default function SolutionNewsSection({
  form,
  disabled,
}: SolutionNewsSectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.news_section")}>
      <DynamicItemsFields form={form} disabled={disabled} name="ticker_items" />
    </CollapsibleBox>
  );
}
