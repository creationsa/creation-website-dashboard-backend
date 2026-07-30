import type { MediaFieldValues } from "../components/smartMediaField/smartMediaFieldSchema";

export const appendMediaObject = (
  formData: FormData,
  key: string,
  media?: MediaFieldValues,
) => {
  if (!media) return;
  formData.append(`${key}[type]`, media.type || "image");

  if (typeof media.file === "string") {
    formData.append(`${key}[file]`, media.file);
  }
  if (media.alt_en) formData.append(`${key}[alt_en]`, media.alt_en);
  if (media.alt_ar) formData.append(`${key}[alt_ar]`, media.alt_ar);
  if (typeof media.poster === "string" && media.poster) {
    formData.append(`${key}[poster]`, media.poster);
  }
};
