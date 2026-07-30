import Box from "@/shared/ui/Box";
import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SmartMediaField from "@/shared/components/smartMediaField";
import type { CultureIdentityFormValues } from "./cultureIdentitySchema";
import IdentityCenterFields from "./IdentityCenterFields";
import IdentityCornersFields from "./IdentityCornersFields";
import type { CultureIdentitySectionProps } from "./types";
import SectionPreview from "../../components/SectionPreview";
import culture from "./assets/culture.png";

export default function CultureIdentitySection({
  form,
  index,
  disabled,
  onRemove,
}: CultureIdentitySectionProps) {
  const {
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<CultureIdentityFormValues>
    | undefined;

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.culture_identity.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview
        src={culture}
        alt={t("pages.culture_identity.culture_preview")}
      />
      <IdentityCornersFields
        form={form}
        index={index}
        disabled={disabled}
        sectionErrors={sectionErrors}
      />

      <IdentityCenterFields
        form={form}
        index={index}
        disabled={disabled}
        sectionErrors={sectionErrors}
      />

      <div className="rounded-xl border p-4">
        <SmartMediaField
          form={form}
          name={`sections.${index}.content.culture_media`}
          label={t("pages.culture_identity.main_image")}
          disabled={disabled}
        />
      </div>

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
