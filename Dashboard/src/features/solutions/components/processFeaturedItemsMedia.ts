import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { AttachmentModel } from "@/shared/types/attachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import type { UploadFn } from "@/shared/utils/uploadIfFile";

export async function processFeaturedItemsMedia<
  T extends Record<string, unknown> & { feature_media?: MediaFieldValues },
>(items: T[] | undefined, uploadFn: UploadFn, model: AttachmentModel): Promise<T[]> {
  if (!items?.length) return [];

  return Promise.all(
    items.map(async (item) => {
      if (!item.feature_media) return item;

      const feature_media = await processMediaField(
        uploadFn,
        model,
        item.feature_media,
      );

      return {
        ...item,
        feature_media,
      };
    }),
  );
}
