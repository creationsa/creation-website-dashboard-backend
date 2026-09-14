import KeywordsInput from "@/shared/components/seoForm/KeywordsInput";
import type { SeoKeywordsSectionProps } from "@/shared/components/seoForm/types";
import Box from "@/shared/ui/Box";
import { memo } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

function SeoKeywordsSection({
  form,
  disabled,
  isLinkedRecord,
}: SeoKeywordsSectionProps) {
  const { t } = useTranslation();
  const { control } = form;

  return (
    <Box title={t("seo.keywords")} className="flex flex-col gap-1">
      <Controller
        control={control}
        name="keywords"
        render={({ field }) => (
          <KeywordsInput
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
          />
        )}
      />
      {isLinkedRecord && (
        <p className="ps-1 text-xs text-gray-500">
          {t("seo.keywords_fallback_hint")}
        </p>
      )}
    </Box>
  );
}

export default memo(SeoKeywordsSection);
