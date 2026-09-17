import AddNewBlock from "@/shared/components/blockControls/AddNewBlock";
import Button from "@/shared/ui/Button";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { getFieldErrorMessage } from "@/shared/utils/getFieldErrorMessage";
import {
  useFieldArray,
  type Control,
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { POINT_INITIAL_STATE } from "./getTextListDefaultValues";

interface PointsFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: string;
  disabled?: boolean;
}

export default function PointsFields<TFieldValues extends FieldValues>({
  form,
  name,
  disabled,
}: PointsFieldsProps<TFieldValues>) {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: control as Control<TFieldValues>,
    name: name as never,
  });

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <AddNewBlock
        count={fields.length}
        onAdd={() => append(POINT_INITIAL_STATE as never)}
        managementLabel={t("pages.point_management")}
        addLabel={t("pages.add_new_point")}
      />

      <div className="flex flex-col gap-3">
        {fields.map((field, pointIndex) => (
          <div
            key={field.id}
            className="flex flex-col items-start gap-3 rounded-xl border p-3 sm:flex-row sm:items-end"
          >
            <div className="grid w-full grid-cols-1 gap-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  name={`${name}.${pointIndex}.label_en`}
                  label={`${t("pages.text_list_section.point_label_en")} (${pointIndex + 1})`}
                  error={getFieldErrorMessage(
                    errors,
                    `${name}.${pointIndex}.label_en`,
                  )}
                  register={register(
                    `${name}.${pointIndex}.label_en` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
                <Input
                  name={`${name}.${pointIndex}.label_ar`}
                  label={`${t("pages.text_list_section.point_label_ar")} (${pointIndex + 1})`}
                  error={getFieldErrorMessage(
                    errors,
                    `${name}.${pointIndex}.label_ar`,
                  )}
                  register={register(
                    `${name}.${pointIndex}.label_ar` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <TextArea
                  name={`${name}.${pointIndex}.description_en`}
                  label={`${t("pages.text_list_section.point_description_en")} (${pointIndex + 1})`}
                  error={getFieldErrorMessage(
                    errors,
                    `${name}.${pointIndex}.description_en`,
                  )}
                  register={register(
                    `${name}.${pointIndex}.description_en` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
                <TextArea
                  name={`${name}.${pointIndex}.description_ar`}
                  label={`${t("pages.text_list_section.point_description_ar")} (${pointIndex + 1})`}
                  error={getFieldErrorMessage(
                    errors,
                    `${name}.${pointIndex}.description_ar`,
                  )}
                  register={register(
                    `${name}.${pointIndex}.description_ar` as Path<TFieldValues>,
                  )}
                  disabled={disabled}
                />
              </div>
            </div>

            <Button
              type="button"
              variation="danger"
              onClick={() => remove(pointIndex)}
              disabled={disabled || fields.length === 1}
              className="w-fit! shrink-0"
            >
              {t("pages.text_list_section.remove_point")}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
