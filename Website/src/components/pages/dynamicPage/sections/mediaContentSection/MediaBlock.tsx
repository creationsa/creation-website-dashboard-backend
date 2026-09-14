import SmartMedia from "@/components/ui/SmartMedia";
import { MediaBlockProps } from "./types";

export default function MediaBlock({
  media,
  is_media_right,
  is_list,
}: MediaBlockProps) {
  const sizes = is_list
    ? "(min-width: 1280px) 680px, (min-width: 768px) calc(50vw + 40px), 100vw"
    : is_media_right
      ? "(min-width: 1280px) 768px, (min-width: 1024px) 60vw, 100vw"
      : "(min-width: 1280px) 1280px, 100vw";

  return (
    <SmartMedia
      media={media}
      alt={media.alt || ""}
      containerClassName={`relative aspect-4/3 w-full ${is_media_right && !is_list ? "lg:w-[60%]" : ""} ${is_list ? "md:w-[calc(50%+40px)]" : ""}`}
      className="h-full object-cover"
      sizes={sizes}
    />
  );
}
