import type { SolutionSectionsProps } from "@/features/solutions/types";
import Box from "@/shared/ui/Box";
import Input from "@/shared/ui/textField/Input";
import TextArea from "@/shared/ui/textField/TextArea";
import { useTranslation } from "react-i18next";

const EXECUTION_KEYS = ["one", "two", "three", "four", "five"] as const;

export default function ExecutionFrameworkSection({
  form,
  disabled,
}: SolutionSectionsProps) {
  const { t } = useTranslation();

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Box
      title={t("solutions.execution_framework_section")}
      className="flex flex-col gap-3 lg:gap-5"
    >
      <div className="flex flex-col gap-3 lg:gap-5">
        <div className="flex flex-col gap-3 md:flex-row lg:gap-5">
          <Input
            name="execution_title_en"
            label={t("solutions.execution_title_en")}
            error={errors?.execution_title_en?.message}
            register={register("execution_title_en")}
            disabled={disabled}
          />
          <Input
            name="execution_title_ar"
            label={t("solutions.execution_title_ar")}
            error={errors?.execution_title_ar?.message}
            register={register("execution_title_ar")}
            disabled={disabled}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-5">
          {EXECUTION_KEYS.map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl border p-4 lg:gap-5"
            >
              <Input
                name={`execution_keys.${index}.label_en`}
                label={t("solutions.execution_label_en")}
                error={errors.execution_keys?.[index]?.label_en?.message}
                register={register(`execution_keys.${index}.label_en`)}
                disabled={disabled}
              />

              <Input
                name={`execution_keys.${index}.label_ar`}
                label={t("solutions.execution_label_ar")}
                error={errors.execution_keys?.[index]?.label_ar?.message}
                register={register(`execution_keys.${index}.label_ar`)}
                disabled={disabled}
              />

              <TextArea
                name={`execution_keys.${index}.value_en`}
                label={t("solutions.execution_value_en")}
                error={errors.execution_keys?.[index]?.value_en?.message}
                register={register(`execution_keys.${index}.value_en`)}
                disabled={disabled}
              />

              <TextArea
                name={`execution_keys.${index}.value_ar`}
                label={t("solutions.execution_value_ar")}
                error={errors.execution_keys?.[index]?.value_ar?.message}
                register={register(`execution_keys.${index}.value_ar`)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
}
