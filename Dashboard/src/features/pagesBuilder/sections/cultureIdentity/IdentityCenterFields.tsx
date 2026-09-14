import LogoHint from "@/shared/components/LogoHint";
import Input from "@/shared/ui/textField/Input";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import type { SubComponentProps } from "./types";

export default function IdentityCenterFields({
  form,
  index,
  disabled,
  sectionErrors,
}: SubComponentProps) {
  const { register } = form;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
      <SubHeadTitle title={t("pages.culture_identity.center_content_group")} />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name={`sections.${index}.content.center_title_en`}
          label={t("pages.culture_identity.center_title_en")}
          error={sectionErrors?.center_title_en?.message}
          register={register(`sections.${index}.content.center_title_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.center_title_ar`}
          label={t("pages.culture_identity.center_title_ar")}
          error={sectionErrors?.center_title_ar?.message}
          register={register(`sections.${index}.content.center_title_ar`)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
        <Input
          name={`sections.${index}.content.center_description_en`}
          label={t("pages.culture_identity.center_description_en")}
          error={sectionErrors?.center_description_en?.message}
          register={register(`sections.${index}.content.center_description_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.center_description_ar`}
          label={t("pages.culture_identity.center_description_ar")}
          error={sectionErrors?.center_description_ar?.message}
          register={register(`sections.${index}.content.center_description_ar`)}
          disabled={disabled}
        />
      </div>

      <LogoHint />
    </div>
  );
}
