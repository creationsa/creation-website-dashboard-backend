import TextArea from "@/shared/ui/textField/TextArea";
import { type FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SubHeadTitle from "../../components/pagesBuilderForm/SubHeadTitle";
import SectionPreview from "../../../../shared/components/sectionPreview/index.tsx";
import type { SectionProps } from "../../types";
import Header from "../header";
import reviews from "./assets/reviews.png";
import ReviewItemsFields from "./ReviewItemsFields";
import type { ReviewsFormValues } from "./reviewsSchema";

export default function ReviewsSection({
  form,
  index,
  disabled,
}: SectionProps) {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = form;

  const sectionErrors = errors?.sections?.[index]?.content as
    | FieldErrors<ReviewsFormValues>
    | undefined;

  return (
    <>
      <SectionPreview src={reviews} alt={t("pages.reviews.reviews_preview")} />

      <Header form={form} index={index} disabled={disabled} />

      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <SubHeadTitle title={t("pages.reviews.description_settings")} />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-5">
          <TextArea
            name={`sections.${index}.content.description_en`}
            label={t("general.desc_en")}
            error={sectionErrors?.description_en?.message}
            register={register(`sections.${index}.content.description_en`)}
            disabled={disabled}
          />
          <TextArea
            name={`sections.${index}.content.description_ar`}
            label={t("general.desc_ar")}
            error={sectionErrors?.description_ar?.message}
            register={register(`sections.${index}.content.description_ar`)}
            disabled={disabled}
          />
        </div>
      </div>

      <ReviewItemsFields form={form} index={index} disabled={disabled} />
    </>
  );
}
