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
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
          quality={90}
        />
      </div>
    </section>
  );
}
