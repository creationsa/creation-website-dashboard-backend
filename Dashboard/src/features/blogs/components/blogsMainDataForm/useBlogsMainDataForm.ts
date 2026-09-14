import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateBlogsMainData } from "../../hooks/useUpdateBlogsMainData";
import type { BlogsMainDataProps } from "../../types";
import {
  createBlogsMainDataSchema,
  type BlogsMainDataFormValues,
} from "./blogsMainDataSchema";
import { buildBlogsMainDataFormData } from "./buildBlogsMainDataFormData";
import getBlogsMainDataDefaultValues from "./getBlogsMainDataDefaultValues";

export default function useBlogsMainDataForm(
  blogsMainDataToEdit?: BlogsMainDataProps,
) {
  const { t } = useTranslation();
  const { updateBlogsMainData, updateBlogsMainDataLoading } =
    useUpdateBlogsMainData();

  const schema = useMemo(() => createBlogsMainDataSchema(t), [t]);

  const form = useForm<BlogsMainDataFormValues>({
    defaultValues: getBlogsMainDataDefaultValues(blogsMainDataToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleUpdateBlogsMainData = async (data: BlogsMainDataFormValues) => {
    updateBlogsMainData(buildBlogsMainDataFormData(data), {
      onSuccess: () => form.reset(data),
    });
  };

  return {
    form,
    isLoading: updateBlogsMainDataLoading,
    handleUpdateBlogsMainData,
  };
}
