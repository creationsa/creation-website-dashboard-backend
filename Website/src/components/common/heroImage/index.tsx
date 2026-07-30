import CountUp from "@/components/ui/CountUp";
import { HeroImageProps } from "./types";

export default function HeroImage({ yearsValue, yearsLabel }: HeroImageProps) {
  return (
    <div className="relative aspect-video w-full md:aspect-21/9">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://creation.sa/images/coverVideos/creation_about_bg.jpg"
        className="w-full object-cover"
      >
        <source src="https://creation.sa/videos/about.mp4" type="video/mp4" />
      </video>

      <div className="text-black-100 bg-tiffany-600 dark:bg-tiffany-100 absolute start-0 bottom-0 z-10 flex size-36 flex-col items-center justify-center gap-2 px-5 py-3 text-center sm:size-52 md:size-60 lg:size-80">
        <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl">
          <CountUp value={yearsValue} />
        </span>
        <span className="text-lg font-semibold uppercase sm:text-xl md:text-2xl lg:text-3xl">
          {yearsLabel}
        </span>
      </div>
    </div>
  );
}
