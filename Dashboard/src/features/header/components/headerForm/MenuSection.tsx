import MenuItemsField from "@/shared/components/menuItemsField";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../types";

export default function MenuSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      title={t("header.menu_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <MenuItemsField
        form={form}
        name="menu_items"
        label={t("header.menu_items_label")}
        disabled={disabled}
      />
    </Box>
  );
}
