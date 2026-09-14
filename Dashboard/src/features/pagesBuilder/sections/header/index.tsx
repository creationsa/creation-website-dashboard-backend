import HeaderFields from "@/shared/components/headerFields";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import SectionPreview from "../../../../shared/components/sectionPreview";
import header from "./assets/header.png";
import type { HeaderProps } from "./types";

export default function Header({
  form,
  index,
  disabled,
  onRemove,
}: HeaderProps) {
  const { t } = useTranslation();

  const fields = (
    <HeaderFields
      form={form}
      disabled={disabled}
      prefix={`sections.${index}.content`}
    />
  );

  // Used as a top-level page-builder section: the accordion wrapper in
  // SectionsList already provides the title/border/delete chrome.
  if (onRemove) {
    return (
      <>
        <SectionPreview src={header} alt={t("pages.header_preview")} />
        {fields}
      </>
    );
  }

  // Used as a nested sub-block inside another section: keep its own
  // lightweight bordered box for visual grouping.
  return (
    <Box className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      {fields}
    </Box>
  );
}
