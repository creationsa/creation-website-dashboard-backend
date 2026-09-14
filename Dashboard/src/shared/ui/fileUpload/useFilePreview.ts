import { useEffect, useMemo } from "react";

export function useFilePreview(value: File | string | null | undefined) {
  const preview = useMemo(() => {
    if (value instanceof File) return URL.createObjectURL(value);
    return value ?? null;
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview && value instanceof File) URL.revokeObjectURL(preview);
    };
  }, [preview, value]);

  return preview;
}
