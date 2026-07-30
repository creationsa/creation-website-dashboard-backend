import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateNewPage } from "../../hooks/useCreateNewPage";
import { useUpdateExistingPage } from "../../hooks/useUpdateExistingPage";
// import { resolveSectionImages } from "../../utils/resolveSectionImages";
import { createPageSchema, type PageFormValues } from "./pageSchema";
import { SECTION_DEFAULTS } from "./sectionDefaultValues";

export function usePageForm(dataToEdit?: PageFormValues) {
  const isEditingSession = Boolean(dataToEdit);

  const { t } = useTranslation();

  const {
    // mutateAsync: uploadAttachment,
    isPending: isUploadPending,
  } = useUploadAttachment();
  const {
    // addNewPage,
    addNewPageLoading,
  } = useCreateNewPage();
  const {
    // updatePage,
    updatePageLoading,
  } = useUpdateExistingPage();

  const schema = useMemo(() => createPageSchema(t), [t]);

  const form = useForm<PageFormValues>({
    resolver: zodResolver(schema),
    defaultValues: dataToEdit ?? {
      page_title_en: "",
      page_title_ar: "",
      page_slug_en: "",
      sections: [],
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  const appendSection = (type: string) => {
    const defaults = SECTION_DEFAULTS[type];
    if (defaults) append(defaults as PageFormValues["sections"][number]);
  };

  const onSubmit = async (data: PageFormValues) => {
    console.log("final data", data);
    // const resolvedSections = await Promise.all(
    //   data.sections.map((section) =>
    //     resolveSectionImages(section, uploadAttachment),
    //   ),
    // );

    // const payload: PageFormValues = { ...data, sections: resolvedSections };

    // if (isEditingSession) {
    //   updatePage({
    //     id: dataToEdit!.id,
    //     payload,
    //   });
    // } else {
    //   addNewPage(payload);
    // }
  };

  return {
    form,
    fields,
    appendSection,
    remove,
    onSubmit,
    isLoading: Boolean(
      addNewPageLoading || updatePageLoading || isUploadPending,
    ),
    isEditingSession,
  };
}
