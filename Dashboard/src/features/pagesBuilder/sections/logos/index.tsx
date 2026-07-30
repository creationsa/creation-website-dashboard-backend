import LogosFields from "@/shared/components/logosFields";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import logosPreview from "./assets/logos.png";

export default function LogosSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.logos.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview src={logosPreview} alt={t("pages.logos.logos_preview")} />

      <LogosFields
        form={form}
        prefix={`sections.${index}.content`}
        disabled={disabled}
      />

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
