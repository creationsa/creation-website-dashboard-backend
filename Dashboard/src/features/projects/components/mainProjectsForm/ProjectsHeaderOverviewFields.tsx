import HeaderFields from "@/shared/components/headerFields";
import SectionPreview from "@/shared/components/sectionPreview";
import Box from "@/shared/ui/Box";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import mainProjectPage from "../../assets/main_project_page.png";
import type { ProjectsHeaderOverviewFieldsProps } from "../../types";

export default function ProjectsHeaderOverviewFields({
  form,
  disabled,
}: ProjectsHeaderOverviewFieldsProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Box
      title={t("projects.header_overview_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview
        src={mainProjectPage}
        alt={t("projects.main_project_page_preview")}
      />

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
    </Box>
  );
}
