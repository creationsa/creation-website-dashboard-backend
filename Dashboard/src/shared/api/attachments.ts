import type {
  UploadAttachmentPayload,
  UploadAttachmentResponse,
} from "../types/attachment";
import instance from "./axios";

export const uploadAttachment = async (payload: UploadAttachmentPayload) => {
  const formData = new FormData();

  formData.append("file", payload.file);
  formData.append("attachment_type", payload.attachment_type);
  formData.append("model", payload.model);

  const { data } = await instance.post<UploadAttachmentResponse>(
    "/general/attachments",
    formData,
  );

  return data?.data;
};
