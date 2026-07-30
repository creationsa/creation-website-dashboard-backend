import Image from "next/image";
import { BackgroundImageMainSectionProps } from "./types";

export default function BackgroundImageMainSection({
  certainImage,
  alt,
}: BackgroundImageMainSectionProps) {
  return (
    <section className="-mt-20 space-y-20">
      <div className="relative aspect-4001/1392 w-full">
        <Image
          src={certainImage}
          alt={alt}
          fill
          className="object-cover"
          quality={90}
        />
      </div>
    </section>
  );
}
