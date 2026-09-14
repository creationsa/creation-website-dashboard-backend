import SmartMedia from "@/components/ui/SmartMedia";
import { ImageSlideItemProps } from "../types";

export default function ImageSlideItem({
  src,
  solutionTitle,
  index,
}: ImageSlideItemProps) {
  return (
    <div className="relative aspect-4/6 w-full overflow-hidden">
      <SmartMedia
        media={src}
        alt={`${solutionTitle} ${index + 1}`}
        className="absolute inset-0 h-full w-full object-cover sm:grayscale"
        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    </div>
  );
}
