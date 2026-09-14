import Link from "next/link";
import SmartMedia from "@/components/ui/SmartMedia";
import { FullWidthSliderItemProps } from "./types";

export default function FullWidthSliderItem({
  item,
  locale,
}: FullWidthSliderItemProps) {
  return (
    <div className="group w-full">
      {/* IMAGE + OVERLAY WRAPPER */}
      <div className="relative isolation-auto aspect-square w-full lg:overflow-hidden">
        {/* MEDIA */}
        <SmartMedia
          media={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full scale-[1.01] object-cover transition-all duration-500 lg:grayscale lg:group-hover:scale-110 lg:group-hover:grayscale-0"
          sizes="(min-width: 2560px) 20vw, (min-width: 1440px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {/* OVERLAY */}
        <div className="dark:from-black-800 from-white-100 lg:dark:group-hover:from-tiffany-900 lg:group-hover:from-tiffany-300 absolute -inset-x-1 top-0 -bottom-1 z-10 bg-linear-to-t to-transparent to-40% duration-500 lg:group-hover:to-transparent lg:group-hover:to-45%" />

        {/* Content — lg+ only (hover behavior) */}
        <div className="font-head font-fancy absolute -bottom-44 left-1/2 z-20 hidden w-[65%] -translate-x-1/2 text-center opacity-0 transition-all duration-500 ease-in-out lg:block lg:group-hover:bottom-10 lg:group-hover:opacity-100">
          <Link
            href={`/${locale}/${item.slug}`}
            aria-label={item.title}
            className="text-xl font-bold uppercase"
          >
            {item.title}
          </Link>
        </div>
      </div>

      {/* Content — mobile only (below image, always visible) */}
      <div className="font-head font-fancy mt-4 text-center lg:hidden">
        <Link
          href={`/${locale}/${item.slug}`}
          aria-label={item.title}
          className="w-[65%] text-lg font-bold uppercase"
        >
          {item.title}
        </Link>
      </div>
    </div>
  );
}
