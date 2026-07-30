import HeaderFields from "@/shared/components/headerFields";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import header from "./assets/header.png";
import type { HeaderProps } from "./types";

export default function Header({
  form,
  index,
  disabled,
  onRemove,
}: HeaderProps) {
  const { t } = useTranslation();

  const title = onRemove ? t("pages.header") : "";

  return (
    <Box
      title={title}
      className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
    >
      {onRemove && (
        <SectionPreview src={header} alt={t("pages.header_preview")} />
      )}

      <HeaderFields
        form={form}
        disabled={disabled}
        prefix={`sections.${index}.content`}
      />
      {onRemove && <DeleteSectionButton onRemove={onRemove} />}
    </Box>
  );
}
