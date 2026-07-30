import type {
  FeaturedItem,
  FeaturedMedia,
} from "@/shared/components/dynamicFeaturedItemsFields/dynamicFeaturedItemsFieldsSchema";
import type { AttachmentModel } from "@/shared/types/attachment";
import { processMediaField } from "@/shared/utils/processMediaField";
import type { UploadFn } from "@/shared/utils/uploadIfFile";

export async function processFeaturedItemsMedia<
  T extends FeaturedItem | FeaturedMedia,
>(
  items: T[] | undefined,
  uploadFn: UploadFn,
  model: AttachmentModel,
): Promise<T[]> {
  if (!items?.length) return [];

  return Promise.all(
    items.map(async (item) => {
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
