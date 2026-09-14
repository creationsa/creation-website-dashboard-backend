import { useLanguage } from "@/shared/hooks/useLanguage";
import Switch from "@/shared/ui/Switch";
import SelectField from "@/shared/ui/selectField";
import { useMemo } from "react";
import { Controller, useWatch, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSolutionsPicker } from "./hooks/useSolutionsPicker";
import { SOLUTION_SOURCE_TYPES } from "./solutionPickerFieldSchema";
import type { SolutionPickerFieldProps, SolutionPickerItem } from "./types";

export default function SolutionPickerField<T extends FieldValues>({
  form,
  sourcePath,
  solutionIdPath,
  label,
  disabled,
}: SolutionPickerFieldProps<T>) {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { solutions, isSolutionsPickerLoading } = useSolutionsPicker();

  const { control, setValue } = form;

  const source = useWatch({ control, name: sourcePath });
  const solutionId = useWatch({ control, name: solutionIdPath });

  const isSolutionMode = source === SOLUTION_SOURCE_TYPES.SOLUTION;

  const options = useMemo(
    () =>
      (solutions ?? []).map((solution) => ({
        label:
          currentLanguage === "ar" ? solution.title_ar : solution.title_en,
        value: solution.id,
      })),
    [solutions, currentLanguage],
  );

  const selectedSolution = useMemo<SolutionPickerItem | undefined>(
    () => solutions?.find((solution) => solution.id === solutionId),
    [solutions, solutionId],
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <Switch
        name={sourcePath}
        label={label}
        checked={isSolutionMode}
        disabled={disabled}
        onChange={(checked) => {
          setValue(
            sourcePath,
            (checked
              ? SOLUTION_SOURCE_TYPES.SOLUTION
              : SOLUTION_SOURCE_TYPES.CUSTOM) as never,
            { shouldDirty: true, shouldValidate: true },
          );
          setValue(solutionIdPath, null as never, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        checkedText={t("solutionPicker.pick_existing_solution")}
        uncheckedText={t("solutionPicker.enter_manually")}
      />

      {isSolutionMode && (
        <div className="flex flex-col gap-3 rounded-xl border p-3 lg:gap-5">
          {isSolutionsPickerLoading ? (
            <p className="text-sm text-gray-500">
              {t("solutionPicker.loading_solutions")}
            </p>
          ) : (
            <>
              <Controller
                control={control}
                name={solutionIdPath}
                render={({ field }) => (
                  <SelectField
                    name={solutionIdPath}
                    label={t("solutionPicker.choose_solution")}
                    options={options}
                    value={field.value ?? undefined}
                    onChange={(value) => field.onChange(value ?? null)}
                    disabled={disabled}
                    placeholder={t("solutionPicker.choose_solution")}
                  />
                )}
              />

              {selectedSolution && (
                <p className="text-sm text-gray-500">
                  <strong>
                    {currentLanguage === "ar"
                      ? selectedSolution.title_ar
                      : selectedSolution.title_en}
                  </strong>{" "}
                  —{" "}
                  {currentLanguage === "ar"
                    ? selectedSolution.small_description_ar
                    : selectedSolution.small_description_en}{" "}
                  — /{selectedSolution.slug_en}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
