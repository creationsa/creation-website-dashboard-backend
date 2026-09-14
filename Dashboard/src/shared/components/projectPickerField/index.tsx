import { useLanguage } from "@/shared/hooks/useLanguage";
import { PlayIcon } from "@/shared/icons";
import Switch from "@/shared/ui/Switch";
import SelectField from "@/shared/ui/selectField";
import { useMemo } from "react";
import { Controller, useWatch, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useProjectsPicker } from "./hooks/useProjectsPicker";
import { PROJECT_SOURCE_TYPES } from "./projectPickerFieldSchema";
import type { ProjectPickerFieldProps, ProjectPickerItem } from "./types";

export default function ProjectPickerField<T extends FieldValues>({
  form,
  sourcePath,
  projectIdPath,
  mediaFieldPath,
  label,
  excludeProjectIds = [],
  disabled,
}: ProjectPickerFieldProps<T>) {
  const { t } = useTranslation();
  const currentLanguage = useLanguage();
  const { projects, isProjectsPickerLoading } = useProjectsPicker();

  const { control, setValue } = form;

  const source = useWatch({ control, name: sourcePath });
  const projectId = useWatch({ control, name: projectIdPath });
  const mediaField = useWatch({ control, name: mediaFieldPath });

  const isProjectMode = source === PROJECT_SOURCE_TYPES.PROJECT;

  const options = useMemo(
    () =>
      (projects ?? [])
        .filter((project) => !excludeProjectIds.includes(project.id))
        .map((project) => ({
          label: currentLanguage === "ar" ? project.title_ar : project.title_en,
          value: project.id,
        })),
    [projects, excludeProjectIds, currentLanguage],
  );

  const selectedProject = useMemo<ProjectPickerItem | undefined>(
    () => projects?.find((project) => project.id === projectId),
    [projects, projectId],
  );

  const selectedMediaField = mediaField || selectedProject?.feature_media_field;

  return (
    <div className="flex flex-col gap-3 lg:gap-5">
      <Switch
        name={sourcePath}
        label={label}
        checked={isProjectMode}
        disabled={disabled}
        onChange={(checked) => {
          setValue(
            sourcePath,
            (checked
              ? PROJECT_SOURCE_TYPES.PROJECT
              : PROJECT_SOURCE_TYPES.CUSTOM) as never,
            { shouldDirty: true, shouldValidate: true },
          );
          setValue(projectIdPath, null as never, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue(mediaFieldPath, null as never, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        checkedText={t("projectPicker.pick_existing_project")}
        uncheckedText={t("projectPicker.enter_manually")}
      />

      {isProjectMode && (
        <div className="flex flex-col gap-3 rounded-xl border p-3 lg:gap-5">
          {isProjectsPickerLoading ? (
            <p className="text-sm text-gray-500">
              {t("projectPicker.loading_projects")}
            </p>
          ) : (
            <>
              <Controller
                control={control}
                name={projectIdPath}
                render={({ field }) => (
                  <SelectField
                    name={projectIdPath}
                    label={t("projectPicker.choose_project")}
                    options={options}
                    value={field.value ?? undefined}
                    onChange={(value) => {
                      const project = projects?.find((p) => p.id === value);
                      field.onChange(value ?? null);
                      setValue(
                        mediaFieldPath,
                        (project?.feature_media_field ??
                          project?.media[0]?.field ??
                          null) as never,
                        { shouldDirty: true, shouldValidate: true },
                      );
                    }}
                    disabled={disabled}
                    placeholder={t("projectPicker.choose_project")}
                  />
                )}
              />

              {selectedProject && (
                <>
                  <p className="text-sm text-gray-500">
                    {currentLanguage === "ar"
                      ? selectedProject.title_ar
                      : selectedProject.title_en}{" "}
                    — /{selectedProject.slug_en}
                  </p>

                  {selectedProject.media.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {selectedProject.media.map((media) => {
                        const isSelected = media.field === selectedMediaField;

                        return (
                          <button
                            key={media.field}
                            type="button"
                            disabled={disabled}
                            onClick={() =>
                              setValue(mediaFieldPath, media.field as never, {
                                shouldDirty: true,
                                shouldValidate: true,
                              })
                            }
                            className={`relative aspect-square overflow-hidden rounded-lg border-4 transition-colors duration-200 ${
                              isSelected
                                ? "border-tiffany-600 dark:border-tiffany-100"
                                : "hover:border-tiffany-600/50 border-transparent"
                            }`}
                          >
                            {media.image ? (
                              <img
                                src={media.image}
                                alt={media.field}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
                            )}

                            {media.type === "video" && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <PlayIcon className="size-6 text-white drop-shadow" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
