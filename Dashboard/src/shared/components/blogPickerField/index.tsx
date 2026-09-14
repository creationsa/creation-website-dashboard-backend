import { useLanguage } from "@/shared/hooks/useLanguage";
import Switch from "@/shared/ui/Switch";
import SelectField from "@/shared/ui/selectField";
import { useMemo } from "react";
import { Controller, useWatch, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useBlogsPicker } from "./hooks/useBlogsPicker";
import { BLOG_SOURCE_TYPES } from "./blogPickerFieldSchema";
import type { BlogPickerFieldProps, BlogPickerItem } from "./types";

export default function BlogPickerField<T extends FieldValues>({
  form,
  sourcePath,
  blogIdPath,
  label,
  disabled,
}: BlogPickerFieldProps<T>) {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { blogs, isBlogsPickerLoading } = useBlogsPicker();

  const { control, setValue } = form;

  const source = useWatch({ control, name: sourcePath });
  const blogId = useWatch({ control, name: blogIdPath });

  const isBlogMode = source === BLOG_SOURCE_TYPES.BLOG;

  const options = useMemo(
    () =>
      (blogs ?? []).map((blog) => ({
        label: currentLanguage === "ar" ? blog.title_ar : blog.title_en,
        value: blog.id,
      })),
    [blogs, currentLanguage],
  );

  const selectedBlog = useMemo<BlogPickerItem | undefined>(
    () => blogs?.find((blog) => blog.id === blogId),
    [blogs, blogId],
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <Switch
        name={sourcePath}
        label={label}
        checked={isBlogMode}
        disabled={disabled}
        onChange={(checked) => {
          setValue(
            sourcePath,
            (checked
              ? BLOG_SOURCE_TYPES.BLOG
              : BLOG_SOURCE_TYPES.CUSTOM) as never,
            { shouldDirty: true, shouldValidate: true },
          );
          setValue(blogIdPath, null as never, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        checkedText={t("blogPicker.pick_existing_blog")}
        uncheckedText={t("blogPicker.enter_manually")}
      />

      {isBlogMode && (
        <div className="flex flex-col gap-3 rounded-xl border p-3 lg:gap-5">
          {isBlogsPickerLoading ? (
            <p className="text-sm text-gray-500">
              {t("blogPicker.loading_blogs")}
            </p>
          ) : (
            <>
              <Controller
                control={control}
                name={blogIdPath}
                render={({ field }) => (
                  <SelectField
                    name={blogIdPath}
                    label={t("blogPicker.choose_blog")}
                    options={options}
                    value={field.value ?? undefined}
                    onChange={(value) => field.onChange(value ?? null)}
                    disabled={disabled}
                    placeholder={t("blogPicker.choose_blog")}
                  />
                )}
              />

              {selectedBlog && (
                <p className="text-sm text-gray-500">
                  <strong>
                    {currentLanguage === "ar"
                      ? selectedBlog.title_ar
                      : selectedBlog.title_en}
                  </strong>{" "}
                  — /{selectedBlog.slug_en}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
