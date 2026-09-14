import type { SectionProps } from "@/features/projects/types";
import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import { useTranslation } from "react-i18next";
import CoverToggle from "../CoverToggle";

const MEDIA_KEYS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
] as const;

export default function MediaSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();

  return (
    <Box
      title={t("projects.media_section")}
      className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5"
    >
      {MEDIA_KEYS.map((key) => {
        const valueName = `${key}_media` as const;

        return (
          <div key={key} className="rounded-xl border p-4">
            <SmartMediaField
              form={form}
              name={valueName}
              label={t(`projects.${valueName}`)}
              disabled={disabled}
            />
            <CoverToggle form={form} fieldName={valueName} disabled={disabled} />
          </div>
        );
      })}
    </Box>
  );
}
