import MenuItemsField from "@/shared/components/menuItemsField";
import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../types";

interface FooterCopyrightSectionProps extends SectionProps {
  currentYear?: number;
}

export default function FooterCopyrightSection({
  form,
  disabled,
  currentYear,
}: FooterCopyrightSectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("footer.copyright_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <TextArea
            name="copyright_text_en"
            label={t("footer.copyright_text_en")}
            error={errors?.copyright_text_en?.message}
            register={register("copyright_text_en")}
            disabled={disabled}
          />

          <TextArea
            name="copyright_text_ar"
            label={t("footer.copyright_text_ar")}
            error={errors?.copyright_text_ar?.message}
            register={register("copyright_text_ar")}
            disabled={disabled}
          />
        </div>

        <p className="ps-1 text-xs text-gray-500">
          {t("footer.copyright_text_hint_before")}
          <code className="text-black-900 mx-1 rounded bg-gray-200 px-1 py-0.5 font-semibold dark:bg-gray-800">
            {"{{year}}"}
          </code>
          {t("footer.copyright_text_hint_after", { currentYear })}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <MenuItemsField
          form={form}
          name="copyright_items"
          label={t("footer.copyright_items_label")}
          disabled={disabled}
        />

        <p className="ps-1 text-xs text-gray-500">
          {t("footer.copyright_items_hint")}
        </p>
      </div>
    </Box>
  );
}
