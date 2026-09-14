import Image from "next/image";
import { SmartMediaContent } from "@/types/media";

type SmartMediaProps = {
  media: SmartMediaContent | null | undefined;
  alt: string;
  containerClassName?: string;
  className?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
};

export default function SmartMedia({
  media,
  alt,
  containerClassName,
  className,
  quality,
  priority,
  sizes,
}: SmartMediaProps) {
  if (!media?.file) return null;

  const resolvedAlt = media.alt || alt;

  const content =
    media.type === "video" ? (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={media.poster || undefined}
        className={className}
      >
        <source src={media.file} type="video/mp4" />
      </video>
    ) : (
      <Image
        src={media.file}
        alt={resolvedAlt}
        fill
        quality={quality}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );

  return containerClassName ? (
    <div className={containerClassName}>{content}</div>
  ) : (
    content
  );
}
