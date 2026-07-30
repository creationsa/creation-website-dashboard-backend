import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { AttachmentModel } from "@/shared/types/attachment";
import { MEDIA_INITIAL_STATE } from "../components/smartMediaField/smartMediaDefaultValues";
import { uploadIfFile, type UploadFn } from "./uploadIfFile";

export async function processMediaField(
  uploadFn: UploadFn,
  model: AttachmentModel,
  media?: MediaFieldValues,
): Promise<MediaFieldValues> {
  if (!media) return MEDIA_INITIAL_STATE;

  const [fileUrl, posterUrl] = await Promise.all([
    uploadIfFile(media.file, uploadFn, model),
    uploadIfFile(media.poster, uploadFn, model),
  ]);

  return {
    ...media,
    file: fileUrl,
    poster: posterUrl,
  };
}
