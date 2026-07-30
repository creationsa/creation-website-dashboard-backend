import Image from "next/image";
import { ImageSlideItemProps } from "../types";

export default function ImageSlideItem({
  src,
  solutionTitle,
  index,
}: ImageSlideItemProps) {
  return (
    <div className="relative aspect-4/6 w-full overflow-hidden">
      <Image
        src={src}
        alt={`${solutionTitle} ${index + 1}`}
        fill
        className="object-cover sm:grayscale"
      />
    </div>
  );
}
