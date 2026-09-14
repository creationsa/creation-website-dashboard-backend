import SeoLocalizedImageField from "@/shared/components/seoForm/SeoLocalizedImageField";
import type { SeoImagesSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import { memo } from "react";
import { useTranslation } from "react-i18next";

function SeoImagesSection({
  form,
  disabled,
  isLinkedRecord,
  mediaOptions,
}: SeoImagesSectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      title={t("general.images")}
      className="grid grid-cols-1 gap-2 md:grid-cols-2"
    >
      <SeoLocalizedImageField
        form={form}
        disabled={disabled}
        locale="en"
        isLinkedRecord={isLinkedRecord}
        mediaOptions={mediaOptions}
      />
      <SeoLocalizedImageField
        form={form}
        disabled={disabled}
        locale="ar"
        isLinkedRecord={isLinkedRecord}
        mediaOptions={mediaOptions}
      />
    </Box>
  );
}

export default memo(SeoImagesSection);
