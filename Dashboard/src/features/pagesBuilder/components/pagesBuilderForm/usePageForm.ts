import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import {
  useFieldArray,
  useForm,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateNewPage } from "../../hooks/useCreateNewPage";
import { useUpdateExistingPage } from "../../hooks/useUpdateExistingPage";
import type { UsePageFormReturn } from "../../types";
import { buildPageFormData } from "../../utils/buildPageFormData";
import { resolveSectionImages } from "../../utils/resolveSectionImages";
import { createPageSchema, type PageFormValues } from "./pageSchema";
import { SECTION_DEFAULTS } from "./sectionDefaultValues";

export function usePageForm(
  dataToEdit?: PageFormValues,
  id?: number,
): UsePageFormReturn {
  const isEditingSession = Boolean(dataToEdit);

  const { t } = useTranslation();

  const { mutateAsync: uploadAttachment } = useUploadAttachment();
  const { addNewPage, addNewPageLoading } = useCreateNewPage();
  const { updatePage, updatePageLoading } = useUpdateExistingPage();
  const [isUploading, setIsUploading] = useState(false);

  const schema = useMemo(() => createPageSchema(t), [t]);

  const resolver = zodResolver(schema) as Resolver<PageFormValues>;

  const form = useForm<PageFormValues>({
    resolver,
    defaultValues: dataToEdit ?? {
      page_title_en: "",
      page_title_ar: "",
      page_slug_en: "",
      is_home: false,
      sections: [],
    },
    mode: "onTouched",
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "sections",
  });

  useEffect(() => {
    if (isEditingSession) {
      form.trigger();
    }
  }, [isEditingSession, form]);

  const appendSection = (type: string) => {
    const defaults = SECTION_DEFAULTS[type];
    if (defaults) append(defaults as PageFormValues["sections"][number]);
  };

  const onSubmit: SubmitHandler<PageFormValues> = async (data) => {
    setIsUploading(true);
    try {
      const resolvedSections = await Promise.all(
        data.sections.map((section) =>
          resolveSectionImages(section, uploadAttachment),
        ),
      );

      const payload: PageFormValues = { ...data, sections: resolvedSections };

      if (isEditingSession && id) {
        const formData = buildPageFormData(payload, { isEdit: true });
        updatePage({ id, formData }, { onSuccess: () => form.reset(payload) });
      } else {
        const formData = buildPageFormData(payload);
        addNewPage(formData);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    fields,
    appendSection,
    remove,
    move,
    onSubmit,
    isLoading: Boolean(addNewPageLoading || updatePageLoading || isUploading),
    isEditingSession,
  };
}
