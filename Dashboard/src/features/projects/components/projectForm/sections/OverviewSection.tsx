import type { SectionProps } from "@/features/projects/types";
import HeaderFields from "@/shared/components/headerFields";
import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";

export default function OverviewSection({ form, disabled }: SectionProps) {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Box
      title={t("projects.overview_section")}
      className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
    >
      <div className="rounded-xl border p-4">
        <SmartMediaField
          form={form}
          name="first_cover_media"
          label={t("projects.first_cover_media")}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <HeaderFields form={form} disabled={disabled} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <TextArea
            name="overview_description_en"
            label={t("projects.overview_description_en")}
            error={errors?.overview_description_en?.message}
            register={register("overview_description_en")}
            disabled={disabled}
          />
          <TextArea
            name="overview_description_ar"
            label={t("projects.overview_description_ar")}
            error={errors?.overview_description_ar?.message}
            register={register("overview_description_ar")}
            disabled={disabled}
          />
        </div>
      </div>
    </Box>
  );
}
