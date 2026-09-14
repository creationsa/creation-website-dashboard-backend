import MenuItemsField from "@/shared/components/menuItemsField";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

export default function FooterMenuSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("footer.menu_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name="menu_title_en"
          label={t("footer.menu_title_en")}
          error={errors?.menu_title_en?.message}
          register={register("menu_title_en")}
          disabled={disabled}
        />
        <Input
          name="menu_title_ar"
          label={t("footer.menu_title_ar")}
          error={errors?.menu_title_ar?.message}
          register={register("menu_title_ar")}
          disabled={disabled}
        />
      </div>
      <MenuItemsField
        form={form}
        name="menu_items"
        label={t("footer.menu_items_label")}
        disabled={disabled}
      />
    </Box>
  );
}
