import { useMutation } from "@tanstack/react-query";
import { uploadAttachment } from "../api/attachments";

export const useUploadAttachment = () => {
  return useMutation({
    mutationFn: uploadAttachment,
  });
};
