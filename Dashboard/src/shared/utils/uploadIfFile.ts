import type { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import type { AttachmentModel } from "@/shared/types/attachment";

export type UploadFn = ReturnType<typeof useUploadAttachment>["mutateAsync"];

export type UploadableValue =
  | File
  | string
  | { file?: File; url?: string }
  | null
  | undefined;

export async function uploadIfFile(
  value: UploadableValue,
  uploadFn: UploadFn,
  model: AttachmentModel,
): Promise<string> {
  if (value instanceof File) {
    const result = await uploadFn({
      file: value,
      model,
      attachment_type: "image",
    });
    return result || "";
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "file" in value &&
    value.file instanceof File
  ) {
    const result = await uploadFn({
      file: value.file,
      model,
      attachment_type: "image",
    });
    return result || "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "url" in value &&
    typeof value.url === "string"
  ) {
    return value.url;
  }

  return "";
}
