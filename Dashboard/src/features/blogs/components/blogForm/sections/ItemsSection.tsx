import Box from "@/shared/ui/Box";
import Button from "@/shared/ui/Button";
import TextArea from "@/shared/ui/textField/TextArea";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { SectionProps } from "../../../types";

export default function ItemsSection({ form, disabled }: SectionProps) {
  const {
    register,
    formState: { errors },
    control,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const { t } = useTranslation();
  return (
    <Box title={t("blogs.second_sub_title")}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextArea
          name="second_sub_title_en"
          label={t("blogs.second_sub_title_en")}
          error={errors?.second_sub_title_en?.message}
          register={register("second_sub_title_en")}
          rows={5}
          disabled={disabled}
        />
        <TextArea
          name="second_sub_title_ar"
          label={t("blogs.second_sub_title_ar")}
          error={errors?.second_sub_title_ar?.message}
          register={register("second_sub_title_ar")}
          rows={5}
          disabled={disabled}
        />
      </div>

      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{t("blogs.points_list")}</h3>

          <Button
            type="button"
            variation="secondary"
            aria-label={t("blogs.add_new_point")}
            onClick={() =>
              append({
                ar: {
                  desc: "",
                },
                en: {
                  desc: "",
                },
              })
            }
            className="w-full sm:w-50"
            disabled={disabled}
          >
            {t("blogs.add_new_point")}
          </Button>
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h4 className="text-lg">
                  {t("blogs.point")} #{index + 1}
                </h4>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    aria-label={`${t("blogs.delete_point")} #${index + 1}`}
                    variation="delete"
                    onClick={() => remove(index)}
                    className="w-full sm:w-50"
                    disabled={disabled}
                  >
                    {t("blogs.delete_point")} #{index + 1}
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextArea
                  name={`items.${index}.en.desc`}
                  label={t("blogs.point_desc_en")}
                  register={register(`items.${index}.en.desc`)}
                  error={errors?.items?.[index]?.en?.desc?.message}
                  disabled={disabled}
                />

                <TextArea
                  name={`items.${index}.ar.desc`}
                  label={t("blogs.point_desc_ar")}
                  register={register(`items.${index}.ar.desc`)}
                  error={errors?.items?.[index]?.ar?.desc?.message}
                  disabled={disabled}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
