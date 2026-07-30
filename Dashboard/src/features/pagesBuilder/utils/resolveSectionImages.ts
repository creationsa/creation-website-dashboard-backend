import type { useUploadAttachment } from "@/shared/hooks/useUploadAttachment";
import type { PageFormValues } from "../components/pagesBuilderForm/pageSchema";
import { SECTION_IMAGE_FIELDS } from "../constants/sectionImageFields";
import { uploadIfFile } from "@/shared/utils/uploadIfFile";

type UploadFn = ReturnType<typeof useUploadAttachment>["mutateAsync"];
type ContentRecord = Record<string, unknown>;
type PageSection = PageFormValues["sections"][number];

async function resolveSimpleImageField(
  content: ContentRecord,
  fieldKey: string,
  uploadFn: UploadFn,
): Promise<void> {
  const current = content[fieldKey];
  if (!(current instanceof File) && typeof current !== "string") return;

  const media = await uploadIfFile(current, uploadFn, "pages");
  if (media) {
    content[fieldKey] = media;
  }
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
      const current = item[imageKey];
      if (!(current instanceof File) && typeof current !== "string") return;

      const media = await uploadIfFile(current, uploadFn, "pages");
      if (media) {
        item[imageKey] = media;
      }
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
