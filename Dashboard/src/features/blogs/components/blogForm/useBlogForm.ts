import { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateBlog } from "../../hooks/useCreateBlog";
import { useUpdateBlog } from "../../hooks/useUpdateBlog";
import type { SingleBlog } from "../../types";
import { buildBlogFormData } from "../../utils/buildBlogFormData";
import { createBlogSchema, type BlogFormValues } from "./blogSchema";
import getBlogDefaultValues from "./getBlogDefaultValues";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";

export default function useBlogForm(blogToEdit?: SingleBlog) {
  const isEditingSession = Boolean(blogToEdit);

  const { t } = useTranslation();
  const { mutateAsync: uploadAttachment, isPending: uploadLoading } =
    useUploadAttachment();
  const { addBlog, addBlogLoading } = useCreateBlog();
  const { updateBlog, updateBlogLoading } = useUpdateBlog();

  const schema = useMemo(() => createBlogSchema(t), [t]);

  const form = useForm<BlogFormValues>({
    defaultValues: getBlogDefaultValues(blogToEdit),
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const handleAddEditBlog = async (data: BlogFormValues) => {
    const [baseImageMedia, coverImageMedia] = await Promise.all([
      uploadIfFile(data.base_image, uploadAttachment, "blogs"),
      uploadIfFile(data.cover_image, uploadAttachment, "blogs"),
    ]);

    const processedData: BlogFormValues = {
      ...data,
      base_image: baseImageMedia,
      cover_image: coverImageMedia,
    };

    const formData = buildBlogFormData(processedData, {
      isEdit: isEditingSession,
      baseImageMedia,
      coverImageMedia,
    });

    if (isEditingSession) {
      updateBlog(
        {
          id: blogToEdit!.id,
          formData,
        },
        { onSuccess: () => form.reset(processedData) },
      );
    } else {
      addBlog(formData);
    }
  };

  return {
    form,
    isLoading: Boolean(addBlogLoading || updateBlogLoading || uploadLoading),
    isEditingSession,
    handleAddEditBlog,
  };
}
