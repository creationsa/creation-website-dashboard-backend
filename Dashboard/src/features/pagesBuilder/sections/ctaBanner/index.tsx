import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DeleteSectionButton from "../../components/pagesBuilderForm/DeleteSectionButton";
import SectionPreview from "../../components/SectionPreview";
import type { SectionProps } from "../../types";
import cta from "./assets/cta.png";
import type { CtaBannerFormValues } from "./ctaBannerSchema";

export default function CtaBannerSection({
  form,
  index,
  disabled,
  onRemove,
}: SectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<CtaBannerFormValues>
    | undefined;

  return (
    <Box
      title={`( ${index + 1} ) ${t("pages.cta_banner.section_title")}`}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <SectionPreview src={cta} alt={t("pages.cta_banner.cta_preview")} />

      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
        <Input
          name={`sections.${index}.content.title_en`}
          label={t("pages.cta_banner.title_en")}
          error={sectionErrors?.title_en?.message}
          register={register(`sections.${index}.content.title_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.title_ar`}
          label={t("pages.cta_banner.title_ar")}
          error={sectionErrors?.title_ar?.message}
          register={register(`sections.${index}.content.title_ar`)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 md:grid-cols-2 lg:gap-5">
        <TextArea
          name={`sections.${index}.content.description_en`}
          label={t("pages.cta_banner.description_en")}
          error={sectionErrors?.description_en?.message}
          register={register(`sections.${index}.content.description_en`)}
          disabled={disabled}
        />
        <TextArea
          name={`sections.${index}.content.description_ar`}
          label={t("pages.cta_banner.description_ar")}
          error={sectionErrors?.description_ar?.message}
          register={register(`sections.${index}.content.description_ar`)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-3 lg:gap-5">
        <Input
          name={`sections.${index}.content.button_text_en`}
          label={t("pages.cta_banner.button_text_en")}
          error={sectionErrors?.button_text_en?.message}
          register={register(`sections.${index}.content.button_text_en`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.button_text_ar`}
          label={t("pages.cta_banner.button_text_ar")}
          error={sectionErrors?.button_text_ar?.message}
          register={register(`sections.${index}.content.button_text_ar`)}
          disabled={disabled}
        />
        <Input
          name={`sections.${index}.content.button_slug`}
          label={t("pages.cta_banner.button_slug")}
          error={sectionErrors?.button_slug?.message}
          register={register(`sections.${index}.content.button_slug`)}
          disabled={disabled}
        />
      </div>

      <DeleteSectionButton onRemove={onRemove} />
    </Box>
  );
}
