import type { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import { processMediaField } from "@/shared/utils/processMediaField";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";
import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";
import { SECTION_IMAGE_FIELDS } from "../constants/sectionImageFields";

type UploadFn = ReturnType<typeof useUploadAttachment>["mutateAsync"];
type ContentRecord = Record<string, unknown>;
type PageSection = PageFormValues["sections"][number];

// Fields built with SmartMediaField store `{ type, file, alt_en, alt_ar, poster }`
// instead of a bare File/string, so they need to be uploaded via their `.file`
// (and `.poster`) sub-fields rather than being uploaded directly.
function isMediaFieldValue(value: unknown): value is MediaFieldValues {
  return (
    !!value &&
    typeof value === "object" &&
    "type" in value &&
    "file" in value
  );
}

async function resolveFieldValue(
  current: unknown,
  uploadFn: UploadFn,
): Promise<unknown> {
  if (isMediaFieldValue(current)) {
    return processMediaField(uploadFn, "pages", current);
  }

  if (current instanceof File || typeof current === "string") {
    const media = await uploadIfFile(current, uploadFn, "pages");
    return media || current;
  }

  return current;
}

async function resolveSimpleImageField(
  content: ContentRecord,
  fieldKey: string,
  uploadFn: UploadFn,
): Promise<void> {
  content[fieldKey] = await resolveFieldValue(content[fieldKey], uploadFn);
}

async function resolveArrayImageField(
  content: ContentRecord,
  arrayKey: string,
  imageKey: string,
  uploadFn: UploadFn,
): Promise<void> {
  const arr = content[arrayKey];
  if (!Array.isArray(arr)) return;

  await Promise.all(
    (arr as ContentRecord[]).map(async (item) => {
      item[imageKey] = await resolveFieldValue(item[imageKey], uploadFn);
    }),
  );
}

export async function resolveSectionImages(
  section: PageSection,
  uploadFn: UploadFn,
): Promise<PageSection> {
  const imageFields = SECTION_IMAGE_FIELDS[section.type] ?? [];
  if (imageFields.length === 0) return section;

  const content = structuredClone(section.content) as ContentRecord;

  await Promise.all(
    imageFields.map((fieldPath) => {
      if (!fieldPath.includes(".*")) {
        return resolveSimpleImageField(content, fieldPath, uploadFn);
      }

      const [arrayKey, , imageKey] = fieldPath.split(".");
      return resolveArrayImageField(content, arrayKey, imageKey, uploadFn);
    }),
  );

  return { ...section, content } as PageSection;
}
