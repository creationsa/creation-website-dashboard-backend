import type { SolutionHeaderSectionProps } from "@/features/solutions/types";
import HeaderFields from "@/shared/components/headerFields";
import CollapsibleBox from "@/shared/ui/CollapsibleBox";
import { useTranslation } from "react-i18next";

export default function SolutionHeaderSection({
  form,
  disabled,
}: SolutionHeaderSectionProps) {
  const { t } = useTranslation();

  return (
    <CollapsibleBox title={t("solutions.header_section")}>
      <HeaderFields form={form} disabled={disabled} />
    </CollapsibleBox>
  );
}
