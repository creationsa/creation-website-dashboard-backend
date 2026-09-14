import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SmartMediaField from "@/shared/components/smartMediaField";
import type { CultureIdentityFormValues } from "./cultureIdentitySchema";
import IdentityCenterFields from "./IdentityCenterFields";
import IdentityCornersFields from "./IdentityCornersFields";
import type { CultureIdentitySectionProps } from "./types";
import SectionPreview from "../../../../shared/components/sectionPreview";
import culture from "./assets/culture.png";

export default function CultureIdentitySection({
  form,
  index,
  disabled,
}: CultureIdentitySectionProps) {
  const {
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<CultureIdentityFormValues>
    | undefined;

  return (
    <>
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
    </>
  );
}
