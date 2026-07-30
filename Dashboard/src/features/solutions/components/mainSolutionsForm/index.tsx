import DynamicAccordionFields from "@/shared/components/dynamicAccordionFields";
import { ACCORDION_ITEM_INITIAL_STATE } from "@/shared/components/dynamicAccordionFields/getAccordionDefaultValues";
import DynamicFeaturedItemsFields from "@/shared/components/dynamicFeaturedItemsFields";
import { ITEMS_INITIAL_STATE } from "@/shared/components/dynamicFeaturedItemsFields/getDynamicFeaturedItemsFieldsDefaultValues";
import DynamicItemsFields from "@/shared/components/dynamicItemsFields";
import HeaderFields from "@/shared/components/headerFields";
import SmartMediaField from "@/shared/components/smartMediaField";
import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";
import type { SolutionsFormMainDataProps } from "../../types";
import useSolutionsForm from "./useSolutionsForm";

export default function MainSolutionsForm({
  solutionMainDataToEdit,
}: SolutionsFormMainDataProps) {
  const { t } = useTranslation();
  const { form, isLoading, isEditingSession, handleAddEditSolutionsData } =
    useSolutionsForm(solutionMainDataToEdit);

  const {
    formState: { isDirty, isValid, errors },
    register,
  } = form;

  const isSubmitDisabled =
    isLoading || !isValid || (isEditingSession && !isDirty);

  return (
    <form
      onSubmit={form.handleSubmit(handleAddEditSolutionsData)}
      className="flex flex-col gap-6 border-t pt-6 lg:gap-10 lg:pt-10"
    >
      <div className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5">
        <HeaderFields form={form} disabled={isLoading} />
      </div>

      <Box className="flex flex-col gap-3 lg:gap-5">
        <HeaderFields prefix="items_header" form={form} disabled={isLoading} />
        <DynamicFeaturedItemsFields
          form={form}
          name="items"
          itemInitialState={ITEMS_INITIAL_STATE}
          disabled={isLoading}
        />
      </Box>

      <Box
        title={t("solutions.news_section")}
        className="flex flex-col gap-3 lg:gap-5"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextArea
            name="core_desc_en"
            label={t("general.desc_en")}
            error={errors?.core_desc_en?.message}
            register={register("core_desc_en")}
            rows={8}
            disabled={isLoading}
          />
          <TextArea
            name="core_desc_ar"
            label={t("general.desc_ar")}
            error={errors?.core_desc_ar?.message}
            register={register("core_desc_ar")}
            rows={8}
            disabled={isLoading}
          />
        </div>
        <DynamicItemsFields
          form={form}
          disabled={isLoading}
          name="ticker_items"
        />
      </Box>

      <Box className="flex flex-col gap-3 lg:gap-5">
        <HeaderFields
          prefix="accordion_items_header"
          form={form}
          disabled={isLoading}
        />
        <SmartMediaField
          form={form}
          name="accordion_media"
          label={t("pages.media_content_section.media_file")}
          disabled={isLoading}
        />
        <DynamicAccordionFields
          form={form}
          name="accordion_items"
          itemInitialState={ACCORDION_ITEM_INITIAL_STATE}
          disabled={isLoading}
        />
      </Box>

      <Button
        type="submit"
        className="ms-auto block w-full sm:w-44"
        loading={isLoading}
        disabled={isSubmitDisabled}
      >
        {isEditingSession ? t("general.update") : t("general.add")}
      </Button>
    </form>
  );
}
