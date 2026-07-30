import SmartMediaField from "@/shared/components/smartMediaField";
import { useTranslation } from "react-i18next";
import type { SubSectionProps } from "../../types";

export default function ImagesSection({
  form,
  index,
  disabled,
}: SubSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
      <SmartMediaField
        form={form}
        name={`sections.${index}.content.left_media`}
        label={t("pages.banner_section.left_image")}
        disabled={disabled}
      />

      <SmartMediaField
        form={form}
        name={`sections.${index}.content.right_media`}
        label={t("pages.banner_section.right_image")}
        disabled={disabled}
      />
    </div>
  );
}
