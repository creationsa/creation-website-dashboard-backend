import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

export interface ProjectPickerMediaItem {
  field: string;
  type: "image" | "video";
  image: string | null;
}

export interface ProjectPickerItem {
  id: number;
  title_en: string;
  title_ar: string;
  slug_en: string;
  feature_media_field: string | null;
  media: ProjectPickerMediaItem[];
}

export interface ProjectPickerFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  // Explicit paths rather than a single `basePath` + assumed suffix, since
  // consumers store these three fields under different shapes (nested under
  // one sub-object in Featured Works, flat-prefixed siblings in Display
  // Info's right cards).
  sourcePath: Path<T>;
  projectIdPath: Path<T>;
  mediaFieldPath: Path<T>;
  label: string;
  excludeProjectIds?: number[];
  disabled?: boolean;
}
