export type AttachmentType = "image" | "file" | "audio" | "video";

export type AttachmentModel = "blogs" | "metadata" | "pages" | "footer" | "settings";

export interface UploadAttachmentPayload {
  file: File;
  attachment_type: AttachmentType;
  model: AttachmentModel;
}

export interface UploadAttachmentResponse {
  data: string;
}
