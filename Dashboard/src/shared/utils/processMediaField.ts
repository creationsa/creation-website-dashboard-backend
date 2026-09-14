import type { MediaFieldValues } from "@/shared/components/smartMediaField/smartMediaFieldSchema";
import type { AttachmentModel } from "@/shared/types/attachment";
import { MEDIA_INITIAL_STATE } from "../components/smartMediaField/smartMediaDefaultValues";
import { uploadIfFile, type UploadFn } from "./uploadIfFile";

/*
 * This function processes a media field by uploading the file and poster (if they are files) using the provided upload function. It returns a promise that resolves to the updated media field values with the uploaded file and poster URLs.
 */
export async function processMediaField(
  uploadFn: UploadFn,
  model: AttachmentModel,
  media?: MediaFieldValues,
): Promise<MediaFieldValues> {
  if (!media) return MEDIA_INITIAL_STATE;

  const [fileUrl, posterUrl] = await Promise.all([
    uploadIfFile(
      media.file,
      uploadFn,
      model,
      media.type === "video" ? "video" : "image",
    ),
    // The poster is always a still image, regardless of the main file's type.
    uploadIfFile(media.poster, uploadFn, model),
  ]);

  return {
    ...media,
    file: fileUrl,
    poster: posterUrl,
  };
}
